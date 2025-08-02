// gsap registering
let tl = gsap.timeline({
  paused: true,
  onReverseComplete: () => {
    gsap.set(openBtnDiv, {clearProps: 'all'})
  }
})
// get dom
const sideNav = document.querySelector('.sidenav-mainbody');
const openBtnDiv = document.querySelector('.open-btn');
const openBtnP = document.getElementById('js-open-btn');
const background = document.getElementById('bg');
const header = document.querySelector('.header');

// flag
let sideNavOpen = false;
let mediaQuery = {
  minW451: window.matchMedia("(min-width: 451px)"),
  maxW450: window.matchMedia("(max-width: 450px)"),
  maxW300: window.matchMedia("(max-width: 300px)")
}

openBtnDiv.addEventListener('click', () => {
  !sideNavOpen ? openSideNav() : closeSideNav() 
})

tl.to(openBtnDiv, {
      right: 160
    });

const openSideNav = () => {
  sideNavOpen = true;
  tl.play()

  // if (mediaQuery.minW451.matches) {
  //   gsap.fromTo(sideNav, {
  //     width: 0,
  //     opacity: 0
  //   }, {
  //     width: 200,
  //     opacity: 1
  //   });

  //   gsap.fromTo(openBtnDiv, {
  //     right: 30
  //   }, {
  //     right: 160
  //   });

  //   gsap.fromTo([header, background], {
  //     filter: 'blur(0px)'
  //   }, {
  //     filter: 'blur(5px)'
  //   })
  // } else if (mediaQuery.maxW450.matches) {
  //   gsap.fromTo(sideNav, {
  //     width: 0,
  //     opacity: 0
  //   }, {
  //     width: 180,
  //     opacity: 1
  //   });

  //   gsap.fromTo(openBtnDiv, {
  //     right: 25
  //   }, {
  //     right: 140
  //   });

  //   gsap.fromTo([header, background], {
  //     filter: 'blur(0px)'
  //   }, {
  //     filter: 'blur(5px)'
  //   })
  // } else if (mediaQuery.maxW300.matches) {
  //   gsap.fromTo(sideNav, {
  //     width: 0,
  //     opacity: 0
  //   }, {
  //     width: 150,
  //     opacity: 1
  //   });

  //   gsap.fromTo(openBtnDiv, {
  //     right: 20
  //   }, {
  //     right: 110
  //   });

  //   gsap.fromTo([header, background], {
  //     filter: 'blur(0px)'
  //   }, {
  //     filter: 'blur(5px)'
  //   })
  // }
}

const closeSideNav = () => {
  sideNavOpen = false;
  tl.reverse()
}

// trying out timelines in gsap
// timeline.to(sideNav, {
//   width: 200,
//   opacity: 1
// }, '<');

// timeline.to(openBtnDiv, {
//   right: 155
// }, '<');

// timeline.to(header, {
//   filter: 'blur(5px)'
// }, '<');






// loop thru the dom elements to add event listeners
const bgHeaderArray = [background, header];
bgHeaderArray.forEach((dom) => {
  dom.addEventListener('click', () => {

  });
});

