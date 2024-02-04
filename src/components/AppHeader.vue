<script setup lang="ts">
import VAvatar from "@/components/common/VAvatar.vue"
import IconNotification from "@/components/icons/IconNotification.vue"
</script>

<template>
  <header class="header">
    <section class="search">
      <input type="text" placeholder="Search anything..." class="input" />
    </section>
    <section class="user-details">
      <section class="notification">
        <i class="notification-icon"><IconNotification /></i>
      </section>
      <VAvatar
        :with-dropdown="true"
        image="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
      />
    </section>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  height: 8vh;
  max-height: 76px;
  padding: 20px 40px 20px 35vw;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--vt-c-white);
}
.user-details {
  display: flex;
  align-items: center;
  gap: 32px;
}

.input {
  width: 290px;
  padding: 15px 13px;
  border-radius: 7px;
  border: none;
  outline: none;
  background-color: var(--vt-c-white-soft);
  color: var(--color-text);
}
.notification-icon {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
