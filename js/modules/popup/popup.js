const getTemplate = (message, type) => {
  const popupItem = document.createElement('div')
  popupItem.classList.add('popup__item')
  popupItem.innerHTML = `
    <span class="popup__close"></span>
    <div class="popup__content">
      <img src="icons/popup/${type}.png" alt="${type}" />
      <p>${message}</p>
    </div>
  `

  return popupItem
}

export class Popup {
  constructor(selector) {
    this.$el = document.querySelector(selector)
    this.#setup
  }

  #setup() {
    this.$el.classList.add('popup')
  }

  create(options) {
    this.closeAll()

    const { message, type } = options
    this.currentMessage = getTemplate(message, type)
    this.$el.insertAdjacentElement('afterbegin', this.currentMessage)

    this.close(this.currentMessage)
  }

  close(element) {
    setTimeout(() => {
      element.remove()
    }, 5000)
  }

  closeAll() {
    this.massages = document.querySelectorAll('.popup__item')
    this.massages.forEach((item) => item.remove())
  }

  destroy() {
    this.$el.innerHTML = ''
  }
}
