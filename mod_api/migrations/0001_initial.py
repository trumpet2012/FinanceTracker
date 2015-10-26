# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('symbol', models.CharField(max_length=20)),
                ('name', models.CharField(max_length=255)),
                ('exchange', models.CharField(max_length=255)),
            ],
        ),
    ]
