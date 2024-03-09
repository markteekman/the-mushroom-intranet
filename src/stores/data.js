import { defineStore } from 'pinia'
// import { computed, ref } from 'vue'

export const useDatatore = defineStore('data', () => {
  const messages = ref([])

  return {
    messages,
  }
})
