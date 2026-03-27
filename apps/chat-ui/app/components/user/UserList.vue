<template>
    <div class="userlist-container">
        <UserListRow v-if="filteredUsers.length > 0" :userList="filteredUsers" @open-new-chat="openNewChat" />
        <p v-else class="empty-state">Keine Benutzer gefunden.</p>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import mockUsers from '~/database/userData.json';
import type { User } from '~/types/user';
import UserListRow from '~/components/user/UserListRow.vue';

const props = withDefaults(defineProps<{
    searchQuery?: string;
}>(), {
    searchQuery: '',
});

const emit = defineEmits<{
    (e: 'open-new-chat', user: User): void;
}>();

const openNewChat = (user: User) => {
    emit('open-new-chat', user);
}

const userList = ref<User[]>(mockUsers);

const filteredUsers = computed(() => {
    const query = props.searchQuery.trim().toLowerCase();

    if (!query) {
        return userList.value;
    }

    return userList.value.filter((user) => {
        const availability = user.isOnline ? 'online' : 'offline';

        return user.name.toLowerCase().includes(query)
            || user.status.toLowerCase().includes(query)
            || availability.includes(query);
    });
});
</script>

<style scoped>
.userlist-container {
    display: flex;
    flex-direction: column;
    margin: 0rem;
    border-bottom: 1px solid var(--border-subtle);
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

.empty-state {
    margin: 0;
    padding: 1rem 0.5rem;
    color: var(--text-muted);
    font-size: 0.85rem;
}
</style>