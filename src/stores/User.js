import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    loggedIn: false,
    nama: '',
  }),

  actions: {
    login: function login(nama) {
      this.loggedIn = true
      this.nama = nama
    },

    logout: function logout() {
      this.loggedIn = false
      this.nama = ''
    },
  },
})
