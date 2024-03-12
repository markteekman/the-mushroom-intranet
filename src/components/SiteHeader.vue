<script setup>
import { computed, onMounted } from 'vue'
import { useUsersStore } from '../stores/users'
import { usePostsStore } from '../stores/posts'

const usersStore = useUsersStore()
const postsStore = usePostsStore()

const displayName = computed(() => usersStore.loggedInUser?.name || 'Guest')

const userAvatar = computed(() => {
  const user = usersStore.loggedInUser
  return user ? `/the-mushroom-intranet/${user.avatar}` : 'https://avatar.iran.liara.run/public'
})

onMounted(() => {
  usersStore.updateFromLocalStorage()
  postsStore.loadPostsFromLocalStorage()
})
</script>

<template>
  <header class="site-header">
    <p class="flex items-center gap-1 font-bold">
      <img
        class="h-20 w-20"
        :src="`/the-mushroom-intranet/mushroom-red.png`"
        alt=""
      />
      The Mushroom Intranet
    </p>
    <p class="site-header__user">
      <div class="user__avatar">
        <img
          :src="userAvatar"
          alt=""
        />
        <p class="font-bold">{{ displayName }}</p>
      </div>
      <span>|</span>
      <button
        class="button"
        @click="usersStore.logout()"
      >
        Logout
      </button>
    </p>
  </header>
</template>

<style lang="scss" scoped>
.site-header {
  display: flex;
  justify-content: space-between;
  gap: var(--space-xs);
  padding: var(--space-xs);

  &__user {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
  }

  img {
    inline-size: 32px;
    block-size: 32px;
    border-radius: 50%;
  }

  .user__avatar {
    display: flex;
    align-items: center;
    gap: var(--space-3xs);
  }
}
</style>
