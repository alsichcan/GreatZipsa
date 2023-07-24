from django.urls import path
from . import views

app_name = 'books'
urlpatterns = [
    # ex: /
    path('', views.book, name='index'),
]