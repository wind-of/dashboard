<script setup>
import CanbanTableColumn from './CanbanTableColumn.vue';
defineProps({
	columns: {
		type: Array,
		default: () => []
	}
})
</script>

<template>
	<section class="columns">
		<CanbanTableColumn v-for="column in columns" :key="column.id" :column="column" />
	</section>
</template>

<style scoped>
.columns {
	width: 100%;
	display: flex;
	gap: 16px;
}
</style>

