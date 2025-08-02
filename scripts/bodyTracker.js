// get DOM element
const mainEl = document.getElementById('gsapcursor');
const images = document.querySelectorAll('.crsr');
const dotMask = document.querySelector('.dot-mask');

// dom for sidenav button functionality
const navButtons = document.querySelectorAll('.nav-button');

// running a promise in order to let the dom load all the images for the cursor trail and then run the trail gsap code.
const imagesLoaded = () => {
  return new Promise((resolve) => {
    let loadedCount = 0;
    const totalImages = images.length;

    images.forEach((image) => {
      if (image.complete) {
        loadedCount++;
      } else {
        image.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            resolve();
          }
        };
      }
    });
    
    if (loadedCount === totalImages) {
      resolve();
    }
  });
};

let mouseTrailBtnPressed = JSON.parse(localStorage.getItem('mousetrail')) || false;
let bgTrailBtnPressed = JSON.parse(localStorage.getItem('bgtrail')) || false;
imagesLoaded().then(() => {

  navButtons.forEach((button) => {
    const trailId = button.dataset.trailId;
    
    if (trailId === 'mouse-trail') {
      if (JSON.parse(localStorage.getItem('mousetrail')) === true) {
        button.textContent = 'OFF'
      } else {
        button.textContent = 'ON'
      }
    } else if (trailId === 'bg-trail') {
      if (JSON.parse(localStorage.getItem('bgtrail')) === true) {
        button.textContent = 'OFF'
      } else {
        button.textContent = 'ON'
      }
    }

    button.addEventListener('click', () => {
      
      if (trailId === 'mouse-trail') {
        mouseTrailBtnPressed = !mouseTrailBtnPressed;
        localStorage.setItem('mousetrail', mouseTrailBtnPressed);
        
        if (mouseTrailBtnPressed) {
          button.textContent = 'OFF'
        } else {
          button.textContent = 'ON'
        }
        return mouseTrailBtnPressed;

      } else if (trailId === 'bg-trail') {
        bgTrailBtnPressed = !bgTrailBtnPressed;
        localStorage.setItem('bgtrail', mouseTrailBtnPressed);

        if (bgTrailBtnPressed) {
          button.textContent = 'OFF'
        } else {
          button.textContent = 'ON'
        }
        return bgTrailBtnPressed;
      };
    });
  });
  
  // handle mouse input
  mainEl.addEventListener('mousemove', (event) => handleMouseEvents(event, true, mouseTrailBtnPressed, bgTrailBtnPressed));
  mainEl.addEventListener('mouseenter', (event) => handleMouseEvents(event, true, mouseTrailBtnPressed,bgTrailBtnPressed));
  mainEl.addEventListener('mouseleave', (event) => handleMouseEvents(event, false, mouseTrailBtnPressed, bgTrailBtnPressed));


  // handle touch input
  mainEl.addEventListener('touchmove', (event) => handleTouchEvents(event, true, mouseTrailBtnPressed, bgTrailBtnPressed));
  mainEl.addEventListener('touchstart', (event) => handleTouchEvents(event, true, mouseTrailBtnPressed, bgTrailBtnPressed));
  mainEl.addEventListener('touchend', (event) => handleTouchEvents(event, false, mouseTrailBtnPressed, bgTrailBtnPressed));
  

  // right click events
  isContextMenuOpen = 0;
  document.addEventListener('contextmenu', (event) => {
    isContextMenuOpen++
    // event.preventDefault(); // change this when done
    gsap.to("#cursor-follow > span", {
      duration: 0.6,
      rotation: 90,
      ease: "power2.out"
    });
  });
  
  document.addEventListener('click', () => {
    if (isContextMenuOpen > 0) {
      isContextMenuOpen = 0;

      gsap.to("#cursor-follow > span", {
        opacity: 0
      });
    }

    gsap.to("#cursor-follow > span", {
        rotation: '10deg',
      });
  });

  // random click animation
});


const handleMouseEvents = (event, mouseMove, mouseTrailBtnPressed, bgTrailBtnPressed) => {
  mouseTrail(event, mouseMove, mouseTrailBtnPressed);
  mouseBackgroundTrail(event,mouseMove, bgTrailBtnPressed);

  // console.log('mousetrail:',mouseTrailBtnPressed, 'bgtrail:', bgTrailBtnPressed)
}

const mouseTrail = (event, mouseMove, mouseTrailBtnPressed) => {
  if (mouseMove && !mouseTrailBtnPressed) {
    const x = event.clientX + 15,
        y = event.clientY -6;
    // opacity 1 on all viewport leave events
    // lag cursor behind mouse
    gsap.to("#cursor-follow > span", {
      duration: (i) => 0.1 + i/10, // each span is called i and for each one we do: first span = 0 therefore i = 0 => 0.1 + 0/10 = 0.1 + 0 next is 1 which is 0.1 + 1/10 = 0.1 + 0.1 and so on
      scale: (i) => 3 - i / 10,
      x,
      y
    });
    gsap.to("#cursor-follow > span", {
      rotation: 0,
      duration: 0.8
    });
    gsap.to("#cursor-follow > span", {
      duration: 0.3,
      opacity: 1
    })
  } else if (!mouseMove) {
    // opacity 0 on all viewport leave events
    gsap.to("#cursor-follow > span", {
      duration: 0.3,
      opacity: 0
    })
  } else if (mouseTrailBtnPressed) {
    gsap.to("#cursor-follow > span", {
      duration: 0,
      opacity: 0,
    })
  }
  
}

const mouseBackgroundTrail = (event, mouseMove, bgTrailBtnPressed) => {
  if (mouseMove === true && bgTrailBtnPressed === false) {
    const x = event.pageX -10,
        y = event.pageY -10;

    // animate bg mask on mousemove
    gsap.to(dotMask, {
      ease: "power3.out",
      onUpdate() {
        const maskGradient = `radial-gradient(ellipse 200px 200px at ${x}px ${y}px, rgb(0, 0, 0) 10%, transparent 100%)`;
        dotMask.style.maskImage = maskGradient
        dotMask.style.webkitMaskImage = maskGradient
      }
    });
    //animate bg mask opacity
    gsap.to(dotMask, {
      duration: 0.6,
      opacity: 1
    })
  } else if (mouseMove === false) {
    gsap.to(dotMask, {
      duration: 0.6,
      opacity: 0
    })
  } else if (bgTrailBtnPressed === true) {
    gsap.to(dotMask, {
      duration: 0,
      opacity: 0
    })
  }
}



const handleTouchEvents = (event, isHolding, mouseTrailBtnPressed, bgTrailBtnPressed) => {
  touchTrail(event, isHolding, mouseTrailBtnPressed);
  touchBackgroundTrail(event, isHolding, bgTrailBtnPressed);
}

const touchTrail = (event, isHolding, mouseTrailBtnPressed) => {
  if (isHolding && !mouseTrailBtnPressed) {
    const x = event.targetTouches[0].clientX + 15,
        y = event.targetTouches[0].clientY -6;
    // opacity 1 on all viewport leave events
    // lag cursor behind mouse
    gsap.to("#cursor-follow > span", {
      duration: (i) => 0.1 + i/10, // each span is called i and for each one we do: first span = 0 therefore i = 0 => 0.1 + 0/10 = 0.1 + 0 next is 1 which is 0.1 + 1/10 = 0.1 + 0.1 and so on
      scale: (i) => 3 - i / 10,
      x,
      y
    });
    gsap.to("#cursor-follow > span", {
      rotation: 0,
      duration: 0.8
    });
    gsap.to("#cursor-follow > span", {
      duration: 0.3,
      opacity: 1
    })
    
    setTimeout(() => {
      gsap.to("#cursor-follow > span", {
        duration: 0.3,
        opacity: 0
      })
    }, 100);
  } else if (!isHolding) {
    // opacity 0 on all viewport leave events
    gsap.to("#cursor-follow > span", {
      duration: 0.3,
      opacity: 0
    })
  } else if (mouseTrailBtnPressed) {
    // opacity 0 on all viewport leave events
    gsap.to("#cursor-follow > span", {
      duration: 0,
      opacity: 0
    })
  }
}

const touchBackgroundTrail = (event, isHolding, bgTrailBtnPressed) => {
  if (isHolding && !bgTrailBtnPressed) {
    const x = event.targetTouches[0].pageX -10,
        y = event.targetTouches[0].pageY -10;

    // animate bg mask on mousemove
    gsap.to(dotMask, {
      ease: "power3.out",
      onUpdate() {
        const maskGradient = `radial-gradient(ellipse 200px 200px at ${x}px ${y}px, rgb(0, 0, 0) 10%, transparent 100%)`;
        dotMask.style.maskImage = maskGradient
        dotMask.style.webkitMaskImage = maskGradient
      }
    });
    //animate bg mask opacity
    gsap.to(dotMask, {
      duration: 0.6,
      opacity: 1
    })
  } else if (!isHolding) {
    gsap.to(dotMask, {
      duration: 0.6,
      opacity: 0
    })
  } else if (bgTrailBtnPressed) {
    gsap.to(dotMask, {
      duration: 0,
      opacity: 0
    })
  }
}






// dumbass code ive written, leaving here for future references


// spaghetti code for the buttonpressed flags

// if (trailId === 'mouse-trail') {
//   if (!mouseTrailBtnPressed) {
//     return mouseTrailBtnPressed = true;
//   } else if (mouseTrailBtnPressed) {
//     return mouseTrailBtnPressed = false;
//   }
//   return mouseTrailBtnPressed = false;

// } else if (trailId === 'bg-trail') {
//   if (!bgTrailBtnPressed) {
//     return bgTrailBtnPressed = true
//   } else if (bgTrailBtnPressed) {
//     return bgTrailBtnPressed = false;
//   }
//   return bgTrailBtnPressed = false;
// }


// imagesLoaded().then(() => {
// mainEl.addEventListener("pointerdown", event => {
    //   mainEl.setPointerCapture(event.pointerId);
    //   userMove = true;
    //   handleTrail(event, userMove);
    //   console.log('pointer down, capturing pointer');
    // });

    // mainEl.addEventListener("pointermove", event => {
    //   userMove = true;
    //   handleTrail(event, userMove);
    // });

    // mainEl.addEventListener("pointerup", event => {
    //   mainEl.releasePointerCapture(event.pointerId);
    //   userMove = false;
    //   handleTrail(event, userMove);
    //   console.log('pointer up, released pointer capture');
    // });

    // mainEl.addEventListener("pointerleave", event => {
    //   userMove = false;
    //   handleTrail(event, userMove);
    //   console.log('pointer left element');
    // });

    // mainEl.addEventListener('pointermove', event => {
    //   switch (true) {
    //     case (event.pointerType === 'mousemove'):
    //       mouseMove = true;
    //       handleMouseEvents(event, mouseMove);
    //       break;
    //     case (event.pointerType === 'touchmove'):
    //       isHolding = true;
    //       handleTouchEvents(event, isHolding);
    //       break;
    //   }
    // })

    // mainEl.addEventListener('pointerenter', event => {
    //   switch (true) {
    //     case (event.pointerType === 'mouseenter'):
    //       mouseMove = true;
    //       handleMouseEvents(event, mouseMove);
    //       break;
    //     case (event.pointerType === 'touchstart'):
    //       isHolding = true;
    //       handleTouchEvents(event, isHolding);
    //       break;
    //   }
    //   // this is not possible to do with pointerenter because on touch screen devices there is no concept of hover therefore this wont trigger unless i add a pointerdown or touchstart fallback.
    // })

    // mainEl ...
// });



// function backgroundTrail(event, userMove, opacity) {
//   if (userMove){
//     const x = event.pageX - 15,
//       y = event.pageY - 10;

//     // animate bg mask on mousemove
//     gsap.to(dotMask, {
//       ease: "power3.out",
//       opacity: 1,
//       onUpdate() {
//         const maskGradient = `radial-gradient(ellipse 200px 200px at ${x}px ${y}px, rgb(0, 0, 0) 10%, transparent 100%)`;
//         dotMask.style.maskImage = maskGradient
//         dotMask.style.webkitMaskImage = maskGradient
//       }
//     });
//   } else {
//     const touch = event.targetTouches[0];
//     const x = touch.pageX - 15,
//       y = touch.pageY - 10;

//     // animate bg mask on mousemove
//     gsap.to(dotMask, {
//       ease: "power3.out",
//       opacity: 1,
//       onUpdate() {
//         const maskGradient = `radial-gradient(ellipse 200px 200px at ${x}px ${y}px, rgb(0, 0, 0) 10%, transparent 100%)`;
//         dotMask.style.maskImage = maskGradient
//         dotMask.style.webkitMaskImage = maskGradient
//       }
//     });
//   }
// }



// function handleTrailOpacity(opacity) {
//   if (userMove) {
//     // gsap.killTweensOf(mainEl);
//     gsap.to("#cursor-follow > span", {
//       duration: 0.3,
//       opacity: opacity,
//       ease: "power2.out"
//     });
//   } else {
//     // gsap.killTweensOf(mainEl);
//     gsap.to("#cursor-follow > span", {
//       duration: 0.3,
//       opacity: opacity,
//       ease: "power2.out"
//     });

//     console.log(touching)
//   }
// }



// const handleTrail = (event, userMove) => {
//   if (event.type === 'mousemove' || event.type === 'mousestart') {
//     const x = event.clientX + 15,
//     y = event.clientY - 6;

//     moveXTrail(x, y, userMove);
//     backgroundTrail(event, userMove)

//   } else if (event.type === 'touchmove' || event.type === 'touchstart') {
//     const x = event.clientX + 15,
//     y = event.clientY - 6;

//     console.log(userMove)
//     moveXTrail(x, y, userMove);
//     backgroundTrail(event, userMove)
//   } else if (event.type === 'mouseleave' || event.type === 'touchend') {
//     const x = event.clientX + 15,
//     y = event.clientY - 6;
//     // opacity 0 on all viewport leave events
//     gsap.to("#cursor-follow > span", {
//       duration: (i) => 0.1 + i/10,
//       scale: (i) => 3 - i / 10,
//       x,
//       y
//     });
//     gsap.to("#cursor-follow > span", {
//       rotation: 0,
//       duration: 0.8
//     });
//     gsap.to("#cursor-follow > span", {
//       duration: 0.3,
//       opacity: 0
//     })
//   }
// }



// const moveXTrail = (x, y, userMove) => {
//     // opacity 1 on all viewport leave events
//     // lag cursor behind mouse
//     gsap.to("#cursor-follow > span", {
//       duration: (i) => 0.1 + i/10, // each span is called i and for each one we do: first span = 0 therefore i = 0 => 0.1 + 0/10 = 0.1 + 0 next is 1 which is 0.1 + 1/10 = 0.1 + 0.1 and so on
//       scale: (i) => 3 - i / 10,
//       x,
//       y
//     });
//     gsap.to("#cursor-follow > span", {
//       rotation: 0,
//       duration: 0.8
//     });
//     gsap.to("#cursor-follow > span", {
//       duration: 0.3,
//       opacity: 1
//     })
// }



// const backgroundTrail = (event, userMove) => {
//   const x = event.pageX - 10,
//     y = event.pageY - 10;

//   // const rect = dotMask.getBoundingClientRect();
//   // const x = event.pageX - (rect.left + window.scrollX) - 10;
//   // const y = event.pageY - (rect.top + window.scrollY) - 10;

//   if (userMove) {
//     // animate bg mask on mousemove
//     gsap.to(dotMask, {
//       ease: "power3.out",
//       onUpdate() {
//         const maskGradient = `radial-gradient(ellipse 200px 200px at ${x}px ${y}px, rgb(0, 0, 0) 10%, transparent 100%)`;
//         dotMask.style.maskImage = maskGradient
//         dotMask.style.webkitMaskImage = maskGradient
//       }
//     });
//     //animate bg mask opacity
//     gsap.to(dotMask, {
//       duration: 0.6,
//       opacity: 1
//     })
//   } else {
//     // animate bg mask on mousemove
//     gsap.to(dotMask, {
//       ease: "power3.out",
//       onUpdate() {
//         const maskGradient = `radial-gradient(ellipse 200px 200px at ${x}px ${y}px, rgb(0, 0, 0) 10%, transparent 100%)`;
//         dotMask.style.maskImage = maskGradient
//         dotMask.style.webkitMaskImage = maskGradient
//       }
//     });
//     //animate bg mask opacity
//     gsap.to(dotMask, {
//       duration: 0.6,
//       opacity: 0
//     })
//   }
  
  
  
  
  
//   /* const touch = event.targetTouches[0];
//   const x = touch.clientX + 15,
//     y = touch.clientY - 6;

//     // lag cursor behind mouse
//   gsap.to("#cursor-follow > span", {
//     duration: (i) => 0.1 + i/10, // each span is called i and for each one we do: first span = 0 therefore i = 0 => 0.1 + 0/10 = 0.1 + 0 next is 1 which is 0.1 + 1/10 = 0.1 + 0.1 and so on
//     scale: (i) => 3 - i / 10,
//     x,y,
//   });
    
//   gsap.to("#cursor-follow > span", {
//     rotation: 0,
//     duration: 0.8
//   }); */
// }




let now = new Date().getTime();
console.log(now)