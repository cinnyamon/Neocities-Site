// getting DOM elements
const underDevelopmentEl = document.getElementById('underdevelopment');
const underDevBtnEl = document.getElementById('underdevbutton');

// setting functionality to the button element

underDevBtnEl.addEventListener('click', () => {
    underDevelopmentEl.style.transition = 'opacity 0.5s ease-in-out';
    underDevelopmentEl.style.opacity = 0;
    setTimeout(() => {
        underDevelopmentEl.remove();
    }, 500);
})