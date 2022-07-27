const getEachPrice = (item, currentCurrency) => {
  const price = item.product.prices.find(element => element.currency.label === currentCurrency.label)
  return {
    amount: price.amount,
    symbol: currentCurrency.symbol,
  }
}

export default getEachPrice