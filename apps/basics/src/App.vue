<script setup>
import Menu from './components/menu/Menu.vue';
</script>

<template>
  <div class="main-layout  modern-bg">
    <header class="page-header">
      <Menu />
    </header>

    <main class="content-area">
      <router-view />
    </main>
  </div>


</template>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 100vh;
  /* Füllt die gesamte Bildschirmhöhe */
  width: 100%;
  overflow: hidden;
}

.page-header {
  /* background-color: #f0f0f0; */
  position: sticky;
  top: 0;
  z-index: 10;
}

.content-area {
  flex-grow: 1;
  min-height: 0;
  /* Nimmt den restlichen Platz rechts neben der Sidebar ein */
  padding: 2rem;
  overflow-y: auto;
  scrollbar-gutter: stable;
  /* Erlaubt Scrollen nur im rechten Bereich */
}
</style>

<style>
html,
body {
  min-height: 100%;

  /* Der Gutter-Bereich soll dieselbe Hintergrundlebene nutzen */
  background-image: var(--app-bg-image);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: var(--app-bg-overlay);
  background-blend-mode: overlay;
}

html {
  scrollbar-gutter: auto;
  /* Kein reservierter Viewport-Gutter, damit rechts kein weißer Rand entsteht */
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  overflow: hidden;
  color: var(--text-main);
  transition: background-color 0.3s, color 0.3s;
}

#app {
  min-height: 100%;
}

/* Standard: Light Mode */
:root {
  --app-bg-image: url('/chat-bg.png');
  --app-bg-overlay: rgba(249, 250, 251, 0.8);

  --bg-main: #f9fafb;
  --bg-surface: #ffffff;
  --text-main: #111827;
  --text-muted: #6b7280;
  --border-color: #e5e7eb;
  --accent: #3b82f6;

  --menu-bg: var(--bg-surface);
  --menu-bg-hover: #f3f4f6;
  --menu-accent: var(--accent);
}

/* Dark Mode: Wird aktiv, wenn wir das Attribut setzen */
[data-theme="dark"] {
  --app-bg-overlay: rgba(17, 24, 39, 0.65);

  --bg-main: #111827;
  --bg-surface: #1f2937;
  --text-main: #f3f4f6;
  --text-muted: #9ca3af;
  --border-color: #374151;
  --accent: #60a5fa;

  --menu-bg: var(--bg-surface);
  --menu-bg-hover: #374151;
  --menu-accent: var(--accent);
}

.modern-bg {
  background-image: var(--app-bg-image);

  /* Das Bild soll nicht gekachelt (wiederholt) werden */
  background-repeat: no-repeat;

  /* Das Bild soll den gesamten Bereich ausfüllen, ohne verzerrt zu werden */
  background-size: cover;

  /* Das Bild soll zentriert sein */
  background-position: center;

  /* Ein leichter Overlay, damit weißer Text oder helle Chat-Blasen gut lesbar sind */
  /* Das 'f9fafb' ist dein Lightmode-Hintergrundton, mit 80% Deckkraft */
  background-color: var(--app-bg-overlay);

  /* Damit der Overlay-Effekt greift, müssen wir das Bild über die Color legen */
  background-blend-mode: overlay;
}
</style>