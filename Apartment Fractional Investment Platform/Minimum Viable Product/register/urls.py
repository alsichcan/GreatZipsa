from django.urls import path
from register.views import index, sales, contact, register

app_name = 'register'
urlpatterns = [
    path('', index, name='index'),
    path('sales', sales, name='info'),
    path('contact', contact, name='contact'),
    path('register', register, name='register'),
]
