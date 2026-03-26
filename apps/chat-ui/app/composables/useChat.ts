// composables/useChat.ts
import { ref, computed } from 'vue'
import type { Chat } from '~/types/chat'
import type { User } from '~/types/user'
import type { Message } from '~/types/message'
import chatData from '~/database/chatData.json'
import userData from '~/database/userData.json'

export function useChat() {
    // State halten
    const chats = ref<Chat[]>(
        chatData.map((chat) => ({
            ...chat,
            timestamp: new Date(chat.timestamp)
        }))
    )
    const users = ref<User[]>([...userData])
    const messagesByChatId = ref<Record<number, Message[]>>({})
    const activeChatId = ref<number | null>(null)

    const getCurrentMessages = computed(() => {
        if (activeChatId.value === null) {
            return []
        }
        return messagesByChatId.value[activeChatId.value] ?? []
    })

    const createChatId = (userId: number) => {
        // Vereinfachung: Chat-ID = User-ID
        return userId
    }

    const openOrCreateChat = (userId: number) => {
        const chatId = createChatId(userId)
        let chat = chats.value.find((c) => c.id === chatId)

        if (!chat) {
            chat = {
                id: chatId,
                name: users.value.find((u) => u.id === userId)?.name || 'Unbekannt',
                description: '',
                lastMessage: '',
                timestamp: new Date()
            }
            chats.value.push(chat)
        }

        activeChatId.value = chatId
        return chat
    }

    const addMessage = (chatId: number, text: string, sender: Message['sender']) => {
        if (!messagesByChatId.value[chatId]) {
            messagesByChatId.value[chatId] = []
        }

        messagesByChatId.value[chatId].push({
            id: Date.now(),
            text,
            sender
        })

        const chat = chats.value.find((c) => c.id === chatId)
        if (chat) {
            chat.lastMessage = text
            chat.timestamp = new Date()
        }
    }

    // Zurückgeben, was Komponenten brauchen
    return {
        chats,
        users,
        activeChatId,
        getCurrentMessages,
        openOrCreateChat,
        addMessage
    }
}