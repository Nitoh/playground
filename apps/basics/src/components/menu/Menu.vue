<template>
    <div class="container">
    <h4>Nitoh's playground</h4>
    <nav>
        <ul>
            <li><router-link to="/">Profil</router-link></li>
        </ul>
    </nav>
    </div>

</template>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f0f0f0;
    padding: 0rem;
    margin: 0;
}

h4{
    margin: 0;
    padding: 0.5rem;
}

ul {
    display: flex;
    list-style: none;
    padding: 0rem;
    margin: 0rem;
}

li{
    cursor: pointer;
    margin: 0 0.5rem;
}
</style>