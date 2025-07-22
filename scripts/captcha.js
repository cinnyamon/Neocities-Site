// get DOM elements
const userCaptcha = document.querySelector('.user-captcha');
const mathEquationP = document.querySelector('.math-equation');
const userInput = document.getElementById('captcha-response');
const emailRendered = document.getElementById('email-rendered');


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

      userInput.remove();

      const emailRendered = document.createElement('p');
      emailRendered.classList.add('email-rendered');
      emailRendered.textContent = 'cinnyamoon@gmail.com';

      // append
      userCaptcha.appendChild(emailRendered);
    }
  }
})