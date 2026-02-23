import { updateCartValue } from "./updateCartValue";

const STORAGE_KEY = "cartProductLS";

export const getCartProductFromLS = () => {
  let cartProducts = localStorage.getItem(STORAGE_KEY);

  if (!cartProducts) {
    updateCartValue([]);
    return [];
  }

  cartProducts = JSON.parse(cartProducts);

  updateCartValue(cartProducts);

  return cartProducts;
};