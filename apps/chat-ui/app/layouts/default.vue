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