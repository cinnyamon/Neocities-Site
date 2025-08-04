//my plan is to load the website and replace the html with javascript if it is enabled. if it is not then simply fall back to a simpler shell with no interactivity.


//if the user has js enabled then the shell will clear itself and initialize a delay of 1-5 seconds once the user has started scrolling (non dependant on scroll position) and display the shell colors script.

/* 1. clear console
2. wait for user scroll
3. when scroll detected
4. initialize delay of 1-5s
5. display shell colors script in 1 or multiple batches
6. let user enter any text inside shell
7. ideally make the shell scrollable when new text is added by user but probably quite difficult to implement. */



DOMPurify.sanitize()



// storing the css and js shells texts into constants
const badWordWarning = document.querySelector('.js-badwords-div');
const termMainBody = document.querySelector('.terminal-main-body');
const termClose = document.querySelector('.term-close');
const closeShellWindow = document.querySelector('.js-closing-shell-check');
const closeShellText = document.getElementById('js-close-shell-text');
const originalText = closeShellText.innerHTML;

const jsShellHTML = `JavaScript detected. Initialize interactive console...`;
const shellName = `<span class="username">cinny</span>@<span class="sitename"
                >neocities</span
              >&#58;&#126;&#36;&nbsp;`;
let shellBlinkingBlock = `<span class="blinking-block">&#9608;</span>`;


//on scroll detection for running the clearShell function
//and displaying shellColors
/* let hasScrolled = false
window.addEventListener('scrollend', (event) => {

  if (hasScrolled === false) {
    clearShell();
    hasScrolled = true;


    // setTimeout(() => { // reenable if shit hits the fan
    //   hasScrolled = true //never runs again
    //   if (hasScrolled) {
    //     shellColors();
    //     setTimeout(() => {
    //       jsShell.innerHTML = '';
    //     }, 3000);
    //   } 
    // }, 6000)
  };
})
 */

// this function runs when the site loads and clears the entire
// shell vvvv
let savedJsShellText = '';

function clearShell() {
  function clearCssAndJsShell() {
    let index = 0;

    function runTypeWriterPromise() {
      return new Promise((resolve) => {
        setTimeout(() => {
          //typewriter effect function
          function typeWriter() {
            if (index < jsShellHTML.length) {
              termMainBody.innerHTML += `${jsShellHTML.charAt(index)}`;
              index++;
              setTimeout(typeWriter, 50);
            } else {
              resolve(termMainBody.innerHTML); // takes termMainBody and adds to resolve function for use to use with .then
            }
          }
          typeWriter();
        }, 2000);
      });
    }
    setTimeout(() => {
      document.getElementById('css-shell').remove();
    }, 2000)

    return runTypeWriterPromise(); //returns the promise
  }
  
  return clearCssAndJsShell(); //returns the promise to global scope
}

// the code below basically receives the value passed to resolve(jsInitshell) and names it jsDetectionText now so we can use it to console log it or store it in a variable
clearShell().then((jsDetectionText) => {
  savedJsShellText = jsDetectionText
    // setting up the scrolling observer in a constant for future potential cleanup
  const scrollObserver = shellScrollObserver(termMainBody);
    // clean up when needed
    // observer.disconnect();

    //set timeout for the real js shell to appear
    setTimeout(() => {
      termMainBody.innerHTML = `
      ${savedJsShellText}
      ${shellColors()}
      <div id="pre-test"></div>
      <div id="shell-input-container">
        ${shellName}
          <span id="writable-box" role="textbox" tabindex="0" class="writable-textarea" maxlength="60" contenteditable>
          </span>${shellBlinkingBlock}
      </div>`
    
    let preTest = document.getElementById('pre-test');

    // change this thing to append to the pre-test div a <p id= generatedp style = display: flex> which appends inside of it a <span class="username"> + the text cinny and another <span class="sitename"> + the text neocities, and then append using insertAdjacentHTML('beforeend',:~$ + safeuserInput )



























    const writableBox = document.getElementById('writable-box');
    const textArea = document.querySelector('.writable-textarea');

    focusTextBoxOnClick(writableBox);
    maxCharacterInput(writableBox);
    displayCmndInShell(writableBox, preTest, textArea, termMainBody);
    }, 800);
});

function shellScrollObserver(termMainBody) {
    const observer = new MutationObserver(() => {
      termMainBody.scrollTop = termMainBody.scrollHeight;
    });
    
    observer.observe(termMainBody, {
        childList: true,
        subtree: true
    });
    
    return observer;
}

function focusTextBoxOnClick(writableBox) {
  termMainBody.addEventListener('click', () => {
      writableBox.focus();
    });
}

function maxCharacterInput(writableBox) {
  writableBox.addEventListener('input', () => {
      const maxChars = 60;
      const text = writableBox.textContent;
  
      if (text.length > maxChars) {
        // Trim excess characters
        writableBox.textContent = text.slice(0, maxChars);
  
        // Move caret to the end
        placeCaretAtEnd(writableBox);
      }

      function placeCaretAtEnd(el) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(el);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }

    });
}

function displayCmndInShell(writableBox, preTest, textArea) {
  // create array to store the user's input
  const userInputArray = [];
  let arrowUpCounter = -1;
  
  // set previous timer object to store the id of the setInterval and clear it later on
  let previousTimerId = {};
  let previousTimerIdCaret = {};
  writableBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      // push the text content from the input box into the array
      userInputArray.push(writableBox.textContent);
      
      // only take the last item to be put into the shell
      const enteredText = userInputArray[userInputArray.length - 1];
      // use DOMPurify lib to only allow p span and classes to these items for the user's entered text
      
      const safeUserInput = DOMPurify.sanitize(enteredText, {
        ALLOWED_TAGS: ['p', 'span', 'div', 'br', ],
        ALLOWED_ATTR: ['class', 'style']
      });

      /* const result = math.evaluate(safeUserInput)
      console.log('The result is:', result)
      console.log(Boolean(result)) */


      // const regex = /[+\-*/]/g;
      // console.log(Function(`"use strict"; return ${safeUserInput}`)())
      // // this is eval() and takes a string and does the calculation on it.


      // const isCalculation = regex.test(safeUserInput)
      // console.log({isCalculation})
      // // this checks if the calculation has a regex symbol from the ones listed in there like: + - * and /


      // if (isCalculation) {
      //   return console.log(eval(safeUserInput))
      // }
      // // if calculation is true then do the eval()
      

      /* if (!isNaN(safeUserInput)) {

        console.log('number detected');
        console.log(typeof Number(safeUserInput));
        
        operators.forEach((operator) => {
        })
      } */

      // create array of bad words
      const badWords = ['fag', 'faggot', 'idiot', 'idot', 'retard', 'dumbass', 'dumb', 'nig', 'nigger', 'dummy', 'cunt', 'stupid', 'stoopi', 'sucker', 'jew', 'kike', ];
      badWords.forEach(badword => {
        if (safeUserInput.includes(badword)) {
          badWordWarning.classList.add('js-badwords-div-visible');
          
          // check if previous interval id exists and clear it
          if (previousTimerId) {
            clearTimeout(previousTimerId)
          }
          // write the timeout id into the object
          previousTimerId = setTimeout(() => {
            badWordWarning.classList.remove('js-badwords-div-visible');
            // clear the timer id 
            previousTimerId = {}
          }, 2000)
        }
      });

      const safeInputTrimmed = safeUserInput.trim();
      const bannedLettersRGX = /^[etisghlbm]$/i;

      const catchTimeWords = ['date', 'time', 'date short', 'short date', 'time short', 'short time',];

      const date = new Date();
      const currentTime = {
        currentDateLong: date.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: "numeric"}),
        currentDateShort: date.toLocaleString('en-US', { dateStyle: 'short' }),

        currentTimeLong: date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true, timeZoneName: 'short' }),
        currentTimeShort: date.toLocaleString('en-US', { timeStyle: 'short' }),
      }


      // add more functional commands to the terminal by updating the catch inside the 2nd if statement. for example if the safeinputtrimmed contains cat console.log a cat


      // early return
      if (bannedLettersRGX.test(safeInputTrimmed)) {
        preTest.innerHTML += `<p id="generatedp" style="display: flex">${shellName}${safeUserInput}</p>`;

        // wait until the term updates then clear user input
        setTimeout(() => {
          textArea.textContent = '';
        }, 0);
        return;
      }

      console.log(math.parse(safeInputTrimmed))

      // if rgx fails evaluate 
      // if (!bannedLettersRGX.test(safeInputTrimmed)) {
      //   try {
      //     const result = math.evaluate(safeInputTrimmed);
      //     preTest.innerHTML += `<p id="generatedp" style="display: flex">${shellName}${safeUserInput}&nbsp;<span style="color: grey">= ${result}</span></p>`;
      //   } catch (err) {
      //     console.log(err)
      //     if (safeInputTrimmed.includes('time')) {
      //       preTest.innerHTML += `<p id="generatedp" style="display: flex">${shellName}${safeUserInput}&nbsp;<span style="color: grey">= ${currentTime.currentTimeLong}</span></p>`;


      //     } else if (safeInputTrimmed.includes('cat')){
      //       console.log('kitten')


      //     } else {
      //     preTest.innerHTML += `<p id="generatedp" style="display: flex">${shellName}${safeUserInput}</p>`;
      //     }
      //   }
      //   setTimeout(() => {
      //     textArea.textContent = '';
      //   }, 0);
      //   return
      // }
      
      let textInside = 'dumbass iujuvyt';

      preTest.innerHTML += textInside

      if (!bannedLettersRGX.test(safeInputTrimmed)) {
        try {

          const result = math.evaluate(safeInputTrimmed);
          textInside = `<p id="generatedp" style="display: flex">${shellName}${safeUserInput}&nbsp;<span style="color: grey">= ${result}</span></p>`;
          setTimeout(() => {
            textArea.textContent = '';
          }, 0);
        } catch {

          if (safeInputTrimmed.includes('time') && safeInputTrimmed.includes('short')) {
            preTest.innerHTML += `<p id="generatedp" style="display: flex">${shellName}${safeUserInput}&nbsp;<span style="color: grey">> ${currentTime.currentTimeShort}</span></p>`;
            setTimeout(() => {
              textArea.textContent = '';
            }, 0);
            return;
          }

          if (safeInputTrimmed.includes('date') && safeInputTrimmed.includes('short')) {
            preTest.innerHTML += `<p id="generatedp" style="display: flex">${shellName}${safeUserInput}&nbsp;<span style="color: grey">> ${currentTime.currentDateShort}</span></p>`;
            setTimeout(() => {
              textArea.textContent = '';
            }, 0);
            return;
          }

          if (safeInputTrimmed.includes('time')) {
            preTest.innerHTML += `<p id="generatedp" style="display: flex">${shellName}${safeUserInput}&nbsp;<span style="color: grey">> ${currentTime.currentTimeLong}</span></p>`;
            setTimeout(() => {
              textArea.textContent = '';
            }, 0);
            return;
          }
          if (safeInputTrimmed.includes('date')) {
            preTest.innerHTML += `<p id="generatedp" style="display: flex">${shellName}${safeUserInput}&nbsp;<span style="color: grey">> ${currentTime.currentDateLong}</span></p>`;
            setTimeout(() => {
              textArea.textContent = '';
            }, 0);
            return;
          }

          if (safeInputTrimmed.includes('cat')) {
            console.log('kitten')
            preTest.innerHTML += `<p id="generatedp" style="display: flex">${shellName}${safeUserInput}</p>`;
            setTimeout(() => {
              textArea.textContent = '';
            }, 0);
            return;
          }

            preTest.innerHTML += `<p id="generatedp" style="display: flex">${shellName}${safeUserInput} this adds another</p>`
            setTimeout(() => {
              textArea.textContent = '';
            }, 0);
        }
      }

      
        
      
      // try {
      //   if (bannedLettersRGX.test(safeInputTrimmed) === true) {
      //     preTest.innerHTML += `<p id="generatedp" style="display: flex">${shellName}${safeUserInput}</p>`;
      //   } else {
      //     const result = math.evaluate(safeInputTrimmed);
      //     preTest.innerHTML += `<p id="generatedp" style="display: flex">${shellName}${safeUserInput}&nbsp;<span style="color: grey">= ${result}</span></p>`;
      //   }
      // } 
      // catch {
      //   preTest.innerHTML += `<p id="generatedp" style="display: flex">${shellName}${safeUserInput}</p>`;
      // }
      

      // if user input contains anything from regex, send the user input into the preTest innerHTML and dont send anything to math.evaluate, 

      // else if the user input doesnt contain anything from regex then send the input to math.evaluate and show the result





      // switch (true) {
      //   case bannedLettersRGX.test(safeInputTrimmed):
      //     preTest.innerHTML += `<p id="generatedp" style="display: flex">${shellName}${safeUserInput}</p>`
      //     break

      //   case !bannedLettersRGX.test(safeInputTrimmed):
      //     const result = math.evaluate(safeInputTrimmed);
      //     preTest.innerHTML += `<p id="generatedp" style="display: flex">${shellName}${safeUserInput}&nbsp;<span style="color: grey">= ${result}</span></p>`;
      //     break

      //   case safeUserInput:
      //     preTest.innerHTML += `<p id="generatedp" style="display: flex">${shellName}${safeUserInput}</p>`

      //   default: 
      //     preTest.innerHTML += `<p id="generatedp" style="display: flex">${shellName}${safeUserInput}</p>`
      // }

      // (() => {
      //   try {
      //     result = math.evaluate(safeInputTrimmed);
      //     return true;
      //   } catch {
      //     return false;
      //   }
      // })():
      // const result = math.evaluate(safeInputTrimmed);
      // preTest.innerHTML += `<p id="generatedp" style="display: flex">${shellName}${safeUserInput}&nbsp;<span style="color: grey">= ${result}</span></p>`;
    };
  });

 

  // add event listener for arrow keys to show the caret
  writableBox.addEventListener('keydown', (arrow) => {
    if (arrow.key === 'ArrowLeft' || arrow.key === 'ArrowRight' || arrow.key === 'Control') {
      writableBox.classList.add('writable-textarea-caret');
          // check if previous interval id exists and clear it
           if (previousTimerIdCaret) {clearTimeout(previousTimerIdCaret)}
          // write the timeout id into the object
          previousTimerIdCaret = setTimeout(() => {
            writableBox.classList.remove('writable-textarea-caret');
            // clear the timer id 
            previousTimerIdCaret = {}
          }, 2000) 
    }


    let maxArrowUpCounter = userInputArray.length - 1;
    // console.log('max arrow up counter', maxArrowUpCounter)
    // console.log('the arrow up counter', arrowUpCounter)
    if (arrow.key === 'ArrowUp') {

      if (arrowUpCounter < maxArrowUpCounter) {
        arrowUpCounter++;
      };

      const reversed = userInputArray.toReversed();
      for (const [index, value] of reversed.entries()) {
        if (index === arrowUpCounter) {

          // console.log(arrowUpCounter);
          // console.log('Found:', value);
          writableBox.textContent = value;
        
          // add a set timeout for the caret placement so that the dom can update in peace before this shit runs and places the caret at the end.
          setTimeout(() => {
            moveCaretAtTheEnd(writableBox);
          }, 0);
        };
      };
    };

    if (arrow.key === 'ArrowDown') {

      if (arrowUpCounter > 0) {
        arrowUpCounter--;
      };

      const reversed = userInputArray.toReversed();
      for (const [index, value] of reversed.entries()) {
        if (index === arrowUpCounter) {

          // console.log(arrowUpCounter);
          // console.log(reversed.length);
          // console.log('Found:', value);
          writableBox.textContent = value;

          setTimeout(() => {
            moveCaretAtTheEnd(writableBox)
          }, 0);
        };
      };
    };
  });
};

function moveCaretAtTheEnd(writableBox) {
   
  writableBox.focus(); // focus on the writable span box

  const range = document.createRange(); // create a range (a range is a like the selection but invisible)
  
  range.selectNodeContents(writableBox); // select the entire contents of the element with the range
  
  range.collapse(false); // collapse the range to the end point. false means collapse to end rather than the start

  const selection = window.getSelection(); // get the selection object (allows you to change selection)

  selection.removeAllRanges(); // remove any selections already made

  selection.addRange(range); // make the range you have just created the visible selection
}

termClose.addEventListener('click', () => {
  showClosePopupOnClick();
});

// unfortunately have to make these global, dunno how to fix.
let timerId = {};
let closeBtnAttempts = 0;
function showClosePopupOnClick() {
  function closePopup() {
    closeBtnAttempts++
    closeShellWindow.classList.add('js-closing-shell-check-visible');
    if (timerId) {clearTimeout(timerId)}
    // write the timeout id into the object
    
    switch (true) {
      case closeBtnAttempts < 3:
        closeShellText.innerHTML = originalText;
        timerId = setTimeout(() => {
          closeShellWindow.classList.remove('js-closing-shell-check-visible');
          timerId = {};
        }, 2000);
        break;
    
      case closeBtnAttempts >= 3 && closeBtnAttempts < 6:
        closeShellText.textContent = 'STOP IT!!!!';
        timerId = setTimeout(() => {
          closeShellWindow.classList.remove('js-closing-shell-check-visible');
          timerId = {};
        }, 2000);
        break;
    
      case closeBtnAttempts >= 6 && closeBtnAttempts < 10:
        closeShellText.textContent = 'HAHA YOU CANT CLOSE THIS WINDOW. FUCK YOU!!!!';
        timerId = setTimeout(() => {
          closeShellWindow.classList.remove('js-closing-shell-check-visible');
          timerId = {};
        }, 2000);
        break;
    
      case closeBtnAttempts >= 10 && closeBtnAttempts < 15:
        closeShellText.textContent = "Okay, stop pressing, I won't remove this element";
        timerId = setTimeout(() => {
          closeShellWindow.classList.remove('js-closing-shell-check-visible');
          timerId = {};
        }, 2000);
        break;

      case closeBtnAttempts >= 15:
        closeShellText.textContent = "Dumbass, this element is the main focus";
        timerId = setTimeout(() => {
          closeShellWindow.classList.remove('js-closing-shell-check-visible');
          timerId = {};
          closeBtnAttempts = 0;
        }, 2000);
        break;
    }
  };
  closePopup();
}

/* 
new ideas:
1. add a box with something fun that appears when the x button on the console gets pressed
2. possibly do the same for the other buttons too.
3. add a link to the zsh project when clicking on the zsh text
?. fuckin finish this goddamn terminal mockup */
