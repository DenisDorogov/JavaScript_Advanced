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
                title: 'Мяч',
                price: 300,
                count: 1,
                src: 'img/item1cat.jpg'
    },
            {
                title: 'Бита',
                price: 1000,
                count: 1,
                src: 'img/item2cat.jpg'
    },
            {
                title: 'Кепка',
                price: 800,
                count: 1,
                src: 'img/item3cat.jpg'
    },
            {
                title: 'Перчатка',
                price: 1500,
                count: 1,
                src: 'img/item4cat.jpg'
    },
            {
                title: 'Шлем',
                price: 2000,
                count: 1,
                src: 'img/item5cat.jpg'
    },
            {
                title: 'Сумка',
                price: 1200,
                count: 1,
                src: 'img/item6cat.jpg'
    }
        ]
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.src);
            listHtml += goodItem.render();
        });
        document.querySelector('.items').innerHTML = listHtml;
    }
}
const list = new GoodsList(); // Создаём экземпляр класса GoodsList
list.fetchGoods();
list.render();
//________________________________________________________

//
//const CATALOGUE_ROW_LENGTH = 3;
//const CATALOGUE_LENGTH = CATALOGUE_ROW_LENGTH * 4;
//const goods = [
//    {
//        name: 'T-shirt man',
//        price: 50,
//        urlSingle: 'single_page.html',
//        srcImg: 'img/Item1.jpg',
//        altImg: 'T-shirt man'
//    },
//    {
//        name: 'Rouse-blose',
//        price: 52,
//        urlSingle: 'single_page.html',
//        srcImg: 'img/Item2.jpg',
//        altImg: 'Rouse-blose'
//    },
//    {
//        name: 'Blue jacket',
//        price: 84,
//        urlSingle: 'single_page.html',
//        srcImg: 'img/Item3.jpg',
//        altImg: 'Blue jacket'
//    },
//    {
//        name: 'Summer dress',
//        price: 61,
//        urlSingle: 'single_page.html',
//        srcImg: 'img/Item4.jpg',
//        altImg: 'Summer dress'
//    },
//    {
//        name: 'Stripy dress',
//        price: 62,
//        urlSingle: 'single_page.html',
//        srcImg: 'img/Item5.jpg',
//        altImg: 'Stripy dress'
//    },
//    {
//        name: 'Gray suit',
//        price: 100,
//        urlSingle: 'single_page.html',
//        srcImg: 'img/Item6.jpg',
//        altImg: 'Gray suit'
//    },
//    {
//        name: 'Beige breeches',
//        price: 43,
//        urlSingle: 'single_page.html',
//        srcImg: 'img/Item7.jpg',
//        altImg: 'Beige breeches'
//    },
//    {
//        name: 'Blue hoodie',
//        price: 59,
//        urlSingle: 'single_page.html',
//        altImg: 'Blue hoodie'
//    }
//];
//
//var catalogueGoods = [];
//for (let i = 0; i < CATALOGUE_LENGTH && i < goods.length; i++) {
//    catalogueGoods.push(goods[i]);
//}
//
//const renderItem = ({
//    name,
//    price,
//    urlSingle,
//    srcImg = 'img/NoPhoto.jpg',
//    altImg = 'good'
//}) => `<div class="item"><a href= ${urlSingle}><img src= ${srcImg} alt=${altImg}><div class="item-text"><p>${name}</p><h3>$${price}</h3></div></a><a href="#cart" class="add">Add to Card</a></div>`;
//
//var k = CATALOGUE_ROW_LENGTH - (catalogueGoods.length % CATALOGUE_ROW_LENGTH);
//
//const renderList = items => document.querySelector('.items').innerHTML = items.map(renderItem).join('') + addCearItems('.items', k); // При выводе массива, между элементами расставляются запятые. Чтобы избавиться от них, применил метот join.
//
//function addCearItems(parent, k) { // Функция добавления пустых элементов для корректного расположения элементов.
//    let clearItemsTags = '';
//    for (let i = 0; i < k && k != CATALOGUE_ROW_LENGTH; i++) {
//        clearItemsTags += (document.querySelector(parent).innerHTML = `<div class="item-clear"></div>`);
//    }
//    return clearItemsTags;
//}
//
//renderList(goods);
