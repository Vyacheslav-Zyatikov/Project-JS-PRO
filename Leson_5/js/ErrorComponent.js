Vue.component('error', {
    template:
        `
        <div class="grid">
            <h1 v-if="$root.error === true">Нет связи с сервером</h1>
        </div>
        `
})