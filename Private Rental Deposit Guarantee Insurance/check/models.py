# Create your models here.
from django.db import models


class Application(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    address = models.CharField(max_length=100)
    deposit = models.CharField(null=True, max_length=100)
    start_date = models.CharField(null=True, max_length=100)
    contact = models.CharField(null=True, max_length=100)

    def __str__(self):
        return f"등록일시 : {self.timestamp}\n" \
               f"전화번호 : {self.contact}\n" \
               f"주소 : {self.address}\n" \
               f"전세금 : {self.deposit}만 원\n" \
               f"전입일 : {self.start_date}"
