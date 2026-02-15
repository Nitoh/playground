<script setup>
import Menu from './components/menu/Menu.vue';
import Sidebar from './components/menu/Sidebar.vue';

</script>

<template>
  <aside>
    <Menu />
  </aside>

  <div class="main-layout">

     <Sidebar />
      <main class="content-area">
      <header class="page-header">
        <h2>Basics</h2>
        <p>Hier findest du die Grundlagen zu Vue.js.</p>
      </header>

      <router-view />
    </main>
  </div>

 
</template>

<style scoped>
.main-layout {
  display: flex;
  min-height: 100vh; /* Füllt die gesamte Bildschirmhöhe */
  width: 100%;
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
  background-color: #f9f9f9;
}
</style>