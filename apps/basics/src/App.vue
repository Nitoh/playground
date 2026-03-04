<script setup>
import Menu from './components/menu/Menu.vue';

</script>

<template>
    <div class="main-layout">
      <header class="page-header">
        <Menu />
     </header>

     <!-- <Sidebar /> -->
        <main class="content-area">
        <h2>Basics</h2>
        <p>Hier findest du die Grundlagen zu Vue.js.</p>

        <h2>Basics</h2>
        <p>Hier findest du die Grundlagen zu Vue.js.</p>

        <h2>Basics</h2>
        <p>Hier findest du die Grundlagen zu Vue.js.</p>

        <h2>Basics</h2>
        <p>Hier findest du die Grundlagen zu Vue.js.</p>

        <h2>Basics</h2>
        <p>Hier findest du die Grundlagen zu Vue.js.</p>

        <h2>Basics</h2>
        <p>Hier findest du die Grundlagen zu Vue.js.</p>

        <h2>Basics</h2>
        <p>Hier findest du die Grundlagen zu Vue.js.</p>

      <router-view />
    </main>
  </div>

 
</template>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Füllt die gesamte Bildschirmhöhe */
  width: 100%;
}

.page-header {
  /* background-color: #f0f0f0; */
  position: sticky;
  top: 0;
}

.content-area {
  flex-grow: 1; /* Nimmt den restlichen Platz rechts neben der Sidebar ein */
  padding: 2rem;
  overflow-y: auto; /* Erlaubt Scrollen nur im rechten Bereich */
}
</style>

<style>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  /* background-color: #f9f9f9; */
  background-color: var(--bg-main);
  color: var(--text-main);
  transition: background-color 0.3s, color 0.3s; /* Sanfter Übergang */
}

/* Standard: Light Mode */
:root {
  --bg-main: #f9fafb;
  --bg-surface: #ffffff;
  --text-main: #111827;
  --text-muted: #6b7280;
  --border-color: #e5e7eb;
  --accent: #3b82f6;
}

/* Dark Mode: Wird aktiv, wenn wir das Attribut setzen */
[data-theme="dark"] {
  --bg-main: #111827;
  --bg-surface: #1f2937;
  --text-main: #f3f4f6;
  --text-muted: #9ca3af;
  --border-color: #374151;
  --accent: #60a5fa;
}

</style>