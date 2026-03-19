<template>
    <BaseModal :open="open" @close="emit('close')">
        <template #header>
            <h2>Flags auswaehlen</h2>
        </template>

        <form class="form" @submit.prevent="submitSelection">
            <label v-for="flag in flags" :key="flag.code" class="row">
                <input v-model="selectedCodes" type="checkbox" :value="flag.code" />
                <span>{{ flag.emoji }} {{ flag.label }}</span>
            </label>

            <div class="actions">
                <button type="button" class="btn-ghost" @click="emit('close')">Abbrechen</button>
                <button type="submit" class="btn-primary">Übernehmen</button>
            </div>
        </form>
    </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import BaseModal from '~/components/ui/BaseModal.vue';

type FlagOption = {
    code: string;
    emoji: string;
    label: string;
};

const props = defineProps<{
    open: boolean;
    flags: FlagOption[];
    initialSelected?: string[];
}>();

const emit = defineEmits<{
    close: [];
    submit: [selectedCodes: string[]];
}>();

const selectedCodes = ref<string[]>([]);

watch(
    () => [props.open, props.initialSelected] as const,
    () => {
        selectedCodes.value = [...(props.initialSelected ?? [])];
    },
    { immediate: true }
);

const submitSelection = () => {
    emit('submit', [...selectedCodes.value]);
};
</script>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.btn-ghost,
.btn-primary {
    border: none;
    border-radius: 8px;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
}

.btn-ghost {
    background: #e5e7eb;
}

.btn-primary {
    background: #2563eb;
    color: #fff;
}
</style>