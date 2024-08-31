import { getOrder } from "../data/orders.js";
import { loadProducts, getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getProductInOrder } from "../data/orders.js";

await loadProductsFetch();

function renderOrderTracker() {
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const order = getOrder(orderId);
    const product = getProduct(productId);
    const productInOrder = getProductInOrder(order, productId);

    //console.log(order);
    //console.log(product);
    //console.log(arrivingDate);
    //console.log(product.name);
    //console.log(productInOrder.quantity);

    const deliveryDate = dayjs(productInOrder.estimatedDeliveryTime);
    const currentDate = dayjs();
    const orderDate = dayjs(order.orderTime);

    const percentProgress =
        ((currentDate - orderDate) / (deliveryDate - orderDate)) * 100;
    console.log(percentProgress);
    document.querySelector('.order-tracking').innerHTML =
    `
        <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
        </a>

        <div class="delivery-date">
            Arriving on ${deliveryDate.format('dddd, MMMM D')}
        </div>

        <div class="product-info">
            ${product.name}
        </div>

        <div class="product-info">
            Quantity: ${productInOrder.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
            <div class="progress-label js-preparing">
                Preparing
            </div>
            <div class="progress-label js-shipped">
                Shipped
            </div>
            <div class="progress-label js-delivered">
                Delivered
            </div>
        </div>

        <div class="progress-bar-container">
            <div style="width: ${percentProgress}%" class="progress-bar"></div>
        </div>
    `;

    let progressIndicator = '';
    if (percentProgress >= 0 && percentProgress < 50)
        document.querySelector('.js-preparing').classList.add('current-status');

    else if (percentProgress >= 50 && percentProgress < 99)
        document.querySelector('.js-shipped').classList.add('current-status');

    else if (percentProgress > 100)
        document.querySelector('.js-delivered').classList.add('current-status');
}

renderOrderTracker();
