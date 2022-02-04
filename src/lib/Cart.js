import find from 'lodash/find';
import remove from 'lodash/remove';
import Dinero from 'dinero.js';

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
        const total = this.getTotal().getAmount();

        return { items, total };
    }

    checkout() {
        const { total, items } = this.summary();

        this.items = [];

        return { items, total };
    }

    getTotal() {
        return this.items.reduce((acc, item) => {
            const quantity = item.quantity;
            const price = item.product.price;

            let discount = Money({ amount: 0 });
            const amount = Money({ amount: quantity * price });

            const condition = item.condition;
            if (
                condition &&
                condition.percentage &&
                item.quantity > condition.minimum
            ) {
                discount = amount.percentage(condition.percentage);
            }

            return acc.add(amount).subtract(discount);
        }, Money({ amount: 0 }));
    }
}
