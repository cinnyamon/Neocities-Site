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









const grid = document.querySelector('.grid-stack');


new GridStack(grid, {
    sizeToContent: true,
    margin: '20px',
    resizable: { autoHide: false, handles: "se" },
    animate: true,
})

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
