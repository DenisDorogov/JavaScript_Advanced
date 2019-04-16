const urlSingle = 'single_page.html';
const altImg = 'good';

    class GoodsItem {
        constructor(title, price, src) {
            this.title = title;
            this.price = price;
            this.src = src;
        }
        render() {
            return `<div class="item"><a href= ${urlSingle}><img src= ${this.src} alt=${altImg}><div class="item-text"><p>${this.title}</p><h3>$${this.price}</h3></div></a><a href="#cart" class="add">Add to Card</a></div>`;
        }
    }

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'products'); // настройка запроса
            xhr.send();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if(xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(console.log('Не удалось получить список товаров.'));
                    }
                }
            }
            
        });
        promise.then((goods) => this.goods = goods,() => {})
        .then(() => list.render(),() => {});
    }
    
    render() {
        let listHtml = '';
            this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.srcImg == (undefined || '') ? 'img/NoPhoto.jpg' : good.srcImg ); 
            console.log(goodItem);
            listHtml += goodItem.render();
        });
        document.querySelector('.items').innerHTML = listHtml;
    }
    totalPrice () {
        let total = 0;
        this.goods.forEach(sum => total += sum.price);
        console.log('total = $' + total);
    }
}
const list = new GoodsList(); // Создаём экземпляр класса GoodsList
list.fetchGoods();
list.totalPrice();

const $catalog = document.querySelector('.items');

$catalog.addEventListener('click', event => {
    if (event.target.classList = 'add');
    console.log('Good in cart');
})

