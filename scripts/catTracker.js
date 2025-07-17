const catHeaderDiv = document.querySelector('.cat-header');
const headpatNum = document.querySelector('.headpat-number');
let headpatsCounter = 0;
const outerWrapper = document.querySelector('.outer_wrapper');

function init() {
  let cancelJump = false;


  
      const catWrapper = document.querySelector(".cat_wrapper");
      const wrapper = document.querySelector(".wrapper");
      const cat = document.querySelector(".cat");
      const head = document.querySelector(".cat_head");
      const legs = document.querySelectorAll(".leg");
      const connectedLegs = document.querySelectorAll('.front_legs, .back_legs');
      const pos = {
        x: null,
        y: null,
      };

      const walk = () => {
        cat.classList.remove("first_pose");
        legs.forEach((leg) => leg.classList.add("walk"));
      };

      let isWalking = true; 

      const handleMouseMotion = (e) => {
        if (cancelJump) cancelJump = false; //  re-enable jump when mouse moves inside

        if (!isMouseInWrapper(e)) return;

        if (isWalking) {
          pos.x = e.clientX;
          pos.y = e.clientY;
          walk();
        }
      };

      // when mouse enters the cat set is walking to false and stop it from moving
      cat.addEventListener('mouseenter', () => {
        isWalking = false;
      });

      // set iswalking to true when mouse leaves the cat
      cat.addEventListener('mouseleave', () => {
        isWalking = true;
      });

      const handleTouchMotion = (e) => {
        if (!e.targetTouches) return;
        if (isWalking) {
          pos.x = e.targetTouches[0].offsetX;
          pos.y = e.targetTouches[0].offsetY;
          walk();
        }
      };

      // handle touchscreen events
      cat.addEventListener('touchstart', () => {
        isWalking = false;
      });

      cat.addEventListener('touchend', () => {
        isWalking = true;
      });

      const turnRight = () => {
        cat.style.left = `${pos.x - 90}px`;
        cat.classList.remove("face_left");
        cat.classList.add("face_right");
      };

      const turnLeft = () => {
        cat.style.left = `${pos.x + 10}px`;
        cat.classList.remove("face_right");
        cat.classList.add("face_left");
      };

      const decideTurnDirection = () => {
        cat.getBoundingClientRect().x < pos.x ? turnRight() : turnLeft();
      };

      const headMotion = () => {
        pos.y > wrapper.clientHeight + 40
          ? (head.style.top = "-15px")
          : (head.style.top = "-30px");
      };

      cat.addEventListener("mouseenter", (event) => {
        headpatsCounter++
        const span = document.createElement("span");
        span.className = "heart-div-visible";
        span.innerHTML = `<img id="heart-icon-plusone" src="./icons/pixel-heart.svg"> +1`;

        head.appendChild(span);
        setTimeout(() => span.remove(), 1000);

        //Update the headpat counter on the page.
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

      });

      // change here how far the mouse has to be to make the cat jump
      const jump = () => {
        if (cancelJump) return; // do nothing if jumping is disabled

        catWrapper.classList.remove("jump");
        if (pos.y < wrapper.clientHeight - 300) {
          setTimeout(() => {
            if (!cancelJump) {
              catWrapper.classList.add("jump");
            }
          }, 100);
        }
      };

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
        const approxEqual = (a, b, threshold = 2) => Math.abs(a - b) < threshold;
        if (
          (cat.classList.contains("face_right") &&
            approxEqual(pos.x - 90, cat.offsetLeft)) ||
          (cat.classList.contains("face_left") &&
            approxEqual(pos.x + 10, cat.offsetLeft))
        ) {
          legs.forEach((leg) => leg.classList.remove("walk"));
        }
      };

      setInterval(() => {
        if (!pos.x || !pos.y) return;
        decideTurnDirection();
        headMotion();
        decideStop();
      }, 100);

      setInterval(() => {
        if (!pos.x || !pos.y) return;
        jump();
      }, 1000);


      outerWrapper.addEventListener("mousemove", handleMouseMotion);
      outerWrapper.addEventListener("mousemove", handleTouchMotion);
      outerWrapper.addEventListener('mouseleave', () => {
          const catBottom = parseFloat(getComputedStyle(catWrapper).bottom);
          
          cancelJump = true;
          decideStop()
          walk()
          if (catWrapper.classList.contains('jump') && catBottom > 0) {
            catWrapper.style.bottom = '0px'; // Triggers CSS transition
            setTimeout(() => {
              catWrapper.classList.remove('jump');
            }, 550); // DO NOT FUCKING CHANGE THIS ITS ALMOST PERFECT NOT NOTICEABLE AT ALL 
          }
          
      })
}

window.addEventListener("DOMContentLoaded", init);




