<template>
	<div>You have not logged in.</div>
  <router-link :to="{ name: 'login' }">Login here</router-link>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
