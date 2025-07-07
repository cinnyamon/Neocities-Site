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
    <pre>
    </pre>
    <div id="pre-test"></div>
    <div id="shell-input-container">
      ${shellName}
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
  // create array to store the user's input
  const userInputArray = [];
  
  // set previous timer object to store the id of the setInterval and clear it later on
  let previousTimerId = {};
  writableBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      // push the text content from the input box into the array
      userInputArray.push(writableBox.textContent);
      
      // only take the last item to be put into the shell
      const enteredText = userInputArray[userInputArray.length - 1];
      // use DOMPurify lib to only allow p span and classes to these items for the user's entered text
      const safeUserInput = DOMPurify.sanitize(enteredText, {
        ALLOWED_TAGS: ['p', 'span'],
        ALLOWED_ATTR: ['class']
      });

      
      // create array of bad words
      const badWords = ['fag', 'faggot', 'idiot', 'idot', 'retard', 'dumbass', 'dumb', 'nig', 'nigger', 'dummy', 'cunt', 'stupid', 'stoopi', 'sucker', 'jew', 'kike', ];
      badWords.forEach(badword => {
        if (enteredText.includes(badword)) {
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


      preTest.innerHTML += `<p>${shellName}${safeUserInput}</p>`;

      

      // hopefully this runs last
      textArea.textContent = '';
    };
  });
}

/* 
new ideas:
1. should do something about the blinking block still blinking after checking for any character inside the span. remove class or something
2. wait for the key enter and then take the text input from the span and place it above the username and span textbox. should be pretty ez defining a variable and then placing it +1 +1 and updating each +1 with the new content. wrong. do array.
3. fuckin finish this goddamn terminal mockup */