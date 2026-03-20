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
                <input v-model="status" type="text" placeholder="z. B. Verfuegbar" />
            </label>

            <p class="hint">Dieses Panel ist als eigener Settings-Bereich vorbereitet und kann spaeter mit API-Calls
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
    color: #4b5563;
}

.card {
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}

.field span {
    font-size: 0.9rem;
    color: #374151;
}

input {
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 0.55rem;
    font: inherit;
}

.hint {
    margin: 0;
    color: #6b7280;
    font-size: 0.92rem;
}
</style>
