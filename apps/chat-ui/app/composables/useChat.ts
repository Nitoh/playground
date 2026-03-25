// composables/useChat.ts
import { ref, computed } from 'vue'
import type { Chat, User, Message } from '~/types'

export function useChat() {
    // State halten
    const chats = ref<Chat[]>([])
    const users = ref<User[]>([])
    const messagesByChatId = ref<Record<number, Message[]>>({})
    const activeChatId = ref<number | null>(null)

    // Methoden
    const openOrCreateChat = (userId: number) => {
        // Deterministische ID erzeugen
        // Prüfen ob Chat existiert
        // Wenn nein: anlegen
        // activeChatId setzen
    }

    const addMessage = (chatId: number, senderId: number, text: string) => {
        // Message in messagesByChatId[chatId] hinzufügen
        // Chat's lastMessage aktualisieren
    }

    const getCurrentMessages = computed(() => {
        // Gibt Messages vom activeChat oder []
    })

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