from django.shortcuts import render, redirect

# Create your views here.
from register.forms import ContactForm, RegistrationForm
from register.models import Registration
from django.http.response import HttpResponse


def index(request):
    # FAQs = FAQ.objects.all()
    num = Registration.objects.all().count()
    return render(request, 'main/index.html',{'num':num})


def sales(request):
    num = Registration.objects.all().count()
    return render(request, 'main/sales.html', {'num': num})



def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponse(status=200)
    return HttpResponse(status=400)


def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponse(status=200)
    return HttpResponse(status=400)
