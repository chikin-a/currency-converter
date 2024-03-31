import { getData } from './modules/getData.js'
import { converter } from './modules/converter.js'
import { Select } from './modules/select/select.js'
import { History } from './modules/history/history.js'
import { Popup } from './modules/popup/popup.js'

const startRate = async () => {
  const data = await getData(URL)
  return data[0].rateBuy
}

// Const
const URL = `https://api.monobank.ua/bank/currency`
const inputNumber = document.querySelector('#inputNumber')
const outputNumber = document.querySelector('#outputNumber')
const historyBtn = document.querySelector('#historyButton')

// Let
let rate = await startRate()

// Start app
const select = new Select('#select', {
  placeholder: 'select item',
  data: [
    { text: 'USD', code: 840 },
    { text: 'EUR', code: 978 },
    { text: 'GBP', code: 826 },
    { text: 'JPY', code: 392 },
    { text: 'CNY', code: 156 },
  ],
  selectedCode: 840,
  async onSelect(item) {
    const rates = await getData(URL)
    const { code } = item

    rate = converter.findRate(rates, code)

    const num = document.querySelector('#inputNumber').value
    outputNumber.value = converter.conversion(num, rate)
  },
})

const history = new History('#history')

const popup = new Popup('#popup')

inputNumber.addEventListener('input', (event) => {
  const num = event.target.value
  outputNumber.value = converter.conversion(num, rate)
})

outputNumber.addEventListener('input', (event) => {
  const num = event.target.value
  inputNumber.value = converter.reverseConversion(num, rate)
})

historyBtn.addEventListener('click', () => {
  if (inputNumber.value !== '' && outputNumber.value !== '') {
    const defaultRate = select.current ? select.current.text : 'USD'

    history.create({
      rateB: defaultRate,
      currencyA: inputNumber.value,
      currencyB: outputNumber.value,
    })

    popup.create({
      message: 'Is test popup!',
      type: 'done',
    })
  } else {
    popup.create({
      message: 'Please fill the input',
      type: 'warning',
    })
  }
})
