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

<style scoped>
.shell {
    display: grid;
    grid-template-columns: 240px 1fr;
    height: 100vh;
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
        grid-template-columns: 1fr;
        height: auto;
        overflow: visible;
    }

    .sidebar {
        border-right: none;
        border-bottom: 1px solid #e5e7eb;
        overflow-y: visible;
    }

    .content {
        overflow-y: visible;
    }

    .menu {
        flex-direction: row;
        flex-wrap: wrap;
    }
}
</style>