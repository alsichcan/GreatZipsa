from django.core.exceptions import ValidationError
from django.forms import ModelForm, BooleanField
from register.models import Contact, Registration


class RegistrationForm(ModelForm):
    agree = BooleanField()

    class Meta:
        model = Registration
        fields = ['name', 'phone', 'amount', 'question']

    def clean(self):
        cleaned_data = super().clean()
        # amount = cleaned_data.get('amount')
        agreed = cleaned_data.get('agree')
        if not agreed:
            raise ValidationError('동의해 주세요')
        # if (amount != 0) and (amount < 1000 or amount > 2000000000):
        #     print('유효하지 않은 금액입니다.')
        #     raise ValidationError('유효하지 않은 금액입니다')


class ContactForm(ModelForm):
    agree = BooleanField()

    class Meta:
        model = Contact
        fields = ['name', 'address', 'question', 'who']

    def clean(self):
        cleaned_data = super().clean()
        agree = cleaned_data.get('agree')
        if not agree:
            raise ValidationError('개인정보 수집에 동의해 주세요')
