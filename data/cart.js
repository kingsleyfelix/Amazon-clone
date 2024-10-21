import {saveToStorage} from "./utils.js"

export let cart = JSON.parse(localStorage.getItem("cart"))
    if(!cart){
       cart = [
        {
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            quantity: 2,
            deliveryOptionId:'1'
          
          },
          {
            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
          deliveryOptionId:'1'
          }
      ]
    }
      
export function addToCart(productId){
  const selectEl = document.querySelector(`.select-${productId}`)
  const selectedValue = Number(selectEl.value)  
   
  let matchingItem;
  cart.forEach((item) => {
    if(productId === item.id){
       matchingItem = item
      }
    
  })

  if(matchingItem){
       matchingItem.quantity += selectedValue
    }else{
    cart.push(
      {
        id:productId,
        quantity: selectedValue,
        deliveryOptionId:'1'
      })
  }
  saveToStorage()
}


export function deleteItem(productId){
  const newCart = [];

  cart.forEach((cartItem) =>{
    if(cartItem.id !== productId){
      newCart.push(cartItem)
    }
  })

  cart = newCart
  saveToStorage()
}
