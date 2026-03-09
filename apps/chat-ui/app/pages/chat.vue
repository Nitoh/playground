<template>
    <div class="chat-page">
        <ChatHeader />
        <MessageList />
    </div>
</template>

<script setup lang="ts">
import MessageList from '~/components/chat/messageList.vue';
import ChatHeader from '~/components/chat/chatHeader.vue';

// You can add any necessary script logic here
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