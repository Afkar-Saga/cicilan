<template>
	<h1>Cicilan Pribadi.</h1>
	<div v-if="loading">Loading...</div>
	<div class="cicilan-grid">
		<CicilanCard
			v-for="c in cicilan"
			:key="c.id"
			:id="c.id"
			:jumlah="c.jumlah_pinjaman"
			:lunas="c.tanggal_pelunasan"
			:nama="c.nama_pinjaman"
			:waktu="c.jangka_waktu"
      :sisa="c.sisa_cicilan" />
	</div>
  <RiwayatView :limit=5 />
</template>

<script setup>
import { ref, onMounted } from "vue"
import supabase from "../lib/supabaseClient"

import CicilanCard from "../components/CicilanCard.vue"
import RiwayatView from "./RiwayatView.vue"

const cicilan = ref({})

const loading = ref(false)

async function getLatestCicilan() {
	loading.value = true
	const { data, error } = await supabase
  .from("pinjaman")
  .select()
  .order("tanggal_pelunasan", { ascending: true })
  .limit(4)
	if (error) console.log(error)
	if (data) cicilan.value = data
	loading.value = false
}

onMounted(() => {
	getLatestCicilan()
})
</script>

<style scoped>
.cicilan-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 10px;
}

@media (min-width: 960px) {
	.cicilan-grid {
		grid-template-columns: 1fr 1fr;
	}
}

@media (min-width: 1360px) {
	.cicilan-grid {
		grid-template-columns: 1fr 1fr 1fr;
	}
}
</style>
