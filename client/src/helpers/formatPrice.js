const formatPrice = number =>
  `£${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

export default formatPrice;
