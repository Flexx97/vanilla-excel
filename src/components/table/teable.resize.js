import {$} from '@core/dom'

export function tableResizeHandler($root, event) {
  const $target = $(event.target)
  const $parent = $target.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $target.data.resize
  const sideProp = type === 'col' ? 'height' : 'width'
  let value
  $target.css({
    opacity: 1,
    [sideProp]: 100 + 'vw'
  })
  document.onmousemove = e => {
    if (type === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $target.css({
        right: -delta + 'px'
      })
    } else {
      const delta = e.pageY - coords.bottom
      value = delta + coords.height
      $target.css({
        bottom: -delta + 'px'
      })
    }
  }
  document.onmouseup = () => {
    if (type === 'col') {
      $parent.css({
        width: value + 'px'
      })
      $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => el.style.width = value + 'px')
      $target.css({
        height: 'auto',
        right: 0
      })
    } else {
      $parent.css({
        height: value + 'px'
      })
      $target.css({
        width: 'auto',
        bottom: 0
      })
    }
    $target.css({
      opacity: 0,
    })
    document.onmousemove = null
    document.onmouseup = null
  }
}
