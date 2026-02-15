import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 1. Wir erstellen die App-Instanz und speichern sie in der Variable 'app'
const app = createApp(App)

// 2. Jetzt sagen wir DIESER Instanz, dass sie den Router nutzen soll
app.use(router)

// 3. Erst ganz am Ende hängen wir alles an das HTML-Element #app
app.mount('#app')
