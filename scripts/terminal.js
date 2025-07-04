//my plan is to load the website and replace the html with javascript if it is enabled. if it is not then simply fall back to a simpler shell with no interactivity.

//if the user has js enabled then the shell will clear itself and initialize a delay of 1-5 seconds once the user has started scrolling (non dependant on scroll position) and display the shell colors script.

/* 1. clear console
2. wait for user scroll
3. when scroll detected
4. initialize delay of 1-5s
5. display shell colors script in 1 or multiple batches
6. let user enter any text inside shell
7. ideally make the shell scrollable when new text is added by user but probably quite difficult to implement. */


// this function runs when the site loads and clears the entire
// shell vvvv
function clearShell() {
  // storing the css and js shells texts into constants
  const cssShell = document.querySelector('.css-shell');
  const jsShell = document.querySelector('.js-initialize-shell');
  const jsShellHTML = `JavaScript detected. Initialize console clear...`

  function clearCssAndJsShell() {
    let index = 0
    setTimeout(() => {
      //typewriter effect function
      function typeWriter() {
        if (index < jsShellHTML.length) {
          jsShell.textContent += jsShellHTML.charAt(index);
          index++;
          setTimeout(typeWriter, 32)
        }
      }
      typeWriter()
    }, 2000);
  
    //the settimeout below will wait 4 seconds and after 4s 
    // it will clear the cssShell and then start the other 
    //settimeout inside which will wait another 2 seconds before
    //clearing the jsShell.
    setTimeout(() => {
      cssShell.innerHTML = '';
      setTimeout(() => {
        jsShell.innerHTML = '';
      }, 2000)
    }, 4000);
    //more code can be placed here because the first settimeout
    //is waiting 2 seconds and passes to the next block of code
    //then the second settimeout is waiting 4 seconds and passes
    //to any code i can add below here in this function.
  }
  clearCssAndJsShell()
}

let hasScrolled = false
window.addEventListener('scrollend', (event) => {
  function shellColors() {
    const T = '////';
    const container = document.getElementById("shellColors");
  
    // ANSI-style label codes
    const fgColors = {
      '  30m': "black",
      '1;30m': "black",
      '  31m': "red",
      '1;31m': "red",
      '  32m': "green",
      '1;32m': "green",
      '  33m': "gold",
      '1;33m': "gold",
      '  34m': "blue",
      '1;34m': "blue",
      '  35m': "magenta",
      '1;35m': "magenta",
      '  36m': "cyan",
      '1;36m': "cyan",
      '  37m': "white",
      '1;37m': "white"
    };
  
    const fgBold = {
      '  30m': false,
      '1;30m': true,
      '  31m': false,
      '1;31m': true,
      '  32m': false,
      '1;32m': true,
      '  33m': false,
      '1;33m': true,
      '  34m': false,
      '1;34m': true,
      '  35m': false,
      '1;35m': true,
      '  36m': false,
      '1;36m': true,
      '  37m': false,
      '1;37m': true
    };
  
    const bgColors = {
      '40m': "black",
      '41m': "red",
      '42m': "green",
      '43m': "gold",
      '44m': "blue",
      '45m': "magenta",
      '46m': "cyan",
      '47m': "white"
    };
  
    // Build top header row
    let html = `<pre style="margin: 0 0 0 10px; font-family: "Space Mono"">         `;
    for (const [bgCode, bgColor] of Object.entries(bgColors)) {
      html += `<span style="color: white"> ${bgCode}  </span>`;
    }
    html += `\n`;
  
    // Build rows
    for (const [fgCode, fgColor] of Object.entries(fgColors)) {
      html += `<span style="color: white"> ${fgCode} </span>`;
  
      for (const [bgCode, bgColor] of Object.entries(bgColors)) {
        html += `<span style="color:${fgColor}; background:${bgColor}; ${
          fgBold[fgCode] ? 'font-weight:bold;' : ''
        } padding:0 1ch;">${T}</span> `;
      }
  
      html += `\n`;
    }
  
    html += `</pre>`;
  
    document.querySelector('.js-shell').innerHTML = html

  }

  if (hasScrolled === false) {
    clearShell();
    hasScrolled = true //never runs again
    setTimeout(() => {
      shellColors()
    }, 6000)
  };
})

// idea: couldve added a settimeout to the hasscrolled for 6 seconds
// to turn true and then used that to trigger the 
// shellColors function to run on the shell div

