const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
new Vue(
    {
        el: "#app",
        data: {
            catalogUrl: "/catalogData.json",
            cartUrl: "/getBasket.json",
            products: [],
            filtered: [],
            cartItems: [],
            searchLine: "",
            isVisibleCart: false
        },
        methods: {
            getJson(url){
                return fetch(url)
                    .then(result => result.json())
                    .catch(error => {
                        this.$refs.error.text = error;
                    })
            },
            postJson(url, data){
                return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(result => result.json())
                    .catch(error => {
                        this.$refs.error.text = error;
                    })
            },
            putJson(url, data){
                return fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(result => result.json())
                    .catch(error => {
                        this.$refs.error.text = error;
                    })
            },

            addProduct(item){
                let find = this.cartItems.find(el => el.id_product === item.id_product);
                if(find){
                    this.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                        .then(data => {
                            if(data.result === 1){
                                find.quantity++
                            }
                        })
                } else {
                    const prod = Object.assign({quantity: 1}, item);
                    this.postJson(`/api/cart`, prod)
                        .then(data => {
                            if(data.result === 1){
                                this.cartItems.push(prod)
                            }
                        })
                }
            },

            removeProduct(item) {
                this.getJson(`${API}/addToBasket.json`)
                    .then(data => {
                        if(data.result === 1) {
                            if(item.quantity > 1) {
                                item.quantity--;
                            }
                            else {
                                this.$data.cartItems.splice(this.cartItems.indexOf(item), 1);
                            }
                        }
                    });
            },

            filterGoods(value) {
                const regexp = new RegExp(value, 'i');
                this.filtered = this.products.filter(product => regexp.test(product.product_name));
            }
        },
        mounted(){
            this.getJson(`/api/products`)
                .then(data => {
                    for (let item of data){
                        this.$data.products.push(item);
                        this.$data.filtered.push(item);
                    }
                }),
                this.getJson(`/api/cart`)
                    .then(data => {
                        for (let item of data){
                            this.$data.cartItems.push(item);
                        }
                    })
        }
    }
);
