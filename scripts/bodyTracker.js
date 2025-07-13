const mainEl = document.getElementById('gsapcursor')

mainEl.addEventListener("mousemove", (event) => {
  const x = event.clientX,
  y = event.clientY;

  // lag cursor behind mouse
  gsap.to("#cursor-follow > span", {
      duration: (i) => 0.1 + i/10,
      scale: (i) => 3 - i/10,
      x,
      y
    });
});
