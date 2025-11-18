<template>
  <div>
    <input class="searchBox" v-model="kataKunci" type="text" placeholder="Cari mahasiswa..." />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const kataKunci = ref('')

const emits = defineEmits(['search'])

watch(kataKunci, (search) => {
  //   console.log(search)
  emits('search', search)
})
</script>

<style scoped>
.searchBox {
  padding: 5px;
  border-width: 0;
  border-radius: 8px;
  font-size: 14px;
  margin: 10px 0px;
}
</style>
