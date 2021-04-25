Vue.component("products", {
    props: ["products"],
    template: `<div class="grid products">
    <product v-for="item of products" :key="item.id_product" :product="item"></product>
    </div>`
});

Vue.component("product", {
    props: ["product"],
    template: `<div class="product-item">
    <a :href="product.watchImg" target="_blank"><img class="product-image" :src="product.img" alt="Some img"></a>
    <h3 class="product-title">{{product.product_name}}</h3>
    <p class="product-price">{{product.price}} $</p>
    <button class="buy-btn" @click="$parent.$emit('add-product', product)">Купить</button>
    </div>`
});