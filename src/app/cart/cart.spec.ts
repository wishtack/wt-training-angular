interface Item {
  title: string;
  price: number;
}

class Cart {
  private _itemList: Item[] = [];

  addItem(item: Item) {
    this._itemList.push(item);
  }

  getItemList() {
    return this._itemList;
  }

  removeItem(item: Item) {
    this._itemList = this._itemList.filter(_item => _item !== item);
  }

  getTotalPrice(): number {
    throw new Error('🚧 work in progress!');
  }
}

function createItem(title: string, price: number): Item {
  return {
    title,
    price
  };
}

describe('Cart', () => {

  let cart: Cart;
  let extremeProgramming: Item;
  let rework: Item;

  beforeEach(() => {
    cart = new Cart();
    extremeProgramming = createItem('eXtreme Programming Explained', 25);
    rework = createItem('ReWork', 30);
  });

  it('should add items', () => {

    cart.addItem(extremeProgramming);
    cart.addItem(rework);

    expect(cart.getItemList()).toEqual([
      extremeProgramming,
      rework
    ]);

  });

  it('should remove items', () => {

    cart.addItem(extremeProgramming);
    cart.addItem(rework);

    cart.removeItem(rework);

    expect(cart.getItemList()).toEqual([
      extremeProgramming
    ]);

  });

  xit('should get total price', () => {

    cart.addItem(extremeProgramming);
    cart.addItem(rework);

    expect(cart.getTotalPrice()).toEqual(55);

  });

});
