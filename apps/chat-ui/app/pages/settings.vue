<template>
    <div class="settings-page">
        <aside class="settings-sidebar">
            <header class="sidebar-head">
                <h1>Einstellungen</h1>
                <p>Waehle links einen Bereich aus.</p>
            </header>

            <nav class="settings-nav" aria-label="Einstellungsbereiche">
                <section v-for="group in settingGroups" :key="group.label" class="group">
                    <h2>{{ group.label }}</h2>
                    <div class="group-items">
                        <button
                            v-for="item in group.items"
                            :key="item.id"
                            class="nav-item"
                            :class="{ active: activeSectionId === item.id }"
                            type="button"
                            @click="activeSectionId = item.id"
                        >
                            {{ item.label }}
                        </button>
                    </div>
                </section>
            </nav>
        </aside>

        <section class="settings-content">
            <component :is="activeComponent" />
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ChatBehaviorSettings from '~/components/settings/ChatBehaviorSettings.vue';
import LocalStorageSettings from '~/components/settings/LocalStorageSettings.vue';
import ProfileSettings from '~/components/settings/ProfileSettings.vue';

type SettingsItem = {
    id: string;
    label: string;
    component: object;
};

type SettingsGroup = {
    label: string;
    items: SettingsItem[];
};

const settingGroups: SettingsGroup[] = [
    {
        label: 'Daten',
        items: [
            { id: 'local-storage', label: 'LocalStorage', component: LocalStorageSettings }
        ]
    },
    {
        label: 'Chat',
        items: [
            { id: 'chat-behavior', label: 'Verhalten', component: ChatBehaviorSettings }
        ]
    },
    {
        label: 'Profil',
        items: [
            { id: 'profile', label: 'Allgemein', component: ProfileSettings }
        ]
    }
];

const allItems = settingGroups.flatMap((group) => group.items);
const activeSectionId = ref('local-storage');

const activeComponent = computed(() => {
    return allItems.find((item) => item.id === activeSectionId.value)?.component ?? LocalStorageSettings;
});
</script>

<style scoped>
.settings-page {
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr);
    gap: 0.9rem;
    height: 100%;
    min-height: 0;
    padding: 0.35rem;
    box-sizing: border-box;
    background: #f5f5f7;
    border-radius: 16px;
}

.settings-sidebar {
    border: 1px solid #e6e6eb;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.82);
    backdrop-filter: saturate(140%) blur(8px);
    padding: 0.75rem;
    min-height: 0;
    overflow-y: auto;
}

.sidebar-head h1 {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 600;
    letter-spacing: -0.01em;
}

.sidebar-head p {
    margin: 0.25rem 0 0;
    color: #6e6e73;
    font-size: 0.84rem;
}

.settings-nav {
    margin-top: 0.85rem;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
}

.group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

.group-items {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.group h2 {
    margin: 0;
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #8e8e93;
    font-weight: 600;
}

.nav-item {
    border: 1px solid transparent;
    background: transparent;
    border-radius: 10px;
    padding: 0.5rem 0.62rem;
    text-align: left;
    color: #4a4a50;
    font-size: 0.92rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 120ms ease, color 120ms ease;
}

.nav-item:hover {
    background: rgba(0, 0, 0, 0.04);
}

.nav-item.active {
    border-color: #d8d8de;
    background: #fff;
    color: #111111;
    font-weight: 600;
}

.settings-content {
    border: 1px solid #e6e6eb;
    border-radius: 14px;
    background: #fff;
    box-shadow: 0 1px 2px rgba(17, 24, 39, 0.05);
    min-height: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: 1rem;
}

@media (max-width: 800px) {
    .settings-page {
        grid-template-columns: 1fr;
        gap: 0.65rem;
        padding: 0;
        background: transparent;
        padding-bottom: calc(env(safe-area-inset-bottom) + 0.75rem);
    }

    .settings-sidebar {
        overflow: visible;
        padding: 0.6rem;
    }

    .sidebar-head p {
        display: none;
    }

    .settings-nav {
        margin-top: 0.55rem;
        gap: 0.55rem;
    }

    .group {
        gap: 0.35rem;
        min-width: 0;
    }

    .group h2 {
        font-size: 0.68rem;
    }

    .group-items {
        flex-direction: row;
        gap: 0.35rem;
        white-space: nowrap;
        overflow-x: auto;
        padding-bottom: 0.2rem;
        -webkit-overflow-scrolling: touch;
    }

    .group .nav-item {
        display: inline-flex;
        width: auto;
    }

    .settings-content {
        min-height: 0;
        padding: 0.85rem;
    }
}
</style>