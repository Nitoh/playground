<template>
  <div class="container">
    <div class="app-logo">
      <img :src="logo" alt="Logo" width="40" height="40" class="logo-image" />
    </div>

    <nav>
      <ul>
        <template v-for="(link, idx) in navLinks" :key="link.path">
          <li v-if="!link.isDropdown" class="nav-item">
            <router-link :to="link.path">{{ link.name }}</router-link>
          </li>
          <li v-else class="dropdown-container">
            <button class="dropdown-btn">
              {{ link.name }}
              <span class="arrow">›</span>
            </button>
            <ul class="dropdown-menu">
              <li v-for="tool in toolsItems" :key="tool.name">
                <router-link :to="tool.path">{{ tool.name }}</router-link>
              </li>
            </ul>
          </li>
        </template>
      </ul>
    </nav>

    <nav class="menu">
      <ul>
        <!-- <DropdownMenu ref="myDropdown">
          <button class="theme-btn">Settings ⚙️</button>
          <template #trigger>
          </template>

<ul class="dropdown-list">
  <li @click="doSomething">Profil</li>
  <li @click="doSomething">Account</li>
  <hr>
  <li @click="doSomething" class="danger">Logout</li>
</ul>
</DropdownMenu> -->

        <li><router-link to="/">Profil</router-link></li>
      </ul>
    </nav>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import DropdownMenu from './SettingsDropdown.vue'
import logo from '@/assets/logo-transparent.png'

const myDropdown = ref(null)
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Tools', path: '#', isDropdown: true },
  { name: 'Einstellungen', path: '/settings' },
  { name: 'Registrierung', path: '/registration' }
]

const toolsItems = [
  { name: 'Tool 1', path: '/tools/1' },
  { name: 'Tool 2', path: '/tools/2' },
  { name: 'Tool 3', path: '/tools/3' }
]

const doSomething = () => {
  console.log("Aktion ausgeführt")
  myDropdown.value.close() // Schließt das Menü nach dem Klick
}

const isDark = ref(false)

onMounted(() => {
  // Beim Laden prüfen, ob der User eine Präferenz gespeichert hat
  const savedTheme = localStorage.getItem('user-theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.setAttribute('data-theme', 'dark')
  }
})
</script>

<style scoped>
.theme-btn {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-surface);
  color: var(--text-main);
  cursor: pointer;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem;
  margin: 0;
}

.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
}

.app-logo {
  height: 40px;
  width: auto;
  background-color: transparent !important;
}

.logo-image {
  display: block;
  background: transparent;
  mix-blend-mode: multiply;
}

h4 {
  margin: 0;
  padding: 0.5rem;
}

ul {
  display: flex;
  list-style: none;
  padding: 0rem;
  margin: 0rem;
}

li {
  cursor: pointer;
  padding: 0.5rem 0.5rem;
  list-style: none;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-main);
}

li a {
  text-decoration: none;
  color: inherit;
}

.dropdown-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-list li {
  padding: 10px 20px;
  cursor: pointer;
  color: var(--text-main);
}

.dropdown-list li:hover {
  background: var(--hover-color, #f0f0f0);
}

.dropdown-container {
  position: relative;
  display: flex;
  align-items: center;
}

.dropdown-btn {
  padding: 0;
  margin: 0;
  list-style: none;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-main);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.15rem;
  transition: all 0.2s ease;
  font-size: inherit;
  font-weight: inherit;
  line-height: 1;
}

.dropdown-btn:hover {
  background: var(--bg-surface);
  border-color: var(--border-color);
}

.arrow {
  display: inline-block;
  font-size: 1em;
  transition: transform 0.2s ease;
}

.dropdown-container:hover .arrow {
  transform: rotate(90deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  min-width: 150px;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dropdown-container:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-menu li {
  padding: 0;
  margin: 0;
  border-radius: 0;
  border: none;
}

.dropdown-menu li a {
  display: block;
  padding: 0.5rem 1rem;
  transition: background 0.15s ease;
}

.dropdown-menu li a:hover {
  background: var(--menu-bg-hover);
}
</style>