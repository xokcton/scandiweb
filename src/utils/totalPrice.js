const totalPrice = (data, label) => data.reduce((acc, element) => {
  const foundPrice = element.product.prices.slice().filter(obj => (
    obj.currency.label === label
  ))
  return acc += foundPrice[0].amount * element.amount
}, 0)

export default totalPrice