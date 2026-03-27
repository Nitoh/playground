<template>
    <div class="chat-box" v-for="user in userList" :key="user.id" @click="openNewChat(user)">
        <div class="top-row">
            <div class="chat-name">{{ user.name }}</div>
            <div class="chat-timestamp">{{ user.isOnline ? 'Online' : 'Offline' }}</div>
        </div>

        <div class="chat-last-message">Status: {{ user.status }}</div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/user';

const props = defineProps<{
    userList: User[];
}>();

const emit = defineEmits<{
    (e: 'open-new-chat', user: User): void;
}>();

const openNewChat = (user: User) => {
    emit('open-new-chat', user);
}
</script>

<style scoped>
.chat-box {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    padding: 0.5rem;
    border-top: 1px solid var(--border-subtle);
    border-bottom: 1px solid var(--border-subtle);
    cursor: pointer;
}

.chat-box:hover {
    background: var(--surface-elevated);
}

.top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chat-name {
    font-weight: bold;
    font-size: 0.85rem;
    color: var(--text-strong);
}

.chat-last-message {
    color: var(--text-muted);
    font-size: 0.75rem;
}

.chat-timestamp {
    font-size: 0.65rem;
    color: var(--text-muted);
}
</style>