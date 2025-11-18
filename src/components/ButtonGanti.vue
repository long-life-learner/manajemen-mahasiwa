<template>
  <div>
    <button @click="handleGantiNama">Ganti</button>
  </div>
</template>

<script setup>
const props = defineProps({
  nama: String,
  nim: String,
})

const emits = defineEmits(['gantiNama'])

const handleGantiNama = () => {
  emits('gantiNama', [props.nim, props.nama])
}
</script>
<style scoped></style>
