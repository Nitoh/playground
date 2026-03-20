<template>
    <svg v-if="name === 'home'" :class="iconClass" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5.5 9.8V20h13V9.8" />
    </svg>

    <svg v-else-if="name === 'chat'" :class="iconClass" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path
            d="M4 6.5A2.5 2.5 0 016.5 4h11A2.5 2.5 0 0120 6.5v7A2.5 2.5 0 0117.5 16H10l-4.5 4v-4H6.5A2.5 2.5 0 014 13.5v-7z" />
    </svg>

    <svg v-else-if="name === 'settings'" :class="iconClass" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3.2" />
        <path
            d="M19.4 15a1 1 0 00.2 1.1l.1.1a1 1 0 010 1.4l-1 1a1 1 0 01-1.4 0l-.1-.1a1 1 0 00-1.1-.2 1 1 0 00-.6.9V20a1 1 0 01-1 1h-1.4a1 1 0 01-1-1v-.2a1 1 0 00-.7-.9 1 1 0 00-1.1.2l-.1.1a1 1 0 01-1.4 0l-1-1a1 1 0 010-1.4l.1-.1a1 1 0 00.2-1.1 1 1 0 00-.9-.6H4a1 1 0 01-1-1v-1.4a1 1 0 011-1h.2a1 1 0 00.9-.7 1 1 0 00-.2-1.1l-.1-.1a1 1 0 010-1.4l1-1a1 1 0 011.4 0l.1.1a1 1 0 001.1.2 1 1 0 00.6-.9V4a1 1 0 011-1h1.4a1 1 0 011 1v.2a1 1 0 00.7.9 1 1 0 001.1-.2l.1-.1a1 1 0 011.4 0l1 1a1 1 0 010 1.4l-.1.1a1 1 0 00-.2 1.1 1 1 0 00.9.6H20a1 1 0 011 1v1.4a1 1 0 01-1 1h-.2a1 1 0 00-.9.7z" />
    </svg>

    <svg v-else-if="name === 'database'" :class="iconClass" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
        <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>

    <svg v-else-if="name === 'sliders'" :class="iconClass" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="4" y1="6" x2="20" y2="6" />
        <circle cx="9" cy="6" r="2" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <circle cx="15" cy="12" r="2" />
        <line x1="4" y1="18" x2="20" y2="18" />
        <circle cx="11" cy="18" r="2" />
    </svg>

    <svg v-else-if="name === 'user'" :class="iconClass" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20a7 7 0 0114 0" />
    </svg>

    <svg v-else-if="name === 'chevron-right'" :class="iconClass" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M9 6l6 6-6 6" />
    </svg>

    <svg v-else-if="name === 'chevron-left'" :class="iconClass" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M15 6l-6 6 6 6" />
    </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    name: string;
    size?: number;
}>(), {
    size: 18
});

const iconClass = computed(() => `app-icon size-${props.size}`);
</script>

<style scoped>
.app-icon {
    display: inline-block;
    vertical-align: middle;
}

.size-14 {
    width: 14px;
    height: 14px;
}

.size-15 {
    width: 15px;
    height: 15px;
}

.size-16 {
    width: 16px;
    height: 16px;
}

.size-17 {
    width: 17px;
    height: 17px;
}

.size-18 {
    width: 18px;
    height: 18px;
}

.size-19 {
    width: 19px;
    height: 19px;
}

.size-20 {
    width: 20px;
    height: 20px;
}
</style>
