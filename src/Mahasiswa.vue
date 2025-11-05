<template>
  <h1>{{ title }}</h1>
  <p>Jumlah Mahasiswa : {{ mahasiswa.length }}</p>

  <div class="form-container">
    <input v-model="nama" type="text" class="form-input" placeholder="Nama" />
    <input v-model="nim" type="text" class="form-input" placeholder="NIM" />
    <input v-model="prodi" type="text" class="form-input" placeholder="Prodi" />
    <button @click="tambahMahasiswa" class="submit-button">Tambah</button>
  </div>

  <div v-if="mahasiswa.length > 0" class="card-container">
    <CardMahasiswa
      v-for="(mhs, index) in mahasiswa"
      :key="index"
      :nama="mhs.nama"
      :nim="mhs.nim"
      :prodi="mhs.prodi"
    />
  </div>

  <p v-else>Data tidak ditemukan</p>
</template>

<script setup>
import { ref } from 'vue'
import CardMahasiswa from './components/CardMahasiswa.vue'

const title = ref('Daftar Mahasiswa')
const jumlahMahasiswa = ref(0)

const nama = ref('')
const nim = ref('')
const prodi = ref('')

const mahasiswa = ref([
  { nama: 'Syawal', nim: '2404040', prodi: 'Teknologi Informasi' },
  { nama: 'Danar', nim: '2404004', prodi: 'Teknologi Informasi' },
])

function increment() {
  jumlahMahasiswa.value++
}

function tambahMahasiswa() {
  if (nama.value !== '' && nim.value !== '' && prodi.value !== '') {
    mahasiswa.value.push({ nama: nama.value, nim: nim.value, prodi: prodi.value })
    nama.value = ''
    nim.value = ''
    prodi.value = ''
  }
}
</script>

<style scoped>
.card-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.card {
  box-shadow: 2px 2px 8px #333;
  border-radius: 8px;
  padding: 12px;
  margin: 10px 0;
  max-width: 200px;
}

.form-container {
  padding: 5px 10px;
  border-radius: 8px;
  box-shadow: 2px 2px 20px gray;
  display: flex;
  flex-direction: column;
}

.form-input {
  padding: 5px;
  margin: 5px 5px;
  border: none;
  border-radius: 8px;
  max-width: 200px;
}

.submit-button {
  padding: 10px 20px;
  margin: 5px 5px;
  border: none;
  border-radius: 8px;
  max-width: 200px;
  background-color: brown;
}
.submit-button:hover {
  box-shadow: 2px 2px 15px black;
  transition: all 0.5s ease-in-out;
}
</style>
