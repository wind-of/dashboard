<script setup>
import CanbanTableColumnHeader from "./CanbanTableColumnHeader.vue"
import CanbanTableColumnList from "./CanbanTableColumnList.vue"
</script>

<template>
	<section class="column">
		<CanbanTableColumnHeader />
		<CanbanTableColumnList />
	</section>
</template>

<style scoped>
.column {
	display: flex;
	flex-direction: column;
	gap: 12px;
}
</style>

