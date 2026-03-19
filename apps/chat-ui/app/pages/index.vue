<template>
    <div class="container">
        <h1>Chat UI</h1>
        <p>Dummy: Flags im Modal auswählen und an Parent zurückgeben.</p>
        <button class="btn-accept" @click="openModal">Flags auswählen</button>

        <p class="result">
            Ausgewählte Flags:
            <span v-if="selectedFlags.length">{{ selectedFlags.join(', ') }}</span>
            <span v-else>keine</span>
        </p>

        <FlagPickerModal :open="showModal" :flags="availableFlags" :initial-selected="selectedFlags" @close="closeModal"
            @submit="applyFlags" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FlagPickerModal from '~/components/ui/FlagPickerModal.vue';

const showModal = ref(false);
const selectedFlags = ref<string[]>([]);

const availableFlags = [
    { code: 'DE', emoji: '🇩🇪', label: 'Deutschland' },
    { code: 'AT', emoji: '🇦🇹', label: 'Österreich' },
    { code: 'CH', emoji: '🇨🇭', label: 'Schweiz' },
    { code: 'US', emoji: '🇺🇸', label: 'USA' },
];

const openModal = () => {
    showModal.value = true;
}

const closeModal = () => {
    showModal.value = false;
}

const applyFlags = (codes: string[]) => {
    selectedFlags.value = codes;
    closeModal();
}

</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.btn-accept {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.375rem;
    width: fit-content;
    cursor: pointer;
}

.result {
    margin-top: 0.75rem;
}
</style>