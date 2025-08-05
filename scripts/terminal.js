//my plan is to load the website and replace the html with javascript if it is enabled. if it is not then simply fall back to a simpler shell with no interactivity.


/* 1. clear console
2. wait for user scroll
3. when scroll detected
4. initialize delay of 1-5s
5. display shell colors script in 1 or multiple batches
6. let user enter any text inside shell
7. ideally make the shell scrollable when new text is added by user but probably quite difficult to implement. */

// for reference '\u00A0' is a non breaking space (&nbsp;), i use it for spaces that the flex container collapses



// storing the css and js shells texts into constants
const badWordWarning = document.querySelector('.js-badwords-div');
const termMainBody = document.querySelector('.terminal-main-body');
const termClose = document.querySelector('.term-close');
const closeShellWindow = document.querySelector('.js-closing-shell-check');
const closeShellText = document.getElementById('js-close-shell-text');

const jsShellHTML = `JavaScript detected. Initialize interactive console...`;

const shellUsername = document.createElement('span');
shellUsername.classList.add('username');
shellUsername.textContent = 'cinny';

const shellSitename = document.createElement('span');
shellSitename.classList.add('sitename');
shellSitename.textContent = 'neocities';

const shellBlinkingBlock = document.createElement('span');
shellBlinkingBlock.classList.add('blinking-block');
shellBlinkingBlock.innerHTML = '&#9608;'

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
              setTimeout(typeWriter, 50); // 50
            } else {
              resolve(termMainBody.innerHTML); // takes termMainBody and adds to resolve function for use to use with .then
            }
          }
          typeWriter();
        }, 2000); // 2000
      });
    }
    setTimeout(() => {
      document.getElementById('css-shell').remove();
    }, 2000) // 2000

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

      const userGenContent = document.createElement('div');
      userGenContent.setAttribute('id', 'user-generated-content');

      const shellInputContainer = document.createElement('div');
      shellInputContainer.setAttribute('id', 'shell-input-container');
      
        // create shit inside the shell input container
        const writableBox = document.createElement('span');
        writableBox.setAttribute('id', 'writable-box');
        writableBox.setAttribute('role', 'textbox');
        writableBox.setAttribute('tabindex', '0');
        writableBox.setAttribute('maxlength', '60');
        writableBox.contentEditable = true;

        // append the created shit inside the shell input container
        shellInputContainer.append(
          shellUsername,
          '@',
          shellSitename,
          ':~$\u00A0',
          writableBox,
          shellBlinkingBlock,
        )

      // append everything to the terminal main body
      termMainBody.innerHTML = `
        ${savedJsShellText}
        ${shellColors()}
        `
      termMainBody.append(
        userGenContent,
        shellInputContainer,
      )

      focusTextBoxOnClick(writableBox);
      maxCharacterInput(writableBox);
      displayCmndInShell(writableBox, userGenContent, termMainBody);
    }, 800); // 800
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
        moveCaretAtTheEnd(writableBox);
      }
    });
}

function displayCmndInShell(writableBox, userGenContent) {
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


      // create the paragraph element which will contain all the user input text
      
      const generatedP = document.createElement('p');
      generatedP.setAttribute('id', 'generatedp');
      generatedP.style = 'display: flex';
      generatedP.append(
        shellUsername.cloneNode(true),
        '@',
        shellSitename.cloneNode(true),
        ':~$ ',
        safeUserInput);

      // create the span to show the result in to display in the terminal
      const userCommandSpan = document.createElement('span');
      userCommandSpan.style = 'color: grey';

      const safeUILowerCaseTrim = safeUserInput.toLowerCase().trim();
      const bannedLettersRGX = /^[etisghlbm]$/i;
      const date = new Date();
      const currentTime = {

        currentDateLong: date.toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: "numeric"}),
        currentDateShort: date.toLocaleString('en-US', { dateStyle: 'short' }),

        currentTimeLong: date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true, timeZoneName: 'short' }),
        currentTimeShort: date.toLocaleString('en-US', { timeStyle: 'short' }),
      }

      // early return
      if (bannedLettersRGX.test(safeUILowerCaseTrim)) {
        userGenContent.append(generatedP)
        // wait until the term updates then clear user input
        setTimeout(() => {
          writableBox.textContent = '';
        }, 0);

        return;
      }
      // main logik
      if (!bannedLettersRGX.test(safeUILowerCaseTrim)) {
        try {
          const result = math.evaluate(safeUILowerCaseTrim);
          // change to =
          userCommandSpan.insertAdjacentHTML('beforeend', '\u00A0=\u00A0');
          
          appendTermCommand(result, userCommandSpan, generatedP, userGenContent, writableBox)

        } catch {
          // change from = to >
          userCommandSpan.insertAdjacentHTML('beforeend', '\u00A0>\u00A0');

          // handle ALL user commands
          userCommand(safeUILowerCaseTrim, currentTime, userCommandSpan, generatedP, userGenContent, writableBox);
          
          // if the above function returns with no cases matching the code below runs
          userGenContent.append(generatedP)
          setTimeout(() => {
            writableBox.textContent = '';
          }, 0);
  
          return;
        } 
      }
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
    if (arrow.key === 'ArrowUp') {

      if (arrowUpCounter < maxArrowUpCounter) {
        arrowUpCounter++;
      };

      const reversed = userInputArray.toReversed();
      for (const [index, value] of reversed.entries()) {
        if (index === arrowUpCounter) {

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

          writableBox.textContent = value;

          setTimeout(() => {
            moveCaretAtTheEnd(writableBox)
          }, 0);
        };
      };
    };
  });
};

const userCommand = (safeUILowerCaseTrim, currentTime, userCommandSpan, generatedP, userGenContent, writableBox) => {
  if (safeUILowerCaseTrim.includes('short')) {

    if (safeUILowerCaseTrim.includes('time')) {
      appendTermCommand(currentTime.currentTimeShort, userCommandSpan, generatedP, userGenContent, writableBox);
      return;
    }
    if (safeUILowerCaseTrim.includes('date')) {
      appendTermCommand(currentTime.currentDateShort, userCommandSpan, generatedP, userGenContent, writableBox);
      return;
    }
    return;
  }

  if (safeUILowerCaseTrim.includes('time')) {
    appendTermCommand(currentTime.currentTimeLong, userCommandSpan, generatedP, userGenContent, writableBox);
    return;
  }

  if (safeUILowerCaseTrim.includes('date')) {
    appendTermCommand(currentTime.currentDateLong, userCommandSpan, generatedP, userGenContent, writableBox);
    return;
  }

  if (safeUILowerCaseTrim.includes('cat')) {
    appendTermCommand('KITTENS YAAAYYYYYYY', userCommandSpan, generatedP, userGenContent, writableBox)
  }
}

const appendTermCommand = (command, userCommandSpan, generatedP, userGenContent, writableBox) => {
  // append the result to the span
  userCommandSpan.append(command);
  // append the span to the generated paragraph that duplicates each time you press enter
  generatedP.append(userCommandSpan.cloneNode(true));
  // and append the paragraph to the userGenContent div
  userGenContent.append(generatedP);

  setTimeout(() => {
    writableBox.textContent = '';
  }, 0);
}

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
    const originalText = closeShellText.innerHTML;
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
