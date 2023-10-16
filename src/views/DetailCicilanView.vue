<template>
  <div v-if="loading">Loading...</div>
  <div v-else class="container">
    <h1 class="title">{{ cicilan.nama_pinjaman }}</h1>
    <div class="details">Total Jumlah Pinjaman: <br /> <span class="value">{{ rupiah(cicilan.jumlah_pinjaman) }}</span></div>
    <div class="details">Jangka Waktu Pelunasan: <br /> <span class="value">{{ cicilan.jangka_waktu }} Bulan</span></div>
    <div class="details">Tanggal Pelunasan: <br /> <span class="value">{{ cicilan.tanggal_pelunasan }}</span></div>

    <div class="detail-bayar" v-if="cicilan.sisa_cicilan > 0">
      <div class="sisa">Sisa Cicilan: <span class="value">{{ rupiah(cicilan.sisa_cicilan) }}</span></div>
      <div class="angsuran">Angsuran per Bulan: <span class="value">{{ rupiah(cicilan.jumlah_pinjaman / cicilan.jangka_waktu) }}</span></div>
      <div class="form-pembayaran">
        <div class="title">Form Pembayaran</div>
        <label for="bukti">Foto Bukti Pembayaran:</label> <br />
        <input type="file" name="bukti" id="bukti">
      </div>
      <div class="btn-container">
        <button @click="bayarCicilan()" type="submit" class="btn-bayar">Bayar</button>
      </div>
    </div>
    <div class="lunas" v-else>
      LUNAS
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import router from '../router/index'
  import supabase from '../lib/supabaseClient'
  import rupiah from '../lib/rupiah'

  const props = defineProps(['id'])
  const id = props.id
  const cicilan = ref({})
  const loading = ref(false)

  async function getPinjamanDetail() {
    loading.value = true
    const { data, error } = await supabase
    .from('pinjaman')
    .select()
    .eq('id', id)
    .single()

    if (error) throw error
    if (data) cicilan.value = data
    loading.value = false
  }

  function bayarCicilan() {
    setSisaCicilan()
    setRiwayat()
    alert("Cicilan berhasil dibayar")
    router.push('/cicilan')
  }
  async function setSisaCicilan() {
    const { error } = await supabase
    .from('pinjaman')
    .update({
      sisa_cicilan: cicilan.value.sisa_cicilan - (cicilan.value.jumlah_pinjaman / cicilan.value.jangka_waktu)
    })
    .eq('id', id)
    if (error) throw error
  }
  async function setRiwayat() {
    const { error} = await supabase
    .from('riwayat')
    .insert({
      cicilan: id,
      sisa_cicilan: cicilan.value.sisa_cicilan - (cicilan.value.jumlah_pinjaman / cicilan.value.jangka_waktu)
    })
    if (error) throw error
  }

  onMounted(() => {
    getPinjamanDetail()
  })
</script>

<style scoped>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .container .title {
    grid-column: 1 / span 3;
    font-size: 4rem;
  }
  .title {
    font-size: 1.3rem;
    text-align: center;
  }
  .details {
    padding: 2rem;
    font-size: 1.3rem;
  }
  .detail-bayar {
    grid-column: 1 / span 3;
  }
  .value {
    color: #33b513;
    font-size: 1.3em;
  }
  .sisa {
    padding: 1rem;
    font-size: 2rem;
    text-align: center;
  }
  .angsuran {
    padding: 1rem;
    font-size: 3rem;
    text-align: center;
  }
  .form-pembayaran {
    font-size: 2rem;
    padding: 30px;
    text-align: center;
  }
  .form-pembayaran .title {
    font-size: 1.5em;
    margin-bottom: 20px;
  }
  .lunas {
    text-align: center;
    padding: 1rem;
    margin-top: 1rem;
    font-size: 7rem;
    color: #18f300;
    grid-column: 1/ span 3;
  }
  .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn-bayar {
    font-size: 2em;
    padding: 8px 27px;
    background-color: #009500;
    color: white;
    border: 3px solid darkgreen;
    border-radius: 3px;
    cursor: pointer;
    transition: 0.3s;
  }
  .btn-bayar:hover {
    background-color: #007300;
  }
  .btn-bayar:active {
    transform: translateY(2px);
  }
</style>