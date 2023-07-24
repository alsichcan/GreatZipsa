function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');
const registrationModal=document.querySelector('.registrationModal')
const contactModal=document.querySelector('.contactModal')
//const registrationAmountInput=document.querySelector('#rAmount')
const infoReceive=document.querySelector('.infoReceive')
const personalInfo=document.querySelector('.personalInfo')
const registrationSpan=document.querySelector('.registrationModal label  span')
const contactSpan=document.querySelector('.contactModal span')
const registrationClose=document.querySelector('.registrationModal img')
const contactClose=document.querySelector('.contactModal img')
const calcIn=document.querySelector('.calc-input')
const calcOutPercent=document.querySelector('.calc-output span:first-child')
const calcOutBy1000=document.querySelector('.calc-output span:last-child')
registrationSubmit=document.querySelector('#rSubmit')
contactsubmit=document.querySelector('#cSubmit')
registrationModal.addEventListener('mousedown',function(event){
    if(event.target===registrationModal){
        registrationModal.style.display='none';
    }
})
contactModal.addEventListener('click',function(event){
    if(event.target===contactModal){
        contactModal.style.display='none';
    }
})
/*registrationAmountInput.addEventListener('input',function(event){
    let amount=registrationAmountInput.value
    calcIn.textContent=`${Number(amount).toLocaleString('en')}원 출자 시`
    calcOutPercent.textContent=`${(amount/20000000).toFixed(3)}`
    calcOutBy1000.textContent=`${Math.floor(amount/1000)}`
})*/
infoReceive.addEventListener('click',function(event){
    if(event.target===infoReceive){
        infoReceive.style.display='none';
    }
})
personalInfo.addEventListener('click',function(event){
    if(event.target===personalInfo){
       personalInfo.style.display='none';
    }
})
registrationClose.addEventListener('click',function(event){
    registrationModal.style.display='none';
})
contactClose.addEventListener('click',function(event){
    contactModal.style.display='none';
})
function registerModal_show(){
    registrationModal.style.display='flex';
}
function contactModal_show(){
    contactModal.style.display='flex';
}
function infoReceive_show(){
    infoReceive.style.display='flex';
}
function personalInfo_show(){
   personalInfo.style.display='flex';
}
registrationSpan.addEventListener('click',function(event){
    event.preventDefault()

    infoReceive_show();
})

contactSpan.addEventListener('click',function(event){
    event.preventDefault()
    personalInfo_show();
})
registrationSubmit.addEventListener('click',
 async function(event) {
     event.preventDefault()
     let registerForm = document.querySelector('.registrationModal form')

     let agree = document.querySelector('#rAgree').checked;
     if(!agree){
         Swal.fire({
            icon: 'warning',
            title: '개인정보 수집 및 이용 동의가 필요합니다!',
            confirmButtonText: '확인',
        });
         return;
     }


     let input = document.querySelector('#rPhone').value;

    if(!number_check(input) && !email_check(input)){
         Swal.fire({
            icon: 'error',
            title: '형식이 올바르지 않습니다!',
            confirmButtonText: '확인',
        });
         return;
     }

     let result = await fetch('/register',
         {
             headers:
                 {
                     'X-CSRFToken': csrftoken,

                     'Accept': 'application/json, text/plain, *//**'
                 },
             mode: 'same-origin', method: 'POST', body: new FormData(registerForm)
         })
     if (result.status === 200) {
        Swal.fire({
            icon: 'success',
            title: '정상적으로 등록되었습니다!',
            confirmButtonText: '확인',
        });
        fbq('track', 'CompleteRegistration', {content_name: document.querySelector('#rName').value});
        registrationModal.style.display = "none";
     } else {
         Swal.fire({
            icon: 'error',
            title: '형식이 올바르지 않습니다!',
            confirmButtonText: '확인',
        });
     }
     
 }
)

contactsubmit.addEventListener('click',
 async function(event) {

     event.preventDefault()

     let contactForm = document.querySelector('.contactModal form')

     let agree = document.querySelector('#cAgree').checked;
     if(!agree){
         Swal.fire({
            icon: 'warning',
            title: '개인정보 수집•이용 및 광고성 정보 수신 동의가 필요합니다!',
            confirmButtonText: '확인',
        });
         return;
     }

     let input = document.querySelector('#cAddress').value;

     if(!(number_check(input) || email_check(input))){
         Swal.fire({
            icon: 'error',
            title: '형식이 올바르지 않습니다!',
            confirmButtonText: '확인',
        });
         return;
     }

     let result = await fetch('/contact',
         {
             headers:
                 {
                     'X-CSRFToken': csrftoken,

                     'Accept': 'application/json, text/plain, *//**'
                 },
             mode: 'same-origin', method: 'POST', body: new FormData(contactForm)
         })
     if (result.status === 200) {
        Swal.fire({
            icon: 'success',
            title: '정상적으로 등록되었습니다!',
            confirmButtonText: '확인',
        });
        fbq('track', 'Contact', {content_name: document.querySelector('#cName').value});
        contactModal.style.display = "none";
     } else {
         Swal.fire({
            icon: 'error',
            title: '형식이 올바르지 않습니다!',
            confirmButtonText: '확인',
        });
     }

 }
)

function number_check(input) {
    var regPhone = /^010([0-9]{4})([0-9]{4})$/;
    return regPhone.test(input);
}

function email_check(input){
    var regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return (input.match(regEmail) != null);
}