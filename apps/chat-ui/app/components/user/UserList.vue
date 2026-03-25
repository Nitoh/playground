<template>
    <div class="userlist-container">
        <UserListRow :userList="userList" @open-new-chat="openNewChat" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import mockUsers from '~/database/userData.json';
import type { User } from '~/types/user';
import UserListRow from '~/components/user/UserListRow.vue';

const emit = defineEmits<{
    (e: 'open-new-chat', user: User): void;
}>();

const openNewChat = (user: User) => {
    emit('open-new-chat', user);
}

const userList = ref<User[]>(mockUsers);
</script>

<style scoped>
.userlist-container {
    display: flex;
    flex-direction: column;
    margin: 0rem;
    border-bottom: 1px solid #e5e7eb;
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