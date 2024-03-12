<script setup>
import { usePostsStore } from '../stores/posts'

const postsStore = usePostsStore()
</script>

<template>
  <div class="post-filters">
    <h2>Filter posts by category</h2>
    <div class="post-filters__buttons">
      <button
        @click="postsStore.setCategory('All')"
        :class="{ active: !postsStore.activeCategory || postsStore.activeCategory === 'All' }"
      >
        All
      </button>
      <button
        v-for="category in postsStore.categories"
        :key="category"
        @click="postsStore.setCategory(category)"
        :class="{ active: category === postsStore.activeCategory }"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-filters {
  padding-inline: var(--space-m);

  h2 {
    --border-offset: 21ch;

    position: relative;
    margin-block-end: var(--space-xs);
    font-size: var(--font-size--2);
    line-height: var(--font-size--2);
    overflow: clip;

    &::after {
      content: '';
      position: absolute;
      inline-size: 100%;
      inset-block-start: 50%;
      inset-inline-start: var(--border-offset);
      border-bottom: 1px solid var(--neutral-cool-gray);
    }
  }

  &__buttons {
    display: flex;
    gap: var(--space-2xs);
    font-size: var(--font-size--2);
    font-weight: bold;
  }

  button {
    padding: var(--space-2xs) var(--space-xs);
    border: 2px solid var(--primary-marine-blue);
    border-radius: var(--radius-s);
    color: var(--primary-marine-blue);
    transition: all var(--animation-speed-fast) var(--cubic-bezier);

    &.active,
    &:hover,
    &:focus-visible {
      background-color: var(--primary-marine-blue);
      color: var(--neutral-white);
    }
  }
}
</style>
