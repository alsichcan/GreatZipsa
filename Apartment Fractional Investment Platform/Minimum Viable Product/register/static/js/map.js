let container=document.querySelector('.apt-info-map-display')
console.log(container)
var options = { //지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(
       37.507593627369744,127.01319324046412), //지도의 중심좌표.
	level: 3 //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
marker=new kakao.maps.marker({
	position: new kakao.maps.LatLng(37.507593627369744,127.01319324046412)
})
marker.setMap(map)