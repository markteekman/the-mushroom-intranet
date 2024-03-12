<script setup>
import { reactive, ref } from 'vue'
import { useUsersStore } from '../stores/users'
import { usePostsStore } from '../stores/posts'

defineProps({
  thePosts: {
    type: Array,
    required: true,
  },
})

const usersStore = useUsersStore()
const postsStore = usePostsStore()
const activeReplyForm = ref(null)
const replyContent = ref('')

const toggleReplyForm = (postId) => {
  if (activeReplyForm.value === postId) {
    activeReplyForm.value = null
  } else {
    activeReplyForm.value = postId
    replyContent.value = ''
  }
}

const getUserAvatar = (author) => {
  const user = usersStore.users.find((user) => user.name === author)
  return user ? `/the-mushroom-intranet/${user.avatar}` : 'https://avatar.iran.liara.run/public'
}

const handleSubmit = (postId) => {
  postsStore.addReply(postId, replyContent.value)

  replyContent.value = ''
  activeReplyForm.value = null
}
</script>

<template>
  <li
    class="post-item"
    v-for="post in thePosts"
    :key="post.date"
  >
    <div class="post-item__wrapper">
      <div class="post-item__user">
        <div class="user__avatar">
          <img
            :src="getUserAvatar(post.author)"
            alt=""
          />
        </div>
        <p class="user__name">
          {{ post.author }}
        </p>
      </div>
      <p class="post-item__content">"{{ post.content }}"</p>
      <div class="post-item__meta">
        <div class="meta__info">
          <p class="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-5 w-5"
            >
              <g fill="#231f20">
                <path
                  d="M18 4h-1V3a1 1 0 0 0-2 0v1H9V3a1 1 0 0 0-2 0v1H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zM6 6h1v1a1 1 0 0 0 2 0V6h6v1a1 1 0 0 0 2 0V6h1a1 1 0 0 1 1 1v4H5V7a1 1 0 0 1 1-1zm12 14H6a1 1 0 0 1-1-1v-6h14v6a1 1 0 0 1-1 1z"
                />
                <circle
                  cx="8"
                  cy="16"
                  r="1"
                />
                <path d="M16 15h-4a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2z" />
              </g>
            </svg>
            Posted on {{ post.date }}
          </p>
          <div class="meta__categories">
            <span
              v-for="(category, index) in post.categories"
              :key="index"
              class="meta__category"
            >
              {{ category }}
            </span>
          </div>
        </div>
      </div>
      <div class="post-item__action">
        <button
          :id="`reply-button-${post.id}`"
          :aria-controls="`reply-form-${post.id}`"
          :aria-expanded="activeReplyForm === post.id ? 'true' : 'false'"
          @click="toggleReplyForm(post.id)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path
              fill="none"
              d="M0 0h24v24H0V0z"
            />
            <path
              d="M10 9V7.41c0-.89-1.08-1.34-1.71-.71L3.7 11.29a.996.996 0 0 0 0 1.41l4.59 4.59c.63.63 1.71.19 1.71-.7V14.9c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"
            />
          </svg>
          Reply
        </button>
      </div>
    </div>
    <!-- @TODO: Separate reply logic into their own components -->
    <div
      :id="`reply-form-${post.id}`"
      class="post-item__reply"
      :aria-labelledby="`reply-button-${post.id}`"
      v-show="activeReplyForm === post.id"
    >
      <form @submit.prevent="handleSubmit(post.id)">
        <textarea
          v-model="replyContent"
          placeholder="Share your thoughts"
        />
        <button
          class="button inverted"
          type="submit"
        >
          Reply
        </button>
      </form>
    </div>
    <ul
      class="post-item__replies"
      v-if="post.replies && post.replies.length > 0"
    >
      <li
        class="replies__reply"
        v-for="reply in post.replies"
        :key="reply.date"
      >
        <div class="reply__author">
          <div class="reply__avatar">
            <img
              :src="getUserAvatar(reply.author)"
              alt=""
            />
          </div>
          <p class="reply__name">
            <strong>{{ reply.author }}</strong> replied on {{ reply.date }}
          </p>
        </div>
        <div class="reply__content">"{{ reply.content }}"</div>
      </li>
    </ul>
  </li>
</template>

<style lang="scss" scoped>
@use '../assets/scss/base/mixin' as *;

.post-item {
  position: relative;
  display: block;
  inline-size: min(600px, 100%);
  background-color: var(--neutral-white);
  box-shadow: var(--elevation-3);
  border-radius: var(--radius-l);

  &__wrapper {
    padding: var(--space-m);
  }

  &__user {
    display: flex;
    align-items: center;
    gap: var(--space-2xs);
    font-size: var(--font-size-1);
    font-weight: bold;
  }

  &__content {
    margin-block-start: var(--space-m);
    margin-block-end: var(--space-l);
    font-size: var(--font-size-2);
    line-height: var(--font-size-4);
  }

  &__meta {
    font-size: var(--font-size--1);
    line-height: var(--font-size-0);
  }

  &__action {
    position: absolute;
    inset-block-start: var(--space-l);
    inset-inline-end: var(--space-l);

    button {
      display: flex;
      align-items: center;
      gap: var(--space-3xs);
      padding: 0;
      color: var(--primary-purplish-blue);
      font-weight: bold;
      border: none;
      text-decoration: underline;

      @include text-decoration;

      svg {
        fill: var(--primary-purplish-blue);
        transition: translate 0.2s var(--cubic-bezier);
      }

      &:where(:hover, :focus-visible) {
        svg {
          translate: -4px 0;
        }
      }
    }
  }

  &__reply,
  &__replies {
    background-color: var(--neutral-alabaster);
  }

  &__reply {
    padding-inline: var(--space-m);
    padding-block: var(--space-m);

    textarea {
      inline-size: 100%;
      block-size: 60px;
      padding: var(--space-xs) var(--space-s);
      border: 1px solid var(--neutral-cool-gray);
      border-radius: var(--radius-s);
      background-color: var(--neutral-white);
      resize: none;
    }

    button {
      margin-block-start: var(--space-2xs);
      padding: var(--space-xs) var(--space-l);
    }
  }

  &__replies {
    display: flex;
    flex-direction: column;
    font-size: var(--font-size--1);
  }
}

.meta {
  &__info {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  &__category {
    padding: var(--space-3xs);
    background-color: var(--primary-light-blue);
    border-radius: var(--radius-s);
    font-size: var(--font-size--2);
    font-weight: bold;

    &:not(:first-of-type) {
      margin-inline-start: var(--space-3xs);
    }
  }
}

.user,
.reply {
  &__avatar img {
    display: block;
    border-radius: 50%;
  }
}

.user {
  &__avatar img {
    inline-size: 40px;
    block-size: 40px;
  }
}

.reply {
  &__avatar img {
    inline-size: 24px;
    block-size: 24px;
  }

  &__author {
    display: flex;
    align-items: center;
    gap: var(--space-3xs);
  }

  &__content {
    margin-inline-start: 30px;
  }
}

.replies__reply {
  padding-block: var(--space-2xs);
  padding-inline: var(--space-m);
  border-bottom: 1px solid var(--neutral-light-gray);

  &:first-of-type {
    border-top: 1px solid var(--neutral-light-gray);
  }

  &:last-of-type {
    border: none;
  }
}
</style>
