from django.urls import path
from . import views

urlpatterns = [
    path('details/<int:pk>/', views.detail, name='detail'),
    path('', views.index, name='index'),
]
