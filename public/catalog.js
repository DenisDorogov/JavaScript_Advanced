const API_URL = 'http://localhost:3000';
const urlSingle = 'single_page.html';
    
    Vue.component('search', {
      template: `
          <div :style="{ backgroundImage: backgroundImage }">
          <input type="text" v-model="searchQuery" class="search-text" />
          <button class="search-button" @click="handleSearchClick">Поиск</button>
          </div>
          `, // Шаблон
      data() {
        return {
          searchQuery: '',
          image: 'https://i.ytimg.com/vi/M-XtB0R3ri4/maxresdefault.jpg',
        }
      },
      computed: {
        backgroundImage() { return `url(${this.image})`; }
      },
      methods: {
        handleSearchClick() {
          this.$emit('search', this.searchQuery); // Событие search, передаём туда
        }
      }
    });

    Vue.component('product-item', { // Создаём компонент с html тегом 'product-item'
      props: ['item'], // Свойство компонента. Могут использоваться также внутри html
      template: ` 
        <div class="item"><a href= "${urlSingle}"><img v-bind:src=item.srcImg v-bind:alt=item.altImg><div class="item-text"><p>{{item.title}}</p><h3>{{item.price}}</h3></div></a><a href="#" class="add" v-bind:id=item.id >Add to Card</a></div>
      `, // Разметка, которую рисует компонент В шаблоне только один корневой элемент(<div>)
      methods: {
        handleBuyClick(item) {
          this.$emit('onbuy', item);
          // Метод, который обрабатывает событие onBuy, и получаем item 
        }
      }
    });

      Vue.component('products', {
        props: ['query', 'page', 'sort', 'count', 'maxprice'], //Список или хэш входных параметров, по которым разрешено получение данных из родительского компонента. Это как параметр функции.
        methods: {
          handleBuyClick(item) {
            this.$emit('onbuy', item);
          },
        },
        data() { // Функция, которая должна возвращать значение.
          return {
            items: [], // Также используется для хранения данных (переменных)
            showItems: [],            
          };
        },
        computed: {
          
          filteredItems() {
            if(this.query) {
              const regexp = new RegExp(this.query, 'i');
              return this.items.filter((item) => regexp.test(item.name));
            } else {
              return this.items;
            }
          },
//          sortItems(value) {
//            this.items.sort((a.value,b.value) => {
//              if (a > b) return 1;
//              if (a < b) return -1;
//            })
//          },
          sliceItems() {
            this.showItems = this.items;
            // Фильтруем по максимальной цене.
            this.showItems = this.showItems.filter((item) => item.price < +this.maxprice)
            // Сортируем
            switch(this.sort) {
                case 'price': {
                  this.showItems.sort(function (a, b) {
                    if (a.price > b.price) return 1;
                    if (a.price < b.price) return -1;
                    return 0;
                  });
                  break;
                }
                case 'title': {
                  this.showItems.sort(function (a, b) {
                    if (a.title > b.title) return 1;
                    if (a.title < b.title) return -1;
                    return 0;
                  });
                  break;
                }
            };
            // Делим на страницы по количеству
            return this.showItems.slice((this.page - 1) * this.count, this.page * this.count )
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
            <product-item v-for="entry in sliceItems" :item="entry" @onbuy="handleBuyClick"></product-item>
          </div>  <!-- Корневой элемент, в котором будут товары(обязательно)-->
        `,// Отрисовка списка товаров
        // Создаём собственное onBuy событие для данного компонента.
        //:item="entry" передаём переменную item в компонент product-item
      });

const app = new Vue({
  el: '#app',
  data: {
    filterValue: '',
    cart: [],
    firstName: 'Ivan',
    lastName: 'Petrov',
    sortBy: 'title',
    showItems: '9',
    pageNumber: 1,
    countShowItems: 9,
    priceRange: 200
  },
  mounted() {
    fetch(`${API_URL}/cart`)
      .then(response => response.json())
      .then((items) => {
        this.cart = items;
      });
  },
  
  watch: {
//          sortBy: function() {
//            console.log('Watch сработал');
//          },
//          countShowItems: function() {
//            console.log('countShowItems = ' + this.countShowItems);
//          },
    },
  computed: {
//    total() {
//      return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//    }
  },
  methods: {
    changePage(p) {
      this.pageNumber = p;
    },
//    handleDeleteClick(item) {
//      if (item.quantity > 1) {
//        fetch(`${API_URL}/cart/${item.id}`, {
//          method: 'PATCH',
//          headers: {
//            'Content-Type': 'application/json',
//          },
//          body: JSON.stringify({ quantity: item.quantity - 1 }),
//        })
//          .then((response) => response.json())
//          .then((item) => {
//            const itemIdx = this.cart.findIndex((entry) => entry.id === item.id);
//            Vue.set(this.cart, itemIdx, item);
//          });
//      } else {
//        fetch(`${API_URL}/cart/${item.id}`, {
//          method: 'DELETE',
//        })
//          .then(() => {
//            this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id);
//          });
//      }
//    }, 
//    handleSearchClick(query) { //Когда пользователь нажимает "поиск", срабатывает метод
//      this.filterValue = query;//Меняем входные данные
//    },
    handleBuyClick(item) {
      const cartItem = this.cart.find((entry) => entry.id === item.id);
      if (cartItem) {
        // товар в корзине уже есть, нужно увеличить количество
        fetch(`${API_URL}/cart/${item.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: cartItem.quantity + 1 }),
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
          body: JSON.stringify({ ...item, quantity: 1 })
        })
          .then((response) => response.json())
          .then((item) => {
            this.cart.push(item);
          });
      }
    }
  }
});  




//const urlSingle = 'single_page.html';
//const altImg = 'good';
//
//class GoodsItem {
//    constructor(id, title, price, src, altImg) {
//        this.id = id;
//        this.title = title;
//        this.price = price;
//        this.src = src;
//        this.altImg = altImg;
//        let param = '';
//    }
//    render() {
//        return `<div class="item"><a href= ${urlSingle}><img src= ${this.src} alt="${this.altImg}"><div class="item-text"><p>${this.title}</p><h3>$${this.price}</h3></div></a><a href="#" class="add" id="${this.id}" >Add to Card</a></div>`;
//    }
//};
//class GoodsList {
//    constructor() {
//        this.goods = [];
//    }
//    fetchGoods() {
//        const promise = new Promise((resolve, reject) => {
//            const xhr = new XMLHttpRequest();
//            xhr.open('GET', '/db/catalogData.json'); // настройка запроса
//            xhr.send();
//            xhr.onreadystatechange = () => {
//                if (xhr.readyState === XMLHttpRequest.DONE) {
//                    if (xhr.status === 200) {
//                        resolve(JSON.parse(xhr.responseText));
//                    } else {
//                        reject(console.log('Не удалось получить список товаров.'));
//                    }
//                }
//            }
//
//        });
//        promise.then((goods) => {
//                this.goods = goods;
//                console.log(this.goods)
//            }, () => {})
//            .then(() => {
//                this.sortGoods("sortbye-select1");
////                return this.render();
//            }, () => {});
//    }
//    render() {
//        let listHtml = '';
//        let i = 0;
//        this.goods.forEach(good => {
//            let srcImg = good.srcImg;
//            if (typeof (good.srcImg) == 'undefined' || good.srcImg == '') srcImg = 'img/NoPhoto.jpg';
//            const goodItem = new GoodsItem(good.id, good.title, good.price, srcImg, good.altImg);
//            //            console.log(goodItem);
//            listHtml += goodItem.render();
//        });
//        document.querySelector('.items').innerHTML = listHtml;
//    }
//    sortGoods(elemId) {
//
//        let arrSortParam = document.getElementById(elemId).options.selectedIndex;
//        let option = document.getElementById(elemId).options[arrSortParam].value;
//        switch (option) {
//            case 'Name':
//                {
//                    this.goods.sort((a, b) => {
//                            if (a > b) return 1;
//                            if (a < b) return -1; 
//                            console.log(this.goods);
//                        break;
//                    });
//                }
//        }
//        console.log(this.goods);
//        this.render();
//    }
//}
//const list = new GoodsList(); // Создаём экземпляр класса GoodsList
//list.fetchGoods(); // Получаем товары с помощью метода
//
//const $catalog = document.querySelector('.items');
//$catalog.addEventListener('click', event => {
//    event.preventDefault();
//    if (event.target.classList = 'add') {
//        cart.addCartItem(event.target); // Подписались на события, на клик "Добавить в корзину"
//    }
//});
