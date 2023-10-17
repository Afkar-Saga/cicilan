<script setup>
  import router from '../router/index'
  import rupiah from '../lib/rupiah'

  const props = defineProps(['id', 'nama', 'jumlah', 'waktu', 'lunas', 'sisa'])

  const sudahLunas = !(props.sisa > 0)

  function navigateToDetail(cicilanId) {
    router.push({ name: 'detailCicilan', params: { id: cicilanId }})
  }
</script>

<template>
  <div class="cicilan-card" :class="{ lunas: sudahLunas }">
    <div class="container">
      <h3 class="nama">{{ props.nama }}</h3>
      <p>Jumlah Pinjaman: Rp.{{ props.jumlah }}</p>
      <p>Jangka Waktu: {{ props.waktu }} Bulan</p>
      <p>Tanggal Pelunasan: {{ props.lunas }}</p>
      <p v-if="!sudahLunas">Sisa Cicilan: {{ rupiah(props.sisa) }}</p>
      <p v-else>LUNAS</p>
      <button class="btn-detail" @click="navigateToDetail(props.id)">Detail</button>
    </div>
  </div>
</template>

<style scoped>
  .cicilan-card {
    background: linear-gradient(to bottom left, #1c5a0f, #033012, #050c00);
    box-shadow: 0 4px 9px 0 rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  .cicilan-card.lunas {
    background: #111;
    color: #696969;
  }
  .cicilan-card .container {
    padding: 27px 16px 36px;
    display: flex;
    flex-direction: column;
  }
  .cicilan-card .nama {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 10px;
  }
  .cicilan-card p {
    font-size: 1rem;
  }
  .cicilan-card .btn-detail {
    background-color: #182b1ad1;
    color: white;
    font-size: 1.1rem;
    margin-top: 10px;
    padding: 9px 16px;
    align-self: flex-end;
    text-decoration: none;
    border: 3px outset #222;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s;
  }
  .cicilan-card .btn-detail:hover {
    box-shadow: 0 5px rgba(55, 55, 55, 0.9);
  }
  .cicilan-card .btn-detail:active {
    box-shadow: 0 3px rgba(33, 33, 33, 0.3);
    transform: translateY(2px);
  }
</style>