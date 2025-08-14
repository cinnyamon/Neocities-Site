const grid = document.querySelector('.grid-stack');

new GridStack(grid, {
    sizeToContent: false,
    column: 5,
    minRow: 1,
    
    cellHeight: 'auto',
    children: [
      {
        content: `1`,
        id: "first-main",
        locked: false,
        noMove: false,
        noResize: false,
        sizeToContent: false,
        minH: 1,
        minW: 1,
        w: 1,
        h: 1,
        x: 0,
        y: 0,
      },
      {
        content: `2`,
        id: "who",
        locked: false,
        noMove: false,
        noResize: false,
        sizeToContent: false,
        minH: 1,
        minW: 1,
        w: 1,
        h: 2,
        x: 1,
        y: 0,
      },
      {
        content: `3`,
        id: "what",
        locked: false,
        noMove: false,
        noResize: false,
        sizeToContent: false,
        minH: 1,
        minW: 1,
        w: 1,
        h: 1,
        x: 2,
        y: 0,
      },
      {
        content: `4`,
        id: "site-explanation",
        locked: false,
        noMove: false,
        noResize: false,
        sizeToContent: false,
        minH: 1,
        minW: 1,
        w: 1,
        h: 2,
        x: 3,
        y: 0,
      },
      {
        content: `5`,
        id: "feature-suggestion",
        locked: false,
        noMove: false,
        noResize: false,
        sizeToContent: false,
        minH: 1,
        minW: 1,
        w: 1,
        h: 2,
        x: 0,
        y: 1,
      },
      {
        content: `6`,
        id: "artist-feature",
        locked: false,
        noMove: false,
        noResize: false,
        sizeToContent: false,
        minH: 1,
        minW: 1,
        w: 2,
        h: 2,
        x: 5,
        y: 0,
      },
      // {
      //   content: `7`,
      //   id: "lead-time",
      //   locked: false,
      //   noMove: false,
      //   noResize: false,
      //   sizeToContent: false,
      //   minH: 1,
      //   minW: 1,
      //   w: 1,
      //   h: 1,
      //   x: 2,
      //   y: 1,
      // },
    ],

    columnOpts: {
      breakpoints: [
        {
          c: 8,
          w: 1000600, // yeah cba to search for a default fallback deal with it
        },
        {
          c: 7,
          w: 1700,
        },
        {
          c: 6,
          w: 1200,
        },
        {
          c: 3,
          w: 996,
        },
        {
          c: 2,
          w: 768,
        },
        {
          c: 2,
          w: 480,
        },
        {
          c: 1,
          w: 300,
        },
      ],
      layout: "list",
    },

    margin: '20px',
    resizable: { autoHide: false},
    animate: true,
})


const qaGrid = document.querySelector('.qa-grid')

document.addEventListener('DOMContentLoaded', (e) => {
  const firstMain = document.querySelectorAll('[gs-id]');
  console.log(firstMain)

  firstMain.forEach((gridItem) => {
    const gsId = gridItem.getAttribute('gs-id'); 
    const contentEl = gridItem.querySelector('.grid-stack-item-content');
    
    switch (true) {
      case gsId === 'first-main':
        contentEl.innerHTML = `
        [1]
        <p class="qa-item-title">
          Hello, you're probably asking yourself a few questions that I
          think I could answer within a few cards.
        </p>`;
        break;

      case gsId === 'who':
        contentEl.innerHTML = `
        [2]
        <p class="qa-item-title">Who am I?</p>
        <hr>
        <p class="qa-content">
          Some 21 year old beginner programmer that literally had no
          intention of ever learning to program until !!TIME!! months
          ago. Then I learnt HTML and CSS and swore to not learn
          JavaScript but somehow it attracted me with its endless
          posibilities for features and endless posibilities of errors
          out its ass.
        </p>`;
        break;

      case gsId === 'what':
        contentEl.innerHTML = `
        [3]
        <p class="qa-item-title">What is this website?</p>
        <hr>
        <p class="qa-content">
          An attempt at my first website. Think it looks pretty good but
          I probably need a second opinion. Or third.
        </p>`;
        break;

      case gsId === 'site-explanation':
        contentEl.innerHTML = `
        [4]
        <p class="qa-item-title">What can I do on here?</p>
        <hr>
        <p class="qa-content">
          Idk mate, look around. If you're genuinely asking then the
          Terminal above has a few functionalities like:
        </p>
        <hr>
        <ul class="qa-content">
          <li>Calc (short for calculator)</li>
          <li>Time</li>
          <li>Date</li>
          <p class="qa-content">Short versions of Time and Date</p>
          <li>Limited set of div's, p's and some attributes</li>
          <li>Drag these panels around for fun.</li>
          <li>Uh.. enter... any text... you want?..</li>
        </ul>`;
        break;

      case gsId === 'feature-suggestion':
        contentEl.innerHTML = `
        [5]
        <p class="qa-item-title">
          Can I suggest a feature or command for the terminal?
        </p>
        <hr>
        <p class="qa-content">
          Yeah, just send an email at the address below you don't need
          to include formalities you can just send in the subject the
          command name and i'll look into it. If it's worth adding i'll
          email you back (if possible) with a thanks.
        </p>`;
        break;

      case gsId === 'artist-feature':
        contentEl.innerHTML = `
        [6]
        <p class="qa-item-title">Have you seen my girlfriends art?</p>
        <hr>
        <div>
          <a class="link" rel="no-referrer" href="https://www.tumblr.com/wtfremex">Tumblr</a>
          <a class="link" rel="no-referrer" href="https://twitter.com/wtfremex">Twitter</a>
          <a class="link" rel="no-referrer" href="https://www.pixiv.net/en/users/52178837">Pixiv</a>
        </div>
        <div class="qa-content-img" oncontextmenu="return false;" draggable="false"></div>

        <p class="qa-fun">(now you have :>)</p>`;
        break;
    
    }
  })


  // <img class="qa-content-img" oncontextmenu="return false;" draggable="false" src="./img/artist-promo.jpg" />


  // if (firstMain) {
  //   const contentEl = firstMain.querySelector('.grid-stack-item-content');
  //   if (contentEl) {
  //     contentEl.innerHTML = '<p>New HTML content</p>';
  //   }
  // }
})






// trash code below

// const grid = new Muuri('.grid', {
//   dragEnabled: true,
//   layoutOnResize: false, // We'll handle layout manually
// });

// let waitTime = 0

// function updateItemWidths() {
//   const gridEl = document.querySelector('.grid');
//   const containerWidth = gridEl.parentElement.clientWidth;
//   const minItemWidth = 200;
//   const gutter = 10;

//   const columnCount = Math.floor((containerWidth + gutter) / (minItemWidth + gutter));
//   const actualColumnCount = columnCount > 0 ? columnCount : 1;

//   const itemWidth = Math.floor((containerWidth - gutter * (actualColumnCount - 1)) / actualColumnCount);

//   // Set item widths
//   document.querySelectorAll('.item-content').forEach((el) => {
//     el.style.width = itemWidth + 'px';
//   });

//   // Set total grid width based on columns
//   const totalGridWidth = itemWidth * actualColumnCount + gutter * (actualColumnCount - 1);
//   gridEl.style.width = totalGridWidth + 'px';

//   // Center the grid by setting margin auto
//   gridEl.style.margin = '0 auto';

//   // Refresh layout
//   grid.refreshItems().layout();
// }

// updateItemWidths();

// // Update on resize
// window.addEventListener('resize', () => {
//   if (Date.now() > waitTime) {
//     updateItemWidths();

//     waitTime = Date.now() + 1000 / 10
//   }
// });





// window.addEventListener('load', () => {
//   document.querySelectorAll('.grid-stack-item').forEach(item => {
//     const content = item.querySelector('.grid-stack-item-content');
//     if (!content) return;

//     content.style.height = 'auto';
//     const pxHeight = content.offsetHeight;

//     const rows = Math.max(1, Math.ceil((pxHeight + grid.opts.margin) /
//       (parseInt(grid.opts.cellHeight, 10) + grid.opts.margin)));

//     grid.update(item, { h: rows });
//   });
// });
