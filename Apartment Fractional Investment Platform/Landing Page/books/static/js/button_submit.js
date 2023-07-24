// 참고 : https://www.geeksforgeeks.org/django-form-submission-without-page-reload/
// 참고 : https://www.pluralsight.com/guides/work-with-ajax-django
// 참고 : https://wooncloud.tistory.com/12
// 참고 : https://sweetalert2.github.io/
$(document).on('submit', '.book_form', function (e) {
    e.preventDefault();

    let num_form = e.target.getElementsByClassName("form_input")[0];

    if (!number_check(num_form.value)) {
        Swal.fire({
            icon: 'error',
            title: '형식이 올바르지 않습니다!',
            confirmButtonText: '확인',
        });

         window.dataLayer = window.dataLayer || [];
         window.dataLayer.push({
             'event': 'Event_Form',
             'status': 'Error',
             'number': num_form.value,
         });

        return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'Event_Form',
        'status': 'Agree',
        'number': num_form.value,
    });


    Swal.fire({
        icon: 'info',
        title: '개인정보 수집·이용 및\n광고성 정보 수신 동의',
        text: '당사는 신규 서비스 출시와 사업 오픈, 프로모션, 이벤트 등 다양한 정보 제공을 위해 전화번호를 수집·이용하며, 수집된 정보는 서비스 종료 시까지 보관됩니다.',
        confirmButtonText: '동의',
    }).then((result) => {
        if (result.isConfirmed) {
            post_number(num_form);
        }
    })
});

function number_check(number) {
    var regPhone = /^010-?([0-9]{4})-?([0-9]{4})$/;
    return regPhone.test(number);
}

function post_number(num_form) {
    var regNumber = /[^0-9]/g;
    var number = num_form.value.replace(regNumber, "");
    $.ajax({
        type: 'POST',
        url: '/',
        data:
            {
                number: number,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
        success: function (response) {
            if (JSON.parse(response["created"])) {
                Swal.fire({
                    icon: 'success',
                    title: '정상적으로 등록되었습니다!',
                    confirmButtonText: '확인',
                });

                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'Event_Form',
                    'status': 'Success',
                    'number': num_form.value,
                });
                fbq('track', 'CompleteRegistration');
                num_form.value = "";
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: '이미 등록된 번호입니다!',
                    confirmButtonText: '확인',
                });

                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'Event_Form',
                    'status': 'Warning',
                    'number': num_form.value,
                });
            }
        }
    });
}