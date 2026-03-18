<template>
    <div class="chat-page">
        <ChatHeader />
        <MessageList :messages="messages" />
        <ChatInput @send-message="handleSendMessage" />
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

    // Demo: Antwort von "bot" nach kurzer Verzögerung
    setTimeout(() => {
        messages.value.push({
            id: Date.now() + 1,
            text: 'Antwort von der anderen Seite',
            sender: 'bot'
        });
    }, 400);
}

</script>

<style scoped>
.chat-page {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>