const CODES = {
  'A': 65,
  'Z': 90
}

function createCell() {
  return `
  <div class="cell" contenteditable></div>
  `
}
function createCol(col) {
  return `
  <div class="column">${col}</div>
  `
}

function createRow(content, num = '') {
  return `
    <div class="row">
      <div class="row-info">${num}</div>
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
  for (let i =0; i<rowsCount; i++) {
    const cols = new Array(colsCount).fill('').map(createCell).join('')
    rows.push(createRow(cols, i+1))
  }
  return rows.join('')
}
