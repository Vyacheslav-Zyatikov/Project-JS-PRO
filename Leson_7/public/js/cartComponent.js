Vue.component("cart", {
    props: ["visible", "cartItems"],
    template: `<div class="cartBlock" v-if="visible">
                    <p v-if="!cartItems.length">Корзина пуста</p>
                    <cartItem v-for="item of cartItems" :key="item.id_product" :cart-item="item"></cartItem>
                </div>`
});

Vue.component("cartItem", {
    props: ["cartItem"],
    template: `<div class="cart-item">
                    <img class="cart-image" :src="cartItem.cartImg" alt="Some img">
                    <h3 class="cart-title">{{cartItem.product_name}}</h3>
                    <p class="cart-price">{{cartItem.price*cartItem.quantity}} $</p>
                    <p class="cart-quantity">{{cartItem.quantity}} шт</p>
                    <button class="del-btn" @click="$parent.$emit('remove-product', cartItem)"></button>
                </div>`
});