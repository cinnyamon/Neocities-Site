// get dom
const sideNav = document.querySelector('.sidenav-mainbody');
const openBtnDiv = document.querySelector('.open-btn');
const openBtnP = document.getElementById('js-open-btn');
const background = document.getElementById('bg');
const header = document.querySelector('.header');
const pawButtons = document.querySelector('.paw-buttons');
const bgHeaderArray = [background, header, pawButtons];


// flag
let sideNavOpen = false;

// media query
let wMM = window.matchMedia('(max-width: 600px)');

// gsap registering
let tl = gsap.timeline({
  paused: true,
  onReverseComplete: () => {
    gsap.set(openBtnDiv, {clearProps: 'all'})
  }
});

// set timeline animations
tl.to(sideNav, {
    x: -200,
    opacity: 1
  }, "<");

tl.to(openBtnDiv, {
    x: () => {
      if (wMM.matches) {
        return -80
      } else {
        return -110 
      }
    },
  }, "<");

tl.to([background, header, pawButtons], {
    filter: 'blur(5px)'
  }, "<");

openBtnDiv.addEventListener('click', () => {
  !sideNavOpen ? openSideNav() : closeSideNav() 
})

const openSideNav = () => {
  sideNavOpen = true;
  tl.invalidate().restart();
}

const closeSideNav = () => {
  sideNavOpen = false;
  tl.reverse();
}

// loop thru the dom elements to add event listeners
bgHeaderArray.forEach((dom) => {
  dom.addEventListener('click', () => {
    sideNavOpen = false;
    tl.reverse();
  });
});


// this has got to be the worst javascript code ive ever written in my entire chud life. i dont know why i struggled so much with this i am going to kill myself.