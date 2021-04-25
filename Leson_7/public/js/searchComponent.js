Vue.component("search", {
    data() {
        return {
            userSearch: ""
        }
    },
    template: `<form action="#" class="searchForm" @submit.prevent="$parent.filterGoods(userSearch)">
    <input class="input-search" type="text" v-model="userSearch">
    <button class="btn-search" type="button" @click="$parent.filterGoods(userSearch)"></button>
    </form>`
});