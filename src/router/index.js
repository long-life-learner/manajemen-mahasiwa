import Keranjang from '@/components/Keranjang.vue'
import Login from '@/components/Login.vue'
import MqttClient from '@/components/MqttClient.vue'
import MqttDashboard from '@/components/MqttDashboard.vue'
import PostMahasiswa from '@/components/PostMahasiswa.vue'
import Mahasiswa from '@/Mahasiswa.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: Mahasiswa },
  { path: '/post', component: PostMahasiswa },
  { path: '/login', component: Login },
  { path: '/keranjang', component: Keranjang },
  { path: '/mqtt', component: MqttClient },
  { path: '/mqtt-dashboard', component: MqttDashboard },

]

export default createRouter({
  history: createWebHistory(),
  routes: routes,
})
