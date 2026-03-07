<template>
    <h2>Profil</h2>
    <p>Hier kannst du deine Profildaten ansehen und bearbeiten.</p>

    <section v-for="group in profileSettingGroups" :key="group.key" class="settings-group">
        <h3 class="group-title">{{ group.title }}</h3>

        <ul class="settings-list">
            <li v-for="item in group.items" :key="item.key" class="settings-item">
                <div class="item-text">
                    <span class="item-label">{{ item.label }}</span>
                    <small v-if="item.description" class="item-description">{{ item.description }}</small>
                </div>

                <label v-if="item.type === 'toggle'" class="switch" :for="item.key">
                    <input :id="item.key" type="checkbox" :checked="getToggleValue(item.key)"
                        @change="onToggleChange(item.key, $event.target.checked)">
                    <span class="slider" aria-hidden="true"></span>
                </label>
            </li>
        </ul>
    </section>
</template>

<script setup>
import DesignUtils from '@/utils/DesignUtils'
import { onMounted, reactive } from 'vue'

const profileSettingGroups = [
    {
        key: 'general',
        title: 'Allgemein',
        items: [
            {
                key: 'emailNotifications',
                label: 'E-Mail-Benachrichtigungen',
                description: 'Legt fest, ob du wichtige Hinweise per Mail bekommst.',
                type: 'toggle'
            }
        ]
    },
    {
        key: 'design',
        title: 'Design',
        items: [
            {
                key: 'darkMode',
                label: 'Dark Mode',
                description: 'Aktiviert das dunkle Farbschema.',
                type: 'toggle'
            }
        ]
    }
    // Weitere Gruppen kannst du hier als Objekte ergänzen.
]

const toggleState = reactive({
    darkMode: false,
    emailNotifications: true
})

const applyTheme = (isDark) => {
    DesignUtils.setTheme(isDark)
}

const getToggleValue = (key) => {
    return Boolean(toggleState[key])
}

const onToggleChange = (key, checked) => {
    toggleState[key] = checked

    if (key === 'darkMode') {
        applyTheme(checked)
    }
}

onMounted(() => {
    const isDark = DesignUtils.getSavedTheme()

    toggleState.darkMode = isDark
    applyTheme(isDark)
})


</script>

<style scoped>
.settings-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.settings-group {
    margin: 0 0 1.25rem 0;
}

.group-title {
    margin: 0;
    padding: 0 0 0.5rem 0;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
}

.settings-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 0;
}

.item-text {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.item-label {
    font-weight: 500;
}

.item-description {
    color: var(--text-muted);
}

.switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 28px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background-color: #c5c7cf;
    border-radius: 999px;
    transition: background-color 0.2s ease;
}

.slider::before {
    content: '';
    position: absolute;
    height: 20px;
    width: 20px;
    left: 4px;
    top: 4px;
    border-radius: 50%;
    background-color: #ffffff;
    transition: transform 0.2s ease;
}

.switch input:checked+.slider {
    background-color: var(--accent);
}

.switch input:checked+.slider::before {
    transform: translateX(20px);
}

.switch input:focus-visible+.slider {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
}

@media (max-width: 640px) {
    .settings-item {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.6rem;
    }

    .switch {
        align-self: flex-end;
    }
}
</style>