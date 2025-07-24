const catHeaderDiv = document.querySelector('.cat-header');
const headpatNum = document.querySelector('.headpat-number');
let headpatsCounter = localStorage.getItem('counter') || 0;
const outerWrapper = document.querySelector('.outer_wrapper');


headpatNum.innerHTML = `Headpat Counter: [${headpatsCounter}]<img id="heart-icon" src="./icons/pixel-heart.svg">`;


function init() {

  // flags for the walking animation and the jumping animation
  let isJumping = false;
  let isWalking = true; 

  // getting dom content
  const headpatZone = document.querySelector('.headpat-zone');
  const pettingZone = document.querySelector('.petting-zone');
  const catWrapper = document.querySelector(".cat_wrapper");
  const wrapper = document.querySelector(".wrapper");
  const cat = document.querySelector(".cat");
  const head = document.querySelector(".cat_head");
  const legs = document.querySelectorAll(".leg");
  
  // setting default x and y positions
  const pos = {
    x: null,
    y: null,
  };
  // im using this for tracking the head and body
  // separate from the one above so that i can disable the movement within the petting zone
  const bodyPos = {
    x: null,
    y: null,
  }

  
  // this handles most of the logic by using the flag iswalking to set the x and y as the
  // client x and y or setting them back to null if the cat isnt walking. change stuff here 
  // if you need default actions for the cat, i.e. disable tail spin if iswalking is false
  const handleMouseMotion = (e) => {
    if (isJumping) {
      isJumping = false;
     } // re-enable jump when mouse moves inside

    if (!isMouseInWrapper(e)) return;

    // Always update bodyPos so the cat's body can turn towards the mouse
    bodyPos.x = e.clientX;
    bodyPos.y = e.clientY;

    if (isWalking) {
      pos.x = e.clientX;
      pos.y = e.clientY;
      walk();
    } else {
      pos.x = null;
      pos.y = null;
      legs.forEach((leg) => leg.classList.remove("walk"));
      stopCatJumpingAnim();
    }
  };

  // a simple walk function that i made into an if statement and wont bother changing 
  // back because shit works still
  const walk = () => {
    if (isWalking) {
      cat.classList.remove("first_pose");
      legs.forEach((leg) => leg.classList.add("walk"));
    } else {
      cat.classList.add("first_pose");
      legs.forEach((leg) => leg.classList.remove("walk"));
    }
  };

  // boundary zone around the kitten that stops it from moving when mouse moves inside. 
  // also tried with mouseenter however mouseenter only updates once (when it enters) 
  // and we need to update constantly and set the pos.x/y to null otherwise it overrides 
  // it. same as the headpatzone below 
  pettingZone.addEventListener('mousemove', () => {
    isWalking = false;
  });
  // revoke the above obviously
  pettingZone.addEventListener('mouseleave', () => {
    isWalking = true;
    legs.forEach((leg) => leg.classList.add("walk"));
  });

  // same as the one above.
  headpatZone.addEventListener('mousemove', () => {
    isWalking = false;
  });

  // this is a function that adds a +1 heart above the kitten when the mouse enters is
  headpatZone.addEventListener("mouseenter", () => {
    headpatsCounter++

    const span = document.createElement("span");
    span.className = "heart-div-visible";
    span.innerHTML = `<img id="heart-icon-plusone" src="./icons/pixel-heart.svg"> +1`;

    head.appendChild(span);
    setTimeout(() => span.remove(), 1000);

    // change the counter number to a different color depending on if its a factor
    // of 10 or 100
    switch (true) {
      case (headpatsCounter % 10 === 0):
        headpatNum.innerHTML = `Headpat Counter: [<span>${headpatsCounter}</span>]<img id="heart-icon" src="./icons/pixel-heart.svg">`;
        break;
      case (headpatsCounter % 100 === 0):
        headpatNum.innerHTML = `Headpat Counter: [<span>${headpatsCounter}</span>]<img id="heart-icon" src="./icons/pixel-heart.svg">`;
        break;
      default:
        headpatNum.innerHTML = `Headpat Counter: [${headpatsCounter}]<img id="heart-icon" src="./icons/pixel-heart.svg">`;
        break;
    }

    localStorage.setItem('counter', headpatsCounter);
  });




  const handleTouchMotion = (e) => {
    /* if (!e.targetTouches) return;
    if (isWalking) {
      pos.x = e.targetTouches[0].offsetX;
      pos.y = e.targetTouches[0].offsetY;
      walk();
    } */

    if (isJumping) {
      isJumping = false;
     } // re-enable jump when mouse moves inside

    const touch = e.targetTouches[0];
    // Always update bodyPos so the cat's body can turn towards the mouse
    bodyPos.x = touch.clientX;
    bodyPos.y = touch.clientY;
    //  console.log(bodyPos)
    if (isWalking) {
      pos.x = touch.clientX;
      pos.y = touch.clientY;
    } else {
      pos.x = null;
      pos.y = null;
      legs.forEach((leg) => leg.classList.remove("walk"));
      stopCatJumpingAnim();
    }
  };

  // handle touchscreen events
  pettingZone.addEventListener('touchmove', () => {
    isWalking = false;
    // console.log('posx:', pos.x)
  });
  pettingZone.addEventListener('touchend', () => {
    isWalking = true;
  });


  headpatZone.addEventListener('touchmove', () => {
    isWalking = false
  });
  headpatZone.addEventListener('touchend', () => {
    isWalking = true
  });


  // so this function is called around the bottom in the setinterval and basically does 
  // what the name suggests it starts moving left or right if the iswalking flag is true 
  // or if its false it only adds the classes to rotate the kitten in place.
  const decideTurnDirection = () => {
      if (isWalking) {
        cat.getBoundingClientRect().x < bodyPos.x ? turnRight() : turnLeft();
      } else {
          if (cat.getBoundingClientRect().x < bodyPos.x) {
            cat.classList.add("face_right");
            cat.classList.remove("face_left");
          } else {
            cat.classList.remove("face_right");
            cat.classList.add("face_left");
          }
      };
  };
  // children functions of the one above
  const turnRight = () => {
    cat.style.left = `${bodyPos.x - 90}px`;
    cat.classList.remove("face_left");
    cat.classList.add("face_right");
  };
  const turnLeft = () => {
    cat.style.left = `${bodyPos.x + 10}px`;
    cat.classList.remove("face_right");
    cat.classList.add("face_left");
  };

  // this function reads the mouse y position of the bodypos and sets the style of the 
  // head if y is lower than the cat's y.
  const headMotion = () => {
    const catY = cat.getBoundingClientRect().y;
    const mouseY = bodyPos.y;

    if (mouseY < catY) {
        head.style.top = "-30px";
    } else {
        head.style.top = "-15px";
    }
  };

  // function that makes the cat jump based on the bottom of the catWrapper container.
  // catY is basically a bottom: 0 of the catwrapper. change here how far the mouse
  // has to be to make the cat jump
  const jump = () => {
    const catY = catWrapper.getBoundingClientRect().top;
    if (isJumping) return; // do nothing if jumping is disabled
    
    catWrapper.classList.remove("jump");
    
    if (pos.y < catY - 500) {
      setTimeout(() => {
        if (!isJumping) {
          catWrapper.classList.add("jump");
        }
      }, 100);
    }
  };

  // simple function that returns either true or false if the mouse is in the 
  // kitten wrapper div (its basically asking if the mouse is to the right of 
  // the wrappers left edge, and to the left of the wrappers right edge etc.)
  const isMouseInWrapper = (e) => {
    const rect = outerWrapper.getBoundingClientRect();
    return (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    );
  };


  const decideStop = () => {
    // this checks if 2 values are approx equal with a threshold of 2
    const approxEqual = (a, b, threshold = 2) => Math.abs(a - b) < threshold;
    // then this takes the pos and the pos of the cat relative to the div and 
    // calculates if theyre approx equal within that threshold
    if (
      (cat.classList.contains("face_right") &&
        approxEqual(pos.x - 90, cat.offsetLeft)) ||
      (cat.classList.contains("face_left") &&
        approxEqual(pos.x + 10, cat.offsetLeft))
    ) {
      legs.forEach((leg) => leg.classList.remove("walk"));
    }
  };

  // this is the engine that runs the musheen (cat). using an interval here so 
  // that the mouse pos doesnt update too frequently (only every 100ms). if new 
  // functions are made they should be added here
  setInterval(() => {
    if (isWalking && pos.x && pos.y) {
      decideStop();
    }

    if(bodyPos.x && bodyPos.y) {
      decideTurnDirection();
      headMotion();
    }
  }, 100);

  // set a delay on the jumping animation
  setInterval(() => {
    if (!pos.x || !pos.y) return;
    jump();
  }, 1000);


  // event listeners
  outerWrapper.addEventListener("mousemove", handleMouseMotion);
  outerWrapper.addEventListener("touchmove", handleTouchMotion);
  outerWrapper.addEventListener('mouseleave', () => {
    stopCatJumpingAnim()
  })
  outerWrapper.addEventListener('mouseenter', () => {
    isWalking = true;
  })

  // probably redundant 
  window.addEventListener('mouseleave', () => {
  stopCatJumpingAnim()
  })

  function stopCatJumpingAnim() {
    // gets the final bottom css style for the cat wrapper and converts to num 
    // however this is overkill and would be better if it was just set to its 0 value
    const catBottom = parseFloat(getComputedStyle(catWrapper).bottom);
    isJumping = true;
    isWalking = false
    
    if (catWrapper.classList.contains('jump') && catBottom > 0) {
      catWrapper.style.bottom = '0px'; // starts the transition to bottom
      setTimeout(() => {
        catWrapper.classList.remove('jump');
      }, 550); // DO NOT FUCKING CHANGE THIS ITS ALMOST PERFECT NOT NOTICEABLE AT ALL 
    }
    
    setTimeout(() => {
      legs.forEach(leg => leg.classList.remove("walk"));
    }, 600);
    
    decideStop();
  }

  // wanted to do media query fuckery but thought its way too indian 
  // const mq = window.matchMedia("(max-width: 300px)");

  // mq.addEventListener("change", (event) => {
  //   if (event.matches) {
  //     console.log("Now in mobile view");
  //   } else {
  //     console.log("Now in desktop view");
  //   }
  // });
}

window.addEventListener("DOMContentLoaded", init);




