import find from 'lodash/find';
import remove from 'lodash/remove';
import Dinero from 'dinero.js';

const calculatePercentageDiscount = (amount, { condition, quantity }) => {
    if (condition?.percentage && quantity > condition?.minimum) {
        return amount.percentage(condition.percentage);
    }

    return Money({ amount: 0 });
};

const calculateQuantityDiscount = (amount, { condition, quantity }) => {
    const isEven = quantity % 2 === 0;

    if (condition?.quantity && quantity > condition?.quantity) {
        return amount.percentage(isEven ? 50 : 40);
    }
    return Money({ amount: 0 });
};

const calculateDiscount = (amount, quantity, condition) => {
    const list = Array.isArray(condition) ? condition : [condition];

    /**
     * Higher Discount
     */
    const [discount] = list
        .map(c => {
            if (c.percentage) {
                return calculatePercentageDiscount(amount, {
                    condition: c,
                    quantity,
                }).getAmount();
            } else if (c.quantity) {
                return calculateQuantityDiscount(amount, {
                    condition: c,
                    quantity,
                }).getAmount();
            }
        })
        .sort((a, b) => b - a);

    return Money({ amount: discount });
};

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
