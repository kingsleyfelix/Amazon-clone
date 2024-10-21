import {products} from "./products.js"
import {cart} from "./cart.js"
import {deliveryOptions} from "./deliveryOpt.js"

//price Converter
export const convert = (priceCents) => {
    return (Math.round(priceCents)/100).toFixed(2)
}

// save to localStorage
export const saveToStorage = ()=>{
    localStorage.setItem("cart",JSON.stringify(cart))
  }

//update Delivery Option
export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;
  cart.forEach((item) => {
    if(productId === item.id){
       matchingItem = item
      }
    })
    matchingItem.deliveryOptionId =  deliveryOptionId;
    saveToStorage()
}

// Render Matching Product
export function renderMatchingProduct(productId){
    let matchingProduct;
        
        products.forEach((product) => {
            // if(product.id === cartItem.id) This still works
            if(product.id === productId){
                matchingProduct = product
            }
        })
    return matchingProduct
}

// Render Delivery Option
export function renderDeliveryOption(cartItem){
    let deliveryOpt;

    deliveryOptions.forEach((option)=>{
        if(option.id === cartItem.deliveryOptionId){
            deliveryOpt = option; 
        }
    })
    return deliveryOpt
}

// Render Cart Quantity
export function renderCartQuantity(){
    let cartQuant = 0;
    let returnHome = document.querySelector(".return-to-home-link")
    cart.forEach((cartItem)=>{
        cartQuant += cartItem.quantity
    })
    if(cartQuant === 1){
        returnHome.innerHTML = `${cartQuant} item`
    }else {
    returnHome.innerHTML = `${cartQuant} items `
    }
    return cartQuant
}