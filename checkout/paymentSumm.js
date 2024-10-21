import {cart} from "../data/cart.js"
import { renderOrderSummary } from "./orderSummary.js";
import {convert,renderMatchingProduct,renderDeliveryOption,renderCartQuantity, saveToStorage} from "../data/utils.js"


export const renderPaySumm = ()=>{
    let productPrice = 0;
    let shippingPrice = 0;
    let PaymentSumm = ""
    cart.forEach((cartItem)=>{
        const productId = cartItem.id
        const matchingProduct = renderMatchingProduct(productId)
        const deliveryOpt = renderDeliveryOption(cartItem)

        productPrice += matchingProduct.priceCents * cartItem.quantity
        shippingPrice += deliveryOpt.priceCents
        
    })
    const totalCostbeforeTax = shippingPrice + productPrice
    const tax = totalCostbeforeTax * 0.1
    const totalCost = totalCostbeforeTax + tax

    PaymentSumm = `
                   <div>Items (${renderCartQuantity()}):</div>
            <div class="payment-summary-money">$${convert(productPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${convert(shippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${convert(totalCostbeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${convert(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${convert(totalCost)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `

    const PaymentSummary = document.querySelector(".payment-summary")
    PaymentSummary.innerHTML  = PaymentSumm

    
    const order = document.querySelector(".place-order-button")
    order.addEventListener("click", ()=>{
      if(cart.length === 0){
        alert("Your cart is empty, please fill it first before clicking the button")
      }else{
        cart.splice(0,cart.length)
        const orderSumm = document.querySelector(".order-summary")
        orderSumm.innerHTML = ''
        saveToStorage()
        renderPaySumm()
        renderOrderSummary()
        alert("Your order was sucessfull")
      }
      
    })
}