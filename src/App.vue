<template>
  <ul style="display: inline">
    <li><RouterLink to="/">Dashboard</RouterLink></li>
    <li><RouterLink to="/post">Post Mahasiswa</RouterLink></li>
    <li><RouterLink to="/mqtt">Test MQTT</RouterLink></li>
    <li><RouterLink to="/mqtt-dashboard">MQTT Dashboard </RouterLink></li>
    <li><RouterLink to="/login">Login</RouterLink></li>
    <li>
      <RouterLink to="/keranjang"
        >Keranjang ({{ useKeranjang.total <= 0 ? 0 : useKeranjang.total }})
      </RouterLink>
    </li>
  </ul>
  <div class="container">
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { useKeranjangStore } from './stores/Keranjang'

const useKeranjang = useKeranjangStore()
</script>

<style scoped>
.container {
  padding: 10px 20px;
  margin: 10px;
}
</style>
