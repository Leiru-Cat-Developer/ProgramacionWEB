import { validDeliveryOptions } from "./deliveryOptions.js";

export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
        cart = [
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            },
            {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }
        ]; //WE ARE NOW AVAILABLE TO EXPORT THIS TO AMAZON.JS
    }
}

//SAVING DATA IN LOCAL STORAGE
function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem;

    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);

    const quantity = Number(quantitySelector.value);

    //WE LOOP THROUGHT THE CART TO TEST THE 3 CASES
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        });
    }
    //AFTER WE UPDATE THE CART WE SAVE TO STORAGE
    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    //WE REPLACE THE NEW CART IN THE OLD CART
    cart = newCart;
    //AFTER WE REMOVE SMTH FROM THE CART WE SAVE TO STORAGE
    saveToStorage();
}

//14E
export function updateCartQuantity(className) {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        //LOOP THROUGHT EACH ITEM IN THE CART
        cartQuantity += cartItem.quantity;
    });

    document.querySelector(`.${className}`)
        .innerHTML = cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
    let productFind;
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            productFind = cartItem;
        }
    });
    productFind.quantity = newQuantity;
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    //WE LOOP THROUGHT THE CART TO REALIZE THE 3 CASES
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    if (!validDeliveryOptions(deliveryOptionId)) {
        return;
    }

    if (!matchingItem) {
        return;
    }

    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}

export function loadCart(fun) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        console.log('LOAD CART: SUCCEED');
        fun();
    });

    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
}

//18H
export async function loadCartFecth() {
    const response = await fetch(
        'https://supersimplebackend.dev/cart'
    );
    const text = await response.text();
    console.log(text);
    return text;
}