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
    }
    fetchGoods(callback) {
        makeGETRequest(`${API_URL}`, (goods) => {
            this.goods = JSON.parse(goods);
            callback();
        });
    }
    render() {
    let listHtml = '';
    this.goods.forEach(good => {
        const goodItem = new GoodsItem(good.title, good.price);
        listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
    }
}
const list = new GoodsList(); // Создаём экземпляр класса GoodsList
list.fetchGoods(() => {
    list.render();
});


function makeGETRequest(url, callback) {
        var xhr;
        
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP"); //Это нужно для IE
        }
        
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                callback(xhr.responceText);
            }
        }
        xhr.open('GET', url);
        xhr.send();
    }

