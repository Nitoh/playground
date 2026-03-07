<template>
  <div class="container">
    <div class="app-logo">
      <img :src="logo" alt="Logo" width="40" height="40" class="logo-image" />
    </div>

    <nav>
      <ul>
        <li v-for="link in navLinks" :key="link.path" class="nav-item">
          <router-link :to="link.path">{{ link.name }}</router-link>
        </li>
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
import logo from '@/assets/logo-transparent.png'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Tools', path: '/tools' },
  { name: 'Einstellungen', path: '/settings' }
]
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
  gap: 0.75rem;
  padding: 0.5rem 0;
  margin: 0;
  flex-wrap: wrap;
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
  display: inline-block;
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

@media (max-width: 900px) {
  .container {
    justify-content: center;
    row-gap: 0.5rem;
  }

  nav ul {
    flex-wrap: wrap;
    justify-content: center;
  }

  .menu {
    width: 100%;
    padding: 0;
  }
}

@media (max-width: 640px) {
  .app-logo {
    display: none;
  }

  li {
    padding: 0.35rem 0.4rem;
    font-size: 0.95rem;
  }
}
</style>