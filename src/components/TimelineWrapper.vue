<script setup>
import PostUpdate from './PostUpdate.vue'
import PostsFilters from './PostsFilters.vue'
import PostsWrapper from './PostsWrapper.vue'
import PostItem from './PostItem.vue'
import { useUsersStore } from '../stores/users'
import { usePostsStore } from '../stores/posts'
import { onMounted } from 'vue'

const usersStore = useUsersStore()
const postsStore = usePostsStore()

onMounted(() => {
  usersStore.updateFromLocalStorage()
  postsStore.loadPostsFromLocalStorage()
})
</script>

<template>
  <div class="timeline-wrapper">
    <PostUpdate />
    <PostsFilters />
    <PostsWrapper>
      <PostItem :the-posts="postsStore.filteredPosts" />
    </PostsWrapper>
  </div>
</template>

<style lang="scss">
.timeline-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-l);
  inline-size: min(600px, 100%);
}
</style>
