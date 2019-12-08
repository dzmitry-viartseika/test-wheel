var wheel = document.querySelector('.wheel__wheel');
var wheelBtn = document.querySelector('.wheel__btn');
var winBs = document.querySelectorAll('.win-block__bs');
var popup = document.querySelector('.popup');
var popupBtn = document.querySelector('.popup__btn');
var sectorN = 5;
var sectorDeg = 360/sectorN;
var spins = 0;
var ndeg = 0;
var casinoUrl = 'https://github.com/wertey';

function getCurrentRotation(el){
  var st = window.getComputedStyle(el, null);
    var tm = st.getPropertyValue("-webkit-transform") ||
           st.getPropertyValue("-moz-transform") ||
           st.getPropertyValue("-ms-transform") ||
           st.getPropertyValue("-o-transform") ||
           st.getPropertyValue("transform") ||
           "none";
  if (tm != "none") {
    var values = tm.split('(')[1].split(')')[0].split(',');
    var angle = Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
    return (angle < 0 ? angle + 360 : angle); //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
  }
  return 0;
}

function rotateWheel(n) {
    wheelBtn.removeEventListener("click", readyWheel);
    wheelBtn.classList.add('wheel__btn-hold');
    var rotateN = 3;
    var curdeg = getCurrentRotation(wheel);
    ndeg -= curdeg + 360*rotateN + sectorDeg*n;
    console.log('ndeg')
    console.log(ndeg)


    wheel.style.transform = 'rotate(' + ndeg + 'deg)';
    setTimeout(function() {
        winBs[spins-1].style.opacity = '1';
        winBs[spins-1].style.animation = 'newbs .3s ease-out 2 alternate';
        wheelBtn.addEventListener("click", readyWheel);
        wheelBtn.classList.remove('wheel__btn-hold');
    }, 3000);
    if (spins>=rotateN-1) {
        setTimeout(function() {
            popup.style.display = 'flex';
        }, 3500);
    }
    spins +=1;
}

function readyWheel() {
    switch (spins) {
        case 0:
            rotateWheel(1);
            break;
        case 1:
            rotateWheel(2);
            break;
        case 2:
            rotateWheel(5);
            break;
    }
}

function getUtm() {
    var utm;
    if (window.location.search === '') {
        utm = '?';
    } else {
        utm = window.location.search + '&';
    }
    var reurl = casinoUrl + '?' + utm.slice(1) + '#open=reg';
    location.href = reurl;
}

wheelBtn.addEventListener("click", readyWheel);
popupBtn.addEventListener("click", getUtm, false);
