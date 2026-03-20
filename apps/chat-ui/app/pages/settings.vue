<template>
    <div class="settings-page">
        <header v-if="activeGroupId || activeEntryId" class="settings-header">
            <button v-if="activeGroupId || activeEntryId" type="button" class="back-btn" @click="goBack">
                <span aria-hidden="true">←</span>
                Zurück
            </button>

            <nav class="breadcrumb" aria-label="Pfad">
                <button type="button" class="crumb" :class="{ active: !activeGroupId && !activeEntryId }"
                    @click="goToRoot">
                    Einstellungen
                </button>

                <template v-if="activeGroup">
                    <span class="sep">/</span>
                    <button type="button" class="crumb" :class="{ active: !!activeGroupId && !activeEntryId }"
                        @click="goToGroup(activeGroup.id)">
                        {{ activeGroup.label }}
                    </button>
                </template>

                <template v-if="activeEntry">
                    <span class="sep">/</span>
                    <span class="crumb active">{{ activeEntry.label }}</span>
                </template>
            </nav>
        </header>

        <section class="settings-content">
            <div v-if="!activeGroupId" class="stack-view">
                <h1>Einstellungen</h1>
                <p class="view-subtitle">Wähle einen Bereich aus.</p>

                <div class="list-card">
                    <button v-for="group in settingGroups" :key="group.id" type="button" class="list-row"
                        @click="openGroup(group.id)">
                        <span>{{ group.label }}</span>
                        <span class="chevron" aria-hidden="true">›</span>
                    </button>
                </div>
            </div>

            <div v-else-if="activeGroup && !activeEntryId" class="stack-view">
                <h1>{{ activeGroup.label }}</h1>
                <p class="view-subtitle">Wähle eine Einstellung aus.</p>

                <div class="list-card">
                    <button v-for="entry in activeGroup.entries" :key="entry.id" type="button" class="list-row"
                        @click="openEntry(entry.id)">
                        <span>{{ entry.label }}</span>
                        <span class="chevron" aria-hidden="true">›</span>
                    </button>
                </div>
            </div>

            <div v-else-if="activeComponent" class="detail-view">
                <component :is="activeComponent" />
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, type Component } from 'vue';
import ChatBehaviorSettings from '~/components/settings/ChatBehaviorSettings.vue';
import LocalStorageSettings from '~/components/settings/LocalStorageSettings.vue';
import ProfileSettings from '~/components/settings/ProfileSettings.vue';

type SettingsEntry = {
    id: string;
    label: string;
    component: Component;
};

type SettingsGroup = {
    id: string;
    label: string;
    entries: SettingsEntry[];
};

const settingGroups: SettingsGroup[] = [
    {
        id: 'data',
        label: 'Daten',
        entries: [
            { id: 'local-storage', label: 'LocalStorage', component: LocalStorageSettings }
        ]
    },
    {
        id: 'chat',
        label: 'Chat',
        entries: [
            { id: 'chat-behavior', label: 'Verhalten', component: ChatBehaviorSettings }
        ]
    },
    {
        id: 'profile',
        label: 'Profil',
        entries: [
            { id: 'profile', label: 'Allgemein', component: ProfileSettings }
        ]
    }
];

const activeGroupId = ref<string | null>(null);
const activeEntryId = ref<string | null>(null);

const activeGroup = computed(() => {
    if (!activeGroupId.value) return null;
    return settingGroups.find((group) => group.id === activeGroupId.value) ?? null;
});

const activeEntry = computed(() => {
    if (!activeGroup.value || !activeEntryId.value) return null;
    return activeGroup.value.entries.find((entry) => entry.id === activeEntryId.value) ?? null;
});

const activeComponent = computed(() => activeEntry.value?.component ?? null);

const openGroup = (groupId: string) => {
    activeGroupId.value = groupId;
    activeEntryId.value = null;
};

const openEntry = (entryId: string) => {
    activeEntryId.value = entryId;
};

const goToRoot = () => {
    activeGroupId.value = null;
    activeEntryId.value = null;
};

const goToGroup = (groupId: string) => {
    activeGroupId.value = groupId;
    activeEntryId.value = null;
};

const goBack = () => {
    if (activeEntryId.value) {
        activeEntryId.value = null;
        return;
    }

    if (activeGroupId.value) {
        activeGroupId.value = null;
    }
};
</script>

<style scoped>
.settings-page {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    height: 100%;
    min-height: 0;
    padding: 0.5rem;
    box-sizing: border-box;
    background: #f5f5f7;
    border-radius: 18px;
}

.settings-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 2.35rem;
}

.back-btn {
    border: 1px solid #d8d8de;
    background: #fff;
    color: #1f2937;
    border-radius: 999px;
    height: 2rem;
    padding: 0 0.65rem;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
}

.breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.38rem;
    min-width: 0;
}

.crumb {
    border: none;
    background: transparent;
    color: #6b7280;
    padding: 0;
    font: inherit;
    font-size: 0.92rem;
    cursor: pointer;
    white-space: nowrap;
}

.crumb.active {
    color: #111827;
    font-weight: 600;
}

.sep {
    color: #9ca3af;
    user-select: none;
}

.settings-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 6px rgba(17, 24, 39, 0.05);
    min-height: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: 1rem;
}

.detail-view {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
}

.detail-view>* {
    flex: 1;
    min-height: 0;
}

.stack-view {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
}

.stack-view h1 {
    margin: 0;
    font-size: 1.45rem;
    letter-spacing: -0.01em;
}

.view-subtitle {
    margin: -0.45rem 0 0;
    color: #6b7280;
}

.list-card {
    border: 1px solid #e7e7ec;
    border-radius: 14px;
    background: #fff;
    overflow: hidden;
}

.list-row {
    width: 100%;
    border: none;
    border-bottom: 1px solid #efeff3;
    background: transparent;
    padding: 0.85rem 0.9rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    font: inherit;
    color: #111827;
    cursor: pointer;
}

.list-row:last-child {
    border-bottom: none;
}

.list-row:hover {
    background: #fafafa;
}

.chevron {
    color: #9ca3af;
    font-size: 1.05rem;
}

@media (max-width: 800px) {
    .settings-page {
        padding: 0;
        gap: 0.55rem;
        border-radius: 0;
        background: transparent;
        padding-bottom: calc(env(safe-area-inset-bottom) + 0.75rem);
    }

    .settings-header {
        padding: 0 0.1rem;
    }

    .back-btn {
        height: 1.9rem;
        padding: 0 0.58rem;
        font-size: 0.86rem;
    }

    .breadcrumb {
        gap: 0.3rem;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    .settings-content {
        padding: 0.85rem;
        border-radius: 14px;
    }

    .stack-view h1 {
        font-size: 1.25rem;
    }

    .list-row {
        padding: 0.78rem 0.82rem;
    }
}
</style>