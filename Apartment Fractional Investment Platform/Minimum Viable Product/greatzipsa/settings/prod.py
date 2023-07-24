from ._base import *

DEBUG = True
ALLOWED_HOSTS = [
    ".ap-northeast-2.compute.amazonaws.com",
    ".greatzipsa.com",
]
WSGI_APPLICATION = 'greatzipsa.wsgi.prod.application'
INSTALLED_APPS += []

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': '',
        'PORT': '5432',
        'NAME': 'zipsaDB',
        'USER': 'zipsa',
        'PASSWORD': '',
    }
}