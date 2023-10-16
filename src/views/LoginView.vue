<template>
	<div class="form-container">
    <form @submit.prevent="login">
      <h2>Login</h2>
      <input required type="email" id="email" v-model="email" placeholder="email" />
      <input required type="password" id="password" v-model="password" :disabled="!email" placeholder="password" />
      <button :disabled="!email || !password || loading" class="btn" type="submit">{{ buttonValue }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue"
import router from "../router/index"
import supabase from "../lib/supabaseClient"

const email = ref("")
const password = ref("")
const loading = ref(false)
const buttonValue = loading.value ? "Loading" : "Sign In"

async function login() {
	try {
		loading.value = true
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email.value,
			password: password.value,
		})
		if (error) throw error
		if (data) {
			console.log(data)
			router.push("/")
		}
	} catch (error) {
		if (error instanceof Error) alert(error.message)
	} finally {
		loading.value = false
	}
}
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  place-items: center;
}
form {
	text-align: center;
  background: linear-gradient(to bottom right, #15b129da, #18b275);
  border-radius: 30px;
  padding: 3rem;
  width: 500px;
	max-width: 600px;
	display: flex;
	flex-direction: column;
	justify-content: center;
  gap: 10px;
  box-shadow: 0 3px 2px 6px #00000032;
}
input {
  border: 1px dashed gray;
  border-radius: 30px;
}
.btn {
  background-image: linear-gradient(to right, #15abb8, cyan);
  color: white;
  border-radius: 10px;
}
input, .btn {
  font-size: 18px;
  padding: 15px;
}
</style>
