<template>
    <div class="chat-grid">
        <ChatList :chatList="chats" />

        <div class="chat-page">
            <ChatHeader />

            <div class="messages-area">
                <MessageList :messages="messages" />
            </div>

            <div class="input-area">
                <ChatInput @send-message="handleSendMessage" />
            </div>

            <div v-if="showUsernameModal" class="username-overlay">
                <form class="username-modal" @submit.prevent="saveUsername">
                    <h2 class="username-title">Willkommen im Chat</h2>
                    <p class="username-text">Bitte wähle einen Usernamen, bevor du schreibst.</p>
                    <input v-model="usernameInput" class="username-input" type="text" maxlength="20" autocomplete="off"
                        placeholder="Dein Username" />
                    <p v-if="usernameError" class="username-error">{{ usernameError }}</p>
                    <button type="submit" class="username-btn">Weiter</button>
                </form>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import MessageList from '~/components/chat/messageList.vue';
import ChatHeader from '~/components/chat/chatHeader.vue';
import ChatInput from '~/components/chat/chatInput.vue';
import type { Message } from '~/types/message';
import type { Chat } from '~/types/chat';

const messages = ref<Message[]>([]);
const username = ref('');
const usernameInput = ref('');
const usernameError = ref('');
const showUsernameModal = ref(false);

const USERNAME_STORAGE_KEY = 'chat_username';

const chats = ref<Chat[]>([
    {
        id: 1,
        name: 'Alice',
        lastMessage: 'Hey, wie geht es dir?',
        timestamp: new Date('2026-03-20T09:15:00')
    },
    {
        id: 2,
        name: 'Bob',
        lastMessage: 'Lass uns morgen treffen.',
        timestamp: new Date('2026-03-20T09:45:00')
    },
    {
        id: 3,
        name: 'Charlie',
        lastMessage: 'Hast du das Dokument gesehen?',
        timestamp: new Date('2026-03-20T10:05:00')
    }
]);

onMounted(() => {
    const stored = localStorage.getItem(USERNAME_STORAGE_KEY)?.trim() ?? '';
    if (stored.length >= 3) {
        username.value = stored;
        showUsernameModal.value = false;
        return;
    }

    showUsernameModal.value = true;
});

const saveUsername = () => {
    const trimmed = usernameInput.value.trim();
    if (trimmed.length < 3) {
        usernameError.value = 'Username muss mindestens 3 Zeichen haben.';
        return;
    }

    username.value = trimmed;
    localStorage.setItem(USERNAME_STORAGE_KEY, trimmed);
    usernameError.value = '';
    showUsernameModal.value = false;
};

const handleSendMessage = (message: string) => {
    if (!username.value) return;

    messages.value.push({ id: messages.value.length + 1, text: message, sender: 'user' });

    setTimeout(() => {
        messages.value.push({
            id: Date.now() + 1,
            text: 'Antwort von der anderen Seite',
            sender: 'bot'
        });
    }, 400);
};
</script>

<style scoped>
.chat-grid {
    display: grid;
    grid-template-columns: 240px 1fr;
    height: 100%;
}

.chat-page {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.messages-area {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    /* NEU */
    flex-direction: column;
    /* NEU */
}

.input-area {
    flex-shrink: 0;
    padding-bottom: env(safe-area-inset-bottom);
    background: #fff;
}

.username-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(17, 24, 39, 0.5);
    z-index: 20;
    padding: 1rem;
}

.username-modal {
    width: min(420px, 100%);
    background: #fff;
    border-radius: 12px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.username-title {
    margin: 0;
    font-size: 1.1rem;
}

.username-text {
    margin: 0;
    color: #4b5563;
}

.username-input {
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 0.75rem;
    font-size: 16px;
}

.username-error {
    margin: 0;
    color: #b91c1c;
    font-size: 0.9rem;
}

.username-btn {
    border: none;
    border-radius: 8px;
    padding: 0.75rem;
    background: #2563eb;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
}
</style>