<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import router from './router/index'
import supabase from './lib/supabaseClient'

const session = ref()

async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) console.log(error)
  else {
    console.log("logout succesful")
    router.push('/login')
  }
}

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
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
        <RouterLink class="auth" :to="{ name: 'login' }" v-if="session == null">Sign In</RouterLink>
        <a v-else class="auth" @click="logout">Sign Out</a>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  margin: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  place-items: center;
  gap: 30px;
  line-height: 1.5;
  max-height: 100vh;
  background-color: transparent;
  box-shadow: 10px 10px 2px 7px gray;
  border: 3px solid gray;
  border-radius: 50px;
}

.logo {
  max-width: 12vmin;
  height: auto;
}

nav {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  font-size: 1rem;
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
  padding: 0.3rem 1rem;
  cursor: pointer;
}

nav .auth {
  border: 3px solid #dde8b3;
  color: #a8200d;
  padding: 10px;
  border-radius: 30px;
}

nav .auth:hover {
  background-color: #dde8b369;
}

main {
  max-height: 100vh;
  padding: 4rem;
  overflow-y: auto;
}

@media (min-width: 600px) {
  nav {
    font-size: 1.3rem;
  }
}

@media (min-width: 1024px) {
  header {
    width: 100%;
    display: flex;
    flex-direction: column;
    place-items: center;
    min-height: 95vh;
    background-image: linear-gradient(#20a80d, #012200);
    box-shadow: 3px 0 2px 4px rgba(0, 0, 0, 0.2);
    border: none;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    display: block;
    text-align: center;
    padding: 1rem 0;
    margin-top: 1rem;
    font-size: 1.5rem;
  }
  
  nav a {
    margin-bottom: 2rem;
    border: none;
  }
}
</style>
