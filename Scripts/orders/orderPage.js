import {formatCurrency} from '../utils/money.js';
import {  loadProductsFetch, getProduct  } from '../../data/products.js';
import { monthDayNumbersToWords } from '../utils/time.js';
import { orders } from '../../data/orders.js';
import { cart } from '../../data/cart.js';

function generateOrdersHTML() {
    let html = '';
    for(let i = 0; i < orders.length; i++) {
        let orderHeaderHTML = '';
        let orderItemsInfoHTML = '';

        const order = orders[i];
        const orderDateNumbers = order.orderTime;
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];
        const orderDate = monthDayNumbersToWords(orderDateNumbers);
        
        const orderTotalCost = 
            formatCurrency(order.totalCostCents);
        const orderId = order.id;
        
        orderHeaderHTML = 
        `
           <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${orderDate}</div>
                    </div>

                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${orderTotalCost}</div>
                    </div>
                </div>

                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${orderId}</div>
                </div>
            </div>
        `;

        const orderItems = order.products;
        for(let j = 0; j < orderItems.length; j++) {
            const item = orderItems[j];
            //console.log(item.productId);
            const product = getProduct(item.productId);
            //console.log(product);
            orderItemsInfoHTML += 
            `
                <div class="product-image-container">
                    <img src="${product.image}">
                </div>

                <div class="product-details">
                    <div class="product-name">
                        ${product.name}
                    </div>

                    <div class="product-delivery-date">
                        Arriving on: ${monthDayNumbersToWords(item.estimatedDeliveryTime)}
                    </div>

                    <div class="product-quantity">
                        Quantity: ${item.quantity}
                    </div>

                    <button class="buy-again-button button-primary js-buy-again-button" 
                    data-product-id="${item.productId}">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                </div>

                <div class="product-actions">
                    <a href="tracking.html?orderId=${order.id}&productId=${item.productId}">
                        <button class="track-package-button button-secondary js-track-package-button">
                            Track package
                        </button>
                    </a>
                </div>
            `;
        }
    
        html +=
        `
            <div class="order-container">
                ${orderHeaderHTML}
                <div class="order-details-grid">
                    ${orderItemsInfoHTML}
                </div>
            </div>
        `;
    }
    return html;
}

async function renderOrders() {
    await loadProductsFetch();
    document.querySelector('.js-orders-grid').innerHTML = generateOrdersHTML();
}

async function renderOrdersPage() {
    document.querySelector('.js-cart-quantity').innerHTML = cart.calculateCartQuantity()
    await renderOrders();


    document.querySelectorAll('.js-buy-again-button')
    .forEach((buyAgainButton) => {
        
        buyAgainButton.addEventListener('click', () => {
            cart.addToCart(buyAgainButton.dataset.productId, 1);
            renderOrdersPage();
        });
    });
}

renderOrdersPage();