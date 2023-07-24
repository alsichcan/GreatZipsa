// 참고 : https://www.geeksforgeeks.org/django-form-submission-without-page-reload/
// 참고 : https://www.pluralsight.com/guides/work-with-ajax-django
// 참고 : https://wooncloud.tistory.com/12
// 참고 : https://sweetalert2.github.io/

let tempElem;

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


$(document).on('click', '#apply', function(e){
    $('.modal_wrapper').css('display', 'flex');
    $('#modal0').show();
});


$(document).on('click', '#mAddress_main', function(e){
    new daum.Postcode({
        oncomplete: function(data){
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                addr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if(data.userSelectedType === 'R') {
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraAddr !== '') {
                    extraAddr = ' (' + extraAddr + ')';
                }
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById("mAddress_main").value = addr + ' ' + extraAddr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("mAddress_sub").focus();
        }
    }).open();
});

$(document).on('click', '#submit_0', function (e) {
    let mAddr = document.getElementById('mAddress_main').value;
    let sAddr = document.getElementById('mAddress_sub').value;

    if(mAddr == ''){
        Toast.fire({
            icon: 'warning',
            title: '주소를 입력해주세요.'
        })
        return;
    }

    if(sAddr == ''){
        Toast.fire({
            icon: 'warning',
            title: '세부 주소를 입력해주세요.'
        })
        return;
    }


    $.ajax({
        type: 'POST',
        url: '/',
        data:
            {
                address: mAddr + ' ' + sAddr,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
        success: function (response) {
            tempElem = document.createElement('textarea');
            tempElem.value = '';
            document.body.appendChild(tempElem);

            tempElem.value = response["pk"];
            $('#modal0').css("display", "none");
            document.getElementById('mAddress_main').value = '';
            document.getElementById('mAddress_sub').value = '';
            $('#modal1').fadeIn();
        }
    });
});

$(document).on('click', '#submit_1', function (e) {
    let deposit = document.getElementById('mDeposit').value;
    let start_date = document.getElementById('mDate').value;

    if(deposit == ''){
        Toast.fire({
            icon: 'warning',
            title: '전세금 금액을 입력해주세요.'
        })
        return;
    }

    if(start_date == ''){
        Toast.fire({
            icon: 'warning',
            title: '전입 일자를 선택해주세요.'
        })
        return;
    }

    $.ajax({
        type: 'POST',
        url: '/',
        data:
            {
                pk: tempElem.value,
                deposit: deposit,
                start_date: start_date,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
        success: function (response) {
            $('#modal1').css('display', 'none');
            document.getElementById('mDeposit').value = '';
            document.getElementById('mDate').value = '';
            $('#modal2').fadeIn();
        }
    });
});

$(document).on('click', '#submit_2', function (e) {
    let contact = document.getElementById('mContact').value;
    let agree = document.getElementById('mAgree').checked;

    var regPhone = /^010([0-9]{4})([0-9]{4})$/;
    if(!regPhone.test(contact)){
        Toast.fire({
            icon: 'error',
            title: '형식이 잘못되었습니다.'
        })
        return;
    }

    if(!agree){
        Toast.fire({
            icon: 'warning',
            title: '개인정보 수집 이용 및 광고성 정보 수신 동의가 필요합니다.'
        })
        return;
    }

    $.ajax({
        type: 'POST',
        url: '/',
        data:
            {
                pk: tempElem.value,
                contact: contact,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
        success: function (response) {
            $('#modal2').css('display', 'none');
            document.getElementById('mContact').value = '';
            $('#modal3').fadeIn();
        }
    });
});

$(document).on("click", ".form_agree_text", function(e){
    Swal.fire({
        icon: 'info',
        title: '개인정보 수집·이용 및 광고성 정보 수신 동의',
        text: '고객의 전세보증금 안전진단 결과와 정보를 제공하기 위해 전화번호와 주소를 수집하며, 서비스 종료 시까지 보유 후 파기됩니다.'
    });
});

$(document).on("click", "#submit_3", function(e){
    // $('#modal3').fadeOut();
    $('.modal_wrapper').css('display', 'none');
    document.body.removeChild(tempElem);
});

$(document).on("click", function(e){
    if($('.modal_wrapper').is(e.target)){
        $('.modal_wrapper').hide();
        $('.modal').hide();
    }
})