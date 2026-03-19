<template>
    <div class="settings-page">
        <h1>Einstellungen</h1>
        <p class="subtitle">LocalStorage Verwaltung (anzeigen, hinzufügen, bearbeiten, entfernen)</p>

        <div class="toolbar">
            <button class="btn" @click="reloadRows">Neu laden</button>
            <button class="btn btn-danger" @click="clearAll" :disabled="rows.length === 0">Alles löschen</button>
        </div>

        <form class="add-form" @submit.prevent="addEntry">
            <h2>Neuen Eintrag hinzufügen</h2>
            <div class="grid">
                <label class="field">
                    <span>Key</span>
                    <input v-model="newKey" type="text" placeholder="z. B. chat_username" />
                </label>
                <label class="field">
                    <span>Value</span>
                    <input v-model="newValue" type="text" placeholder="z. B. Max" />
                </label>
            </div>
            <button class="btn btn-primary" type="submit">Eintrag speichern</button>
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
                                <button class="btn btn-primary" @click="saveEdit(row.key)">Speichern</button>
                                <button class="btn" @click="cancelEdit">Abbrechen</button>
                            </template>
                            <template v-else>
                                <button class="btn" @click="startEdit(row.key, row.value)">Bearbeiten</button>
                                <button class="btn btn-danger" @click="removeEntry(row.key)">Entfernen</button>
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>

            <p v-else>LocalStorage ist aktuell leer.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

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

const removeEntry = (key: string) => {
    localStorage.removeItem(key);
    if (editingKey.value === key) {
        editingKey.value = null;
        editingValue.value = '';
    }
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

const clearAll = () => {
    localStorage.clear();
    cancelEdit();
    reloadRows();
    setMessage('Alle Einträge wurden gelöscht.');
};

onMounted(() => {
    reloadRows();
});
</script>

<style scoped>
.settings-page {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    overflow: auto;
    padding-right: 0.25rem;
}

.subtitle {
    margin: 0;
    color: #4b5563;
}

.toolbar {
    display: flex;
    gap: 0.5rem;
}

.add-form {
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.add-form h2 {
    margin: 0;
    font-size: 1rem;
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}

.field span {
    font-size: 0.9rem;
    color: #374151;
}

input {
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 0.55rem;
    font: inherit;
}

.message {
    margin: 0;
    color: #1d4ed8;
}

.table-wrap {
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    overflow: auto;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table th,
.table td {
    border-bottom: 1px solid #e5e7eb;
    text-align: left;
    vertical-align: top;
    padding: 0.6rem;
}

.table th {
    background: #f9fafb;
    position: sticky;
    top: 0;
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

.btn {
    border: none;
    border-radius: 8px;
    background: #e5e7eb;
    padding: 0.45rem 0.7rem;
    cursor: pointer;
    white-space: nowrap;
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.btn-primary {
    background: #2563eb;
    color: #fff;
}

.btn-danger {
    background: #dc2626;
    color: #fff;
}

@media (max-width: 800px) {
    .grid {
        grid-template-columns: 1fr;
    }
}
</style>