<template>
    <div class="shell">
        <aside class="sidebar">
            <h2 class="brand">Chat UI</h2>

            <nav class="menu">
                <NuxtLink to="/" class="link">Home</NuxtLink>
                <NuxtLink to="/chat" class="link">Chats</NuxtLink>
                <NuxtLink to="/settings" class="link">Einstellungen</NuxtLink>
            </nav>
        </aside>

        <main class="content">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const updateHeight = () => {
    const vv = window.visualViewport;
    const h = vv?.height ?? window.innerHeight;
    document.documentElement.style.setProperty('--shell-height', `${h}px`);
};

const preventBodyScroll = () => {
    window.scrollTo(0, 0);
};

onMounted(() => {
    updateHeight();
    window.visualViewport?.addEventListener('resize', updateHeight);
    window.visualViewport?.addEventListener('scroll', preventBodyScroll);
});

onUnmounted(() => {
    window.visualViewport?.removeEventListener('resize', updateHeight);
    window.visualViewport?.removeEventListener('scroll', preventBodyScroll);
});
</script>

<style scoped>
.shell {
    display: grid;
    grid-template-columns: 240px 1fr;
    height: var(--shell-height, 100dvh);
    overflow: hidden;
}

.sidebar {
    border-right: 1px solid #e5e7eb;
    padding: 1rem;
    background: #f8fafc;
    overflow: auto;
}

.brand {
    margin: 0 0 1rem;
    font-size: 1.1rem;
}

.menu {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.link {
    text-decoration: none;
    color: #111827;
    padding: 0.5rem 0.75rem;
    border-radius: 8px;
}

.link.router-link-active {
    background: #e2e8f0;
    font-weight: 600;
}

.content {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    overflow: hidden;
}

@media (max-width: 800px) {
    .shell {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
        height: var(--shell-height, 100dvh);
        overflow: hidden;
    }

    .sidebar {
        border-right: none;
        border-bottom: 1px solid #e5e7eb;
        overflow-y: visible;
    }

    .content {
        overflow: hidden;
        min-height: 0;
        padding: 0;
    }

    .menu {
        flex-direction: row;
        flex-wrap: wrap;
    }
}
</style>