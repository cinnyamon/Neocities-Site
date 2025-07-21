// getting DOM elements
const underDevelopmentEl = document.getElementById('underdevelopment');
const underDevBtnEl = document.getElementById('underdevbutton');
const arrowButton = document.querySelector('.arrowbtn')
const underDevExitBtn = document.querySelector('.exitbtn');
const buttonsDiv = document.querySelector('.buttonsdiv')

let betaAccepted = JSON.parse(localStorage.getItem('accepted')) || false


/* arrowButton.addEventListener('click', () => {
    const acceptBtn = document.createElement('button');
    acceptBtn.setAttribute("id", "underdevbutton");
    acceptBtn.textContent = 'Okay, I understand and want to proceed.';

    const denyBtn = document.createElement('button');
    denyBtn.setAttribute("id", "underdevbutton");
    denyBtn.classList.add('exitbtn');
    denyBtn.textContent = 'I want to leave.';

    //append these children to the parent el
    buttonsDiv.appendChild(acceptBtn);
    buttonsDiv.appendChild(denyBtn);
}) */

underDevelopmentEl.addEventListener('scroll', () => {
    buttonsDiv.style.opacity = '1'
})

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