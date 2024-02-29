const App = {
    data() {
        return {
            servers: []
        }
    },
    async mounted() {
        const res = await fetch('/api/server')
        this.servers = await res.json()
    }
}


Vue.createApp(App).mount('#app')