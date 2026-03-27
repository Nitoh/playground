<template>
    <div class="chats-container">

        <div class="all-chat-container">
            <h4>Alle Chats</h4>
            <button class="btn-add" @click="newChat">+</button>
        </div>

        <div class="searchbar-container">
            <input v-model="searchQuery" type="text" placeholder="Suchen..." class="searchbar" />
        </div>

        <div v-for="chat in filteredChats" :key="chat.id" class="chat-box"
            :class="{ 'chat-box-active': chat.id === props.activeChatId }" @click="() => openChat(chat)">
            <div class="top-row">
                <div class="chat-name">{{ chat.name }}</div>
                <div class="chat-timestamp">{{ chat.timestamp.toLocaleString() }}</div>
            </div>

            <div class="chat-last-message">{{ chat.lastMessage }}</div>
        </div>

        <div class="new-chat-modal" v-if="isNewChatModalOpen">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="btn-txt" @click="isNewChatModalOpen = false">Abbrechen</button>
                    <h5>Neuer Chat</h5>
                    <button class="btn-txt">Nachricht</button>
                </div>
                <UserList @open-new-chat="openChatFromUser" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import UserList from '~/components/user/UserList.vue';
import type { Chat } from '~/types/chat';
import type { User } from '~/types/user';

const props = defineProps<{
    chatList: Chat[];
    activeChatId: number | null;
}>();

const emit = defineEmits<{
    (e: 'open-chat', chat: Chat): void;
    (e: 'open-chat-from-user', user: User): void;
}>();

const searchQuery = ref('');
const isNewChatModalOpen = ref(false);

const filteredChats = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();

    if (!query) {
        return props.chatList;
    }

    return props.chatList.filter((chat) => {
        return chat.name.toLowerCase().includes(query)
            || chat.lastMessage.toLowerCase().includes(query);
    });
});

const newChat = () => {
    isNewChatModalOpen.value = true;
}

const openChat = (chat: Chat) => {
    emit('open-chat', chat);
};

const openChatFromUser = (user: User) => {
    emit('open-chat-from-user', user);
    isNewChatModalOpen.value = false;
};
</script>

<style scoped>
.chats-container {
    display: flex;
    flex-direction: column;
    background-color: var(--surface-main);
    position: relative;
}

.all-chat-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
}

.all-chat-container h4 {
    margin: 0;
}

.btn-add {
    background-color: var(--accent-strong);
    color: #ffffff;
    border: none;
    outline: none;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    font-size: 1.25rem;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
}

.searchbar-container {
    padding: 0rem 0.25rem;
}

.searchbar {
    width: 100%;
    padding: 0.5rem;
    margin: 0.5rem 0;
    border: 1px solid var(--border-subtle);
    border-radius: 12px;
    box-sizing: border-box;
    color: var(--text-main);
    background: var(--surface-card);
}

.chat-box {
    border-top: 1px solid var(--border-subtle);
    border-bottom: 1px solid var(--border-subtle);
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
}

.chat-box:hover {
    background: var(--surface-elevated);
}

.chat-box-active {
    background: var(--accent-soft);
    border-left: 3px solid var(--accent-strong);
}

.top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chat-name {
    font-weight: bold;
    font-size: 0.85rem;
}

.chat-last-message {
    color: var(--text-muted);
    font-size: 0.75rem;
}

.chat-timestamp {
    font-size: 0.65rem;
    color: var(--text-muted);
}

.new-chat-modal {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: rgba(10, 18, 32, 0.55);
    z-index: 20;
}

.modal-content {
    width: min(420px, 100%);
    background-color: var(--surface-main);
    border-radius: 0px;
    height: 100%;
    padding: 1rem 0.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
}

.modal-header h5 {
    margin: 0;
    font-size: 0.75rem;
}

.btn-txt {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 0.75rem;
    color: var(--text-main);
}
</style>