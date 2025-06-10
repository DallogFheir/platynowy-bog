const mapOrderToImages = (order, images) => {
  return order.map((el) => [el, images[el]]);
};

export default mapOrderToImages;
