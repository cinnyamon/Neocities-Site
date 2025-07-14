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
const cssShell = document.querySelector('.css-shell');
const jsTermShell = document.querySelector('.js-terminal-shell');
const termClose = document.querySelector('.term-close');
const closeShellWindow = document.querySelector('.js-closing-shell-check');
const closeShellText = document.getElementById('js-close-shell-text');
const originalText = closeShellText.innerHTML;

const jsShellHTML = `JavaScript detected. Initialize console ...`;
const shellName = `<span class="username">name</span>@<span class="sitename"
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
              jsTermShell.innerHTML += `${jsShellHTML.charAt(index)}`;
              index++;
              setTimeout(typeWriter, 32);
            } else {
              resolve(jsTermShell.innerHTML); // takes jsTermShell and adds to resolve function for use to use with .then
            }
          }
          typeWriter();
        }, 2000);
      });
    }
    setTimeout(() => {
      cssShell.remove();
    }, 3000)

    return runTypeWriterPromise(); //returns the promise
  }
  
  return clearCssAndJsShell(); //returns the promise to global scope
}

// the code below basically receives the value passed to resolve(jsInitshell) and names it jsDetectionText now so we can use it to console log it or store it in a variable
clearShell().then((jsDetectionText) => {
  savedJsShellText = jsDetectionText
    // setting up the scrolling observer in a constant for future potential cleanup
  const scrollObserver = shellScrollObserver(jsTermShell);
    // clean up when needed
    // observer.disconnect();
  jsTermShell.innerHTML = `
    ${savedJsShellText}
    ${shellColors()}
<<<<<<< HEAD
    <pre>
    </pre>
    <div id="pre-test"></div>
    <div id="shell-input-container">
      ${shellName}&nbsp;
=======
    <div id="pre-test"></div>
    <div id="shell-input-container">
      ${shellName}
>>>>>>> 2ce53d7c3072dcb0f0d5a8b8210f4511eef19d10
        <span id="writable-box" role="textbox" tabindex="0" class="writable-textarea" maxlength="60" contenteditable>
        </span>${shellBlinkingBlock}
    </div>`
    
    let preTest = document.getElementById('pre-test');
    const writableBox = document.getElementById('writable-box');
    const textArea = document.querySelector('.writable-textarea');

    focusTextBoxOnClick(writableBox);
    maxCharacterInput(writableBox);
    displayCmndInShell(writableBox, preTest, textArea, jsTermShell);
});

function shellScrollObserver(jsTermShell) {
    const observer = new MutationObserver(() => {
        jsTermShell.scrollTop = jsTermShell.scrollHeight;
    });
    
    observer.observe(jsTermShell, {
        childList: true,
        subtree: true
    });
    
    return observer;
}

function focusTextBoxOnClick(writableBox) {
  jsTermShell.addEventListener('click', () => {
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
<<<<<<< HEAD
  const testArray = []
  writableBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      testArray.push(writableBox.textContent);
      
      const enteredText = testArray[testArray.length - 1];
      preTest.innerHTML += `<p>${shellName} ${enteredText}</p>`

      if (enteredText === 'nigger') {
        console.log('why would you call me that..')
      }
=======
  // create array to store the user's input
  const userInputArray = [];
  
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

      // create variable that stores if checkbox has been shown already
      let checkBoxShown = 0
      // create array of bad words
      const badWords = ['fag', 'faggot', 'idiot', 'idot', 'retard', 'dumbass', 'dumb', 'nig', 'nigger', 'dummy', 'cunt', 'stupid', 'stoopi', 'sucker', 'jew', 'kike', ];
      // this is basically a for each loop but one where we can use break
      for (let badword of badWords) {
        if (enteredText.includes(badword)) {
          showCheckBox(enteredText, badword, checkBoxShown, previousTimerId);
          break; // stops after the first match
        }
      }
      preTest.innerHTML += `<p>${shellName}${safeUserInput}</p>`;

>>>>>>> 2ce53d7c3072dcb0f0d5a8b8210f4511eef19d10
      // hopefully this runs last
      textArea.textContent = '';
    };
  });
<<<<<<< HEAD
}
=======
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
  });
};

termClose.addEventListener('click', () => {
  showClosePopupOnClick();
});
>>>>>>> 2ce53d7c3072dcb0f0d5a8b8210f4511eef19d10

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

function showClosePopup() {
  const closingShellChkInner = document.createElement('div');
  closingShellChkInner.classList.add('closing-shell-check');

  const closingShellChkP = document.createElement('p');
  closingShellChkP.innerHTML = `Stop trying to close this window. &#96;&#8231;&#8248;&#8231;&#180;`;

  // append them
  closingShellChkInner.appendChild(closingShellChkP);
  closeShellWindow.appendChild(closingShellChkInner);

  closeShellWindow.classList.add('js-closing-shell-check-visible');
}





// I LEFT HERE I NEED TO COPY WHATS ON THE BOTTOM TO THE TOP OF THIS AND THEN STYLE EVERYTHING CORRECTLY IN CSS.







function showCheckBox(enteredText,badword,checkBoxShown,previousTimerId) {
  if (enteredText.includes(badword)) {
    if (checkBoxShown === 0) {
      checkBoxShown = 1;
  
      // Create outer warning wrapper
      const badWordWarnInner = document.createElement('div');
      badWordWarnInner.classList.add('badwords-div-inner');
  
      // Create p and span
      const badWordsInnerP = document.createElement('p');
      badWordsInnerP.textContent = 'Why would you call me that..';
  
      const badWordsInnerSpan = document.createElement('span');
      badWordsInnerSpan.innerHTML = '&#180;&#8226;&#8276;&#8226;&#180;';
  
      // append all the created elements to the divs
      badWordWarnInner.appendChild(badWordsInnerP);
      badWordWarnInner.appendChild(badWordsInnerSpan);
      badWordWarning.appendChild(badWordWarnInner);
  
      // Show warning
      badWordWarning.classList.add('js-badwords-div-visible');
  
      // Clear previous timer if it exists
      if (previousTimerId) {
        clearTimeout(previousTimerId);
      }
  
      // Start timer to hide warning
      previousTimerId = setTimeout(() => {
        badWordWarning.classList.remove('js-badwords-div-visible');
        badWordWarning.innerHTML = ""; // Remove message contents
        checkBoxShown = 0; // Reset so it can show again
        previousTimerId = null;
      }, 1000);
    }
  }
}
/* 
new ideas:
<<<<<<< HEAD
1. should do something about the blinking block still blinking after checking for any character inside the span. remove class or something
2. wait for the key enter and then take the text input from the span and place it above the username and span textbox. should be pretty ez defining a variable and then placing it +1 +1 and updating each +1 with the new content. wrong. do array.
3. fuckin finish this goddamn terminal mockup */
=======
1. add a box with something fun that appears when the x button on the console gets pressed
2. possibly do the same for the other buttons too.
3. add a link to the zsh project when clicking on the zsh text
?. fuckin finish this goddamn terminal mockup */
>>>>>>> 2ce53d7c3072dcb0f0d5a8b8210f4511eef19d10
