// 참고 : https://www.geeksforgeeks.org/django-form-submission-without-page-reload/
// 참고 : https://www.pluralsight.com/guides/work-with-ajax-django
// 참고 : https://wooncloud.tistory.com/12
// 참고 : https://sweetalert2.github.io/


const Toast = Swal.mixin({
    toast: true,
    position: 'center-center',
    width: 300,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

$(document).on('click', '.question_ask', function(e){
    $('#modal_ask').css('display', 'flex');
    $('#ask_modal').show();
});

$(document).on('click', '#button_ask', function(e){
    $('#modal_ask').css('display', 'flex');
    $('#ask_modal').show();
});

$(document).on('click', '.header_ask', function(e){
    $('#modal_ask').css('display', 'flex');
    $('#ask_modal').show();
});


$(document).on('click', '#button_cta', function(e){
    $('#modal_cta').css('display', 'flex');
    $('#cta_modal').show();
});

$(document).on('click', '#button_cancel', function(e){
    $('.modal_wrapper').css('display', 'none');
    $('.modal').hide();
});

$(document).on('click', '#button_submit', function (e) {
    let name = document.getElementById('modal_name').value;
    let number = document.getElementById('modal_number').value;
    let email = document.getElementById('modal_email').value;

    if(name == ''){
        Toast.fire({
            icon: 'warning',
            title: '이름을 입력해주세요.'
        })
        return;
    }

    if(number == ''){
        Toast.fire({
            icon: 'warning',
            title: '전화번호를 입력해주세요.'
        })
        return;
    } else{
        var regPhone = /^010([0-9]{4})([0-9]{4})$/;
        if(!regPhone.test(number)){
            Toast.fire({
                icon: 'error',
                title: '번호 형식이 잘못되었습니다.'
            })
            return;
        }
    }

    if(email == ''){
        Toast.fire({
            icon: 'warning',
            title: '이메일을 입력해주세요.'
        })
        return;
    } else{
        var regEmail =  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regEmail.test(email)){
            Toast.fire({
                icon: 'error',
                title: '이메일 형식이 잘못되었습니다.'
            })
            return;
        }
    }

    Swal.fire({
        icon: 'success',
        text: '정상적으로 등록되었습니다!'
    });

    $.ajax({
        type: 'POST',
        url: window.location.href,
        data:
            {
                name: name,
                number: number,
                email: email,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
    });
});

$(document).on('click', '#button_question', function (e) {
    let name = document.getElementById('modal_name').value;
    let number = document.getElementById('modal_number').value;
    let question = document.getElementById('modal_question').value;

    if(name == ''){
        Toast.fire({
            icon: 'warning',
            title: '이름을 입력해주세요.'
        })
        return;
    }

    if(number == ''){
        Toast.fire({
            icon: 'warning',
            title: '전화번호를 입력해주세요.'
        })
        return;
    } else{
        var regPhone = /^010([0-9]{4})([0-9]{4})$/;
        if(!regPhone.test(number)){
            Toast.fire({
                icon: 'error',
                title: '전화번호를 확인해주세요.'
            })
            return;
        }
    }

    console.log(window.location.href);

    $.ajax({
        type: 'POST',
        url: '/',
        data:
            {
                url: window.location.href,
                name: name,
                number: number,
                question: question,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
        success: function (response) {
            Swal.fire({
                icon: 'success',
                text: '정상적으로 등록되었습니다!'
            });
        }
    });
})