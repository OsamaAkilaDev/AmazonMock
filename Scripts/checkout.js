import { renderOrderSummary } from "./checkout/ orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import '../data/cart-class.js';
import {car1, car2, car3} from '../data/car.js';
//import '../data/backend-practice.js';
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart.js";

async function loadPage() {
    try {
        // throw 'error1';
        await loadProductsFetch();
        //await cart.loadCartFetch();
    
        const value = await new Promise((resolve, reject) => {
            cart.loadCart(() => {
                //reject('error2');
                resolve();
            });
        });
    } catch (error) {
        console.log('Unexpected error. Please try again later.');
    }

    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();

/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        cart.loadCart(resolve);
    })

]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/
/*
new Promise((resolve) => {
    loadProducts(resolve);

}).then(() => {
    return new Promise((resolve) => {
        cart.loadCart(resolve);
    });

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
car1.openTrunk();
car1.go();
car1.go();
car1.go();
car2.brake();
car1.displayInfo();


car2.go();
car2.go();
car2.openTrunk();
car2.go();
car2.brake();
car2.displayInfo();

car3.go();
car3.displayInfo();
*/