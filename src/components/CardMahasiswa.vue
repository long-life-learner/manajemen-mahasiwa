<template>
  <div class="card">
    <h3>{{ nama }}</h3>
    <p>NIM : {{ nim }}</p>
    <p>Program Studi : {{ prodi }}</p>

    <input v-model="namaBaru" type="text" placeholder="Masukkan nama baru" />
    <button @click="handleGantiNama">Ganti</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  nama: String,
  nim: String,
  prodi: String,
})

const namaBaru = ref('')

// STEP 1 : Buat Variable Emit
const picu = defineEmits(['gantiNama'])

// STEP 2 : Buat Function untuk Menghandle Ketika Tombol Ganti Ditekan
const handleGantiNama = () => {
  // STEP 3 : Jalakan Emit
  picu('gantiNama', [props.nim, namaBaru.value])
  namaBaru.value = ''
}
</script>

<style scoped></style>
