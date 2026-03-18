<template>
    <div class="chat-container">
        <ul class="list">
            <li v-for="message in messages" :key="message.id" class="row"
                :class="{ 'row-me': message.sender === 'user', 'row-bot': message.sender === 'bot' }">
                <span class="bubble">{{ message.text }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { Message } from '~/types/message';

defineProps<{
    messages: Message[];
}>();
</script>

<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    height: 100%;
    border-radius: 0.5rem;
    border: 0.5px solid #e5e7eb;
    box-sizing: border-box;
    min-height: 0;
    padding: 0.5rem;
}

.list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.row {
    display: flex;
}

.row-me {
    justify-content: flex-end;
}

.row-bot {
    justify-content: flex-start;
}

.bubble {
    max-width: 70%;
    padding: 0.5rem 0.75rem;
    border-radius: 0.75rem;
    background: #f3f4f6;
}

.row-me .bubble {
    background: #007bff;
    color: white;
}
</style>