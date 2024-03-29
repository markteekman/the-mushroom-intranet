import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const users = ref([
    {
      id: 1,
      name: 'Mario',
      username: 'mario',
      password: 'red',
      avatar: 'mario-avatar.png',
    },
    {
      id: 2,
      name: 'Luigi',
      username: 'luigi',
      password: 'green',
      avatar: 'luigi-avatar.png',
    },
    {
      id: 3,
      name: 'Donkey Kong',
      username: 'donkeykong',
      password: 'bananas',
      avatar: 'donkey-kong-avatar.png',
    },
    {
      id: 4,
      name: 'Princess Peach',
      username: 'princesspeach',
      password: 'inanothercastle',
      avatar: 'princess-peach-avatar.png',
    },
  ])
  const isLoggedIn = ref(false)
  const loggedInUser = ref(null)

  function checkLogin(username, password) {
    const baseURL = window.location.href.includes('the-mushroom-intranet') ? '/the-mushroom-intranet/' : '/'
    const user = users.value.find((user) => user.username.toLowerCase() === username)
    if (user && user.password === password) {
      alert('Logged in!')
      isLoggedIn.value = true
      localStorage.setItem('isLoggedIn', true)
      localStorage.setItem('loggedInUser', JSON.stringify(user))
      loggedInUser.value = user
      window.location.href = `${baseURL}`
    } else {
      alert(`Invalid username or password, try ${users.value[0].username} with ${users.value[0].password}.`)
    }
  }

  const logout = () => {
    const baseURL = window.location.href.includes('the-mushroom-intranet') ? '/the-mushroom-intranet/' : '/'
    isLoggedIn.value = false
    localStorage.setItem('isLoggedIn', false)
    loggedInUser.value = null
    window.location.href = `${baseURL}login`
  }

  const updateFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const isLoggedInStored = localStorage.getItem('isLoggedIn') === 'true'
      isLoggedIn.value = isLoggedInStored

      const user = localStorage.getItem('loggedInUser')
      if (user) {
        loggedInUser.value = JSON.parse(user)
      }
    }
  }

  return {
    users,
    isLoggedIn,
    loggedInUser,
    checkLogin,
    logout,
    updateFromLocalStorage,
  }
})
