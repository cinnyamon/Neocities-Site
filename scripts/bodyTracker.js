document.addEventListener("mousemove", (event) => {
  const x = event.pageX,
  y = event.pageY;

  // lag cursor behind mouse
  gsap.to("#cursor-follow > span", {
      duration: (i) => 0.1 + i/10,
      scale: (i) => 3 - i/10,
      x,
      y
    });
});
