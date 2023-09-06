<template>
  <div class="container">
    <h1 class="title">{{ cicilan.nama_pinjaman }}</h1>
    <div class="details">Total Jumlah Pinjaman: <br /> <span class="value">{{ rupiah(cicilan.jumlah_pinjaman) }}</span></div>
    <div class="details">Jangka Waktu Pelunasan: <br /> <span class="value">{{ cicilan.jangka_waktu }} Bulan</span></div>
    <div class="details">Tanggal Pelunasan: <br /> <span class="value">{{ cicilan.tanggal_pelunasan }}</span></div>
    <div class="angsuran">Angsuran per Bulan: <span class="value">{{ rupiah(cicilan.jumlah_pinjaman / cicilan.jangka_waktu) }}</span></div>
    <div class="form-pembayaran">
      <div class="title">Form Pembayaran</div>
      <label for="bukti">Foto Bukti Pembayaran:</label> <br />
      <input type="file" name="bukti" id="bukti">
    </div>
    <div class="btn-container">
      <button type="submit" class="btn-bayar">Bayar</button>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import supabase from '../lib/supabaseClient'

  const props = defineProps(['id'])
  const id = props.id
  const cicilan = ref({})

  async function getPinjamanDetail() {
    const { data, error } = await supabase
    .from('pinjaman')
    .select()
    .eq('id', id)
    .single()

    if (error) throw error
    if (data) cicilan.value = data
  }

  const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
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
    font-size: 4em;
  }
  .title {
    font-size: 1.3em;
    text-align: center;
  }
  .details {
    padding: 2em;
    font-size: 1.3em;
  }
  .value {
    color: #33b513;
    font-size: 1.3em;
  }
  .angsuran {
    padding: 1rem;
    grid-column: 1 / span 3;
    font-size: 3em;
    text-align: center;
  }
  .form-pembayaran {
    font-size: 1.5em;
    padding: 30px;
    grid-column: 1 / span 2;
  }
  .form-pembayaran .title {
    font-size: 1.5em;
    margin-bottom: 20px;
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