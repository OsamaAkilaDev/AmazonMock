export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

export function getOrder(orderId) {
    let matchingOrder;
    orders.forEach((order) => {
        if (order.id === orderId) {
            matchingOrder = order;
        }
    });
    return matchingOrder;
}

export function getProductInOrder(order, productId) {
    let matchingProduct;
    order.products.forEach((product) => {
        if (product.productId === productId){
            matchingProduct = product;
        }
    });
    return matchingProduct;
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

console.log(orders);

//console.log(orders[0].products[1].productId)
/*
const orderDateNumbers = orders[0].orderTime;
console.log(monthDayNumbersToWords(orderDateNumbers));        
console.log(orders[0].orderTime[5] + orders[0].orderTime[6]);
*/