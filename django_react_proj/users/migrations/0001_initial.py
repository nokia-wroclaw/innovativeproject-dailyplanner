# Generated by Django 3.1.7 on 2021-04-11 18:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Name')),
                ('password', models.CharField(max_length=500, verbose_name='Password')),
                ('deadline', models.TimeField(default='20:25', verbose_name='Deadline')),
                ('done', models.BooleanField(default=False, verbose_name='Done')),
                ('registrationDate', models.DateField(auto_now_add=True, verbose_name='Registration Date')),
            ],
        ),
    ]
