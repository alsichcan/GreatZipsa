from django.contrib import admin
from .models import *


# Register your models here.
class MainImageInline(admin.TabularInline):
    model = MainImage


class VacationImageInline(admin.TabularInline):
    model = VacationImage


class WorkImageInline(admin.TabularInline):
    model = WorkImage

class MobileWorkImageInline(admin.TabularInline):
    model = MobileWorkImage


class InvestmentImageInline(admin.TabularInline):
    model = InvestmentImage


class InfoImageInline(admin.TabularInline):
    model = InfoImage


class RegisterInline(admin.TabularInline):
    model = Register


class ItemAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'status',
        'item_type',
        'name',
        'address',
        'share_price',
    )

    inlines = [
        MainImageInline,
        VacationImageInline,
        WorkImageInline,
        MobileWorkImageInline,
        InvestmentImageInline,
        InfoImageInline,
        RegisterInline
    ]


class QuestionAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'name',
        'number',
        'question',
        'url',
    )


class RegisterAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'item',
        'name',
        'number',
        'email',
        'result',
    )


admin.site.register(Item, ItemAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Register, RegisterAdmin)
