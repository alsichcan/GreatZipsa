// 참고: https://developers.kakao.com/docs/latest/ko/kakaotalk-channel/js

Kakao.init('e6a7864166c8d642003658e95ed0c0bf');

function button_ask(){
    Kakao.Channel.chat({ channelPublicId: '_wxixcJb' });
    fbq('track', 'Contact');
}