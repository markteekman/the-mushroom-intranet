<script setup>
import { ref } from 'vue'
import { usePostsStore } from '../stores/posts'

const postsStore = usePostsStore()
const content = ref('')
const categoriesSelected = ref([])

const handleSubmit = () => {
  if (categoriesSelected.value.length === 0) {
    categoriesSelected.value.push(postsStore.categories[0])
  }
  postsStore.addPost(content.value, categoriesSelected.value)

  content.value = ''
  categoriesSelected.value = []
}
</script>

<template>
  <div class="post-update">
    <h2>Post an update</h2>
    <form @submit.prevent="handleSubmit">
      <textarea
        v-model="content"
        placeholder="What's on your mind?"
      ></textarea>
      <div class="post-update__controls">
        <fieldset>
          <legend>Where do you want to post to?</legend>
          <div
            v-for="category in postsStore.categories"
            :key="category"
          >
            <input
              type="checkbox"
              :id="`category-${category}`"
              :value="category"
              v-model="categoriesSelected"
            />
            <label :for="`category-${category}`">{{ category }}</label>
          </div>
        </fieldset>
        <button
          class="button inverted"
          type="submit"
        >
          Post
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.post-update {
  inline-size: min(600px, 100%);
  padding: var(--space-m);
  background-color: var(--neutral-white);
  box-shadow: var(--elevation-3);
  border-radius: var(--radius-l);

  h2 {
    font-size: var(--font-size-2);
    line-height: var(--font-size-2);
  }

  &__controls {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-xs);
  }

  textarea {
    inline-size: 100%;
    block-size: 175px;
    margin-block: var(--space-s);
    padding: var(--space-xs) var(--space-s);
    border: 1px solid var(--neutral-cool-gray);
    border-radius: var(--radius-s);
    background-color: var(--neutral-white);
    resize: none;
  }

  fieldset {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);

    legend {
      font-weight: bold;
    }

    input {
      margin-inline-end: var(--space-3xs);
    }

    label {
      font-size: var(--font-size--1);
    }
  }

  button {
    margin-block-start: var(--space-s);
    padding: var(--space-s) var(--space-xl);
  }
}
</style>
