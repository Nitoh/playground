<template>
    <form class="container" @submit.prevent="sendMessage">
        <div class="input-container">
            <input class="input-field" v-model="message" type="text" placeholder="Nachricht eingeben..." />
        </div>
        <button class="btn-blue" type="submit">Absenden</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const message = ref('');
const emit = defineEmits(['send-message']);

const sendMessage = () => {
    if (message.value.trim() === '') return; // Leere Nachrichten nicht senden

    emit('send-message', message.value);
    message.value = '';
}
</script>

<style scoped>
.container {
    display: flex;
    padding: 4px;
    background-color: #f5f5f5;
    border-radius: 8px;
    gap: 0.5rem;
}

.input-container {
    display: flex;
    align-items: center;
    width: 100%;
}

.input-field {
    flex: 1;
    padding: 8px;
    border: 0.5px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    /* verhindert Auto-Zoom auf iOS Safari */
}

.btn-blue {
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}
</style>