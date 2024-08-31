import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
{
    id: '1',
    deliverDays:7,
    priceCents:0
},
{
    id: '2',
    deliverDays:3,
    priceCents:499
},
{
    id: '3',
    deliverDays:1,
    priceCents:999
}];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;
    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId)
            deliveryOption = option;
    });

    return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption){
    let deliveryDate = dayjs();
    let deliveryDays = deliveryOption.deliverDays;
    while (deliveryDays > 1) {
        deliveryDate = deliveryDate.add(1, 'days');
        const day = deliveryDate.format('dddd');
        if (!(day === 'Sunday' || day === 'Saturday'))
            deliveryDays--;
    }

    return deliveryDate.format('dddd, MMMM D');
}