const CODES = {
  'A': 65,
  'Z': 90
}

function createCell(row) {
  return function(_, col) {
    return `
        <div 
        class="cell"
        contenteditable 
        data-col="${col}" 
        data-id="${row}:${col}"
        data-type="cell"
        >
        </div>
   `
  }
}
function createCol(col, index) {
  return `
  <div class="column" data-type="resizable" data-col="${index}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>
  `
}

function createRow(content, num = '') {
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${num}
        ${num !== '' ? '<div class="row-resize" data-resize="row"></div>' : ''}
      </div>
      <div class="row-data">${content}</div>
    </div>`
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 16) {
  const colsCount = CODES.Z - CODES.A + 1
  const cols = new Array(colsCount).fill('')
      .map(toChar)
      .map(createCol)
      .join('')
  const rows = []
  rows.push(createRow(cols))
  for (let row = 0; row < rowsCount; row++) {
    const cols = new Array(colsCount).fill('')
        .map(createCell(row)).join('')
    rows.push(createRow(cols, row+1))
  }
  return rows.join('')
}
