<template>
    <div class="chat-grid">
        <div class="chat-list-pane" :class="{ 'mobile-hidden': selectedChat }">
            <ChatList :chatList="chats" :activeChatId="activeChatId" @open-chat="handleOpenChat"
                @open-chat-from-user="openChatFromUser" />
        </div>

        <div class="chat-page" :class="{ 'mobile-only-chat': selectedChat, 'mobile-hidden': !selectedChat }">
            <div class="mobile-chat-nav">
                <button class="back-btn" type="button" @click="goBackToChatList">←</button>
            </div>
            <ChatHeader :name="selectedChat?.name" :description="selectedChat?.description" />

            <div class="messages-area">
                <MessageList :messages="getCurrentMessages" />
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
import { type Chat } from '~/types/chat';
import type { User } from '~/types/user';

const username = ref('');
const usernameInput = ref('');
const usernameError = ref('');
const showUsernameModal = ref(false);
const selectedChat = ref<Chat | null>(null);

const { chats, openOrCreateChat, activeChatId, getCurrentMessages, addMessage } = useChat();

const USERNAME_STORAGE_KEY = 'chat_username';

// const users = ref<User[]>([
//     { id: 1, name: 'Alice', status: 'online', isOnline: true },
//     { id: 2, name: 'Bob', status: 'offline', isOnline: false },
//     { id: 3, name: 'Charlie', status: 'online', isOnline: true }
// ]);

// const chats = ref<Chat[]>(sampleChats.map(chat => ({
//     ...chat,
//     timestamp: new Date(chat.timestamp)
// })));

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
    if (!username.value || activeChatId.value === null) return;

    const chatId = activeChatId.value;
    addMessage(chatId, message, 'user');

    setTimeout(() => {
        addMessage(chatId, 'Antwort von der anderen Seite', 'bot');
    }, 400);
};

const handleOpenChat = (chat: Chat) => {
    selectedChat.value = chat;
    activeChatId.value = chat.id;
};

const openChatFromUser = (user: User) => {
    selectedChat.value = openOrCreateChat(user.id);
};

const goBackToChatList = () => {
    selectedChat.value = null;
    activeChatId.value = null;
};
</script>

<style scoped>
.chat-grid {
    display: grid;
    grid-template-columns: 240px 1fr;
    height: 100%;
}

.chat-list-pane {
    min-width: 0;
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

.mobile-chat-nav {
    display: none;
    align-items: center;
    padding: 0.35rem 0.5rem 0;
    background: #fff;
}

.back-btn {
    border: none;
    background: transparent;
    font-size: 1.5rem;
    line-height: 1;
    color: #1f2937;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
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

@media (max-width: 768px) {
    .chat-grid {
        display: block;
        height: 100%;
    }

    .chat-list-pane,
    .chat-page {
        height: 100%;
    }

    .mobile-hidden {
        display: none;
    }

    .mobile-only-chat {
        display: flex;
    }

    .mobile-chat-nav {
        display: flex;
    }
}
</style>