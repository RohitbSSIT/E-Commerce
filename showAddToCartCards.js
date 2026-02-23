import products from "./api/products.json";
import { fetchQualityFromCartLS } from "./fetchQualityFromCartLS";
import { getCartProductFromLS } from "./getCartProducts";

const STORAGE_KEY = "cartProductLS";

const cartElement = document.querySelector("#productCartContainer");
const productCartTemplate = document.querySelector("#productCartTemplate");
const subTotalElem = document.querySelector(".productSubTotal");
const finalTotalElem = document.querySelector(".productFinalTotal");

const TAX = 50;

// ✅ Professional Currency Formatter
const formatPrice = (amount) => {
  return amount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
};

// ==========================
// RENDER CART
// ==========================
const showCartProduct = () => {
  cartElement.innerHTML = "";

  let cartProducts = getCartProductFromLS();

  let filterProducts = products.filter((curProd) =>
    cartProducts.some(
      (curElem) => Number(curElem.id) === Number(curProd.id)
    )
  );

  let subTotal = 0;

  filterProducts.forEach((curProd) => {
    const { category, id, image, name, price } = curProd;

    let productClone = document.importNode(
      productCartTemplate.content,
      true
    );

    const lsData = fetchQualityFromCartLS(id, price);

    subTotal += lsData.totalPrice;

    productClone.querySelector("#cardValue")
      .setAttribute("id", `card${id}`);

    productClone.querySelector(".category").textContent = category;
    productClone.querySelector(".productName").textContent = name;
    productClone.querySelector(".productImage").src = image;

    productClone.querySelector(".productQuantity").textContent =
      lsData.quantity;

    // ✅ Formatted Price
    productClone.querySelector(".productPrice").textContent =
      formatPrice(lsData.totalPrice);

    // Increment
    productClone.querySelector(".cartIncrement")
      .addEventListener("click", () => {
        updateQuantity(id, 1);
      });

    // Decrement
    productClone.querySelector(".cartDecrement")
      .addEventListener("click", () => {
        updateQuantity(id, -1);
      });

    // Remove
    productClone.querySelector(".remove-to-cart-button")
      .addEventListener("click", () => {
        removeProduct(id);
      });

    cartElement.appendChild(productClone);
  });

  // ✅ Formatted Totals
  subTotalElem.textContent = formatPrice(subTotal);
  finalTotalElem.textContent = formatPrice(subTotal + TAX);
};

// ==========================
// UPDATE QUANTITY
// ==========================
const updateQuantity = (id, change) => {
  let cartProducts = getCartProductFromLS();

  let updatedCart = cartProducts.map((item) => {
    if (Number(item.id) === Number(id)) {
      let newQty = Number(item.quantity) + change;
      if (newQty < 1) newQty = 1;

      return {
        ...item,
        quantity: newQty,
      };
    }
    return item;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCart));

  showCartProduct();
};

// ==========================
// REMOVE PRODUCT
// ==========================
const removeProduct = (id) => {
  let cartProducts = getCartProductFromLS();

  let updatedCart = cartProducts.filter(
    (item) => Number(item.id) !== Number(id)
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCart));

  showCartProduct();
};

showCartProduct();