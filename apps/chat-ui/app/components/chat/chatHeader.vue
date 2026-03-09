<template>
    <header class="chat-header">
        <div class="header-content">
            <h4 class="header-title">Vorname Name</h4>
            <p class="header-subtitle">Beschreibung</p>
        </div>
    </header>
</template>

<script setup lang="ts">
// You can add any necessary script logic here
</script>

<style scoped>
.chat-header {
    display: flex;
    flex-grow: 0;
    align-items: center;
    margin: 0rem;
    padding: 0.5rem;
    background-color: #ffffff;
    color: rgb(80, 78, 78);
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