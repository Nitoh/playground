<template>
    <nav>
        <ul>
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li>
                <router-link to="/settings">Einstellungen</router-link>
            </li>
        </ul>
    </nav>
</template>

<script setup>
</script>

<style scoped>
nav {
    width: 120px;
    height: 100vh;
    background-color: white;
    position: fixed;
    left: 0;
}

ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    align-items: center;
    padding: 1rem;
}

li{
    cursor: pointer;
    margin: 0.5rem 0;
}
</style>