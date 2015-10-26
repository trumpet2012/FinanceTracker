from django.db import models


class Company(models.Model):
    symbol = models.CharField(max_length=20)
    name = models.CharField(max_length=255)
    exchange = models.CharField(max_length=255)
