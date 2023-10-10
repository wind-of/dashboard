<script setup>
import CanbanTableColumnListItem from './CanbanTableColumnListItem.vue';
</script>

<template>
	<section class="list">
		<CanbanTableColumnListItem v-for="i in 3" :key="i"/>
	</section>
</template>

<style scoped>
.list {
	display: flex;
	flex-direction: column;
	gap: 14px;
}
</style>