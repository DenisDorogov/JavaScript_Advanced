const goods = [
    {name: 'T-shirt man', price: 50, urlSingle: 'single_page.html', srcImg: 'img/Item1.jpg', altImg: 'Item' },
    {name: 'Rouse-blose', price: 52, urlSingle: 'single_page.html', srcImg: 'img/Item2.jpg', altImg: 'Item' },
    {name: 'Blue jacket', price: 84, urlSingle: 'single_page.html', srcImg: 'img/Item3.jpg', altImg: 'Item' },
    {name: 'Summer dress', price: 61, urlSingle: 'single_page.html', srcImg: 'img/Item4.jpg', altImg: 'Item' },
    {name: 'Stripy dress', price: 62, urlSingle: 'single_page.html', srcImg: 'img/Item5.jpg', altImg: 'Item' },
    {name: 'Gray suit', price: 100, urlSingle: 'single_page.html', srcImg: 'img/Item6.jpg', altImg: 'Item' },
    {name: 'Beige breeches', price: 43, urlSingle: 'single_page.html', srcImg: 'img/Item7.jpg', altImg: 'Item' },
    {name: 'Blue hoodie', price: 59, urlSingle: 'single_page.html', srcImg: 'img/Item8.jpg', altImg: 'Item' }
];

const renderItem = ({name, price, urlSingle, srcImg, altImg}) => `<div class="item"><a href= ${urlSingle}><img src= ${srcImg} alt=${altImg}><div class="item-text"><p>${name}</p><h3>$${price}</h3></div></a><a href="#cart" class="add">Add to Card</a></div>`;



const renderList = items => {
    const itemsHtmls = items.map(renderItem);
    document.querySelector('.items').innerHTML = itemsHtmls + `<div class="item" style="height: 0; margin-bottom: 0">`;
}
renderList(goods);
