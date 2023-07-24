from django.db import models

# Create your models here.
from django.db import models
from django.utils import timezone


class Book(models.Model):
    timestamp = models.DateTimeField(default=timezone.now)
    number = models.CharField(unique=True, blank=False, max_length=12)

    def __str__(self):
        return self.number




