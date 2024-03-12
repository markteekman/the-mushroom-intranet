import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref([
    {
      id: 1,
      content: 'When are we playing another round of Mario Kart? I upgraded my kart and I want to test it out!',
      author: 'Mario',
      date: '2024-02-01',
      categories: ['Mario Kart'],
      replies: [
        {
          content: "Yow I'm down, what time do you wanna go?",
          author: 'Donkey Kong',
          date: '2024-02-12',
        },
      ],
    },
    {
      id: 2,
      content: 'I have a new minigame idea for Mario Party. Let me know if you want to play it!',
      author: 'Luigi',
      date: '2021-02-01',
      categories: ['Mario Party'],
      replies: [],
    },
  ])
  const categories = ref(['Mario Kart', 'Mario Party', 'Super Smash', 'Luigis Mansion'])
  const activeCategory = ref('All')

  function setCategory(category) {
    activeCategory.value = category
  }

  const filteredPosts = computed(() => {
    if (!activeCategory.value || activeCategory.value === 'All') {
      return posts.value
    }
    return posts.value.filter((post) => post.categories.includes(activeCategory.value))
  })

  function savePostsToLocalStorage() {
    localStorage.setItem('posts', JSON.stringify(posts.value))
  }

  function loadPostsFromLocalStorage() {
    if (typeof window !== 'undefined') {
      const storedPosts = localStorage.getItem('posts')

      if (storedPosts) {
        posts.value = JSON.parse(storedPosts)
      }
    }
  }

  function addPost(content, categories) {
    const currentDate = new Date().toISOString().split('T')[0]
    const storedUser = localStorage.getItem('loggedInUser')
    let authorName = 'Unknown'

    if (storedUser) {
      const user = JSON.parse(storedUser)
      authorName = user.name || 'Unknown'
    }

    posts.value.unshift({
      id: posts.value.length + 1,
      content,
      author: authorName,
      date: currentDate,
      categories,
      replies: [],
    })

    savePostsToLocalStorage()
  }

  function addReply(postId, replyContent) {
    const post = posts.value.find((post) => post.id === postId)

    if (post) {
      const currentDate = new Date().toISOString().split('T')[0]
      const storedUser = localStorage.getItem('loggedInUser')
      let authorName = 'Unknown'

      if (storedUser) {
        const user = JSON.parse(storedUser)
        authorName = user.name || 'Unknown'
      }

      const reply = {
        date: currentDate,
        author: authorName,
        content: replyContent,
      }

      post.replies.push(reply)
      savePostsToLocalStorage()
    }
  }

  return {
    posts,
    categories,
    activeCategory,
    setCategory,
    filteredPosts,
    loadPostsFromLocalStorage,
    addPost,
    addReply,
  }
})
