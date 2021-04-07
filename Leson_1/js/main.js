const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url, callback) {
    return new Promise((resolve, reject) => {
        let xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new window.ActiveXObject;
        xhr.open("GET", url, true);
        xhr.onload = () => resolve(callback(xhr.responseText));
        xhr.onerror = () => reject(console.log(xhr.statusText));
        xhr.send();
    });
}

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchGoods();
    }

    _fetchGoods() {
        return new Promise((resolve) => {
            makeGETRequest(`${API_URL}/catalogData.json`, (good) => {
                this.goods = JSON.parse(good);
                resolve(this.render());
            })
        });

    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render())
        }
    }

    getSum() {
        let res = this.allProducts.reduce((sum, item) => sum += item.price, 0);
        alert(res); // todo
    }
}

class ProductItem {
    constructor(product, img = 'https://place-hold.it/200x150') {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <h3>${this.product_name}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

class Basket {
    addToBasket(id) {

    }

    deleteFromBasket(id) {
    }

    calcAllGoods() {
    }

    basketCount() {
    }

    render() {
    }
}

class BasketItem {
    constructor(id, product_name, price, img = 'https://place-hold.it/200x150') {
        this.id = id;
        this.product_name = product_name;
        this.price = price;
        this.img = img;
    }

    render() {
        return `<div class="basket-item">
                    <img src="${this.img}" alt="${this.product_name}">
                    <div class="basket-info">
                        <h3>${this.product_name}</h3>
                        <p>${this.price}</p>
                    </div>
                    <button class='deleteItem' onclick='deleteItem(${this.id})'>&times;</button>
                </div>`;
    }
}

let list = new ProductsList();
const cart = new Basket();