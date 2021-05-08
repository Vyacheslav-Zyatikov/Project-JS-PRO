Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: []
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    item.imgPath = `../image/main-product/${item.id_product}.jpg`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `
      <div class="grid grid-container main-product">
      <product v-for="item of filtered"
               :key="item.id_product"
               :img="item.imgPath"
               :product="item"
               @add-product="$parent.$refs.cart.addProduct"></product>
      </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
      <div class="product-item main-product__item transition-all">
      <div class="add-box transition-all">
        <button class="add buy-btn" @click="$emit('add-product', product)"><img class="add-img" src="image/cart.svg" alt="cart"><p class="add-p">Add to Cart</p></button>
      </div>
      <a class="product-link" href="single-page.html">
        <div class="img-box transition-all"><img class="prod-img" :src="img" alt="product"></div>
        <div class="text-box">
          <p class="prod-desc">{{ product.product_name }}</p>
          <p class="prod-price">{{ product.price }} $</p>
        </div>
      </a>
      </div>
    `
})