import {cart} from '../../data/cart.js';

export function updateCheckoutHeader() {
    document.querySelector('.return-to-home-link')
    .innerHTML = `${cart.calculateCartQuantity()} items`;
}