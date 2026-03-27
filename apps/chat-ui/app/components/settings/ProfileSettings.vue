<template>
    <div class="panel">
        <h2>Profil</h2>
        <p class="subtitle">Grundlegende Profil-Einstellungen</p>

        <div class="card">
            <label class="field">
                <span>Anzeigename</span>
                <input v-model="displayName" type="text" placeholder="z. B. Max Mustermann" />
            </label>

            <label class="field">
                <span>Status</span>
                <input v-model="status" type="text" placeholder="z. B. Verfügbar" />
            </label>

            <p class="hint">Dieses Panel ist als eigener Settings-Bereich vorbereitet und kann später mit API-Calls
                verbunden werden.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const displayName = ref('');
const status = ref('');
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
    gap: 0.75rem;
    background: var(--surface-card);
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}

.field span {
    font-size: 0.9rem;
    color: var(--text-soft);
}

input {
    border: 1px solid var(--border-default);
    border-radius: 8px;
    padding: 0.55rem;
    font: inherit;
    background: var(--surface-elevated);
    color: var(--text-main);
}

.hint {
    margin: 0;
    color: var(--text-muted);
    font-size: 0.92rem;
}
</style>
