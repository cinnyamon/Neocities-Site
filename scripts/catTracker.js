const catHeaderDiv = document.querySelector('.cat-header');
const headpatNum = document.querySelector('.headpat-number');
let headpatsCounter = 0;

function init() {

      const catWrapper = document.querySelector(".cat_wrapper");
      const wrapper = document.querySelector(".wrapper");
      const cat = document.querySelector(".cat");
      const head = document.querySelector(".cat_head");
      const legs = document.querySelectorAll(".leg");
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

      head.addEventListener("mouseenter", (event) => {
        headpatsCounter++
        const span = document.createElement("span");
        span.className = "heart-div-visible";
        span.innerHTML = `<img src="./icons/pixel-heart.svg"> +1`;

        head.appendChild(span);
        setTimeout(() => span.remove(), 1000);

        //Update the headpat counter on the page.
        switch (true) {
          case (headpatsCounter % 10 === 0):
            headpatNum.innerHTML = `Headpat Counter: [<span>${headpatsCounter}</span>]<img src="./icons/pixel-heart.svg">`;
            break;
          case (headpatsCounter % 100 === 0):
            headpatNum.innerHTML = `Headpat Counter: [<span>${headpatsCounter}</span>]<img src="./icons/pixel-heart.svg">`;
            break;
          default:
            headpatNum.innerHTML = `Headpat Counter: [${headpatsCounter}]<img src="./icons/pixel-heart.svg">`;
            break;
        }

      });

      const jump = () => {
        catWrapper.classList.remove("jump");
        if (pos.y < wrapper.clientHeight - 150) {
          setTimeout(() => {
            catWrapper.classList.add("jump");
          }, 100);
        }
      };

      const decideStop = () => {
        if (
          (cat.classList.contains("face_right") &&
            pos.x - 90 === cat.offsetLeft) ||
          (cat.classList.contains("face_left") && pos.x + 10 === cat.offsetLeft)
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


      document.addEventListener("mousemove", handleMouseMotion);
      document.addEventListener("mousemove", handleTouchMotion);
}

window.addEventListener("DOMContentLoaded", init);




