const getTemplate = (rateB, currencyA, currencyB) => {
  const template = document.createElement('div')
  template.classList.add('history__item')
  template.innerHTML = `
    <div class="history__rate">
      <div class="item">UAH</div>
      <span>${currencyA}</span>
    </div>
    <span class="arrow"></span>
    <div class="history__rate">
      <div class="item">${rateB}</div>
      <span>${currencyB}</span>
    </div>
  `

  return template
}

export class History {
  constructor(selector) {
    this.$el = document.querySelector(selector)
  }

  #setup() {
    this.$el.classList.add('history')
  }

  create(options) {
    const { rateB, currencyA, currencyB } = options

    this.#setup
    this.$el.insertAdjacentElement(
      'afterbegin',
      getTemplate(rateB, currencyA, currencyB)
    )
  }

  destroy() {
    this.$el.innerHTML = ''
  }
}
