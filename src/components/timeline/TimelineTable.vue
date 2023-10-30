<script setup lang="ts"></script>

<template>
  <section class="table">
    <div class="unit" v-for="i in 30" :key="i">
      <h3 class="unit-title">S{{ i }}</h3>
      <div class="unit-body"></div>
    </div>
    <div class="blocks-container">
      <div class="block"></div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.table {
  @include flex-row;
  position: relative;
  min-width: 100%;
  height: 100%;
}
.blocks-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding-top: 36px;
}
.block {
  position: absolute;
  top: 72px;
  left: 300px;
  width: 300px;
  height: 40px;
  border-radius: 40px;
  background: grey;
}
.unit {
  @include flex-column;
  align-items: center;
  min-width: 120px;
  width: 100%;
  max-width: calc(100% / 7);
  height: 100%;
  gap: 16px;
}
.unit-body {
  width: 100%;
  height: 100%;
  border-left: 1px solid #ebedf4;
}
.unit:last-child .unit-body {
  border-right: 1px solid #ebedf4;
}
.unit-title {
  color: #768396;
  font-weight: 600;
  font-size: 16px;
}
</style>
