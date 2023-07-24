let registerSlide1=document.querySelector('.registration-calc-input input')
let registerTextInput=document.querySelector('#registration-calc-input-text')
$('#footer_button').click(function(e){
   registerModal_show()
})
$('.menu img').click(function(e){
    window.location.href='/'
})
registerSlide1.addEventListener('input',function(event){
    let num=event.target.value;
    let a1=document.querySelector('.registration-calc-in')
      let a2=document.querySelector('.registration-calc-out')
    registerTextInput.value=num;
    a1.textContent=`${Number(num).toLocaleString('en')}원 출자 시`
    a2.textContent=`${(num/20000000).toFixed(3)}%/${Math.floor(num/1000).toLocaleString('en')}좌`
})
registerTextInput.addEventListener('input',function(event){
    let num=event.target.value;
    let a1=document.querySelector('.registration-calc-in')
      let a2=document.querySelector('.registration-calc-out')
    registerSlide1.value=num;
    a1.textContent=`${Number(num).toLocaleString('en')}원 출자 시`
    a2.textContent=`${(num/20000000).toFixed(3)}%/${Math.floor(num/1000).toLocaleString('en')}좌`
})

$(document).ready(function(){
    FadeAnimation();
    FontAnimation();
})
$('.registration-cta').on('click',function(e){registerModal_show()})
async function FadeAnimation() {
    await fade_slider('#eclipse_1_2, #main_photo_animation_one');
    await fade_slider('#eclipse_2_2, #main_photo_animation_two');
    await fade_slider('#eclipse_3_2, #main_photo_animation_three');
    await fade_slider('#eclipse_4_2, #main_photo_animation_four');
    FadeAnimation();
}

async function FontAnimation() {
    await weight_changer('.word_1');
    await weight_changer('.word_2');
    await weight_changer('.word_3');
    await weight_changer('.word_4');
    FontAnimation();
}

function fade_slider(a) {
  return new Promise((resolve, reject) => {
      $(a).fadeIn(2000, () => {
          $(a).fadeOut(2000, () => {
              resolve();
          });
      });
  })
}

function weight_changer(a) {
    return $(a).animate({'font-weight':'700'}, 2000).animate({'font-weight':'200'}, 2000).promise();
}

/*
$( document ).ready(function() {
    $.get('../static/csv/data.csv', function(csv) {
        $('#container').highcharts({
            chart: {
                type: 'line'
            },
            data: {
                csv: csv
            },
            title: {
                text: '실거래가격 평균',
                align: 'center',
            },
            xAxis: {
                allowDecimals: false,
                tickInterval: 1,
                width: '100%',
            },
            yAxis: {
                title: {
                    text: '단위(억원)'
                },
                gridLineColor: '#fff'
            },
            plotOptions: {
                series: {
                    shadow: true,
                    marker: {
                        enabled: false
                    },
                    lineWidth: 5
                }
            },
        });
    });
});*/

$(function () {
    $.get('../static/csv/data.csv', function (csv) {
        $('#container').highcharts({
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: '반포 자이 35평 실거래가격 평균'
            },

            data: {
                csv: csv
            },

            yAxis: [{ // Primary yAxis
                title: {
                text:'평균매매가'
                },
                min: 10,
                max: 40,
                tickInterval: 2.5,
                gridLineColor: '#fff',
                labels: {
                    formatter: function () {
                        return this.value;
                }
    }
            }, { // Secondary yAxis
                title: {
                    text: '거래량',
                },
                min: 0,
                max: 300,
                tickInterval: 15,
                opposite: true,
                gridLineColor: '#fff',
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            }],

            plotOptions: {
                series: {
                    shadow: true,
                    marker: {
                        enabled: false
                    },
                    lineWidth: 3
                }
            },

            series: [{yAxis: 0, zIndex:2},{yAxis: 1, type: 'column', zIndex:1}]

        });
    });
});

$(document).on('click', '.scroll_up' ,function(e) {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  })