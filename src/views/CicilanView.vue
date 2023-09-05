<script setup>
  import { ref, onMounted } from 'vue'
  import supabase from '../lib/supabaseClient'

  // components
  import CicilanCardVue from '../components/CicilanCard.vue';

  const cicilan = ref({})

  async function getPinjaman() {
    const { data, error } = await supabase.from('pinjaman').select()
    if (error) throw error
    if (data) cicilan.value = data
  }

  onMounted(() => {
    getPinjaman()
  })
</script>

<template>
  <h2>Cicilan</h2>
  <div class="cicilan-grid">
    <CicilanCardVue 
      v-for="pinjaman in cicilan"
      :key="pinjaman.id"
      :nama="pinjaman.nama_pinjaman"
      :jumlah="pinjaman.jumlah_pinjaman"
      :waktu="pinjaman.jangka_waktu"
      :lunas="pinjaman.tanggal_pelunasan"
    />
  </div>
</template>