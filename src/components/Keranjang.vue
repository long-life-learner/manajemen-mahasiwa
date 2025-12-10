<template>
  <div>
    <h1>Keranjang Anda</h1>

    <div class="keranjang-container">
      <div v-for="(item, index) in useKeranjang.items" :key="index" class="item">
        <h5>{{ item.title }}</h5>
        <p>{{ item.body }}</p>
        <button @click="useKeranjang.hapus(item.id)">Hapus</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useKeranjangStore } from '@/stores/Keranjang'

const useKeranjang = useKeranjangStore()
</script>
<style scoped>
.item {
  border-radius: 8px;
  box-shadow: 5px 5px 10px #333;
  padding: 5px;
}
.keranjang-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
</style>
