from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.conf import settings
from django.templatetags.static import static
from django.utils.translation import gettext_lazy as _

# Create your models here.

class MyAccountManager(BaseUserManager):
    def create_user(self, first_name, last_name, username, email, password=None):
        if not email:
            raise ValueError('User must have an email address')

        if not username:
            raise ValueError('User must have an username')

        user = self.model(
            email = self.normalize_email(email),
            username = username,
            first_name = first_name,
            last_name = last_name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, last_name, email, username, password):
        user = self.create_user(
            email = self.normalize_email(email),
            username = username,
            password = password,
            first_name = first_name,
            last_name = last_name,
        )
        user.is_admin = True
        user.is_active = True
        user.is_staff = True
        user.is_superadmin = True
        user.save(using=self._db)
        return user


def get_profile_picture_path(instance=None, file=None, default=False):
    if default:
        return f'avatars\\default.png'
    extension = file.split(".")[-1]
    return f'avatars\\{instance.id}.{extension}'


class Account(AbstractBaseUser):
    first_name      = models.CharField(max_length=50)
    last_name       = models.CharField(max_length=50)
    username        = models.CharField(max_length=50, unique=True)
    email           = models.EmailField(max_length=100, unique=True)
    phone_number    = models.CharField(max_length=50)

    # optional info
    profile_picture = models.ImageField(upload_to=get_profile_picture_path, default=get_profile_picture_path(default=True))
    address_line_1 = models.CharField(max_length=500, blank=True)
    address_line_2 = models.CharField(max_length=500, blank=True)
    city = models.CharField(max_length=500, blank=True, null=True)
    county = models.CharField(max_length=500, blank=True, null=True)
    country = models.CharField(max_length=500, blank=True, null=True)

    # required
    date_joined     = models.DateTimeField(auto_now_add=True)
    last_login      = models.DateTimeField(auto_now_add=True)
    is_admin        = models.BooleanField(default=False)
    is_staff        = models.BooleanField(default=False)
    is_active        = models.BooleanField(default=True)
    is_superadmin        = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    objects = MyAccountManager()

    def full_name(self):
        return f'{self.first_name} {self.last_name}'

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, add_label):
        return True


def get_upload_path(instance, file):
    extension = file.split(".")[-1]
    return f'logo-upload\\{instance.user.id}\\{file}'

class Logo(models.Model):
    user = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to=get_upload_path)
    
    is_setup = models.BooleanField(default=False) # use order.ordered instead
    @property
    def is_exists(self):
        if self.image == '':
            return False
        return self.image.storage.exists(self.image.name)
