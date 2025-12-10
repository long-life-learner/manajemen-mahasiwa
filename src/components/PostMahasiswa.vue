<template>
  <div class="card-container">
    <div v-for="(post, index) in posts" :key="post.id" class="card">
      <h5>{{ post.title }}</h5>
      <p>{{ post.body }}</p>
      <p>Ditulis Oleh : {{ post.userId }}</p>
      <button @click="useKeranjang.tambah(post)">Masukkan Keranjang</button>
    </div>
  </div>
</template>

<script setup>
import { useKeranjangStore } from '@/stores/Keranjang'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const posts = ref([])
const useKeranjang = useKeranjangStore()

onMounted(async () => {
  const postsData = await axios.get('https://jsonplaceholder.typicode.com/posts')
  posts.value = postsData.data
})
</script>
<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
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
</style>
