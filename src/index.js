import './scss/fonts.scss';
import './scss/jquery.fancybox.min.css';
import '../node_modules/normalize.css';
import './scss/style.scss';
import './jquery.fancybox.min.js';

let items = document.querySelectorAll('.item');
let slides = document.querySelectorAll('.slide');
let points = document.querySelectorAll('.num-of-slide');
let description = document.querySelectorAll('.img-description');
let pointsReviews = document.querySelectorAll('.num-of-slide-reviews');
let currentItem = 0;
let isEnable = true;

function changeCurrentItem(n) {
    currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
    isEnable = false;
    items[currentItem].classList.add(direction);
    slides[currentItem].classList.add(direction);
    description[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend',function() {
        this.classList.remove('active', direction);
    });
    description[currentItem].addEventListener('animationend',function() {
        this.classList.remove('activeVisible', direction);
    });
    slides[currentItem].addEventListener('animationend',function() {
        this.classList.remove('active', direction);
    });
   points[currentItem].classList.remove('activeNum');
   pointsReviews[currentItem].classList.remove('activeImg');
}

function showItem(direction) {
    items[currentItem].classList.add('next', direction);
    slides[currentItem].classList.add('next', direction);
    description[currentItem].classList.add('nextName', direction);
    items[currentItem].addEventListener('animationend',function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnable = true;
    });
    description[currentItem].addEventListener('animationend',function() {
        this.classList.remove('nextName', direction);
        this.classList.add('activeVisible');
        isEnable = true;
    });
    slides[currentItem].addEventListener('animationend',function() {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnable = true;
    });
    points[currentItem].classList.add('activeNum');
    pointsReviews[currentItem].classList.add('activeImg');
}

function previousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
}

function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
}

document.querySelector('.control.left').addEventListener('click', function() {
    if(isEnable){
        previousItem(currentItem);
    }
});
document.querySelector('.controlLeft').addEventListener('click', function() {
    if(isEnable){
        previousItem(currentItem);
    }
    document.querySelector('.controlLeft').classList.add('blueColor');
    document.querySelector('.controlRight').classList.remove('blueColor');
});

document.querySelector('.control.right').addEventListener('click', function() {
    if(isEnable){
        nextItem(currentItem);
    }
});
document.querySelector('.controlRight').addEventListener('click', function() {
    if(isEnable){
        nextItem(currentItem);
    }
    document.querySelector('.controlLeft').classList.remove('blueColor');
    document.querySelector('.controlRight').classList.add('blueColor');
});

const swipeDetect = (elem) => {
    let surface = elem;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;

    let startTime = 0;
    let elapsedTime = 0;

    let threshord = 150;
    let restraint = 100;
    let allowedTime = 300;

    surface.addEventListener('mousedown', function(e){
        startX = e.pageX;
        startY = e.pageY;
        startTime = new Date().getTime();
        e.preventDefault();

    });
    surface.addEventListener('mouseup', function(e){
        distX = e.pageX - startX;
        distY = e.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        
        if(elapsedTime <= allowedTime) {
            if(Math.abs(distX) > threshord && Math.abs(distY) < restraint) {
                if(distX > 0){
                    if(isEnable){
                        previousItem(currentItem);
                    }
                }
                else{
                    if(isEnable){
                        nextItem(currentItem);
                    }
                }
            }
        }

        e.preventDefault();
    });
}

let elem = document.querySelector('.slider');
swipeDetect(elem);
let slid = document.querySelector('.slider-reviews');
swipeDetect(slid);

function openClose(firstSelector, secondSelector, thirdSelector, fourSelector){
    document.getElementById(firstSelector).addEventListener('click', function() {
        document.querySelector(secondSelector).style.display = 'none';
        document.querySelector(thirdSelector).style.display = 'block';
    });
    document.getElementById(fourSelector).addEventListener('click', function() {
        document.querySelector(secondSelector).style.display = 'block';
        document.querySelector(thirdSelector).style.display = 'none';
    });
}
openClose('open_first','.first-part__of-design','.first_more','close_first');
openClose('open_second','.second-part__of-design','.second_more','close_second');
openClose('open_third','.third-part__of-design','.third_more','close_third');
openClose('open_four','.four-part__of-design','.four_more','close_four');
openClose('open_five','.five-part__of-design','.five_more','close_five');
openClose('open_six','.six-part__of-design','.six_more','close_six');