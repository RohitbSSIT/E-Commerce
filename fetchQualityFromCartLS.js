import { getCartProductFromLS } from "./getCartProducts";

export const fetchQualityFromCartLS = (id, price) => {
  let cartProducts = getCartProductFromLS();

  let existingProduct = cartProducts.find(
    (item) => Number(item.id) === Number(id)
  );

  let quantity = 1;
  let totalPrice = Number(price);

  if (existingProduct) {
    quantity = Number(existingProduct.quantity);
    totalPrice = quantity * Number(price);
  }

  return { quantity, totalPrice };
};