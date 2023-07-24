from django.shortcuts import render, get_object_or_404
from django.conf import settings
from django.http import HttpResponse
from items.models import *
from django_user_agents.utils import get_user_agent
from django.core.mail import EmailMessage
import copy


# Index
def index(request):
    if request.method == 'POST':
        question = Question.objects.create(
            name=request.POST['name'],
            number=request.POST['number'],
            question=request.POST['question'],
            url=request.POST['url']
        )
        return HttpResponse(status=200)
    else:
        items = copy.deepcopy(Item.objects.all()[:9])

        for item in items:
            item.main_image = [getImage(img.src) for img in MainImage.objects.filter(item=item)]
            if len(item.name) > 13:
                item.name = item.name[:13] + "..."
            item.address = ' '.join(item.address.split(' ')[:3])
            item.share_price = getPrice(item.share_price)

        context = {'items': items}

        user_agent = get_user_agent(request)
        if user_agent.is_pc or user_agent.is_bot:
            return render(request, 'items/index.html', context)
        else:
            return render(request, 'items/m_index.html', context)

def detail(request, pk):
    if request.method == 'POST':
        item = get_object_or_404(Item, pk=pk)
        name = request.POST['name']
        email = request.POST['email']

        mail = EmailMessage(
            f'위대한집사 주식회사의 {item.name} 사업계획서 송부드립니다.',  # 이메일 제목
            f'''
            안녕하세요 {name}님, 위대한집사 주식회사입니다.
            
            {name}님께서 홈페이지를 통해 요청하신 {item.name} 사업계획서를 송부드립니다.
            
            {name}님께서 기입해주신 전화번호로 추가 안내드리겠습니다.
 
            궁금한 점은 언제든지 문의주십시오.
            
            감사합니다.
            위대한집사 주식회사 올림.
            ''',  # 내용
            to=[f'{email}'],  # 받는 이메일
        )
        mail.attach(item.memorandum.name, item.memorandum.read(), 'application/pdf')
        result = mail.send()

        register = Register.objects.create(
            item=item,
            name=name,
            number=request.POST['number'],
            email=email,
            result=result,
        )

        return HttpResponse(status=200)

    else:
        item = get_object_or_404(Item, pk=pk)
        item.main_image = [getImage(img.src) for img in MainImage.objects.filter(item=item)]
        item.vacation_images = [getImage(img.src) for img in VacationImage.objects.filter(item=item)]
        item.investment_image = [getImage(img.src) for img in InvestmentImage.objects.filter(item=item)]
        item.info_images = [getImage(img.src) for img in InfoImage.objects.filter(item=item)]

        item.share_price = getPrice(item.share_price)

        user_agent = get_user_agent(request)
        if user_agent.is_pc or user_agent.is_bot:
            item.work_images = [getImage(img.src) for img in WorkImage.objects.filter(item=item)]
            context = {'item': item}
            return render(request, 'items/detail.html', context)
        else:
            item.work_images = [getImage(img.src) for img in MobileWorkImage.objects.filter(item=item)]
            context = {'item': item}
            return render(request, 'items/m_detail.html', context)

# Helper Method
def getFile(file):
    return settings.MEDIA_URL + str(file)

def getImage(image):
    return settings.MEDIA_URL + str(image)


def getPrice(price):
    leftover = price % 10000

    if price >= 10000:
        if leftover == 0:
            return f'{int(price / 10000)}억원'
        else:
            return f'{int(price / 10000)}억 {leftover}만원'
    else:
        return f'{price % 10000}만원'

