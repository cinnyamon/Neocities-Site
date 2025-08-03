// get dom
const sideNav = document.querySelector('.sidenav-mainbody');
const openBtnDiv = document.querySelector('.open-btn');
const openBtnP = document.getElementById('js-open-btn');
const background = document.getElementById('bg');
const header = document.querySelector('.header');
const bgHeaderArray = [background, header];

// flag
let sideNavOpen = false;

// gsap registering
let tl = gsap.timeline({
  paused: true,
  onReverseComplete: () => {
    gsap.set(openBtnDiv, {clearProps: 'all'})
  }
});

tl.to(sideNav, {
    x: -200,
    opacity: 1
  }, "<");

tl.to(openBtnDiv, {
    x: -90
  }, "<");

tl.to([header, background], {
    filter: 'blur(5px)'
  }, "<");

openBtnDiv.addEventListener('click', () => {
  !sideNavOpen ? openSideNav() : closeSideNav() 
})

const openSideNav = () => {
  sideNavOpen = true;
  tl.play();
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
    
    console.log(window.getComputedStyle(sideNav).getPropertyValue('width'))
  });
});
