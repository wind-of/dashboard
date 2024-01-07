<template>
  <section class="banner">
    <RouterLink to="/" class="logo-link">Dashboard</RouterLink>
    <section class="hero">
      <h1 class="title">Welcome to the Dashboard!</h1>
      <p class="subtitle">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vulputate ut laoreet velit ma.
      </p>
    </section>
  </section>
</template>

<style scoped lang="scss">
.banner {
  @include flex-column;
  align-items: center;
  padding: 52px;
  gap: 20%;
  background-color: #353945;
}
.logo-link {
  background-color: white;
  align-self: flex-start;
  padding: 10px 20px;
  font-size: 1.3em;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}
.hero {
  margin-left: 15%;
  color: white;
}
.title {
  font-size: 3.5em;
}
.subtitle {
  font-size: 1.4em;
  max-width: 70%;
}
</style>
