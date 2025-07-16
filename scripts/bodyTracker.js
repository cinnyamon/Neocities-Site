const mainEl = document.getElementById('gsapcursor');


mainEl.addEventListener("mousemove", (event) => {
  const x = event.clientX - 6,
  y = event.clientY - 6;

  // lag cursor behind mouse
  gsap.to("#cursor-follow > span", {
      duration: (i) => 0.1 + i/10, // each span is called i and for each one we do: first span = 0 therefore i = 0 => 0.1 + 0/10 = 0.1 + 0 next is 1 which is 0.1 + 1/10 = 0.1 + 0.1 and so on
      transform: (i) => `translate(${x}px, ${y}px) scale(${3 - i / 10})`,
      x,
      y
    });
});

mainEl.addEventListener("mouseenter", () => {
  
  gsap.killTweensOf(mainEl);
  gsap.to("#cursor-follow > span", {
      duration: 0.3,
      opacity: 1,
      ease: "power2.out"
    });
});

window.addEventListener('mouseout', (event) => {
  if (!event.relatedTarget) {
    gsap.killTweensOf(mainEl);
    gsap.to("#cursor-follow > span", {
        duration: 0.3,
        opacity: 0,
        ease: "power2.out"
      });
  }
})