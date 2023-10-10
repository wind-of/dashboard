<script setup>
import CanbanTableColumnListItem from './CanbanTableColumnListItem.vue'
defineProps({
	tasks: {
		type: Array,
		default: () => []
	}
})
</script>

<template>
	<section class="list">
		<CanbanTableColumnListItem v-for="task in tasks" :key="task.id" :task="task"/>
	</section>
</template>

<style scoped>
.list {
	display: flex;
	flex-direction: column;
	gap: 14px;
}
</style>