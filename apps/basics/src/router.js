import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import SettingsView from './views/SettingsView.vue'
import ToolsView from './views/ToolsView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/settings', component: SettingsView },
    { path: '/tools', component: ToolsView },
    { path: '/tools/:id', component: ToolsView }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router