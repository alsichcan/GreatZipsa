// 참고 : https://blog.leehov.in/39
// 참고 : https://androphil.tistory.com/523

setScreenSize();
window.addEventListener('resize', () => setScreenSize());

function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}