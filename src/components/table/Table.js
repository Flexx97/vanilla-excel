import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {tableResizeHandler} from '@/components/table/teable.resize'
import {
  isCell,
  matrix,
  nextSelector,
  shouldResize
} from '@/components/table/table.fucntions'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
    this.unsubs = []
  }
  toHTML() {
    return createTable()
  }
  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)
    this.$on('formulaText', text => {
      this.selection.current.text(text)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }
  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      tableResizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        // group
        const target = $target.id(true)
        const current = this.selection.current.id(true)
        const $cells = matrix(target, current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else this.selectCell($target)
    }
  }
  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ]
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const {row, col} = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, col, row))
      this.selectCell($next)
    }
  }
}


