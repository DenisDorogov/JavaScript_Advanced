const API_URL = 'http://localhost:3000';

Vue.component('product-item', { // Компонент с тегом <product-item>
    props: ['item'], //
    template: `
    <div class="item">
      <h2>{{item.name}}</h2>
      <span>{{item.price}}</span>
      <button @click.prevent="handleBuyClick(item)">Buy</button>
    </div>
  `,
    methods: {
        handleBuyClick(item) {
            this.$emit('onBuy', item); // Событие onBuy возвращает элемент, по которому произошло нажатие (item).
        }
    }
});

Vue.component('products', { // Компонент с тегом <products>
    props: ['query'], // Свойство (переменная) с содержимым поисковой строки.
    methods: {
        handleBuyClick(item) { // Метод (функция)
            this.$emit('onbuy', item); // Событие onbuy возвращает элемент, по которому произошло нажатие (item).
        },
    },
    data() {
        return {
            items: [],
        };
    },
    computed: {
        filteredItems() { // Вычисление функции фильтрации товаров.
            if (this.query) {
                const regexp = new RegExp(this.query, 'i');
                return this.items.filter((item) => regexp.test(item.name));
            } else {
                return this.items;
            }
        }
    },
    mounted() { // функция запроса товаров, которая выполняется по умолчанию.
        fetch(`${API_URL}/products`)
            .then(response => response.json())
            .then((items) => {
                this.items = items;
            });
    },
    template: `
    <div class="goods">
      <product-item v-for="entry in filteredItems" :item="entry" @onBuy="handleBuyClick"></product-item>
    </div>
  `, // шаблон, по которому рисуется элемент в html
});

Vue.component('find', {
    data() {
        searchQuery: '',
        filterValue: '',
    },
    computed: {
        handleSearchClick() {
            onfind
            this.filterValue = this.searchQuery;
    }
})

Vue.component('cart', {
    data() {
        return {
            cart: [],
        }
    },
    methods: {
        handleDeleteClick(item) {
            this.$emit('onbuy', item);
            if (item.quantity > 1) {
                fetch(`${API_URL}/cart/${item.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            quantity: item.quantity - 1
                        }),
                    })
                    .then((response) => response.json())
                    .then((item) => {
                        const itemIdx = this.cart.findIndex((entry) => entry.id === item.id);
                        Vue.set(this.cart, itemIdx, item);
                    });
            } else {
                fetch(`${API_URL}/cart/${item.id}`, {
                        method: 'DELETE',
                    })
                    .then(() => {
                        this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id);
                    });
            }
        },

    },
    template: `
        <ul>
            <li v-for="item in cart">{{ item.name }} ({{ item.quantity }})<button
            @click="handleDeleteClick(item)">x</button></li>
        </ul>
`, // шаблон, по которому рисуется элемент в html

});

const app = new Vue({
    el: '#app',
    data: {
        
    },
    mounted() {
        fetch(`${API_URL}/cart`)
            .then(response => response.json())
            .then((items) => {
                this.cart = items;
            });
    },
    computed: {
        total() {
            return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        }
    },
    methods: {
        
        },
        handleBuyClick(item) {
            const cartItem = this.cart.find((entry) => entry.id === item.id);
            if (cartItem) {
                // товар в корзине уже есть, нужно увеличить количество
                fetch(`${API_URL}/cart/${item.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            quantity: cartItem.quantity + 1
                        }),
                    })
                    .then((response) => response.json())
                    .then((item) => {
                        const itemIdx = this.cart.findIndex((entry) => entry.id === item.id);
                        Vue.set(this.cart, itemIdx, item);
                    });
            } else {
                // товара в корзине еще нет, нужно добавить
                fetch(`${API_URL}/cart`, {
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
                        this.cart.push(item);
                    });
            }
        }
    }
});
