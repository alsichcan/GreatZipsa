from django.contrib import admin

# Register your models here.
from django.contrib import admin

from .models import Book

class BookAdmin(admin.ModelAdmin):
    list_display = ('pk', 'number', 'timestamp')

admin.site.register(Book, BookAdmin)