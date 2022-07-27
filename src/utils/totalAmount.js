const totalAmount = (data) => data.reduce((acc, element) => acc += element.amount, 0) || 0

export default totalAmount