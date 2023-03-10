# Generated by Django 4.1.4 on 2023-02-17 09:23

from decimal import Decimal
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('shop', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='VoucherDiscount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.DecimalField(decimal_places=2, default=Decimal('0'), max_digits=5)),
                ('by_percent', models.BooleanField(default=False)),
                ('for_field', models.CharField(max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='VoucherCondition',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity_min', models.IntegerField(null=True)),
                ('quantity_max', models.IntegerField(null=True)),
                ('all_items_price_min', models.DecimalField(decimal_places=2, max_digits=5, null=True)),
                ('all_items_price_max', models.DecimalField(decimal_places=2, max_digits=5, null=True)),
                ('cart_subtotal_min', models.DecimalField(decimal_places=2, max_digits=5, null=True)),
                ('cart_subtotal_max', models.DecimalField(decimal_places=2, max_digits=5, null=True)),
                ('cart_grandtotal_min', models.DecimalField(decimal_places=2, max_digits=5, null=True)),
                ('cart_grandtotal_max', models.DecimalField(decimal_places=2, max_digits=5, null=True)),
                ('variants', models.ManyToManyField(to='shop.variants')),
            ],
        ),
        migrations.CreateModel(
            name='Voucher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('context', models.CharField(choices=[('cart', 'order'), ('cart_item', 'cart_item')], max_length=10, null=True)),
                ('auto_apply', models.BooleanField(default=False)),
                ('start_at', models.DateTimeField(null=True)),
                ('expired_at', models.DateTimeField(null=True)),
                ('name', models.CharField(default='', max_length=200)),
                ('condition', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='voucher.vouchercondition')),
                ('discount', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='voucher.voucherdiscount')),
            ],
        ),
    ]
