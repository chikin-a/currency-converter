export const converter = {
  findRate(arr, code) {
    let rate
    arr.forEach((el) => {
      if (el.currencyCodeA === code && el.currencyCodeB === 980) {
        if (el.rateBuy) {
          rate = el.rateBuy
        } else {
          rate = el.rateCross
        }
      }
    })
    return rate
  },
  conversion(num, rate) {
    return Number(num / rate).toFixed(2)
  },
  reverseConversion(num, rate) {
    return Number(num * rate).toFixed(2)
  },
}

// export class Converter {
//   constructor() {}
//   findRate(arr, code) {
//     let rate
//     arr.forEach((el) => {
//       if (el.currencyCodeA === code && el.currencyCodeB === 980) {
//         if (el.rateBuy) {
//           rate = el.rateBuy
//         } else {
//           rate = el.rateCross
//         }
//       }
//     })
//     return rate
//   },
//   conversion(num, rate) {
//     return Number(num / rate).toFixed(2)
//   },
//   reverseConversion(num, rate) {
//     return Number(num * rate).toFixed(2)
//   },
// }
