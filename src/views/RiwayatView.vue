<template>
  <h1>Riwayat Cicilan</h1>
  <div v-if="loading">Loading...</div>
  <div v-else class="riwayat-container">
    <table>
      <tr>
        <th>No.</th>
        <th>Nama Pinjaman</th>
        <th>Tanggal Pembayaran</th>
        <th>Sisa Cicilan</th>
      </tr>
      <tr v-for="(pembayaran, index) in riwayat">
        <td>{{ index+1 }}</td>
        <td>{{ pembayaran.pinjaman.nama_pinjaman }}</td>
        <td>{{ pembayaran.tanggal_pembayaran }}</td>
        <td>{{ rupiah(pembayaran.sisa_cicilan) }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import supabase from '../lib/supabaseClient';
import rupiah from '../lib/rupiah'

const riwayat = ref({})
const loading = ref(false)
const props = defineProps({
  limit: Number
})

async function getRiwayat() {
  loading.value = true
  const { data, error } = await supabase
  .from('riwayat')
  .select(`
    id,
    tanggal_pembayaran,
    sisa_cicilan,
    pinjaman (
      nama_pinjaman
    )
  `)
  .order('tanggal_pembayaran', {ascending: false})
  .limit(props.limit)
  if (error) throw error
  if (data) riwayat.value = data
  loading.value = false
}

onMounted(() => {
  getRiwayat()
})
</script>

<style scoped>
.riwayat-container {
  overflow-x: auto;
}
table, th, td {
  border: 1px solid #373;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 5px 15px;
}
th {
  background-color: #125313;
}
tr:hover {
  background-color: #128937;
}
</style>