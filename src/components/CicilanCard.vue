<script setup>
  const props = defineProps(['nama', 'jumlah', 'waktu', 'lunas'])
</script>

<template>
  <div class="cicilan-container">
    <h3 class="nama-cicilan">{{ props.nama }}</h3>
    <p class="jumlah-cicilan">Jumlah Pinjaman: {{ props.jumlah }}</p>
    <p class="waktu-cicilan">Jangka Waktu: {{ props.waktu }} Bulan</p>
    <p class="tanggal-pelunasan">{{ props.lunas }}</p>
  </div>
</template>