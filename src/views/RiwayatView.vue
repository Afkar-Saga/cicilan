<template>
  <h1>Riwayat Cicilan</h1>
  <table v-for="(pembayaran, index) in riwayat">
    <tr>
      <td>{{ index+1 }}</td>
      <td>{{ pembayaran.pinjaman.nama_pinjaman }}</td>
      <td>{{ pembayaran.tanggal_pembayaran }}</td>
      <td>{{ rupiah(pembayaran.sisa_cicilan) }}</td>
    </tr>
  </table>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import supabase from '../lib/supabaseClient';
import rupiah from '../lib/rupiah'

const riwayat = ref({})

async function getRiwayat() {
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
  if (error) throw error
  if (data) riwayat.value = data
}

onMounted(() => {
  getRiwayat()
})
</script>