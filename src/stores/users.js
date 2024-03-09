import { defineStore } from 'pinia'
// import { computed, ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const users = ref([
    {
      id: 1,
      name: 'Mario',
      username: 'mario',
      password: 'r3dmushr00m!'
    },
    {
      id: 2,
      name: 'Luigi',
      username: 'luigi',
      password: 'gre3nmushr00m!'
    },
  ]) 

  return {
    users,
  }
})
