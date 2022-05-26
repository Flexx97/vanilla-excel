import {ExcelComponent} from '@core/ExcelComponent'

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar'
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click']
    })
  }
  toHTML() {
    return '<h1>Toolbar</h1>'
  }
  onClick(event) {
    console.log(event.target)
  }
}
