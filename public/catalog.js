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
            return `<div class="item"><a href= ${urlSingle}><img src= ${this.src} alt="${this.altImg}"><div class="item-text"><p>${this.title}</p><h3>$${this.price}</h3></div></a><a href="#cart" class="add" id="item${this.id}" >Add to Card</a></div>`;
        }
    };
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
        .then(() => this.render(),() => {});
    }
    render() {
        let listHtml = '';
        let i = 0;
        this.goods.forEach(good => {
            let srcImg = good.srcImg; 
            if (typeof(good.srcImg) == 'undefined' || good.srcImg == '') srcImg = 'img/NoPhoto.jpg';
            const goodItem = new GoodsItem(good.id, good.title, good.price, srcImg, good.altImg);
//            console.log(goodItem);
            listHtml += goodItem.render();
        });
        document.querySelector('.items').innerHTML = listHtml;
    }
//    totalPrice () {
//        let total = 0;
//        this.goods.forEach(sum => total += sum.price);
//        console.log('total = $' + total);
//    }
}
const list = new GoodsList(); // Создаём экземпляр класса GoodsList

list.fetchGoods();


const $catalog = document.querySelector('.items');
$catalog.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.classList = 'add') {
        console.log('Добавили.'+event.target)
        cart.addCartItem(event);
    }
})

