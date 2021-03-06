# Generated by Django 3.2.2 on 2021-05-09 17:21

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
                ('startTime', models.DateTimeField(default='', verbose_name='StartTime')),
                ('endTime', models.DateTimeField(default='', verbose_name='EndTime')),
                ('done', models.BooleanField(default=False, verbose_name='Done')),
                ('registrationDate', models.DateField(auto_now_add=True, verbose_name='Registration Date')),
                ('email', models.CharField(max_length=254, null=True, verbose_name='Email')),
            ],
        ),
    ]
