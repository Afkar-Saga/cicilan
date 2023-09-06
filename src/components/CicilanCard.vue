<script setup>
  import router from '../router/index'

  const props = defineProps(['id', 'nama', 'jumlah', 'waktu', 'lunas'])

  function navigateToDetail(cicilanId) {
    router.push({ name: 'detailCicilan', params: { id: cicilanId }})
  }
</script>

<template>
  <div class="cicilan-card">
    <div class="container">
      <h3 class="nama">{{ props.nama }}</h3>
      <p>Jumlah Pinjaman: Rp.{{ props.jumlah }}</p>
      <p>Jangka Waktu: {{ props.waktu }} Bulan</p>
      <p>Tanggal Pelunasan: {{ props.lunas }}</p>
      <button class="btn-detail" @click="navigateToDetail(props.id)">Detail</button>
    </div>
  </div>
</template>

<style scoped>
  .cicilan-card {
    box-shadow: 0 4px 9px 0 rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  .cicilan-card .container {
    padding: 27px 16px 36px;
    display: flex;
    flex-direction: column;
  }
  .cicilan-card .nama {
    font-size: 1.3rem;
    color: var(--color-heading);
    text-align: center;
    margin-bottom: 10px;
  }
  .cicilan-card .btn-detail {
    background-color: var(--color-background-soft);
    font-size: 1.1em;
    color: var(--color-text);
    margin-top: 10px;
    padding: 9px 16px;
    align-self: flex-end;
    text-decoration: none;
    border: 3px outset var(--color-border);
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s;
  }
  .cicilan-card .btn-detail:hover {
    box-shadow: 0 5px rgba(55, 55, 55, 0.9);
  }
  .cicilan-card .btn-detail:active {
    background-color: var(--color-background-mute);
    box-shadow: 0 3px rgba(33, 33, 33, 0.3);
    transform: translateY(2px);
  }
</style>