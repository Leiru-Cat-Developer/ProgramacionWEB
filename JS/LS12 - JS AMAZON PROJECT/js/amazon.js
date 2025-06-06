//RENAME THE VARIABLE AVOID NAME PROBLEMS, IF THAT'S THE CASE
import { cart, addToCart, updateCartQuantity as updateCartQuantity } from "../data/cart.js";
import { loadProducts, loadProductsFetch, products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

loadProductsFetch(renderProductsGrid);

function renderProductsGrid() {
  let productsHTML = '';

  products.forEach((product) => {
    productsHTML += `
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
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPriceCents()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
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

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;

    document.querySelector('.js-products-grid').innerHTML = productsHTML;

    function addedAnimation(productId) {
      const messageAdded = document.querySelector(`.js-added-to-cart-${productId}`);

      messageAdded.classList.add('added-to-cart-visible');

      setTimeout(() => {
        messageAdded.classList.remove('added-to-cart-visible');
      }, 2000);
    }

    //14D
    updateCartQuantity('js-cart-quantity');

    //ALL THE ADD TO CART FUNCTIONS
    document.querySelectorAll('.js-add-to-cart')
      .forEach((button) => {
        button.addEventListener('click', () => {
          const { productId } = button.dataset;

          addToCart(productId);
          addedAnimation(productId);
          updateCartQuantity('js-cart-quantity');

          // console.log(quantitySelector);
          // console.log(cartQuantity);
          // console.log(cart);
        })
      });
  });
}