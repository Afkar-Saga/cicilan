<script setup>
  import { ref } from 'vue'
  import router from '../router/index'
  import supabase from '../lib/supabaseClient'

  const nama = ref()
  const jumlah = ref()
  const waktu = ref()

  async function tambah() {
    let currentDate = new Date()
    const lunas = new Date(currentDate.setMonth(currentDate.getMonth() + jumlah.value))
    await supabase
    .from('pinjaman')
    .insert({
      nama_pinjaman: nama.value,
      jumlah_pinjaman: parseInt(jumlah.value),
      jangka_waktu: parseInt(waktu.value),
      tanggal_pelunasan: lunas,
      sisa_cicilan: parseInt(jumlah.value),
    })
    alert("Cicilan berhasil ditambah")
    router.push('/cicilan')
  }
</script>

<template>
  <h1>Tambah Cicilan</h1>
  <form @submit.prevent="tambah()">
    <label for="nama">Nama Cicilan: </label>
    <input v-model="nama" type="text" id="nama" placeholder="Cicilan..."/> <br />
    <label for="jumlah">Jumlah Pinjaman: </label> Rp.
    <input v-model="jumlah" type="number" id="jumlah" /> <br />
    <label for="waktu">Jangka Waktu: </label>
    <input v-model="waktu" type="number" id="waktu" /> Bulan <br />
    <label for="lunas">Tanggal Pelunasan: </label>
    <input v-model="lunas" type="date" id="lunas" /> <br />
    <button type="submit">Tambah</button>
  </form>
</template>
