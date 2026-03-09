<template>
    <div class="chat-container">

    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.chat-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    border-radius: 0.5rem;
    border: 0.5px solid #e5e7eb;
    box-sizing: border-box;
    /* Border ist in der Höhe inkludiert */
    min-height: 0;
    /* wichtig für flex-shrink bei overflow */
}
</style>