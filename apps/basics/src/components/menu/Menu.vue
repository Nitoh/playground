<template>
  <div class="container">
    <div class="app-logo">
      <img :src="logo" alt="Logo" width="40" height="40" class="logo-image" />
    </div>

    <nav>
      <ul>
        <li v-for="link in navLinks" :key="link.path">
          <router-link :to="link.path">{{ link.name }}</router-link>
        </li>
      </ul>
    </nav>

    <nav class="menu">
      <ul>
        <button @click="toggleTheme" class="theme-btn">
          {{ isDark ? 'Light Mode' : 'Dark Mode' }}
        </button>
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
  { name: 'Settings', path: '/settings' },
  { name: 'Registration', path: '/registration' }
]

const doSomething = () => {
  console.log("Aktion ausgeführt")
  myDropdown.value.close() // Schließt das Menü nach dem Klick
}

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'

  // Wir setzen das Attribut direkt am HTML-Tag
  document.documentElement.setAttribute('data-theme', theme)

  // Optional: In LocalStorage speichern, damit es beim Refresh bleibt
  localStorage.setItem('user-theme', theme)
}

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
</style>