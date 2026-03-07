<template>
    <div class="container">

        <div class="menu">
            <h2>Einstellungen</h2>
            <ul>
                <li v-for="setting in settings" :key="setting.value" :class="{ active: activeView === setting.value }"
                    @click="activeView = setting.value">
                    {{ setting.name }}
                </li>
            </ul>
        </div>

        <div class="content">
            <section v-if="activeView === 'profil'">
                <Profile />
            </section>

            <section v-else-if="activeView === 'account'">
                <h2>Account</h2>
                <p>Hier verwaltest du sicherheitsrelevante Kontoeinstellungen.</p>
            </section>

            <section v-else>
                <h2>Login</h2>
                <p>Hier findest du deine Login-Optionen und Zugangseinstellungen.</p>
            </section>
        </div>
    </div>
</template>

<script setup>
import Profile from '@/components/settings/Profile.vue';
import { ref } from 'vue'

const settings = ref([
    { name: 'Profil', value: 'profil' },
    { name: 'Account', value: 'account' },
    { name: 'Login', value: 'login' }
])

const activeView = ref('profil')

</script>

<style scoped>
.container {
    display: flex;
    gap: 2rem;
    overflow: visible;
    margin: 0;
    padding: 0;
    align-items: flex-start;
}

.menu {
    flex-grow: 0;
    margin: 0;
    padding: 0 1rem 0 0;
}

.content {
    flex-grow: 1;
}

.content section {
    margin: 0;
    padding: 0;
}

ul {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    align-items: flex-start;
}

li {
    padding: 0.5rem 0rem;
    border-radius: 4px;
    cursor: pointer;
    list-style: none;
    text-align: left;
    width: 100%;
}

li.active {
    font-weight: 600;
}

.menu h2 {
    margin: 0;
    padding: 0 0 0.75rem 0;
}

.content :deep(h2) {
    margin: 0;
    padding: 0 0 0.75rem 0;
}

.content :deep(p) {
    margin-top: 0;
}

@media (max-width: 900px) {
    .container {
        flex-direction: column;
        gap: 1rem;
    }

    .menu {
        width: 100%;
        padding: 0;
    }

    ul {
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem 1rem;
    }

    li {
        width: auto;
        padding: 0.35rem 0;
    }
}

@media (max-width: 640px) {
    .menu h2 {
        font-size: 1.25rem;
    }

    .content :deep(h2) {
        font-size: 1.15rem;
    }
}
</style>