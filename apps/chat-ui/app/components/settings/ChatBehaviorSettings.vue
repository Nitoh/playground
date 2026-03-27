<template>
    <div class="panel">
        <h2>Chat-Verhalten</h2>
        <p class="subtitle">Interaktions- und Anzeigeoptionen für den Chat</p>

        <div class="card">
            <label class="row">
                <input v-model="showTimestamps" type="checkbox" />
                <span>Zeitstempel anzeigen</span>
            </label>

            <label class="row">
                <input v-model="sendOnEnter" type="checkbox" />
                <span>Nachricht mit Enter senden</span>
            </label>

            <label class="row">
                <input v-model="compactBubbles" type="checkbox" />
                <span>Kompakte Message-Bubbles</span>
            </label>

            <p class="hint">Als separate Komponente vorbereitet, damit du den Bereich unabhängig erweitern kannst.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const showTimestamps = ref(true);
const sendOnEnter = ref(true);
const compactBubbles = ref(false);
</script>

<style scoped>
.panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

h2 {
    margin: 0;
}

.subtitle {
    margin: 0;
    color: var(--text-muted);
}

.card {
    border: 1px solid var(--border-subtle);
    border-radius: 10px;
    padding: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    background: var(--surface-card);
    color: var(--text-main);
}

.row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.hint {
    margin: 0.25rem 0 0;
    color: var(--text-muted);
    font-size: 0.92rem;
}
</style>
