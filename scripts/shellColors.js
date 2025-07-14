export function shellColors() {
  const T = '////';
  const container = document.getElementById("shellColors");

  // ANSI-style label codes
  const fgColors = {
    '  30m': "rgb(0, 0, 0)",
    '1;30m': "rgb(0, 0, 0)",
    '  31m': "rgb(255, 52, 38)",
    '1;31m': "rgb(255, 52, 38)",
    '  32m': "rgb(83, 255, 44)",
    '1;32m': "rgb(83, 255, 44)",
    '  33m': "rgb(255, 139, 44)",
    '1;33m': "rgb(255, 139, 44)",
    '  34m': "rgb(40, 140, 227)",
    '1;34m': "rgb(40, 140, 227)",
    '  35m': "rgb(183, 73, 211)",
    '1;35m': "rgb(183, 73, 211)",
    '  36m': "rgb(103, 208, 175)",
    '1;36m': "rgb(103, 208, 175)",
    '  37m': "rgb(255, 255, 255)",
    '1;37m': "rgb(255, 255, 255)"
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
    '40m': "rgb(0, 0, 0)",
    '41m': "rgb(255, 52, 38)",
    '42m': "rgb(83, 255, 44)",
    '43m': "rgb(255, 139, 44)",
    '44m': "rgb(40, 140, 227)",
    '45m': "rgb(183, 73, 211)",
    '46m': "rgb(103, 208, 175)",
    '47m': "rgb(255, 255, 255)"
  };

  // Build top header row
  let html = `<pre style="margin: 5px 0; font-family: Space Mono">         `;
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

  return html
}