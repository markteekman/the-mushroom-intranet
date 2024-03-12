<script setup>
import { ref } from 'vue'
import { useUsersStore } from '../stores/users'

const usersStore = useUsersStore()
const username = ref('')
const password = ref('')

const handleSubmit = () => {
  usersStore.checkLogin(username.value.toLowerCase(), password.value)
}
</script>

<template>
  <div class="login-form">
    <form @submit.prevent="handleSubmit">
      <div class="login-form__input">
        <label for="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Hint: Mario"
          v-model="username"
        />
      </div>
      <div class="login-form__input">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Hint: red"
          v-model="password"
        />
      </div>
      <button
        class="button inverted"
        type="submit"
      >
        Login
      </button>
    </form>
  </div>
</template>

<style lang="scss">
.login-form {
  inline-size: 500px;
  padding: var(--space-m);
  background-color: var(--neutral-white);
  box-shadow: var(--elevation-3);
  border-radius: var(--radius-l);

  form {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  label {
    font-weight: bold;
  }

  input {
    inline-size: 100%;
    margin-block-start: var(--space-2xs);
    padding: var(--space-xs) var(--space-s);
    border: 1px solid var(--neutral-cool-gray);
    border-radius: var(--radius-s);
    background-color: var(--neutral-white);
  }

  button {
    min-block-size: 55px;
  }
}
</style>
