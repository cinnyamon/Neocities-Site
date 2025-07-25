// get DOM elements
const userCaptcha = document.querySelector('.user-captcha');
const mathEquationP = document.querySelector('.math-equation');
const userInput = document.getElementById('captcha-response');
const emailRendered = document.getElementById('email-rendered');
const eqInput = document.querySelector('.eq-input');
const copiedTooltip = document.querySelector('.eq-input > .tooltiptext');


// set object containing arrays of addends and operators
const addends = {
  firstAddends: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2],
  secondAddends: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2],
  operators: ['+', '-',],
}

// set object where randomly found addends and operators will be stored in
const mathEquation = {
  firstAddend: null,
  secondAddend: null,
  operator: undefined,
}


// first addend
const randomFirstAddend = ~~(Math.random() * addends.firstAddends.length);
mathEquation.firstAddend = addends.firstAddends[randomFirstAddend];
// console.log('First Addend:', addends.firstAddends[randomFirstAddend]);


// second addend
const randomSecondAddend = ~~(Math.random() * addends.secondAddends.length);
mathEquation.secondAddend = addends.secondAddends[randomSecondAddend]
// console.log('Second Addend:', addends.secondAddends[randomSecondAddend]);


// operator
const randomOperator = ~~(Math.random() * addends.operators.length);
mathEquation.operator = addends.operators[randomOperator];
// console.log('Operator:', addends.operators[randomOperator]);

// align the addends and operators for mathjs to use
const equation = `${mathEquation.firstAddend} ${mathEquation.operator} ${mathEquation.secondAddend}`;
const equationResult = math.evaluate(equation);
// console.log('equationResult:', equationResult);


// put the equation in the html
mathEquationP.textContent = `${equation} =`;

// event listener for the input
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (Number(userInput.value) === equationResult) {

      // remove the div containing the user input and math equation
      mathEquationP.remove();
      userInput.remove();

      const emailRendered = document.createElement('p');
      const copyBtn = document.createElement('img')
      emailRendered.classList.add('email-rendered');
      emailRendered.textContent = `cinnyamon@disroot.org`;
      copyBtn.src = "./icons/copy.svg"
      copyBtn.classList.add('copy-btn')

      // append
      eqInput.appendChild(emailRendered);
      eqInput.appendChild(copyBtn);

      let timerId = null;
      setTimeout(() => {
        copyBtn.addEventListener('click', () => {
          const text = emailRendered.textContent
          navigator.clipboard.writeText(text).then(() => {
            copiedTooltip.classList.add('tooltiptextvis');

            if (timerId) {
              clearTimeout(timerId);
            }

            timerId = setTimeout(() => {
              copiedTooltip.classList.remove('tooltiptextvis')
              timerId = null;
            }, 1500);
          }).catch(() => {
            console.error('failed to copy the teto')
          })
        });
      }, 0);

    }
  }
})