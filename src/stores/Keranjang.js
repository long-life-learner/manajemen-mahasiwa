import { defineStore } from 'pinia'

export const useKeranjangStore = defineStore('keranjang', {
  // state: () => {
  //   return {
  //     items: [],
  //   }
  // },
  state: function state() {
    return {
      items: [],
    }
  },

  getters: {
    //   total: (state) => state.items.length,
    // },
    total: function (state) {
      return state.items.length
    },
  },
  actions: {
    tambah: function tambah(item) {
      this.items.push(item)
    },
    hapus: function hapus(id) {
      const filteredItems = this.items.filter((item) => item.id != id)
      this.items = filteredItems
    },
  },
})
