# Generated by Django 4.0.3 on 2022-06-30 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('address', models.CharField(max_length=100)),
                ('deposit', models.CharField(max_length=100, null=True)),
                ('start_date', models.CharField(max_length=100, null=True)),
                ('contact', models.CharField(max_length=100, null=True)),
            ],
        ),
    ]
