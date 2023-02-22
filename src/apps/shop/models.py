from django.db import models
from django.urls import reverse
from django.utils.html import mark_safe
from django.utils.text import slugify
from ckeditor_uploader.fields import RichTextUploadingField
from mptt.fields import TreeForeignKey
from mptt.models import MPTTModel
from accounts.models import Account, Logo


# Create your models here.
# Category
class Category(MPTTModel):
    category_name = models.CharField(max_length=50)
    parent = TreeForeignKey('self', blank=True, null=True, related_name='children', on_delete=models.CASCADE)
    slug = models.SlugField(max_length=50)
    full_slug = models.CharField(max_length=255, blank=True)
    cat_image = models.ImageField(upload_to='photos/categories', blank=True)

    class MPTTMeta:
        order_insertion_by = ['category_name']

    class Meta:
        verbose_name_plural = 'categories'

    def save(self, *args, **kwargs):
        self.slug = slugify(self.category_name)
        super(Category, self).save(*args, **kwargs)

    def get_url(self):
        return reverse('products_by_category', args=[self.id, self.slug])

    def get_id(self):
        id = ''
        url = self.get_url()
        return url.split('category_list/')[1].split('/')[0]

    def __str__(self):                           # __str__ method elaborated later in
        full_path = [self.category_name]                  # post.  use __unicode__ in place of
        k = self.parent
        while k is not None:
            full_path.append(k.category_name)
            k = k.parent
        return ' / '.join(full_path[::-1])


# Brand
class Brand(models.Model):
    brand_name = models.CharField(max_length=50, unique=True)
    brand_image = models.ImageField(upload_to='photos/brands', blank=True)

    def get_url(self):
        return reverse('products_by_brand', args=[self.id])

    def __str__(self):
        return self.brand_name


# Gender
class Gender(models.Model):
    title = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.title


# Colour
class Colour(models.Model):
    title = models.CharField(max_length=100)
    primary_colour = models.CharField(max_length=100)
    colour_code = models.CharField(max_length=100, blank=True)

    def colour_bg(self):
        return mark_safe('<div style="width:30px; height:30px; background-color:%s"></div>' % (self.colour_code))

    def __str__(self):
        return self.title


# Size
class Size(models.Model):
    title = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.title


# Positions
class Position(models.Model):
    RIGHT_BREAST = 'RB'
    LEFT_BREAST = 'LB'
    RIGHT_ARM = 'RA'
    LEFT_ARM = 'LA'
    NAPE_NECK = 'NN'
    LARGE_LOGO_FRONT = 'LLF'
    LARGE_TEXT_FRONT = 'LTF'
    LARGE_LOGO_BACK = 'LLB'
    LARGE_TEXT_BACK = 'LTB'
    STANDARD_LOGO = 'SL'

    POSITIONS = (
        (RIGHT_BREAST, 'RB'),
        (LEFT_BREAST, 'LB'),
        (RIGHT_ARM, 'RA'),
        (LEFT_ARM, 'LA'),
        (NAPE_NECK, 'NN'),
        (LARGE_LOGO_FRONT, 'LLF'),
        (LARGE_TEXT_FRONT, 'LTF'),
        (LARGE_LOGO_BACK, 'LLB'),
        (LARGE_TEXT_BACK, 'LTB'),
        (STANDARD_LOGO, 'SL'),
    )

    price = models.DecimalField(max_digits=5, decimal_places=2)
    additional_price = models.DecimalField(max_digits=5, decimal_places=2)
    name_price = models.DecimalField(max_digits=5, decimal_places=2, null=True)

    position = models.CharField(choices=POSITIONS, max_length=500, blank=True)
    title = models.CharField(max_length=20, blank=True)

    def __str__(self) -> str:
        return self.title

class Fee(models.Model):
    Logo = 'Logo'
    Text = 'Text'
    Delivery = 'Delivery'

    _NAME = (
        (Logo, 'Logo'),
        (Delivery, 'Delivery'),
    )
    name = models.CharField(choices=_NAME, max_length=500, blank=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)


# Product
class Product(models.Model):
    VARIANTS = (
        ('None', 'None'),
        ('Size', 'Size'),
        ('Colour', 'Colour'),
        ('Size-Colour', 'Size-Colour'),

    )
    product_group   = models.CharField(max_length=5, unique=True)
    brand           = models.ForeignKey(Brand, on_delete=models.CASCADE)
    product_name    = models.CharField(max_length=200)
    slug            = models.SlugField(max_length=200)
    description     = models.TextField(max_length=800)
    gender          = models.ForeignKey(Gender, on_delete=models.CASCADE)
    images          = models.ImageField(upload_to='photos/products', blank=True)
    washing         = models.TextField(max_length=100, blank=True)
    fabric          = models.TextField(max_length=50, blank=True)
    weight          = models.TextField(max_length=50, blank=True)
    positions        = models.ManyToManyField(Position)
    price           = models.DecimalField(max_digits=5, decimal_places=2, blank=True)
    is_available    = models.BooleanField(default=True)
    category        = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='category')
    category2       = models.ForeignKey(Category, blank=True, null=True, on_delete=models.CASCADE, related_name='category2')
    detail          = RichTextUploadingField()
    created_date    = models.DateTimeField(auto_now_add=True)
    modified_date   = models.DateTimeField(auto_now=True)
    variant         = models.CharField(max_length=50, choices=VARIANTS, default='None')

    def image_tag(self):
        if self.images.url is not None:
            return mark_safe('<img src="{}" height="50"/>'.format(self.images.url))
        else:
            return ""

    def get_position_list(self):
        result_list = []
        position_map = {
            'LB': ['Left Breast', '0', '1.75'],
            'RB': ['Right Breast', '0', '1.75'],
            'LA': ['Left Arm', '0', '1.75'],
            'RA': ['Right Arm', '0', '1.75'],
            'NN': ['Nape of Neck', '0', '1.75'],
            'SL': ['Standard Logo', '0', '1.75'],

            'LLF': ['Large Logo Front', '3', '2.95'],
            'LTF': ['Large Text Front', '2', '2.95'],
            'LLB': ['Large Logo Back', '3', '2.95'],
            'LTB': ['Large Text Back', '2', '2.95'],
        }

        for key in position_map:
            for e in self.position.split(' '):
                if e == key:
                    result_list.append([key, position_map[key][0], position_map[key][1], position_map[key][2]])
        return result_list

    def get_url(self):
        return reverse('product_detail', args=[self.id, self.slug])

    def save(self, *args, **kwargs):
        self.slug = slugify(self.product_group)
        super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return self.product_group


class ProductGallery(models.Model):
    title = models.CharField(max_length=100, unique=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='photos/products', blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'productgallery'
        verbose_name_plural = 'product gallery'


# Product Variation
class Variants(models.Model):
    title = models.CharField(max_length=100, unique=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    colour = models.ForeignKey(Colour, on_delete=models.CASCADE, blank=True, null=True)
    size = models.ForeignKey(Size, on_delete=models.CASCADE, blank=True, null=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    image_gallery = models.ForeignKey(ProductGallery, on_delete=models.CASCADE, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = 'Variants'

    def __unicode__(self):
        return self.title

    def get_image_src(self):
        img = ProductGallery.objects.get(title=self.image_gallery)
        if img.title is not None:
            var_image = img.image.url
        else:
            var_image=""
        self.image_src = var_image

    # TODO: deprecared
    def image(self):
        img = ProductGallery.objects.get(title=self.image_gallery)
        if img.title is not None:
            var_image = img.image.url
        else:
            var_image=""
        return var_image

    def image_tag(self):
        img = ProductGallery.objects.get(title=self.image_gallery)
        if img.title is not None:
            return mark_safe('<img src="{}" height="50"/>'.format(img.image.url))
        else:
            return ""


# Reviews
class Review(models.Model):
    STATUS = (
        ('New', 'New'),
        ('True', 'True'),
        ('False', 'False'),
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    subject = models.CharField(max_length=100, blank=True)
    review = models.TextField(max_length=500, blank=True)
    rating = models.FloatField(default=1.0)
    ip = models.CharField(max_length=20, blank=True)
    status = models.CharField(max_length=10, choices=STATUS, default='New')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.subject



    