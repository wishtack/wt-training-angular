import { Cart } from './cart.service';
import { Sandwich } from './sandwich';

describe('Cart', () => {

    let burger: Sandwich;
    let butter: Sandwich;
    let cart: Cart;

    beforeEach(() => {

        burger = new Sandwich({title: 'Burger', price: 10});
        butter = new Sandwich({title: 'Jambon & Beurre', price: 5});

        cart = new Cart();

    });

    it('should add sandwich', () => {

        const emptySandwichList = cart.getSandwichList();

        cart.addSandwich(burger);
        cart.addSandwich(butter);

        const sandwichList = cart.getSandwichList();

        expect(emptySandwichList).toEqual([]);

        expect(sandwichList).toEqual([
            burger,
            butter
        ]);

    });

    it('should get total price', () => {

        cart.addSandwich(burger);
        cart.addSandwich(butter);

        expect(cart.getTotalPrice()).toEqual(15);

    });

    it('should remove sandwich', () => {

        cart.addSandwich(burger);
        cart.addSandwich(butter);

        cart.removeSandwich(burger);

        const sandwichList = cart.getSandwichList();
        expect(sandwichList).toEqual([
            butter
        ]);

    });

});

