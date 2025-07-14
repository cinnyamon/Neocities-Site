// getting DOM elements
const underDevelopmentEl = document.getElementById('underdevelopment');
const underDevBtnEl = document.getElementById('underdevbutton');
const underDevExitBtn = document.querySelector('.exitbtn');

let betaAccepted = JSON.parse(localStorage.getItem('accepted')) || false

// setting functionality to the button element

if (betaAccepted === true) {
    //keeps it hidden
    underDevelopmentEl.remove();
} else {
    //removes class with opacity
    underDevelopmentEl.classList.remove('hidden-by-default')
    underDevBtnEl.addEventListener('click', () => {
        underDevelopmentEl.style.transition = 'opacity 0.5s ease-in-out';
        underDevelopmentEl.style.opacity = 0;
        setTimeout(() => {
            underDevelopmentEl.remove();
        }, 500)
        localStorage.setItem('accepted', true)
    });
}
    

underDevExitBtn.addEventListener('click', () => {
    if (history.length > 1) {
        history.back();
    } else {
        window.location.href = 'https://www.ecosia.org/';
    }
})