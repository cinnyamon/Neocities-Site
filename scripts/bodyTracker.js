// get DOM element
const mainEl = document.getElementById('gsapcursor');
const images = document.querySelectorAll('.crsr');
const dotMask = document.querySelector('.dot-mask');


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

imagesLoaded().then(() => {

  mainEl.addEventListener('mousemove', (event) => handleMouseEvents(event, true));
  mainEl.addEventListener('mouseenter', (event) => handleMouseEvents(event, true));
  mainEl.addEventListener('mouseleave', (event) => handleMouseEvents(event, false));


  // handle touch input
  mainEl.addEventListener('touchmove', (event) => handleTouchEvents(event, true));
  mainEl.addEventListener('touchstart', (event) => handleTouchEvents(event, true));
  mainEl.addEventListener('touchend', (event) => handleTouchEvents(event, false));
  

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
  })
  
  document.addEventListener('click', () => {
    if (isContextMenuOpen > 0) {
      isContextMenuOpen = 0;

      gsap.to("#cursor-follow > span", {
        opacity: 0
      });
    }
  })  
});

// const handleAllEvents = (event, mouseMove, isHolding) => {
//   if (event.type === 'mousemove') {
//     handleMouseEvents(event, mouseMove);
//   } else if (event.type === 'touchmove') {
//     handleTouchEvents(event, isHolding);
//   }
// }


const handleMouseEvents = (event, mouseMove) => {
  mouseTrail(event, mouseMove);
  mouseBackgroundTrail(event,mouseMove);
}

const mouseTrail = (event, mouseMove) => {
  if (mouseMove) {
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
  } else {
    // opacity 0 on all viewport leave events
    gsap.to("#cursor-follow > span", {
      duration: 0.3,
      opacity: 0
    })
  }
  
}

const mouseBackgroundTrail = (event, mouseMove) => {
  if (mouseMove) {
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
  } else {
    gsap.to(dotMask, {
      duration: 0.6,
      opacity: 0
    })
  }
}



const handleTouchEvents = (event, isHolding) => {
  touchTrail(event, isHolding);
  touchBackgroundTrail(event, isHolding);
}

const touchTrail = (event, isHolding) => {
  if (isHolding) {
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
  } else {
    // opacity 0 on all viewport leave events
    gsap.to("#cursor-follow > span", {
      duration: 0.3,
      opacity: 0
    })
  }
}

const touchBackgroundTrail = (event, isHolding) => {
  if (isHolding) {
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
  } else {
    gsap.to(dotMask, {
      duration: 0.6,
      opacity: 0
    })
  }
}







// dumbass code ive written, leaving here for future references



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

