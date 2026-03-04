<template>
    <div class="container">
    <h4>Nitoh's playground</h4>
    <nav class="menu">
        <ul>
            <button @click="toggleTheme" class="theme-btn">
            {{ isDark ? '☀️ Light Mode' : '🌙 Dark Mode' }}
            </button>
            <li><router-link to="/">Profil</router-link></li>
        </ul>
    </nav>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'

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
    /* background-color: #f0f0f0; */
    padding: 0rem;
    margin: 0;
}

.menu {
    display: flex;
    justify-content: center;
    align-items: center;
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
    /* margin: 0 0.5rem; */
    padding: 0.5rem 0.5rem;
    list-style: none;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    background: var(--bg-surface);
    color: var(--text-main);
}

li a {
    text-decoration: none;
    color: inherit;
}
</style>