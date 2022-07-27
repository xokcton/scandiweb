const calcPrice = (arr, currencyLabel) => {
  return arr.reduce((acc, element) => {
    const price = element.product.prices.filter(price => price.currency.label === currencyLabel)
    return acc += element.amount * price.amount
  }, 0)
}

export default calcPrice