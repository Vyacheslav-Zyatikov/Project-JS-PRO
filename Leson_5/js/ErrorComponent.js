Vue.component('error', {
    template:
        `
        <div class="grid">
            <h1 v-if="$parent.products.length === 0">Нет связи с сервером</h1>
        </div>
        `
})