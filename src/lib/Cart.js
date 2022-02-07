import find from 'lodash/find';
import remove from 'lodash/remove';
import Dinero from 'dinero.js';

import { calculateDiscount } from './discount.utils';

const Money = Dinero;

Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;

export default class Cart {
    items = [];

    add(item) {
        const _product = { product: item.product };

        if (find(this.items, _product)) {
            remove(this.items, _product);
        }

        this.items.push(item);
    }

    remove(product) {
        if (find(this.items, { product })) {
            remove(this.items, { product });
        }
    }

    summary() {
        const items = this.items;
        const total = this.getTotal();

        const formatted = total.toFormat('$0,0.00');

        return { items, total: total.getAmount(), formatted };
    }

    checkout() {
        const { total, items } = this.summary();

        this.items = [];

        return { items, total };
    }

    getTotal() {
        return this.items.reduce((acc, { quantity, product, condition }) => {
            const price = product.price;
            const amount = Money({ amount: quantity * price });

            let discount = Money({ amount: 0 });

            if (condition) {
                discount = calculateDiscount(amount, quantity, condition);
            }

            return acc.add(amount).subtract(discount);
        }, Money({ amount: 0 }));
    }
}
