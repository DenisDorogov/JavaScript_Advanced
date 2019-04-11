// Урок 6
const API_URL = 'http://localhost:3000';

Vue.component('hello', {
    data() {
        return {
            firstName: 'Vasya',
            lastName: 'Pupkin',   
        }
    },
    props: ['firstname', 'lastname'],
    template: `<div>Hello world!
    <slot></slot>
    <div>{{ firstname}} {{ lastname }}</div>
    </div>`
});

const app = new Vue({
    el: '#app',
    data: {
        items: [],
        filteredItems: [],
        searchQuery: '',
        cart: [],
        firstName: 'Ivan',
        lastName: 'Petrov'
    },
    mounted() {
        fetch(`${API_URL}/products`) // Запрос продуктов.
            .then(response => response.json())
            .then((items) => {
                this.items = items;
                this.filteredItems = items;
            });
        fetch(`${API_URL}/cart`) // Запрос корзины.
            .then(response => response.json())
            .then((items) => {
                this.cart = items;
            });
    },
    computed: {
        total() {
            return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
        }
    },
    methods: {
        handleDeleteClick(item) { // Удаление по кнопке.
            if (item.quantity > 1) { // Если... то убавляем количество
                fetch(`${API_URL}/cart/${item.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...item,
                            quantity: item.quantity - 1
                        })
                    })
                    .then(response => response.json())
                    .then((item) => {
                        const itemIdx = this.cart.findIndex((entry) => entry.id === item.id);
                        //                    this.cart[itemIdx].quantity = item.quantity;
                        Vue.set(this.cart, itemIdx, item); // Если Vue не отображает предыдущий вариант.
                    });
            } else { // Если... то убираем элемент.
                fetch(`${API_URL}/cart/${item.id}`, {
                        method: 'DELETE',
                    })
                    .then(() => { // Удаляем из корзины элемент с соответствующим id
                        this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id)
                    })
            }

        },
        handleSearchClick() { // Функция поиска
            const regexp = new RegExp(this.searchQuery, 'i'); // регулярное выражение для поиска, 'i' - параметр для выравнивания регистра.
            this.filteredItems = this.items.filter((item) => regexp.test(item.name))
        },
        handleByeClick(item) { // Функция добавления товара в корзину.
            const cartItem = this.cart.find((entry) => entry.id === item.id) // Проверяем есть ли товар в корзине.
            if (cartItem) { // Товар в корзине уже есть.
                fetch(`${API_URL}/cart/${item.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...item,
                            quantity: cartItem.quantity + 1
                        })
                    })
                    .then(response => response.json())
                    .then((item) => {
                        const itemIdx = this.cart.findIndex((entry) => entry.id === item.id);
                        //                    this.cart[itemIdx].quantity = item.quantity;
                        Vue.set(this.cart, itemIdx, item);
                    });
            } else { // Товара в корзине нет.
                fetch(`${API_URL}/cart`, {
                        method: 'POST', // Метод запроса
                        headers: {
                            'Content-Type': 'application/json',
                        }, // Заголовки, которые нам нужны.
                        body: JSON.stringify({
                            ...item,
                            quantity: 1
                        }) // То что хотим отправить.
                    })
                    .then(response => response.json())
                    .then((item) => {
                        this.cart.push(item);
                    });
            }

        }
    }

});
