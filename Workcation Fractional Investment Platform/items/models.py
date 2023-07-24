from django.db import models
from django.utils.translation import gettext_lazy as _
import os

# Create your models here.
class Item(models.Model):
    # Item Information
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    memorandum = models.FileField(upload_to="memorandum/", null=True, verbose_name="Memorandum")

    class ItemType(models.TextChoices):
        RESIDENCE = '생활형 숙박시설', _('Residence')
        OFFICETEL = '오피스텔', _('Officetel')

    item_type = models.CharField(
        max_length=30,
        choices=ItemType.choices,
        default=ItemType.OFFICETEL,
    )

    num_room = models.SmallIntegerField(default=1)
    size_room = models.SmallIntegerField(default=84)
    floor = models.SmallIntegerField(default=1)

    class DirectionType(models.TextChoices):
        N = '북향', _('North')
        NE = '북동향', _('NorthEast')
        E = '동향', _('East')
        SE = '남동향', _('SouthEast')
        S = '남향', _('South')
        SW = '남서향', _('SouthWest')
        W = '서향', _('West')
        NW = '북서향', _('NorthWest')

    direction = models.CharField(
        max_length=30,
        choices=DirectionType.choices,
        default=DirectionType.S,
    )
    parking = models.SmallIntegerField(default=1)
    size_floor = models.SmallIntegerField(default=0)
    size_building = models.SmallIntegerField(default=0)
    age = models.CharField(max_length=30, default="1년차")
    url = models.URLField(null=True)
    map_timestamp = models.CharField(max_length=100, default="")
    map_key = models.CharField(max_length=30, default="")


    # Investment Information
    class ItemStatus(models.TextChoices):
        OPEN = '소유주 모집중', _('Open')
        COMPLETE = '모집 완료', _('Complete')
        EXCHANGE = '지분 매수 가능', _('Exchange')

    status = models.CharField(
        max_length=30,
        choices=ItemStatus.choices,
        default=ItemStatus.OPEN,
    )
    share_price = models.IntegerField()
    share_members = models.SmallIntegerField(default=0)

    # Vacation Point Information
    vacation_first_title = models.TextField(default="")
    vacation_first_text = models.TextField(default="")
    vacation_second_title = models.TextField(default="")
    vacation_second_text = models.TextField(default="")
    vacation_third_title = models.TextField(default="")
    vacation_third_text = models.TextField(default="")

    # Investment Point Information
    investment_point_first = models.TextField(default="")
    investment_point_second = models.TextField(default="")
    investment_point_third = models.TextField(default="")
    investment_point_fourth = models.TextField(default="")


# Image Models
def get_image_filename(instance, filename):
    path, ext = os.path.splitext(filename)

    if type(instance) == MainImage:
        return "image/%s/main_image%s" % (instance.item.pk, ext)
    elif type(instance) == VacationImage:
        id = VacationImage.objects.filter(item=instance.item).count() + 1
        return "image/%s/info_image/%s%s" % (instance.item.pk, id, ext)
    elif type(instance) == WorkImage:
        id = WorkImage.objects.filter(item=instance.item).count() + 1
        return "image/%s/work_image/%s%s" % (instance.item.pk, id, ext)
    elif type(instance) == MobileWorkImage:
        id = MobileWorkImage.objects.filter(item=instance.item).count() + 1
        return "image/%s/mobile_work_image/%s%s" % (instance.item.pk, id, ext)
    elif type(instance) == InvestmentImage:
        return "image/%s/investment_image%s" % (instance.item.pk, ext)
    elif type(instance) == InfoImage:
        id = InfoImage.objects.filter(item=instance.item).count() + 1
        return "image/%s/info_image/%s%s" % (instance.item.pk, id, ext)
    else:
        return "image/%s/%s.%s" % (instance.item.pk, filename, ext)

class Image(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    src = models.ImageField(upload_to=get_image_filename, verbose_name="Image")

    class Meta:
        abstract = True


class MainImage(Image):
    src = models.ImageField(upload_to=get_image_filename, verbose_name="mainImage")


class InfoImage(Image):
    src = models.ImageField(upload_to=get_image_filename, verbose_name="infoImage")


class WorkImage(Image):
    src = models.ImageField(upload_to=get_image_filename, verbose_name="workImage")

class MobileWorkImage(Image):
    src = models.ImageField(upload_to=get_image_filename, verbose_name="mobileWorkImage")


class InvestmentImage(Image):
    src = models.ImageField(upload_to=get_image_filename, verbose_name="investmentImage")


class VacationImage(Image):
    src = models.ImageField(upload_to=get_image_filename, verbose_name="vacationImage")


class Register(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    number = models.CharField(max_length=30)
    email = models.CharField(max_length=30, default="")
    result = models.BooleanField()


class Question(models.Model):
    name = models.CharField(max_length=30)
    number = models.CharField(max_length=30)
    question = models.TextField()
    url = models.URLField(default="")
