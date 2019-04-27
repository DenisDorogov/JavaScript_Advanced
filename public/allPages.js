let cartItems = [];
class Cart {
    constructor() {
        this.items = [];
        fetch('/db/addToBasket.json') // Читаем корзину
            .then((response) => response.json())
            .then((items) => {
                this.items = items;
                console.log(this.items);
            });
    };

    addCartItem($item) {
        let item = {};
        if ($item.className === 'add') {
            for (let i = 0; i < list.goods.length; i++) {
                if (list.goods[i].id === +($item.id)) {
                    item = list.goods[i];
  
                };
            }
            const itemIdx = this.items.findIndex((entry) => entry.id === item.id);
            if (itemIdx < 0) {
                this.items.push(item);
                this.items[this.items.length - 1].quantity = 1;
            } else {
                this.items[itemIdx].quantity++;
            }

            console.log('Корзина:');
            console.log(this.items);
            fetch('http://localhost:3000/db/addToBasket.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.items)
                })
                .then((response) => response.json())
                .then((cart) => cart = this.items);
        }
    };
    clearCart () {}
    
    removeCartItem() {};

    changeCartItem() {};
};



const cart = new Cart();



