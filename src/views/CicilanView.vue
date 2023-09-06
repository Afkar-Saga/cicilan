<script setup>
  import { ref, onMounted } from 'vue'
  import supabase from '../lib/supabaseClient'

  // components
  import CicilanCardVue from '../components/CicilanCard.vue';

  const cicilan = ref({})

  async function getPinjaman() {
    const { data, error } = await supabase
    .from('pinjaman')
    .select()
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
      :id="pinjaman.id"
      :nama="pinjaman.nama_pinjaman"
      :jumlah="pinjaman.jumlah_pinjaman"
      :waktu="pinjaman.jangka_waktu"
      :lunas="pinjaman.tanggal_pelunasan"
    />
  </div>
</template>

<style scoped>
  h2 {
    font-size: 3.3rem;
  }
  .cicilan-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
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