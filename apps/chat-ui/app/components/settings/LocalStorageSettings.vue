<template>
    <div class="local-storage-settings">
        <div class="panel-head">
            <h2>LocalStorage</h2>
        </div>

        <div class="toolbar">
            <button class="btn" @click="reloadRows">Neu laden</button>
            <button class="btn btn-danger" @click="requestClearAll" :disabled="rows.length === 0">Alles
                löschen</button>
        </div>

        <form class="add-form" @submit.prevent="addEntry">
            <h3>Neuen Eintrag hinzufügen</h3>
            <div class="grid">
                <label class="field">
                    <span>Key</span>
                    <input v-model="newKey" type="text" placeholder="z. B. chat_username" />
                </label>
                <label class="field">
                    <span>Value</span>
                    <input v-model="newValue" type="text" placeholder="z. B. Max" />
                </label>
                <button class="btn btn-primary btn-add-entry" type="submit" aria-label="Eintrag speichern"
                    title="Eintrag speichern">
                    +
                </button>
            </div>
        </form>

        <p v-if="message" class="message">{{ message }}</p>

        <div class="table-wrap">
            <table class="table" v-if="rows.length > 0">
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                        <th>Aktionen</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in rows" :key="row.key">
                        <td class="key-cell">{{ row.key }}</td>

                        <td>
                            <template v-if="editingKey === row.key">
                                <input v-model="editingValue" type="text" class="inline-input" />
                            </template>
                            <template v-else>
                                <span class="value-cell">{{ row.value }}</span>
                            </template>
                        </td>

                        <td class="actions-cell">
                            <template v-if="editingKey === row.key">
                                <button class="btn btn-primary" @click="saveEdit(row.key)">
                                    <span class="label-full">Speichern</span>
                                    <span class="label-compact">Save</span>
                                </button>
                                <button class="btn" @click="cancelEdit">
                                    <span class="label-full">Abbrechen</span>
                                    <span class="label-compact">Abbr.</span>
                                </button>
                            </template>
                            <template v-else>
                                <button class="btn" @click="startEdit(row.key, row.value)">
                                    <span class="label-full">Bearbeiten</span>
                                    <span class="label-compact">Bearb.</span>
                                </button>
                                <button class="btn btn-danger" @click="requestRemoveEntry(row.key)">
                                    <span class="label-full">Entfernen</span>
                                    <span class="label-compact">Entf.</span>
                                </button>
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>

            <p v-else>LocalStorage ist aktuell leer.</p>
        </div>

        <BaseModal :open="pendingDeleteKey !== null" @close="cancelRemoveEntry">
            <template #header>
                <h3 class="modal-title">Eintrag entfernen?</h3>
            </template>

            <p class="modal-text">
                Soll der Eintrag
                <strong>{{ pendingDeleteKey }}</strong>
                wirklich gelöscht werden?
            </p>

            <div class="modal-actions">
                <button class="btn" type="button" @click="cancelRemoveEntry">Abbrechen</button>
                <button class="btn btn-danger" type="button" @click="confirmRemoveEntry">Löschen</button>
            </div>
        </BaseModal>

        <BaseModal :open="pendingClearAll" @close="cancelClearAll">
            <template #header>
                <h3 class="modal-title">Alles löschen?</h3>
            </template>

            <p class="modal-text">
                Soll der gesamte LocalStorage wirklich gelöscht werden?
            </p>

            <div class="modal-actions">
                <button class="btn" type="button" @click="cancelClearAll">Abbrechen</button>
                <button class="btn btn-danger" type="button" @click="confirmClearAll">Alles löschen</button>
            </div>
        </BaseModal>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BaseModal from '~/components/ui/BaseModal.vue';

type StorageRow = {
    key: string;
    value: string;
};

const rows = ref<StorageRow[]>([]);
const newKey = ref('');
const newValue = ref('');
const editingKey = ref<string | null>(null);
const editingValue = ref('');
const message = ref('');
const pendingDeleteKey = ref<string | null>(null);
const pendingClearAll = ref(false);

const reloadRows = () => {
    const nextRows: StorageRow[] = [];

    for (let i = 0; i < localStorage.length; i += 1) {
        const key = localStorage.key(i);
        if (!key) continue;

        nextRows.push({
            key,
            value: localStorage.getItem(key) ?? ''
        });
    }

    nextRows.sort((a, b) => a.key.localeCompare(b.key));
    rows.value = nextRows;
};

const setMessage = (text: string) => {
    message.value = text;
    window.setTimeout(() => {
        if (message.value === text) {
            message.value = '';
        }
    }, 2200);
};

const addEntry = () => {
    const key = newKey.value.trim();
    if (!key) {
        setMessage('Bitte einen gültigen Key eingeben.');
        return;
    }

    localStorage.setItem(key, newValue.value);
    newKey.value = '';
    newValue.value = '';
    reloadRows();
    setMessage('Eintrag gespeichert.');
};

const requestRemoveEntry = (key: string) => {
    pendingDeleteKey.value = key;
};

const cancelRemoveEntry = () => {
    pendingDeleteKey.value = null;
};

const confirmRemoveEntry = () => {
    const key = pendingDeleteKey.value;
    if (!key) return;

    localStorage.removeItem(key);
    if (editingKey.value === key) {
        editingKey.value = null;
        editingValue.value = '';
    }
    pendingDeleteKey.value = null;
    reloadRows();
    setMessage('Eintrag entfernt.');
};

const startEdit = (key: string, value: string) => {
    editingKey.value = key;
    editingValue.value = value;
};

const cancelEdit = () => {
    editingKey.value = null;
    editingValue.value = '';
};

const saveEdit = (key: string) => {
    localStorage.setItem(key, editingValue.value);
    cancelEdit();
    reloadRows();
    setMessage('Eintrag aktualisiert.');
};

const requestClearAll = () => {
    pendingClearAll.value = true;
};

const cancelClearAll = () => {
    pendingClearAll.value = false;
};

const confirmClearAll = () => {
    localStorage.clear();
    cancelEdit();
    pendingClearAll.value = false;
    reloadRows();
    setMessage('Alle Einträge wurden gelöscht.');
};

onMounted(() => {
    reloadRows();
});
</script>

<style scoped>
.local-storage-settings {
    --panel-head-sticky-height: 3.25rem;
    --panel-head-top-mask: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100%;
    min-height: 0;
    position: relative;
}

.local-storage-settings>*+* {
    margin-top: 1rem;
}

.panel-head {
    display: flex;
    position: sticky;
    top: 0;
    margin: 0;
    z-index: 30;
    background: var(--surface-card);
    isolation: isolate;
    padding-top: 0.1rem;
    padding-bottom: 0.55rem;
    border-bottom: 1px solid var(--border-subtle);
}

.panel-head h2 {
    margin: 0;
}

.panel-head::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -10px;
    height: 10px;
    pointer-events: none;
    background: linear-gradient(to bottom, color-mix(in srgb, var(--surface-card) 95%, transparent), transparent);
}

.panel-head::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: calc(-1 * var(--panel-head-top-mask));
    height: var(--panel-head-top-mask);
    background: var(--surface-card);
    pointer-events: none;
}

.subtitle {
    margin: 0.25rem 0 0;
    color: var(--text-muted);
}

.toolbar {
    display: flex;
    gap: 0.5rem;
}

.add-form {
    border: 1px solid var(--border-subtle);
    border-radius: 10px;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background: var(--surface-card);
}

.add-form h3 {
    margin: 0;
    font-size: 1rem;
}

.grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
    gap: 0.5rem;
    align-items: end;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}

.field span {
    font-size: 0.9rem;
    color: var(--text-soft);
}

input {
    border: 1px solid var(--border-default);
    border-radius: 8px;
    padding: 0.55rem;
    font: inherit;
    background: var(--surface-elevated);
    color: var(--text-main);
}

.message {
    margin: 0;
    color: var(--accent-strong);
}

.table-wrap {
    border: 1px solid var(--border-subtle);
    border-radius: 10px;
    flex: 1;
    background: var(--surface-card);
    min-height: 220px;
    overflow: auto;
    position: relative;
    z-index: 0;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table th,
.table td {
    border-bottom: 1px solid var(--border-subtle);
    text-align: left;
    vertical-align: top;
    padding: 0.6rem;
    color: var(--text-main);
}

.table th {
    background: var(--surface-elevated);
    position: sticky;
    top: 0;
    z-index: 10;
}

.key-cell {
    font-weight: 600;
    word-break: break-all;
}

.value-cell {
    white-space: pre-wrap;
    word-break: break-word;
}

.inline-input {
    width: 100%;
}

.actions-cell {
    display: flex;
    gap: 0.4rem;
    flex-wrap: nowrap;
    white-space: nowrap;
}

.label-compact {
    display: none;
}

.btn {
    border: 1px solid var(--border-default);
    border-radius: 8px;
    background: var(--surface-elevated);
    color: var(--text-main);
    padding: 0.45rem 0.7rem;
    cursor: pointer;
    white-space: nowrap;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-primary {
    background: var(--accent-strong);
    border-color: var(--accent-strong);
    color: #ffffff;
}

.btn-danger {
    background: #d13a4b;
    border-color: #d13a4b;
    color: #ffffff;
}

.btn-add-entry {
    width: 2.35rem;
    height: 2.35rem;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: 700;
    line-height: 1;
}

.modal-title {
    margin: 0;
    font-size: 1.1rem;
}

.modal-text {
    margin: 0;
    line-height: 1.4;
}

.modal-actions {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
}

@media (max-width: 800px) {
    .local-storage-settings {
        --panel-head-top-mask: 1rem;
    }

    .table-wrap {
        min-height: 260px;
    }

    .grid {
        grid-template-columns: minmax(0, 1fr);
    }

    .btn-add-entry {
        width: 100%;
    }
}

@media (max-width: 640px) {

    .table th,
    .table td {
        padding: 0.5rem;
    }

    .actions-cell {
        gap: 0.28rem;
    }

    .actions-cell .btn {
        padding: 0.3rem 0.45rem;
        font-size: 0.78rem;
        border-radius: 7px;
    }

    .label-full {
        display: none;
    }

    .label-compact {
        display: inline;
    }
}
</style>
