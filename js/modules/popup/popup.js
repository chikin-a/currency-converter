const getTemplate = () => {}

export class Popup {
  constructor(selector, options) {
    this.$el = querySelector(selector)
  }

  open() {
    $el.classList.add('open')
  }

  close() {
    $el.classList.remove('open')
  }

  destroy() {
    this.$el.innerHTML = ''
  }
}
