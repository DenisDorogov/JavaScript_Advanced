// Урок 5
const API_URL = 'http://localhost:3000/catalog.json';
class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class = "goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

//class GoodsList {
//    constructor() {
//        this.goods = [];
//        this.filteredGoods = [];
//    };
//    //    promise.then(resolve) {
//    fetchGoods() {
//        return makeGETRequest(`${API_URL}`).then((goods) => {
//            this.goods = JSON.parse(goods);
//            this.filteredGoods = JSON.parse(goods);
//        });
//    };
//    render() {
//        let listHtml = '';
//        this.filteredGoods.forEach(good => {
//            const goodItem = new GoodsItem(good.title, good.price);
//            listHtml += goodItem.render();
//        });
//        document.querySelector('.goods-list').innerHTML = listHtml;
//    }
//    filterGoods(value) {
//        const regexp = new RegExp(value, 'i');
//        this.filteredGoods = this.goods.filter(good =>
//            regexp.test(good.product_name));
//        this.render();
//    }
//}


//const list = new GoodsList(); // Создаём экземпляр класса GoodsList
//list.fetchGoods().then(() => {
//    list.render();
//});
//
//let searchButton = document.querySelector('.search-button');
//let searchInput = document.querySelector('.goods-search');
//
//searchButton.addEventListener('click', (e) => {
//    const value = searchInput.value;
//    list.filterGoods(value);
//});
let searchText;
const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
    },
//    methods: {
//        makeGETRequest(url, callback) {
//            const API_URL = 'http://localhost:3000/catalog.json';
//            let xhr;
//            if (window.XMLHttpRequest) {
//                xhr = new XMLHttpRequest();
//            } else if (window.ActiveXObject) {
//                xhr = new ActiveXObject('Microsoft.XMLHTTP');
//            };
//            xhr.onreadystatechange = function () { // Подписка на события
//                if (xhr.readyState === XMLHttpRequest.DONE) {
//                    callback(xhr.responseText);
//                }
//                xhr.open('GET', url); // Определение запроса
//                xhr.send(); // Отправка запроса
//            }
//        }
//    },
//    mounted() {
//        this.makeGETRequest(`$API_URL`, (goods) => {
//            this.goods = goods;
//            this.filteredGoods = goods;
//        });
//    }
    mounted() {
        fetch('http://localhost:3000/catalog.json')
        .then(response => response.json())
        .then((goods) => {
            this.goods = goods;
            this.filteredGoods = goods;
        })
    },
    methods: {
        handleSearchClick() {
            alert('Find');
        }
    }
});