const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
    {id: 5, title: 'Game', price: 70},
    {id: 6, title: 'Cable', price: 5},
];
//Функция для формирования верстки каждого товара
const renderProduct = (product, img='https://place-hold.it/200x150') => {
    return `<div class="product-item grid">
                <img src="${img}" alt="photo">
                <h3>${product.title}</h3>
                <p>$ ${product.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
};

renderPage(products);