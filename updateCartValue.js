const cartValue = document.querySelector("#cartValue")
console.log(cartValue)

export const updateCartValue =(cartProducts) =>{
   return (cartValue.innerHTML = ` <i class="fa-solid fa-cart-shopping"> ${cartProducts.length} </i>`);
}