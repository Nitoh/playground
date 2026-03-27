<template>
    <header class="chat-header">
        <div class="header-content">
            <h4 class="header-title">{{ props.name }}</h4>
            <p class="header-subtitle">{{ props.description }}</p>
        </div>
    </header>
</template>

<script setup lang="ts">
const props = defineProps<{
    name: string | undefined;
    description: string | undefined;
}>();
</script>

<style scoped>
.chat-header {
    display: flex;
    flex-grow: 0;
    align-items: center;
    margin: 0rem;
    padding: 0.5rem;
    background-color: var(--surface-card);
    color: var(--text-main);
    border-bottom: 1px solid var(--border-subtle);
}

.header-content {
    display: flex;
    flex-direction: column;
    margin: 0rem;
}

.header-title {
    margin: 0rem;
    font-size: 1.25rem;
    font-weight: 600;
}

.header-subtitle {
    margin: 0rem;
    font-size: 0.75rem;
}
</style>