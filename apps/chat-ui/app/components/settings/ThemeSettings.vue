<template>
    <div class="panel">
        <h2>Design</h2>
        <p class="subtitle">Wähle zwischen Light- und Dark-Mode.</p>

        <div class="card">
            <p class="label">Farbschema</p>

            <div class="theme-switch" role="radiogroup" aria-label="Farbschema wählen">
                <button type="button" class="theme-option" :class="{ active: theme === 'light' }"
                    @click="setTheme('light')" role="radio" :aria-checked="theme === 'light'">
                    <span class="theme-title">Light</span>
                    <span class="theme-desc">Helle Oberfläche mit klaren Kontrasten.</span>
                </button>

                <button type="button" class="theme-option" :class="{ active: theme === 'dark' }"
                    @click="setTheme('dark')" role="radio" :aria-checked="theme === 'dark'">
                    <span class="theme-title">Dark</span>
                    <span class="theme-desc">Dunkle Oberfläche für entspanntes Lesen.</span>
                </button>
            </div>

            <button type="button" class="quick-toggle" @click="toggleTheme">
                Schnell wechseln
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const { theme, setTheme, toggleTheme } = useTheme();
</script>

<style scoped>
.panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

h2 {
    margin: 0;
    color: var(--text-strong);
}

.subtitle {
    margin: 0;
    color: var(--text-muted);
}

.card {
    border: 1px solid var(--border-subtle);
    border-radius: 14px;
    padding: 0.95rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    background: var(--surface-card);
}

.label {
    margin: 0;
    color: var(--text-soft);
    font-size: 0.92rem;
}

.theme-switch {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
}

.theme-option {
    border: 1px solid var(--border-default);
    border-radius: 12px;
    background: var(--surface-elevated);
    color: var(--text-main);
    text-align: left;
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.28rem;
    cursor: pointer;
}

.theme-option:hover {
    border-color: var(--accent-strong);
}

.theme-option.active {
    border-color: var(--accent-strong);
    box-shadow: inset 0 0 0 1px var(--accent-strong);
    background: var(--accent-soft);
}

.theme-title {
    font-weight: 600;
}

.theme-desc {
    font-size: 0.84rem;
    color: var(--text-muted);
}

.quick-toggle {
    width: fit-content;
    border: 1px solid var(--border-default);
    border-radius: 10px;
    background: var(--surface-elevated);
    color: var(--text-main);
    padding: 0.55rem 0.72rem;
    cursor: pointer;
}

.quick-toggle:hover {
    border-color: var(--accent-strong);
}

@media (max-width: 560px) {
    .theme-switch {
        grid-template-columns: 1fr;
    }
}
</style>
