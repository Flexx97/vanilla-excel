import {ExcelComponent} from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options
    })
  }
  toHTML() {
    return ' <div class="excel__header">\n' +
      '      <input type="text" class="input" value="Новая таблица">\n' +
      '      <div>\n' +
      '        <div class="button">\n' +
      '          <span class="material-icons">logout</span>\n' +
      '        </div>\n' +
      '        <div class="button">\n' +
      '          <span class="material-icons">delete</span>\n' +
      '        </div>\n' +
      '      </div>\n' +
      '    </div>'
  }
}
