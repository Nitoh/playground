<template>
    <div class="shell">
        <aside class="sidebar">
            <h2 class="brand">Tschetz</h2>

            <nav class="menu">
                <div class="menu-top">
                    <NuxtLink to="/" class="link">
                        <AppIcon name="home" :size="17" />
                        <span>Home</span>
                    </NuxtLink>
                    <NuxtLink to="/chat" class="link">
                        <AppIcon name="chat" :size="17" />
                        <span>Chats</span>
                    </NuxtLink>
                </div>
                <div class="menu-bottom">
                    <NuxtLink to="/settings" class="link">
                        <AppIcon name="settings" :size="17" />
                        <span>Einstellungen</span>
                    </NuxtLink>
                </div>

            </nav>
        </aside>

        <main class="content" :class="{ 'content--chat': route.path === '/chat' }">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import AppIcon from '~/components/ui/AppIcon.vue';

const route = useRoute();

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
    grid-template-columns: 85px 1fr;
    height: var(--shell-height, 100dvh);
    overflow: hidden;
}

.sidebar {
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--border-subtle);
    padding: 0.75rem 0.5rem;
    background: var(--surface-main);
    overflow: auto;
}

.brand {
    margin: 0 0 0.75rem;
    font-size: 0.8rem;
    color: var(--text-strong);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.menu {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
}

.menu-top {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.menu-bottom {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
    text-decoration: none;
    color: var(--text-main);
    padding: 0.5rem 0.4rem;
    border-radius: 6px;
    font-size: 0.7rem;
    text-align: center;
    line-height: 1.2;
}

.link.router-link-active {
    background: var(--accent-soft);
    color: var(--text-strong);
    font-weight: 600;
}

.content {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    overflow: hidden;
}

.content--chat {
    padding: 0;
}

@media (max-width: 800px) {
    .shell {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr auto;
        height: var(--shell-height, 100dvh);
        overflow: hidden;
    }

    .sidebar {
        order: 2;
        border-right: none;
        border-top: 1px solid var(--border-subtle);
        border-bottom: none;
        overflow-y: visible;
        padding: 0.5rem 1rem;
        padding-bottom: calc(0.5rem + env(safe-area-inset-bottom));
    }

    .brand {
        display: none;
    }

    .content {
        order: 1;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        min-height: 0;
        padding: 0;
    }

    .menu {
        flex-direction: row;
        width: 100%;
    }

    .link {
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        font-size: 0.65rem;
        letter-spacing: 0.01em;
        padding: 0.5rem 0.25rem;
        border-radius: 6px;
    }
}
</style>