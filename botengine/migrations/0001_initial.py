# Generated by Django 5.0.4 on 2024-08-30 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Bot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bot_name', models.CharField(max_length=255, unique=True)),
                ('status', models.CharField(choices=[('AE', 'Active'), ('IE', 'Idle')], default='IE', max_length=2)),
            ],
        ),
    ]
