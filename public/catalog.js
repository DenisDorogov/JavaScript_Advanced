const urlSingle = 'single_page.html';
const altImg = 'good';

class GoodsItem {
    constructor(id, title, price, src, altImg) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.src = src;
        this.altImg = altImg;
    }
    render() {
        return `<div class="item"><a href= ${urlSingle}><img src= ${this.src} alt="${this.altImg}"><div class="item-text"><p>${this.title}</p><h3>$${this.price}</h3></div></a><a href="#" class="add" id="${this.id}" >Add to Card</a></div>`;
    }
};
class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
            const promise = new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', '/db/catalogData.json'); // настройка запроса
                xhr.send();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            resolve(JSON.parse(xhr.responseText));
                        } else {
                            reject(console.log('Не удалось получить список товаров.'));
                        }
                    }
                }

            });
            promise.then((goods) => this.goods = goods, () => {})
                .then(() => this.render(), () => {});
    }
    render() {
        let listHtml = '';
        let i = 0;
        this.goods.forEach(good => {
            let srcImg = good.srcImg;
            if (typeof (good.srcImg) == 'undefined' || good.srcImg == '') srcImg = 'img/NoPhoto.jpg';
            const goodItem = new GoodsItem(good.id, good.title, good.price, srcImg, good.altImg);
            //            console.log(goodItem);
            listHtml += goodItem.render();
        });
        document.querySelector('.items').innerHTML = listHtml;
    }
}
const list = new GoodsList(); // Создаём экземпляр класса GoodsList
list.fetchGoods(); // Получаем товары с помощью метода


const $catalog = document.querySelector('.items');
$catalog.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.classList = 'add') {
        cart.addCartItem(event.target); // Подписались на события, на клик "Добавить в корзину"
    }
});
