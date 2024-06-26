# Generated by Django 4.2.7 on 2023-12-05 18:08

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pharmacy', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='purchase',
            old_name='total_price',
            new_name='total',
        ),
        migrations.RemoveField(
            model_name='purchase',
            name='drug',
        ),
        migrations.RemoveField(
            model_name='purchase',
            name='purchase_date',
        ),
        migrations.AddField(
            model_name='demand',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='purchase',
            name='date_purchase',
            field=models.DateField(auto_now_add=True, default=datetime.datetime(2023, 12, 5, 18, 7, 58, 434565, tzinfo=datetime.timezone.utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='purchase',
            name='drug_name',
            field=models.CharField(default=1, max_length=250),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='purchase',
            name='user',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
