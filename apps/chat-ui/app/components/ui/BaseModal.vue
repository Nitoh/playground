<template>
    <div v-if="open" class="modal-overlay" @click.self="emit('close')">
        <div class="modal-card" role="dialog" aria-modal="true">
            <header v-if="$slots.header" class="modal-header">
                <slot name="header" />
            </header>

            <section class="modal-content">
                <slot />
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    open: boolean;
}>();

const emit = defineEmits<{
    close: [];
}>();
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(17, 24, 39, 0.5);
    z-index: 100;
    padding: 1rem;
}

.modal-card {
    width: min(480px, 100%);
    background: #fff;
    border-radius: 12px;
    padding: 1rem;
    box-sizing: border-box;
}

.modal-header {
    margin-bottom: 0.75rem;
}

.modal-content {
    color: #1f2937;
}
</style>