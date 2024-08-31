import {cart} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption,calculateDeliveryDate } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import {updateCheckoutHeader} from './checkoutHeader.js';

export function renderOrderSummary() {
    generateCartSummaryHTML();
    updateCheckoutHeader();

    document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            deleteItemButton(productId);
        });
    });

    document.querySelectorAll('.js-update-quantity-link').forEach((updateLink) => {
        updateLink.addEventListener('click', () => {
            const productId = updateLink.dataset.productId;
            updateQuantityButton(productId);
        });
    });

    document.querySelectorAll('.js-save-quantity-link').forEach((saveLink) => {
        saveLink.addEventListener('click', () => {
            const productId = saveLink.dataset.productId;
            saveQuantityButton(productId);
            renderPaymentSummary();
        });
    });

    document.querySelectorAll('.js-quantity-input').
    forEach((quantityInput) => {
        quantityInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter')
                saveQuantityButton(quantityInput.dataset.productId);
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', ()=> {
            const {productId, deliveryOptionId} = element.dataset;
            cart.updateDeliveryOption(productId,deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}

function generateCartSummaryHTML() {
    let cartSummaryHTML = '';
    cart.cartItems.forEach((cartItem) => {
        const productId = cartItem.productId;
        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliverDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
                    Update
                </span>

                <input type="text" class="quantity-input js-quantity-input" data-product-id="${matchingProduct.id}">
                
                <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">
                    Save
                </span>

                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
        </div>
      </div>
    `;
    });
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
}

function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
        const dateString = calculateDeliveryDate(deliveryOption);
        const priceString = 
            deliveryOption.priceCents === 0 ? 'FREE' :
            `$${formatCurrency(deliveryOption.priceCents)}`;
        
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        html += `
            <div class="delivery-option js-delivery-option" 
                data-product-id="${matchingProduct.id}" 
                data-delivery-option-id="${deliveryOption.id}">

                <input type="radio"
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} - Shipping
                    </div>
                </div>
            </div>
        `;
    });
    return html;
}

function updateQuantityButton(productId) {
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.add('is-editing-quantity');
}

function saveQuantityButton(productId) {
    const container = document.querySelector(`.js-cart-item-container-${productId}`);

    let quantityInput;
    document.querySelectorAll(`.js-quantity-input`).
    forEach((inputFieldItem) => {
        if (inputFieldItem.dataset.productId === productId)
            quantityInput = inputFieldItem;
    });

    const updatedQuantity = Number(quantityInput.value);

    if (updatedQuantity > 0 && updatedQuantity < 1000) {
        cart.updateQuantity(productId, updatedQuantity);

        //document.querySelector(`.js-quantity-label-${productId}`).innerHTML = updatedQuantity;
        //updateCartQuantityIndicator();

        quantityInput.value = '';        
        container.classList.remove('is-editing-quantity');
        renderAll();
    }
}

function deleteItemButton(productId) {
    cart.removeFromCart(productId);
    renderAll();

    //const container = document.querySelector(`.js-cart-item-container-${productId}`);
    //container.remove();
    //updateCartQuantityIndicator();
}

function renderAll() {
    renderOrderSummary();
    renderPaymentSummary();
}