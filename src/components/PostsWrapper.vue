<template>
  <div
    class="posts-wrapper"
    aria-live="polite"
  >
    <ul class="posts-wrapper__list">
      <slot />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.posts-wrapper ul {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  margin: 0;
  padding: 0;
  list-style: none;

  &:empty::after {
    content: 'No posts found 🤔';
    display: block;
    padding: var(--space-xl);
    font-size: var(--font-size-2);
    text-align: center;
    border: 2px dashed var(--neutral-text-gray);
    border-radius: var(--radius-l);
  }
}
</style>
