let cartItems = [];
class Cart {
    constructor() {
//        let cartItems = [];
         fetch('/db/addToBasket.json') // Читаем корзину
                .then((response) => response.json())
                .then((items) => {
                    cartItems = items;
                    console.log(cartItems);
                });
    };
               
    addCartItem(event) {
        let item = {};
        
        if (event.target.className === 'add') { // Если нажата кнопка очистки корзины.
//            console.log('Сработал метод класса.');
//            console.log(event.target.id);

            for (let i = 0; i < list.goods.length; i++) {
                if (list.goods[i].id === +(event.target.id)) {
                    item = list.goods[i];
//                    console.log(item);
                }
            }
//            fetch('/db/addToBasket.json') // Читаем корзину
//                .then((response) => response.json())
//                .then((items) => {
//                    cartItems = items;
//                    console.log('Запрос корзины ' + cartItems);
//                });
            
            const cartItem = cartItems.find((entry) => entry.id === item.id);
            if (cartItem) { // Если товар в корзине уже есть.
                fetch('/db/addToBasket.json/' + item.id, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            quantity: item.quantity + 1
                        }),
                    })
                    .then((response) => response.json())
                    .then((item) => {
                        const itemIdx = cartItems.findIndex((entry) => entry.id === item.id);
                        cartItems[itemIdx].quantity = item.quantity;
                    });

            } else {
                fetch('/db/addToBasket.json', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...item,
                            quantity: 1
                        })
                    })
                    .then((response) => response.json())
                    .then((item) => {
                    cartItems.push(item);
                    console.log(cartItems);
                });
            }
           
        }
    };

    removeCartItem() {};

    changeCartItem() {};
};



const cart = new Cart();

const $header = document.querySelector('.container_header');

//$header.addEventListener('click', (event) => {
//    switch(event.target.id) {
//            case 'myAccount'
//    }
//    
//})
