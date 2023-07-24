from django.contrib import admin
from register.models import Contact, Registration

class ContactAdmin(admin.ModelAdmin):
    list_display = ('pk', 'who',  'address', 'question')

class RegistrationAdmin(admin.ModelAdmin):
    list_display = ('pk', 'phone', 'question')

# Register your models here.
admin.site.register(Contact, ContactAdmin)
admin.site.register(Registration, RegistrationAdmin)