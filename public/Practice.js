// Урок 3
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

class GoodsList {
    constructor() {
        this.goods = [];
        this.filteredGoods = [];
    };
    //    promise.then(resolve) {
    fetchGoods() {
        return makeGETRequest(`${API_URL}`).then((goods) => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
        });
    };
    render() {
        let listHtml = '';
        this.filteredGoods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good =>
            regexp.test(good.product_name));
        this.render();
    }
}


const list = new GoodsList(); // Создаём экземпляр класса GoodsList
list.fetchGoods().then(() => {
    list.render();
});

//const promise = new Promise((resolve, reject) => {});

function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url); // Определение запроса
        xhr.send(); // Отправка запроса 
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () { // Подписка на события
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else reject();
            }
        }

    });

};
let searchButton = document.querySelector('.search-button');
let searchInput = document.querySelector('.goods-search');

searchButton.addEventListener('click', (e) => {
    const value = searchInput.value;
    list.filterGoods(value);
});
