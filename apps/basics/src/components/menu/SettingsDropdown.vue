<template>
  <div class="dropdown-container">
    <div @click="toggle" class="dropdown-trigger">
      <slot name="trigger">
        <button class="default-btn">⋮</button>
      </slot>
    </div>

    <div v-if="isOpen" class="dropdown-content">
      <slot></slot> </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const toggle = () => (isOpen.value = !isOpen.value)

// Funktion zum Schließen von außen (wichtig für Klicks auf Links)
const close = () => (isOpen.value = false)

// Wir machen die 'close' Funktion für die Eltern-Komponente verfügbar
defineExpose({ close })
</script>

<style scoped>
.dropdown-container {
  position: relative;
  display: flex;
}

.dropdown-content {
  position: absolute;
  top: 110%;
  right: 0;
  background: var(--bg-surface, white);
  border: 1px solid var(--border-color, #ccc);
  border-radius: 8px;
  min-width: 160px;
  z-index: 1000;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  padding: 8px 0;
}
</style>