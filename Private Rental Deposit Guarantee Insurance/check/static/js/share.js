// Web Share API 참고 : https://wormwlrm.github.io/2020/05/09/Web-Share-API.html
// Copy Clipboard 참고 : https://velog.io/@godori/js-clipboard-copy
// Toast Popup 참고: https://wooncloud.tistory.com/14

function button_share(){
    if(navigator.share){
        navigator.share({
            url: '',
        })
    } else{
        var tempElem = document.createElement('textarea');
        tempElem.value = 'greatzipsa.com';
        document.body.appendChild(tempElem);
        tempElem.select();
        document.execCommand("copy");
        document.body.removeChild(tempElem);

        toastr.options = {
          "closeButton": true,
          "debug": false,
          "newestOnTop": false,
          "progressBar": true,
          "positionClass": "toast-bottom-center",
          "preventDuplicates": true,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "1000",
          "timeOut": "5000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        }
        toastr["success"](" ", "URL이 복사되었습니다.");
    }
}

$('.icon_close').click(function(e){
    $('.button_share_tooltip, .icon_close, .button_share_container > p').css('display', 'none');
})