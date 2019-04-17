class Cart {
    constructor() {};

    addCartItem(event) {
        if (event.target.className === 'add') { // Если нажата кнопка очистки корзины.
            console.log('Сработал метод класса.');
            console.log(event);
            buildCart(cart);
            getTotalCart(cart);
            catalogCountsClear();
        }
        if (event.target.className === 'cart-item-clear') { // Если нажата кнопка удаления элемента.
            for (i = 0; i < cart.length; i++) {
                if (event.target.id == 'cart-item-clear' + i) {
                    cart[i].count = 1;
                    cart.splice(i, 1);
                }
            }
            buildCart(cart);
            getTotalCart(cart);
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
