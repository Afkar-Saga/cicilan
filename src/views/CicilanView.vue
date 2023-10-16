<script setup>
import { ref, onMounted } from "vue"
import supabase from "../lib/supabaseClient"

// components
import CicilanCard from "../components/CicilanCard.vue"

const cicilan = ref({})
const loading = ref(false)

async function getPinjaman() {
	loading.value = true
	const { data, error } = await supabase
	.from("pinjaman")
	.select()
	if (error) console.log(error)
	if (data) cicilan.value = data
	loading.value = false
}

onMounted(() => {
	getPinjaman()
})
</script>

<template>
	<h2>Cicilan</h2>
	<div v-if="loading">Loading...</div>
	<div class="cicilan-grid">
		<CicilanCard
			v-for="c in cicilan"
			:key="c.id"
			:id="c.id"
			:nama="c.nama_pinjaman"
			:jumlah="c.jumlah_pinjaman"
			:waktu="c.jangka_waktu"
			:lunas="c.tanggal_pelunasan"
			:sisa="c.sisa_cicilan" />
	</div>
</template>

<style scoped>
h2 {
	font-size: 3.3rem;
}
.cicilan-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20px 36px;
}

@media (min-width: 960px) {
	.cicilan-grid {
		grid-template-columns: 1fr 1fr 1fr;
	}
}

@media (min-width: 1360px) {
	.cicilan-grid {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
}
</style>
