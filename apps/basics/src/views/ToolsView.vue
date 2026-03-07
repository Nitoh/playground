<template>
    <section class="tools-view">
        <h2>Tools</h2>

        <div class="tools-grid">
            <ToolCard v-for="tool in tools" :key="tool.title" :title="tool.title" :description="tool.description"
                :category="tool.category" />
        </div>
    </section>
</template>

<script setup>
import ToolCard from '@/components/tools/ToolCard.vue'
import { tools } from '@/data/tools'
</script>

<style scoped>
.tools-view {
    margin: 0;
    padding: 0;
}

.tools-view h2 {
    margin: 0;
    padding: 0 0 1rem 0;
}

.tools-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
}

@media (max-width: 900px) {
    .tools-grid {
        gap: 0.85rem;
    }
}

@media (max-width: 768px) {
    .tools-view h2 {
        font-size: 1.3rem;
    }

    .tools-grid {
        grid-template-columns: 1fr;
    }
}
</style>