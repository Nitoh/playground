<template>
    <div class="chats-container">
        <div v-for="chat in props.chatList" :key="chat.id" class="chat-box" @click="openChat">
            <div class="top-row">
                <div class="chat-name">{{ chat.name }}</div>
                <div class="chat-timestamp">{{ chat.timestamp.toLocaleString() }}</div>
            </div>
            <div class="chat-last-message">{{ chat.lastMessage }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Chat } from '~/types/chat';

const props = defineProps<{
    chatList: Chat[];
}>();

const openChat = () => {
    alert('Chat öffnen (noch nicht implementiert)');
};
</script>

<style scoped>
.chats-container {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
}

.chat-box {
    border-top: 1px solid #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.chat-box:hover {
    background: #f3f4f6;
}

.top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chat-name {
    font-weight: bold;
}

.chat-last-message {
    color: #4b5563;
    font-size: 0.75rem;
}

.chat-timestamp {
    font-size: 0.65rem;
    color: #6b7280;
}
</style>