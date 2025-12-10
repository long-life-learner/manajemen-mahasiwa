<script setup>
import { useUserStore } from '@/stores/User'
import { ref } from 'vue';

const userStore = useUserStore()
const nama = ref('')
</script>

<template>
  <div v-if="!userStore.loggedIn" class="form">
    <h3>Login</h3>
    <input type="text" v-model="nama"></input>
    <button type="button" @click="userStore.login(nama)" >Login</button>
  </div>

  <div v-else class="welcome-card">
    <p>Selamat Datang, {{ userStore.nama }}</p>
    <button type="button" @click="userStore.logout" >Logout</button>
  </div>
</template>
<style scoped>
    .form {
        box-shadow: 5px 5px 2px #333;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        max-width: 250px;
        gap: 8px;
        padding: 10px;
    }
    
    button {
        padding: 5px 10px;
        border-radius: 12px;
        border: none;
    }
</style>
