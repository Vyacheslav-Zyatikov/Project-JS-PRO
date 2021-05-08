Vue.component('cart', {
    data() {
        return {
            cartUrl: '/userCart.json',
            cartItems: [],
            imgCart: 'https://placehold.it/50x100',
            showCart: false
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    item.cartImgPath = `image/shopping-cart/${item.id_product}.jpg`;
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod)
                        }
                    })
            }
        },
        remove(item) {
            let remove = this.$parent.remove;
            let cart = this.cartItems;
            let find = cart.find(el => el.id_product === item.id_product);

            remove(`/api/cart/${find.id_product}`, find);
        },
        minusItem(item) {
            this.$parent.getJson(`${this.$parent.api}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            let find = this.cartItems.find(el => el.id_product === item.id_product);
                            this.$parent.remove(`/api/cart/${find.id_product}`, find);
                        }
                    }
                })
        },
        calculateCart() {
            let cartPrice = 0;
            let cart = this.$parent.cartGoods[1];
            if (this.$parent.cartGoods.length >= 2 && cart.length > 0) {
                cart.forEach(el => cartPrice += el.quantity * el.price)
            }
            return cartPrice;
        },
    },
    template: `
      <div class="cart-hover"><a class="cart" href="shopping-cart.html"><img class="cart-img" src="image/cart.svg"
                                                                             alt="cart"></a>
      <div class="cart-box">
        <cart-item v-for="item of cartItems"
                   :key="item.id_product"
                   :img="item.cartImgPath"
                   :cart-item="item"
                   @remove="remove"
                   @minus="minusItem"
                   @add="addProduct">
        </cart-item>
        <div class="cart-box-total-box">
          <h3 class="cart-box-total">TOTAL</h3>
          <h3 class="cart-box-total-price">{{ calculateCart() }} $</h3>
        </div>
        <div class="cart-box-checkout transition-all"><a
            class="cart-box-checkout-link transition-all" href="checkout.html">Checkout</a>
        </div>
        <div class="cart-box-go-cart transition-all"><a class="cart-box-go-cart-link transition-all"
                                                        href="shopping-cart.html">Go to cart</a>
        </div>
      </div>
      </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
      <div class="cart-box-item">
      <div class="cart-box-img"><img :src="img" alt="Some img"></div>
      <div class="cart-box-product">
        <h3 class="cart-box-product-name">{{ cartItem.product_name }}</h3>
        <p class="cart-box-product-price black">Price:&nbsp</p>
        <p class="cart-box-product-price"> {{ cartItem.price }} $</p>
        <div class="cart-box-product-qp">
          <button class="cart-box-del-but minus" @click="$emit('minus', cartItem)"><i class="fas fa-minus"></i></button>
          <p class="cart-box-product-quantity">{{ cartItem.quantity }}</p>
          <button class="cart-box-del-but plus" @click="$emit('add', cartItem)"><i class="fas fa-plus"></i></button>
        </div>
      </div>
      <div class="cart-box-del">
        <button class="cart-box-del-but" @click="$emit('remove', cartItem)"><i
            class="fas fa-times-circle transition-all"></i>
        </button>
      </div>
      </div>
    `
})
//
//
// Vue.component('cart-page', {
//     data() {
//         return {
//             cartUrl: '/getBasket.json',
//             cartItems: [],
//         }
//     },
//     template: `
//       <div class="cart-box">
//       <cart-page-item v-for="item of cartItems"
//                       :key="item.id_product"
//                       :img="item.imgPath"
//                       :cart-item="item"
//                       @remove="remove"
//                       @minus="minusItem"
//                       @add="addProduct">
//       </cart-page-item>
//       <div class="cart-box-total-box">
//         <h3 class="cart-box-total">TOTAL</h3>
//         <h3 class="cart-box-total-price">$500.00</h3>
//       </div>
//       <div class="cart-box-checkout transition-all"><a
//           class="cart-box-checkout-link transition-all" href="checkout.html">Checkout</a>
//       </div>
//       <div class="cart-box-go-cart transition-all"><a class="cart-box-go-cart-link transition-all"
//                                                       href="shopping-cart.html">Go to cart</a>
//       </div>
//       </div>
//       <!--      <div>-->
//       <!--      <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>-->
//       <!--      <div class="cart-block" v-show="showCart">-->
//       <!--        <cart-item v-for="item of cartItems"-->
//       <!--                   :key="item.id_product"-->
//       <!--                   :img="item.imgPath"-->
//       <!--                   :cart-item="item"-->
//       <!--                   @remove="remove"-->
//       <!--                   @minus="minusItem"-->
//       <!--                   @add="addProduct">-->
//       <!--        </cart-item>-->
//       <!--      </div>-->
//       <!--      </div>-->
//     `
// });
//
// Vue.component('cart-page-item', {
//     props: ['img', 'cartItem'],
//     template: `
//       <div class="product-details-box">
//       <div class="product-details-box-item">
//         <div class="product-details-item-box">
//           <div class="product-details-box-image">
//             <img :src="img" alt="Some img">
//           </div>
//           <div class="product-details-box-product">
//             <p class="product-details-box-item-name">{{ cartItem.product_name }}</p>
//             <div class="product-details-box-item-color">Color: <span
//                 class="product-details-box-item-color-s">{{ cartItem.color }}</span></div>
//             <div class="product-details-box-item-size">Size: <span
//                 class="product-details-box-item-size-s">{{ cartItem.size }}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div class="product-details-box-item product-details-box-item-2"><p
//           class="product-details-box-item__price">{{ cartItem.price }} $</p></div>
//       <div class="product-details-box-item product-details-box-item-3"><label><input
//           class="product-details-box-item__quantity" type="text" name="" id="" value="{{ cartItem.quantity }}"></label>
//       </div>
//       <div class="product-details-box-item product-details-box-item-4"><p
//           class="product-details-box-item__shipping">FREE</p></div>
//       <div class="product-details-box-item product-details-box-item-5"><p
//           class="product-details-box-item__subtotal">{{ cartItem.quantity * cartItem.price }} $</p></div>
//       <div class="product-details-box-item">
//         <div class="cart-box-del">
//           <button class="cart-box-del-but transition-all"><i
//               class="fas fa-times-circle transition-all"></i></button>
//         </div>
//       </div>
//       </div>
//
//       <div class="cart-box-item">
//       <div class="cart-box-img"><img :src="img" alt="Some img"></div>
//       <div class="cart-box-product">
//         <h3 class="cart-box-product-name">{{ cartItem.product_name }}</h3>
//         <div class="cart-box-product-rate"><i class="fas fa-star"></i><i
//             class="fas fa-star"></i><i class="fas fa-star"></i><i
//             class="fas fa-star"></i><i class="fas fa-star-half-alt"></i></div>
//         <div class="cart-box-product-qp">
//           <p class="cart-box-product-quantity">{{ cartItem.quantity }}</p>
//           <p class="cart-box-product-x">&nbsp x &nbsp</p>
//           <p class="cart-box-product-price">{{ cartItem.price }} $</p>
//         </div>
//       </div>
//       <div class="cart-box-del">
//         <button class="cart-box-del-but" @click="$emit('remove', cartItem)"><i
//             class="fas fa-times-circle transition-all"></i>
//         </button>
//       </div>
//       </div>
//     `
// })