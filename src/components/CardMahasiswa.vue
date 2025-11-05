<template>
  <div class="card">
    <h3>{{ nama }}</h3>
    <p>NIM : {{ nim }}</p>
    <p>Program Studi : {{ prodi }}</p>
  </div>
</template>

<script setup>
defineProps({
  nama: String,
  nim: String,
  prodi: String,
})
</script>

<style scoped></style>
