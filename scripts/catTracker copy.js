const catHeaderDiv = document.querySelector('.cat-header');
const headpatNum = document.querySelector('.headpat-number');
let headpatsCounter = 0;
const outerWrapper = document.querySelector('.outer_wrapper');
const pettingZone = document.querySelector('.petting-zone');
const catWrapper = document.querySelector(".cat_wrapper");
const wrapper = document.querySelector(".wrapper");
const cat = document.querySelector(".cat");
const head = document.querySelector(".cat_head");
const legs = document.querySelectorAll(".leg");

wrapper.addEventListener('mousemove', (e) => {
    
    const rect = wrapper.getBoundingClientRect();
    const pos = {
      x: null,
      y: null,
    };

    console.log(e.relatedTarget)
    if (
        e.clientX >= rect.left && //cursor is not left of the element
        e.clientX <= rect.right && //cursor is not right of the element
        e.clientY >= rect.top && //cursor is not above the element
        e.clientY <= rect.bottom //curosr is not below the element
      ) {
        pos.x = e.offsetX - rect.left; //these two give me the position of the mouse 
        pos.y = e.offsetY - rect.top; //inside the wrapper element defined above
        // walk();
      }

      //decides turn direction func
      if (rect.x < pos.x) {
         
        gsap.to(cat, {
            duration: 0.1,
            left: pos.x,
          })
        } else {
          gsap.to(cat, {
            duration: 0.1,
            left: pos.x,
          })
        }
      
})







// function init() {


//       const pettingZone = document.querySelector('.petting-zone');
//       const catWrapper = document.querySelector(".cat_wrapper");
//       const wrapper = document.querySelector(".wrapper");
//       const cat = document.querySelector(".cat");
//       const head = document.querySelector(".cat_head");
//       const legs = document.querySelectorAll(".leg");

//       const rect = wrapper.getBoundingClientRect();
//       const pos = {
//         x: null,
//         y: null,
//       };

      

//       /* const handleMouseMotion = (e) => {
//         // we are asking if the mouse is inside the element, otherwise if we wanted to check
//         // if the mouse is outside the element we would use !(...)
//         if (
//             e.clientX >= rect.left && //cursor is not left of the element
//             e.clientX <= rect.right && //cursor is not right of the element
//             e.clientY >= rect.top && //cursor is not above the element
//             e.clientY <= rect.bottom //curosr is not below the element
//           ) {
//             pos.x = e.offsetX - rect.left; //these two give me the position of the mouse 
//             pos.y = e.offsetY - rect.top; //inside the wrapper element defined above
//             // walk();
//           }
//         }; */

        
        
      

//       const decideTurnDirection = () => {
//         const catRect = cat.getBoundingClientRect();
//         /* console.log(catRect.x) */
//         if (catRect.x < pos.x) {
//           turnRight()
//         } else {
//           turnLeft();}
//       };

//       const turnRight = () => {
//         /* cat.style.left = `${pos.x - 90}px`; */ //these lines make the cat move left or right
//         gsap.to(cat, {
//           duration: 0.1,
//           left: pos.x,
//         })
//       };

//       const turnLeft = () => {
//         /* cat.style.left = `${pos.x + 40}px`;  *///these lines make the cat move left or right
//         gsap.to(cat, {
//           duration: 0.1,
//           left: pos.x,
//         })
//       };


//        pettingZone.addEventListener('mouseenter', (e) => {
//         console.log(e.target)
//           if (e.target.className = 'petting-zone') {
//             gsap.to(cat, {
//               duration: 0.1,
//               left: pos.x,
//             })
//           }
//         })

//       //i decided to add an event listener on an invisible box that moves with
//       //  the body of the cat and if the mouse enters it you dont move anything anymore
// //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!





//       /* const walk = () => {
//         cat.classList.remove("first_pose");
//         legs.forEach((leg) => leg.classList.add("walk"));
//       }; */

      

      

//       /* // when mouse enters the cat set is walking to false and stop it from moving
//       cat.addEventListener('mouseenter', () => {
//         isWalking = false;
//       });

//       // set iswalking to true when mouse leaves the cat
//       cat.addEventListener('mouseleave', () => {
//         isWalking = true;
//       });

//       const handleTouchMotion = (e) => {
//         if (!e.targetTouches) return;
//         if (isWalking) {
//           pos.x = e.targetTouches[0].offsetX;
//           pos.y = e.targetTouches[0].offsetY;
//           walk();
//         }
//       };

//       // handle touchscreen events
//       cat.addEventListener('touchstart', () => {
//         isWalking = false;
//       });

//       cat.addEventListener('touchend', () => {
//         isWalking = true;
//       }); */




      

      



      

      

//       /* const headMotion = () => {
//         pos.y > wrapper.clientHeight
//           ? (head.style.top = "-15px")
//           : (head.style.top = "-30px");
//       }; */



//       /* cat.addEventListener("mouseenter", (event) => {
//         headpatsCounter++
//         const span = document.createElement("span");
//         span.className = "heart-div-visible";
//         span.innerHTML = `<img id="heart-icon-plusone" src="./icons/pixel-heart.svg"> +1`;

//         head.appendChild(span);
//         setTimeout(() => span.remove(), 1000);

//         //Update the headpat counter on the page.
//         switch (true) {
//           case (headpatsCounter % 10 === 0):
//             headpatNum.innerHTML = `Headpat Counter: [<span>${headpatsCounter}</span>]<img id="heart-icon" src="./icons/pixel-heart.svg">`;
//             break;
//           case (headpatsCounter % 100 === 0):
//             headpatNum.innerHTML = `Headpat Counter: [<span>${headpatsCounter}</span>]<img id="heart-icon" src="./icons/pixel-heart.svg">`;
//             break;
//           default:
//             headpatNum.innerHTML = `Headpat Counter: [${headpatsCounter}]<img id="heart-icon" src="./icons/pixel-heart.svg">`;
//             break;
//         }

//       }); */

//       // change here how far the mouse has to be to make the cat jump
//       /* const jump = () => {
//         if (cancelJump) return; // do nothing if jumping is disabled

//         catWrapper.classList.remove("jump");
//         if (pos.y < wrapper.clientHeight - 350) {
//           setTimeout(() => {
//             if (!cancelJump) {
//               catWrapper.classList.add("jump");
//             }
//           }, 100);
//         }
//       }; */


      

//       /* const isMouseInWrapper = (e) => {
//         const rect = outerWrapper.getBoundingClientRect();
//         return (
//           e.clientX >= rect.left &&
//           e.clientX <= rect.right &&
//           e.clientY >= rect.top &&
//           e.clientY <= rect.bottom
//         );
//       }; */

//       /* const decideStop = () => {
//         const approxEqual = (a, b, threshold = 2) => Math.abs(a - b) < threshold;
//         if (
//           (cat.classList.contains("face_right") &&
//             approxEqual(pos.x - 90, cat.offsetLeft)) ||
//           (cat.classList.contains("face_left") &&
//             approxEqual(pos.x + 10, cat.offsetLeft))
//         ) {
//           legs.forEach((leg) => leg.classList.remove("walk"));
//         }
//       }; */


      
//       setInterval(() => {
//         if (!pos.x || !pos.y) return;
//         decideTurnDirection();
//           /*headMotion();*/
//           /* decideStop(); */
//       }, 100);

//       /* setInterval(() => {
//         if (!pos.x || !pos.y) return;
//         jump();
//       }, 1000); */


//       outerWrapper.addEventListener("mousemove", handleMouseMotion);
//       /* outerWrapper.addEventListener("mousemove", handleTouchMotion);
//       outerWrapper.addEventListener('mouseleave', () => {
//           const catBottom = parseFloat(getComputedStyle(catWrapper).bottom);
          
//           cancelJump = true;
//           decideStop()
//           walk()
//           if (catWrapper.classList.contains('jump') && catBottom > 0) {
//             catWrapper.style.bottom = '0px'; // Triggers CSS transition
//             setTimeout(() => {
//               catWrapper.classList.remove('jump');
//             }, 550); // DO NOT FUCKING CHANGE THIS ITS ALMOST PERFECT NOT NOTICEABLE AT ALL 
//           }
          
//       }) */
// }

// window.addEventListener("DOMContentLoaded", init);




