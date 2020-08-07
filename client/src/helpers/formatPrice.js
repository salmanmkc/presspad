const formatPrice = number => {
  const updatedNum = number % 1 === 0 ? number : number.toFixed(2);

  return `£${updatedNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

export default formatPrice;
