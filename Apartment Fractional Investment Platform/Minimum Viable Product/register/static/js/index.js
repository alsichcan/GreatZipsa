$(document).ready(function(){ 
    FadeAnimation();
    FontAnimation();
})

async function FadeAnimation() {
    await fade_slider('#eclipse_1, #main_photo_animation_one');
    await fade_slider('#eclipse_2, #main_photo_animation_two');
    await fade_slider('#eclipse_3, #main_photo_animation_three');
    await fade_slider('#eclipse_4, #main_photo_animation_four');
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


$(document).on('click', '.scroll_up' ,function(e) {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  })

$('.sales_cta').click(function(e){
    window.location.href='/sales'
})

$('.hero .hero_button').click(function(e){
    registerModal_show();
})
$('#footer_button').click(function(e){
    registerModal_show();
})
$('.menu').click(function(e){
    contactModal_show()
})
