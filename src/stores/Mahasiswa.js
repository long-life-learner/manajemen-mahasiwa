import { defineStore } from 'pinia'

export const useMahasiswaStore = defineStore('mahasiswa', {
  state: () => {
    return {
      mahasiswa: [
        { nama: 'Syawal', nim: '2404040', prodi: 'Teknologi Informasi' },
        { nama: 'Danar', nim: '2404004', prodi: 'Teknologi Informasi' },
      ],
    }
  },
  actions: {},
})
