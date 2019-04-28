const urlSingle = 'single_page.html';
    
Vue.component('product-item', {
  props: ['item'],
  template: ` 
        <div class="item"><a href= "${urlSingle}"><img v-bind:src=item.srcImg v-bind:alt=item.altImg><div class="item-text"><p>{{item.title}}</p><h3>{{item.price}}</h3></div></a><a href="#" class="add" v-bind:id=item.id @click.prevent=app.handleBuyClick(item) >Add to Card</a></div>
      `,
});

Vue.component('products', {
  props: ['query', 'page', 'sort', 'count', 'maxprice'],
  data() {
    return {
      items: [],
      showItems: [],
    };
  },
  computed: {
    sliceItems() {
      this.showItems = this.items;
      // Фильтруем по максимальной цене.
      this.showItems = this.showItems.filter((item) => item.price < +this.maxprice)
      // Сортируем
      switch (this.sort) {
        case 'price':
          {
            this.showItems.sort(function (a, b) {
              if (a.price > b.price) return 1;
              if (a.price < b.price) return -1;
              return 0;
            });
            break;
          }
        case 'title':
          {
            this.showItems.sort(function (a, b) {
              if (a.title > b.title) return 1;
              if (a.title < b.title) return -1;
              return 0;
            });
            break;
          }
      };
      // Делим на страницы по количеству
      return this.showItems.slice((this.page - 1) * this.count, this.page * this.count)
    }
  },
  mounted() {
    fetch(`${API_URL}/products`) //Загружаем список товаров.
      .then(response => response.json())
      .then((items) => {
        this.items = items;
      });
  },
  template: `
          <div class="items">
            <product-item v-for="entry in sliceItems" :item="entry" @onbuy="handleBuyClick(entry)"></product-item>
          </div>  <!-- Корневой элемент, в котором будут товары(обязательно)-->
        `,
});

const app = new Vue({
  el: '#app',
  data: {
    filterValue: '',
    cart: [],
    sortBy: 'title',
    pageNumber: 1,
    countShowItems: 9,
    priceRange: 200 // Нужно сделать по максимальной цене товара в массиве.
  },
  mounted() {
    fetch(`${API_URL}/cart`)
      .then(response => response.json())
      .then((items) => {
        this.cart = items;
      });
  },
  methods: {
    changePage(p) {
      this.pageNumber = p;
    },
    handleBuyClick(item) {
      const cartItem = this.cart.find((entry) => entry.id === item.id);
      console.log(cartItem)
      if (cartItem) {
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
