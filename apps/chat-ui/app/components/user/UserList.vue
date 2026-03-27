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
}

.empty-state {
    margin: 0;
    padding: 1rem 0.5rem;
    color: var(--text-muted);
    font-size: 0.85rem;
}
</style>