// get DOM element
const mainEl = document.getElementById('gsapcursor');
const images = document.querySelectorAll('.crsr');

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
    document.addEventListener("mousemove", (event) => {
      const x = event.clientX + 15,
      y = event.clientY - 6;

      // console.log('x:', x, 'y:', y)
    
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
    });

    document.addEventListener('touchmove', (event) => {
      const touch = event.targetTouches[0];
      const x = touch.clientX + 15,
      y = touch.clientY - 6;

      // console.log('x:', x, 'y:', y)
    
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
    })
    
    document.addEventListener("mouseenter", (event) => {
      
      // gsap.killTweensOf(mainEl);
      gsap.to("#cursor-follow > span", {
          duration: 0.3,
          opacity: 1,
          ease: "power2.out"
        });
    });
    
    document.addEventListener('mouseleave', (event) => {
      if (!event.relatedTarget) {
        // gsap.killTweensOf(mainEl);
        gsap.to("#cursor-follow > span", {
            duration: 0.3,
            opacity: 0,
            ease: "power2.out"
          });
      }
    })
    

    
    isContextMenuOpen = 0
    
    document.addEventListener('contextmenu', (e) => {
      isContextMenuOpen++
      // e.preventDefault();
      gsap.to("#cursor-follow > span", {
        duration: 0.6,
        rotation: 90,
        ease: "power2.out"
      });
    })
    
    document.addEventListener('click', () => {
      if (isContextMenuOpen > 0) {
        isContextMenuOpen = 0;
      }
    })  
})


document.addEventListener('DOMContentLoaded', () => {
    const dotMask = document.querySelector('.dot-mask');

    if (dotMask) {
      let targetX = 0, targetY = 0;
      let currentX = 0, currentY = 0;

      document.addEventListener('mousemove', (e) => {
        /* targetX = e.clientX;
        targetY = e.clientY; */
        targetX = e.pageX;
        targetY = e.pageY;
      });

      document.addEventListener('mouseout', (e) => {
        dotMask.style = `mask-image: radial-gradient(ellipse 350px 350px at ${currentX}px ${currentY}px, rgba(0, 0, 0, 0) 10%, transparent 100%)`;
      })

      document.addEventListener('touchmove', (e) => {
        const touch = e.targetTouches[0];
        targetX = touch.clientX;
        targetY = touch.clientY;
      })

      function animate() {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        dotMask.style = `mask-image: radial-gradient(ellipse 300px 300px at ${currentX}px ${currentY}px, rgba(0, 0, 0, 1) 10%, transparent 100%)`;

        requestAnimationFrame(animate);
      }

      animate();

      
    }
  });