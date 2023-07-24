let work_slideIndex = 1;
showWorkSlides(work_slideIndex);

// Next/previous controls
function plusWorkSlides(n) {
  showWorkSlides(work_slideIndex += n);
}

// Thumbnail image controls
function currentWorkSlide(n) {
  showWorkSlides(work_slideIndex = n);
}

function showWorkSlides(n) {
  let i;
  let slides = document.getElementsByClassName("work_gallery_image");
  if (n > slides.length) {work_slideIndex = 1}
  if (n < 1) {work_slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[work_slideIndex-1].style.display = "block";
}