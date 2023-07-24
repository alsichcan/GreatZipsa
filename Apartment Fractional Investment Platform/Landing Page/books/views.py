from django.shortcuts import render
from django.http import JsonResponse
from django_user_agents.utils import get_user_agent

# Create your views here.

from .models import Book

def book(request):
    # POST 요청이면 book instance를 생성한다.
    if request.method == 'POST':
        _, created = Book.objects.get_or_create(number=request.POST['number'])
        return JsonResponse({"created": created}, status=200)
    # GET 요청 (혹은 다른 메소드)이면 기본 폼을 생성한다.
    else:
        user_agent = get_user_agent(request)
        if user_agent.is_pc or user_agent.is_bot:
            return render(request, 'books/book.html')
        else:
            return render(request, 'books/m_book.html')