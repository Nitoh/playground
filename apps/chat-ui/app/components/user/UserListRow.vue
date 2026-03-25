<template>
    <div class="userlist-row" v-for="user in userList" :key="user.id" @click="openNewChat(user)">
        <div class="userlist-header">
            <h5>{{ user.name }}</h5>
        </div>

        <div class="userlist-body">
            <p>Status: {{ user.status }}</p>
            <p v-if="user.isOnline">Online</p>
            <p v-else>Offline</p>
        </div>
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
.userlist-row {
    display: flex;
    flex-direction: column;
    margin: 0rem;
    padding: 0.25rem;
    border-bottom: 1px solid #e5e7eb;
    cursor: pointer;
}

.userlist-header {
    display: flex;
    align-items: center;
    /* gap: 0.25rem; */
    font-size: 1rem;
}

.userlist-header h5 {
    margin: 0rem;
    font-weight: 600;
}

.userlist-body {
    display: flex;
    flex-direction: row;
    /* gap: 0.25rem; */
    font-size: 0.75rem;
}

.userlist-body p {
    margin: 0.25rem 0rem;
    /* margin: 0rem; */
}
</style>