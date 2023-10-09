<script setup>
import CanbanTableColumn from './CanbanTableColumn.vue';
</script>

<template>
	<section class="columns">
		<CanbanTableColumn v-for="i in 3" :key="i" />
	</section>
</template>

<style scoped>
.columns {
	width: 100%;
	display: flex;
	gap: 16px;
}
</style>

