<script setup lang="ts">
import IconLogo from "@/components/icons/IconLogo.vue"
import IconButton from "@/components/common/IconButton.vue"
import IconHome from "@/components/icons/IconHome.vue"
import IconStorage from "@/components/icons/IconStorage.vue"
import IconCanban from "@/components/icons/IconCanban.vue"
import IconSettings from "@/components/icons/IconSettings.vue"
import IconChat from "@/components/icons/IconChat.vue"
import IconVisual from "@/components/icons/IconVisual.vue"
</script>

<template>
  <section class="drawer">
    <header class="logo">
      <IconLogo class="logo-icon" />
      <p class="logo-text">Time.</p>
    </header>
    <nav class="navigation">
      <ul class="navigation-list">
        <li class="navigation-item">
          <RouterLink to="/" v-slot="{ isActive }">
            <IconButton v-slot="{ theme }" :isActive="isActive">
              <IconHome :theme="theme" />
            </IconButton>
          </RouterLink>
        </li>
        <li class="navigation-item">
          <RouterLink to="/timeline" v-slot="{ isActive }">
            <IconButton v-slot="{ theme }" :isActive="isActive">
              <IconVisual :theme="theme" />
            </IconButton>
          </RouterLink>
        </li>
        <li class="navigation-item">
          <RouterLink to="/canban" v-slot="{ isActive }">
            <IconButton v-slot="{ theme }" :isActive="isActive">
              <IconCanban :theme="theme" />
            </IconButton>
          </RouterLink>
        </li>
        <li class="navigation-item">
          <RouterLink to="/project" v-slot="{ isActive }">
            <IconButton v-slot="{ theme }" :isActive="isActive">
              <IconStorage :theme="theme" />
            </IconButton>
          </RouterLink>
        </li>
        <li class="navigation-item">
          <RouterLink to="/meow" v-slot="{ isActive }">
            <IconButton v-slot="{ theme }" :isActive="isActive">
              <IconChat :theme="theme" />
            </IconButton>
          </RouterLink>
        </li>
        <li class="navigation-item">
          <RouterLink to="/profile" v-slot="{ isActive }">
            <IconButton v-slot="{ theme }" :isActive="isActive">
              <IconSettings :theme="theme" />
            </IconButton>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </section>
</template>

<style scoped>
.drawer {
  height: 100vh;
  max-width: 80px;
  padding: 20px 15px;
  background-color: var(--vt-c-white);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 150px;
}
.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
.logo-text {
  font-weight: 600;
}
.navigation-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
