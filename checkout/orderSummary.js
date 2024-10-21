import {cart,deleteItem} from "../data/cart.js"
import {convert,updateDeliveryOption,renderMatchingProduct,renderDeliveryOption,renderCartQuantity, saveToStorage} from "../data/utils.js"
import {deliveryOptions} from "../data/deliveryOpt.js"
import {renderPaySumm} from "./paymentSumm.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"


export function renderOrderSummary(){
    let cartHTML = ''
    cart.forEach((cartItem) => {
        
        const productId = cartItem.id
        const matchingItem = renderMatchingProduct(productId);
        const deliveryOpt = renderDeliveryOption(cartItem)

        const today = dayjs()
        const deliveryDate = today.add(
            deliveryOpt.deliveryDays,"days"
        )
        const dateString = deliveryDate.format("dddd, MMMM D")
        
        cartHTML += `
        <div class="cart-item-container cont-${matchingItem.id}" data-product-id="${matchingItem.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingItem.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingItem.name}
            </div>
            <div class="product-price">
                $${convert(matchingItem.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label quant-${matchingItem.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary update-${matchingItem.id}" data-product-id="${matchingItem.id}">
                Update
                </span>
                <span class="newQuant link-primary display save-${matchingItem.id}">
                  <input type ="number" min ="0" class="cartQuant-input input-${matchingItem.id}"></input>
                  <span class="save-btn" data-product-id="${matchingItem.id}">Save</span>
                </span>
                <span class="delete-quantity-link link-primary" data-product-id="${matchingItem.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(cartItem)}
            </div>
        </div>
        </div>
        </div>
    `
   const orderSumm = document.querySelector(".order-summary")
    orderSumm.innerHTML = cartHTML 
            

    const update = document.querySelectorAll(".update-quantity-link")
    update.forEach((update)=>{
        update.addEventListener("click", ()=>{
            const itemId = update.dataset.productId
            const quantEl = document.querySelector(`.quant-${itemId}`)
            const saveEl = document.querySelector(`.save-${itemId}`)
            update.classList.add("display")
            quantEl.classList.add("display")
            saveEl.classList.remove("display")
        })
    })
    
    


        const DeleteEl = document.querySelectorAll(".delete-quantity-link")
        DeleteEl.forEach((link)=> {
            link.addEventListener("click", () => {
                const ProductId = link.dataset.productId;
                deleteItem(ProductId)
                const container = document.querySelector(`.cont-${ProductId}`)
                container.remove() 
                renderPaySumm()
                renderCartQuantity()
                }) 
        })
        
    })

    function deliveryOptionsHTML(cartItem){
        let html = '';
        deliveryOptions.forEach((deliveryOpt) => {
            const today = dayjs()
            const deliveryDate = today.add(
                deliveryOpt.deliveryDays,"days"
            )
            const dateString = deliveryDate.format("dddd, MMMM D")

            const priceString = deliveryOpt.priceCents === 0
            ? "FREE"
            :`$${convert(deliveryOpt.priceCents)} -`

            const isChecked = deliveryOpt.id === cartItem.deliveryOptionId

            html +=`<div class="delivery-option" data-product-id="${cartItem.id}" data-delivery-option-id="${deliveryOpt.id}">
                <input type="radio" 
                ${isChecked ? 'checked = " "' : '' }class="delivery-option-input" name="${cartItem.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
                </div>
            </div>`
        })   
        return html
    }


    const saveEl = document.querySelectorAll(".save-btn")
    saveEl.forEach((save)=>{
        save.addEventListener("click", ()=>{
            const itemId = save.dataset.productId
            const inputEl = document.querySelector(`.input-${itemId}`)
            const selectedValue = Number(inputEl.value)
            cart.forEach((cartItem)=>{
                if(cartItem.id === itemId){
                        cartItem.quantity = selectedValue
                        saveToStorage()
                        renderOrderSummary()
                        renderPaySumm()
                    }
            })
        })
    })

document.querySelectorAll(".delivery-option").forEach((element)=>{
    element.addEventListener("click", ()=>{
        const {productId,deliveryOptionId} = element.dataset
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary()
        renderPaySumm()
    })
    
})
}