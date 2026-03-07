<template>
    <article class="tool-card">
        <div class="tool-card__header">
            <h3>{{ title }}</h3>
            <span class="tool-card__badge">{{ category }}</span>
        </div>
        <p>{{ description }}</p>
    </article>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'Tool'
    }
})
</script>

<style scoped>
.tool-card {
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 1rem;
    background: color-mix(in srgb, var(--bg-surface) 88%, transparent);
}

.tool-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
}

.tool-card__header h3 {
    margin: 0;
    font-size: 1rem;
}

.tool-card p {
    margin: 0;
    color: var(--text-muted);
}

.tool-card__badge {
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
    border-radius: 999px;
    border: 1px solid var(--border-color);
}

@media (max-width: 640px) {
    .tool-card {
        padding: 0.85rem;
    }

    .tool-card__header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.4rem;
    }
}
</style>
