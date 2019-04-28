const API_URL = 'http://localhost:3000';
//let total = 0;


Vue.component('cartitem', {
  props: ['item'],
  template:`
   <tr>
                <td class="cart__table_item1">
                    <a v-bind:href = item.urlSingle><img v-bind:src=item.srcImg v-bind:alt=item.altImg></a>
                    <div class="cart__table_about">
                        <h3>{{item.title}}</h3>
                        <h4>Color: <span>{{item.color}}</span></h4>
                        <h4>Size: <span>{{item.size}}</span></h4>
                    </div>
                </td>
                <td>{{item.price}}</td>
                <td>
                    <input type="text" class="cart__table_quanity" v-model=item.quantity >
                </td>
                <td>{{item.shipping = 'FREE'}}</td>
                <td>{{item.price * item.quantity}}</td>
                <td>
                    <div class="cart-item-del"><i class="fa fa-times-circle" aria-hidden="true"></i></div>
                </td>
            </tr>
  `
})

Vue.component('carttable', {
  props: ['cart'],
  mounted() {},
  template: `
  <table class="cart-list"> 
      <tr>
                <th style="text-align: left">Product Details</th>
                <th>unite Price</th>
                <th>Quantity</th>
                <th>shipping</th>
                <th>Subtotal</th>
                <th>ACTION</th>
            </tr>
      <tr v-for="item in cart">
                <td class="cart__table_item1">
                    <a v-bind:href = item.urlSingle><img v-bind:src=item.srcImg v-bind:alt=item.altImg></a>
                    <div class="cart__table_about">
                        <h3>{{item.title}}</h3>
                        <h4>Color: <span>{{item.color = 'NONE'}}</span></h4>
                        <h4>Size: <span>{{item.size = 'NONE'}}</span></h4>
                    </div>
                </td>
                <td>{{item.price}}</td>
                <td>
                    <input type="text" class="cart__table_quanity" v-model=item.quantity >
                </td>
                <td>{{item.shipping = 'FREE'}}</td>
                <td>{{item.price * item.quantity}}</td>
                <td>
                    <div class="cart-item-del"><i class="fa fa-times-circle" aria-hidden="true" @click="handleDeleteClick(item)"></i></div>
                </td>
            </tr>
    </table>
  `,
  methods: {
    handleDeleteClick(item) {
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
  }
});

const appcart = new Vue({
  el: '#appcart',
  data: {
    cart: [],
    //    total: 0;

  },
  //  methods: {
  //    
  //  },
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
    },
  },
  methods: {
    handleDeleteClick(item) {
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
  }
});