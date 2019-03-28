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
        this.goods = [
    {
        title: 'T-shirt man',
        price: 50,
        urlSingle: 'single_page.html',
        srcImg: 'img/Item1.jpg',
        altImg: 'T-shirt man'
    },
    {
        title: 'Rouse-blose',
        price: 52,
        urlSingle: 'single_page.html',
        srcImg: 'img/Item2.jpg',
        altImg: 'Rouse-blose'
    },
    {
        title: 'Blue jacket',
        price: 84,
        urlSingle: 'single_page.html',
        srcImg: 'img/Item3.jpg',
        altImg: 'Blue jacket'
    },
    {
        title: 'Summer dress',
        price: 61,
        urlSingle: 'single_page.html',
        srcImg: 'img/Item4.jpg',
        altImg: 'Summer dress'
    },
    {
        title: 'Stripy dress',
        price: 62,
        urlSingle: 'single_page.html',
        srcImg: 'img/Item5.jpg',
        altImg: 'Stripy dress'
    },
    {
        title: 'Gray suit',
        price: 100,
        urlSingle: 'single_page.html',
        srcImg: 'img/Item6.jpg',
        altImg: 'Gray suit'
    },
    {
        title: 'Beige breeches',
        price: 43,
        urlSingle: 'single_page.html',
        srcImg: 'img/Item7.jpg',
        altImg: 'Beige breeches'
    },
    {
        title: 'Blue hoodie',
        price: 59,
        urlSingle: 'single_page.html',
//        srcImg: 'img/Item8.jpg',
        altImg: 'Blue hoodie'
    }
]
    }
    render() {
        let listHtml = '';
            this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.srcImg == undefined ? 'img/NoPhoto.jpg' : good.srcImg); 
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
list.render();
list.totalPrice();

