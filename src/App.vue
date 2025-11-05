<template>
  <ul>
    <li><RouterLink to="/">Dashbord</RouterLink></li>
    <li><RouterLink to="/post">Post Mahasiswa</RouterLink></li>
  </ul>
  <div class="container">
    <RouterView></RouterView>
  </div>
</template>

<script setup></script>

<style scoped>
.container {
  padding: 10px 20px;
  margin: 10px;
}
</style>
