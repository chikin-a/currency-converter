const getTemplate = (data = [], placeholder, selectedCode) => {
  let text = placeholder ?? 'text'

  const items = data.map((item) => {
    let cls = ''

    if (item.code == selectedCode) {
      text = item.text
      cls = 'selected'
    }

    return `
      <li class="select__item ${cls}" data-type="item" data-code="${item.code}">${item.text}</li>
    `
  })

  return `
  <div class="select__backdrop" data-type="backdrop"></div>
  <div class="select__input" data-type="input">
    <span data-type="value">${text}</span>
  </div>
  <div class="select__dropdown">
    <ul class="select__list">
      ${items.join('')}
    </ul>
  </div>
  `
}

export class Select {
  constructor(selector, options, selectedCode) {
    this.$el = document.querySelector(selector)
    this.options = options
    this.selectedCode = selectedCode

    this.#render()
    this.#setup()
  }

  #render() {
    const { data, placeholder, selectedCode } = this.options
    this.$el.classList.add('select')
    this.$el.innerHTML = getTemplate(data, placeholder, selectedCode)
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.$el.addEventListener('click', this.clickHandler)
    this.$value = this.$el.querySelector('[data-type="value"]')
  }

  clickHandler(event) {
    const { type } = event.target.dataset

    if (type === 'input' || type === 'value') {
      this.toggle()
    } else if (type === 'item') {
      const code = event.target.dataset.code
      this.select(code)
    } else if (type === 'backdrop') {
      this.close()
    }
  }

  get isOpen() {
    return this.$el.classList.contains('open')
  }

  get current() {
    return this.options.data.find((item) => item.code == this.selectedCode)
  }

  select(code) {
    this.selectedCode = code
    this.$value.textContent = this.current.text

    this.$el
      .querySelectorAll(`[data-type="item"]`)
      .forEach((item) => item.classList.remove('selected'))
    this.$el.querySelector(`[data-code="${code}"]`).classList.add('selected')

    this.options.onSelect ? this.options.onSelect(this.current) : null

    this.close()
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  open() {
    this.$el.classList.add('open')
  }

  close() {
    this.$el.classList.remove('open')
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler)
    this.$el.innerHTML = ''
  }
}
