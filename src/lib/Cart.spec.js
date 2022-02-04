import Cart from './Cart';

describe('Cart', () => {
    let cart;

    const product = {
        title: 'Mouse Logitech',
        price: 35388,
    };

    const product2 = {
        title: 'Keyboard Logitech',
        price: 41872,
    };

    beforeEach(() => {
        cart = new Cart();
    });

    describe('getTotal()', () => {
        it('should return 0 when getTotal() is executed in a newly created instance', () => {
            expect(cart.getTotal().getAmount()).toEqual(0);
        });

        it('should multiply quantity and price and receive the total amount', () => {
            const item = {
                product: {
                    title: 'Mouse Logitech',
                    price: 35388, // R$ 353,88 || 353.88
                },
                quantity: 2, // price x quantity = 70.776
            };

            cart.add(item);

            expect(cart.getTotal().getAmount()).toEqual(70776);
        });

        it('should ensure no more than on product exists at a time', () => {
            cart.add({
                product,
                quantity: 2,
            });

            cart.add({
                product,
                quantity: 1,
            });

            expect(cart.getTotal().getAmount()).toEqual(35388);
        });

        it('should update total when a product gets included and then remove', () => {
            cart.add({
                product,
                quantity: 2,
            });

            cart.add({
                product: product2,
                quantity: 1,
            });

            cart.remove(product);

            expect(cart.getTotal().getAmount()).toEqual(41872);
        });
    });

    describe('checkout()', () => {
        it('should return an object with the total and the list of items', () => {
            cart.add({
                product,
                quantity: 2,
            });

            cart.add({
                product: product2,
                quantity: 3,
            });

            expect(cart.checkout()).toMatchSnapshot();
        });

        it('should return an object with the total and the list of items when summary() is called', () => {
            cart.add({
                product,
                quantity: 2,
            });

            cart.add({
                product: product2,
                quantity: 3,
            });

            expect(cart.summary()).toMatchSnapshot();
            expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
        });

        it('should reset the cart when checkout() is called', () => {
            cart.add({
                product: product2,
                quantity: 3,
            });

            cart.checkout();

            expect(cart.getTotal().getAmount()).toEqual(0);
        });
    });
});
