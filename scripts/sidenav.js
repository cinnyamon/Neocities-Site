// gsap registering
let timeline = gsap.timeline({paused: true});

// get dom
const sideNav = document.querySelector('.sidenav-mainbody');
const openBtnDiv = document.querySelector('.open-btn');
const openBtnP = document.getElementById('js-open-btn');
const background = document.getElementById('bg');
const header = document.querySelector('.header');

// flag
let sideNavOpen = false

// trying out timelines in gsap
timeline.to(sideNav, {
  width: 180,
  opacity: 1
}, '<');

timeline.to(openBtnDiv, {
  x: 90
}, '<');

timeline.to(header, {
  filter: 'blur(5px)'
}, '<');



const openSideNav = () => {
  timeline.play();
  gsap.to(background, {
    filter: 'blur(5px)'
  });
  sideNavOpen = true;
}

const closeSideNav = () => {
  timeline.reverse();
  gsap.to(background, {
    filter: 'blur(0px)'
  });
  sideNavOpen = false;
}

openBtnDiv.addEventListener('click', () => {
  sideNavOpen ? closeSideNav() : openSideNav()
})

// loop thru the dom elements to add event listeners
const bgHeaderArray = [background, header];
bgHeaderArray.forEach((dom) => {
  dom.addEventListener('click', () => {
    closeSideNav();
  });
});

