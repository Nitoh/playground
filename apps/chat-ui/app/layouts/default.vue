<template>
    <div class="shell">
        <aside class="sidebar">
            <h2 class="brand">Chat UI</h2>

            <nav class="menu">
                <NuxtLink to="/" class="link">
                    <AppIcon name="home" :size="17" />
                    <span>Home</span>
                </NuxtLink>
                <NuxtLink to="/chat" class="link">
                    <AppIcon name="chat" :size="17" />
                    <span>Chats</span>
                </NuxtLink>
                <NuxtLink to="/settings" class="link">
                    <AppIcon name="settings" :size="17" />
                    <span>Einstellungen</span>
                </NuxtLink>
            </nav>
        </aside>

        <main class="content">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import AppIcon from '~/components/ui/AppIcon.vue';

const updateHeight = () => {
    const vv = window.visualViewport;
    const h = vv?.height ?? window.innerHeight;
    document.documentElement.style.setProperty('--shell-height', `${h}px`);
};

onMounted(() => {
    updateHeight();
    window.visualViewport?.addEventListener('resize', updateHeight);
});

onUnmounted(() => {
    window.visualViewport?.removeEventListener('resize', updateHeight);
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
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
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
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        min-height: 0;
        padding: 0;
    }

    .menu {
        flex-direction: row;
        flex-wrap: wrap;
    }
}
</style>