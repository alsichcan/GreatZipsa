from django.db import models


# Create your models here.
# class FAQ(models.Model):
#     question = models.CharField(max_length=100)
#     answer = models.TextField()


class Contact(models.Model):
    PERSON_CHOICES = (('Investor', 'Investor'), ('Seller', 'Seller'), ('Agency', 'Agency'))
    name = models.CharField(max_length=20,null=True,blank=True)
    address = models.CharField(max_length=30)
    question = models.CharField(max_length=1000)
    who = models.CharField(max_length=12, choices=PERSON_CHOICES)


class Registration(models.Model):
    name = models.CharField(max_length=20,null=True,blank=True)
    phone = models.CharField(max_length=30)
    amount = models.IntegerField(null=True, blank=True)
    question = models.CharField(max_length=200, null=True, blank=True)
