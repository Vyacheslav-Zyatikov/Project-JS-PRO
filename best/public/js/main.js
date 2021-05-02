const app = new Vue(
    {
        el: '#app',
        data: {
            products: [],
            api: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/',
            cartData: '',
            showedProducts:[],
            cartGoods:[],
        },
        methods: {
            fetchProducts(url){
                return fetch(url)
                    .then(answer => answer.json())
                    .catch(error => console.log(error));
            },
            getJson(url){
                return fetch(url)
                    .then(result => result.json())
                    .catch(error => {
                        console.log(error)
                        this.$refs.error.text = error;
                    })
            },
            postJson(url, data){
                console.log(url)

                return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(result => result.json())
                    .catch(error => {
                        console.log(error)
                    })
            },
            putJson(url, data){
                console.log(url)
                return fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(result => result.json())
                    .catch(error => {
                        console.log(error)
                    })
            },
            remove(url, data){
                return fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(result => {
                        result.json()
                        this.fetchProducts('/api/cart')
                            .then(data => {
                                console.log(data)
                                this.cartGoods.push({amount: data.amount, countGoods: data.countGoods});
                                this.cartGoods[1] = data.contents;

                            });
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            addProduct(item){
                console.log(this.cartGoods[1])

                let find = this.cartGoods[1].find(el => el.id_product === item.id_product);
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
                                this.cartGoods[1].push(prod);
                            }
                        })
                }
            }
        },
        mounted() {
            this.fetchProducts('/api/products')
                .then(data => {
                    this.products = [...data];
                    this.showedProducts = this.products;
                });
            this.fetchProducts('/api/cart')
                .then(data => {
                    this.cartGoods.push({amount: data.amount, countGoods: data.countGoods});
                    this.cartGoods.push(data.contents);
                });
        }
    }
)