from django.contrib import admin
from check.models import Application


class ApplicationAdmin(admin.ModelAdmin):
    list_display = (
        'pk',
        'timestamp',
        'contact',
        'address',
        'deposit',
        'start_date',
    )


# Register your models here.
admin.site.register(Application, ApplicationAdmin)
