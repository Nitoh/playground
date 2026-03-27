<template>
    <div ref="container" class="chat-container">
        <ul class="list">
            <li v-for="message in messages" :key="message.id" class="row"
                :class="{ 'row-me': message.sender === 'user', 'row-bot': message.sender === 'bot' }">
                <span class="bubble">{{ message.text }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import type { Message } from '~/types/message';

const props = defineProps<{
    messages: Message[];
}>();

const container = ref<HTMLElement | null>(null);

watch(
    () => props.messages.length,
    async () => {
        await nextTick();
        if (container.value) {
            container.value.scrollTop = container.value.scrollHeight;
        }
    }
);
</script>

<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    height: 100%;
    border-radius: 0.5rem;
    border: 0.5px solid var(--border-subtle);
    background: var(--surface-card);
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
    background: var(--surface-elevated);
    color: var(--text-main);
}

.row-me .bubble {
    background: var(--accent-strong);
    color: #ffffff;
}
</style>