import PostMahasiswa from '@/components/PostMahasiswa.vue'
import Mahasiswa from '@/Mahasiswa.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: Mahasiswa },
  { path: '/post', component: PostMahasiswa },
]

export default createRouter({
  history: createWebHistory(),
  routes: routes,
})
