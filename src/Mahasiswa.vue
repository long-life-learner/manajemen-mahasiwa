<template>
  <!-- STYLE PAKAI CLASS BINDING (:class) KARENA BUTUH PENGKONDISIAN TIDAK LEBIH DARI KONDISI (TRUE/FALSE) -->
  <!-- STYLE PAKAI PROPS KARENA BUTUH PENGKONDISI LEBIH DARI DUA KONDISI (CUSTOM) -->
  <AlertBox :class="{ active: isActive }" :bgColor="bgColorAlert">
    {{ message }}
  </AlertBox>
  <!-- ASSET HANDLING -->
  <img :src="blob" alt="blob" width="200" />
  <img src="/src/assets/blob.svg" alt="blob 2" width="200" />

  <h1>{{ title }}</h1>
  <p>Jumlah Mahasiswa : {{ mahasiswa.length }}</p>

  <!-- FORM COMPONENT -->
  <div class="form-container">
    <input v-model="nama" type="text" class="form-input" placeholder="Nama" />
    <input v-model="nim" type="text" class="form-input" placeholder="NIM" />
    <input v-model="prodi" type="text" class="form-input" placeholder="Prodi" />
    <button @click="tambahMahasiswa" class="submit-button">Tambah</button>
  </div>

  <!-- SEARCHBOX COMPONENT-->
  <SearchBox @search="handleSearch" />

  <!-- CARD MAHASISWA COMPONENT -->
  <div v-if="mahasiswa.length > 0" class="card-container">
    <CardMahasiswa
      v-for="(mhs, index) in mahasiswa"
      :key="index"
      :nama="mhs.nama"
      :nim="mhs.nim"
      :prodi="mhs.prodi"
      @gantiNama="namaBaru"
    />
  </div>

  <p v-else>Data tidak ditemukan</p>
</template>

<script setup>
import { ref } from 'vue'
import CardMahasiswa from './components/CardMahasiswa.vue'
import SearchBox from './components/SearchBox.vue'
import AlertBox from './components/AlertBox.vue'
import blob from './assets/blob.svg'
import { useMahasiswaStore } from './stores/Mahasiswa'

const title = ref('Daftar Mahasiswa')
const jumlahMahasiswa = ref(0)

const nama = ref('')
const nim = ref('')
const prodi = ref('')
const useMahasiswas = useMahasiswaStore()

const mahasiswa = ref(useMahasiswas.mahasiswa)

// MANIPULASI ALERT BOX
const isActive = ref(false)
const bgColorAlert = ref('')
const message = ref('')

// TERIMA EMIT DARI CHILD COMPONENT
const namaBaru = (data) => {
  const nimDariChild = data[0]
  const namaDariChild = data[1]

  // MENDAPATKAN INDEX DARI ARRAY BERDASARKAN NIM
  const mahasiswaYgMauDiUpdate = mahasiswa.value.findIndex((el) => el.nim === nimDariChild)

  // GANTI DATA DI ARRAY BERDASARKAN INDEX
  if (mahasiswaYgMauDiUpdate !== -1) {
    mahasiswa.value[mahasiswaYgMauDiUpdate].nama = namaDariChild
  }
}

function increment() {
  jumlahMahasiswa.value++
}

function tambahMahasiswa() {
  if (nama.value !== '' && nim.value !== '' && prodi.value !== '') {
    const jmlMHSSebelum = mahasiswa.value.length
    // ASUMSI CONSUME API POST
    mahasiswa.value.push({ nama: nama.value, nim: nim.value, prodi: prodi.value })
    const jmlMHSSetelah = mahasiswa.value.length
    nama.value = ''
    nim.value = ''
    prodi.value = ''

    // KALAU ARRAY MAHASISWA TIDAK BERTAMBAH
    if (jmlMHSSetelah == jmlMHSSebelum) {
      isActive.value = true
      bgColorAlert.value = 'merah'
      message.value = 'data gagal ditambahkan'
    } else {
      // KALAU ARRAY MAHASISWA BERTAMBAH
      isActive.value = true
      bgColorAlert.value = 'hijau'
      message.value = 'data berhasil ditambahkan'
    }

    setTimeout(() => {
      isActive.value = false
    }, 3000)
  }
}

function handleSearch(data) {
  const mahasiswaSearched = mahasiswa.value.filter((mhs) => {
    const mhsNama = mhs.nama.toLowerCase()
    const search = data.toLowerCase()
    return mhsNama.includes(search)
  })

  mahasiswa.value = mahasiswaSearched
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
