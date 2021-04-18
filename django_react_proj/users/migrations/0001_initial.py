# Generated by Django 3.1.7 on 2021-04-18 20:14

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
                ('deadline', models.TimeField(default='15:30', verbose_name='Deadline')),
                ('done', models.BooleanField(default=False, verbose_name='Done')),
                ('registrationDate', models.DateField(auto_now_add=True, verbose_name='Registration Date')),
                ('email', models.CharField(max_length=254, null=True, verbose_name='Email')),
            ],
        ),
    ]
