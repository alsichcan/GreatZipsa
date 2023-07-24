from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, get_object_or_404
from check.models import Application
import json  # json파일을 읽어들일 것이므로, 해당 모듈도 import
import requests


# Create your views here.
def index(request):
    # POST 요청이면 처리
    if request.method == 'POST':

        # 주소
        if 'address' in request.POST:
            app = Application.objects.create(address=request.POST['address'])
            post_message(app)
            return JsonResponse({"pk": app.pk}, status=200)

        # 전세금, 전입일
        elif set(['pk', 'deposit', 'start_date']).issubset(set(request.POST)):
            app = get_object_or_404(Application, pk=request.POST['pk'])
            app.deposit = request.POST['deposit']
            app.start_date = request.POST['start_date']
            app.save()
            post_message(app)
            return JsonResponse({"pk": app.pk}, status=200)

        # 전화번호
        elif set(['pk', 'contact']).issubset(set(request.POST)):
            app = get_object_or_404(Application, pk=request.POST['pk'])
            app.contact = request.POST['contact']
            app.save()
            post_message(app)
            return JsonResponse({"pk": app.pk}, status=200)
        # 오류
        else:
            return HttpResponse(status=400)

    # GET 요청이면 HTML 리턴
    else:
        return render(request, 'check/index.html')

def post_message(app):
    config_secret = json.loads(open('secret_key.json').read())  # json파일을 읽고
    token = config_secret['SLACK_BOT']['TOKEN']  # token을 불러온다
    channel = "#4-bot"
    text = f"[신규 고객 신청]"

    attach_dict = {
        'color': '#ff0000',
        'title': f'{app.pk}번째 손님',
        'text': f'{app.__str__()}',
    }  # attachment 에 넣고싶은 목록들을 딕셔너리 형태로 입력

    attachments = json.dumps([attach_dict]) # 리스트는 Json 으로 덤핑 시켜야 Slack한테 제대로 간다.
    response = requests.post("https://slack.com/api/chat.postMessage",
        headers={"Authorization": "Bearer "+token},
        data={"channel": channel, "text": text ,"attachments": attachments})
