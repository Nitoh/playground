<template>
    <div class="chat-page">
        <ChatHeader />
        <div class="messages-area">
            <MessageList :messages="messages" />
        </div>
        <div class="input-area">
            <ChatInput @send-message="handleSendMessage" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MessageList from '~/components/chat/messageList.vue';
import ChatHeader from '~/components/chat/chatHeader.vue';
import ChatInput from '~/components/chat/chatInput.vue';
import type { Message } from '~/types/message';

const messages = ref<Message[]>([]);

const handleSendMessage = (message: string) => {
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
.chat-page {
    display: flex;
    flex-direction: column;
    height: 100dvh;
    overflow: hidden;
    /* Seite selbst scrollt NICHT */
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
</style>