# Generated by Django 4.2.7 on 2023-12-10 15:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pharmacy', '0002_rename_total_price_purchase_total_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='demand',
            name='user',
        ),
        migrations.RemoveField(
            model_name='purchase',
            name='drug_name',
        ),
        migrations.RemoveField(
            model_name='purchase',
            name='user',
        ),
        migrations.AddField(
            model_name='purchase',
            name='drug',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='pharmacy.drug'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='purchase',
            name='date_purchase',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
