// get dom
const sideNav = document.querySelector('.sidenav-mainbody');
const openBtnDiv = document.querySelector('.open-btn');
const openBtnP = document.getElementById('js-open-btn');

// flag just in case
let sideNavOpen = false
openBtnDiv.addEventListener('click', () => {
  sideNavOpen = true

  if (sideNavOpen = true) {
    gsap.to(sideNav, {
      width: 150,
      opacity: 1
    })
    gsap.to(openBtnDiv, {
      left: 110
    })
  }

 // add a class with transition instead of using gsap, but maybe search for more options.
})