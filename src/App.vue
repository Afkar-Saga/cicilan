<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img src="../src/assets/logo.svg" class="logo" alt="Logo" width="125" height="125">

    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink :to="{ name: 'cicilan' }">Cicilan</RouterLink>
        <RouterLink :to="{ name: 'tambahCicilan' }">Tambah Cicilan</RouterLink>
        <RouterLink :to="{ name: 'riwayat' }">Riwayat</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  place-items: center;
  line-height: 1.5;
  max-height: 100vh;
  background-color: var(--color-background-soft);
}

.logo {
  width: 20vmin;
  height: auto;
}

nav {
  display: flex;
  width: 100%;
  font-size: 1.2rem;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: hsla(160, 100%, 37%, 1);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  text-align: center;
  display: block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

main {
  padding: 4rem 2rem;
}

@media (min-width: 1024px) {
  header {
    width: 100%;
    display: flex;
    flex-direction: column;
    place-items: center;
    min-height: 100vh;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    display: block;
    text-align: left;
    padding: 1rem 0;
    margin-top: 1rem;
  }
  
  nav a {
    margin-bottom: 2rem;
    border: none;
  }
}
</style>
