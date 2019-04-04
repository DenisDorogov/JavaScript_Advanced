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
let searchText;
const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
    },
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
//            this.filteredGoods = this.goods.filter((good) => { // Не успел другим методом сделать.
//                return good.indexOf(this.searchLine) != -1;
//            });
            let filteredGoods = this.goods; 
            let j = filteredGoods.length;
            for (i = 0; i < j; i++) { // Работает не совсем корректно
                console.log('iteration ' + i);
                if (filteredGoods[i].title.indexOf(this.searchLine) == -1) {
                    filteredGoods.splice(i,1);
                    console.log('deleted '+i);
//                    i--;
                }
            }
        }
    }
});
