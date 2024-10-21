import {cart,addToCart} from '/data/cart.js'
import {convert} from "/data/utils.js"
import {products} from '/data/products.js'


let productsHtml = '' 

products.forEach((product) => {
    productsHtml += `
       <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${convert(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="select-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart style-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    ` 
})
document.querySelector('.products-grid').innerHTML = productsHtml


function updateCartQuantity(){
  const cartquantEl = document.querySelector('.cart-quantity')

  let cartQuant = 0
  cart.forEach((cartItem) => {
      cartQuant += cartItem.quantity
  })
  
  cartquantEl.innerHTML = cartQuant
}

const btnEl = document.querySelectorAll('.add-to-cart-button')
btnEl.forEach((btn) => {
    btn.addEventListener("click", () =>{
        const productId = btn.dataset.productId;
        addToCart(productId)
        updateCartQuantity() 
        setTimeout(function(){
          opacityEl.classList.remove("opacity")
        },600)

        const opacityEl = document.querySelector(`.style-${productId}`)
        opacityEl.classList.add("opacity")
    })
})

updateCartQuantity()

