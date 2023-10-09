<script setup>
import CanbanHeader from "./CanbanHeader.vue";
import CanbanTable from "./CanbanTable.vue";
</script>

<template>
	<section class="canban">
		<CanbanHeader />
		<CanbanTable />
	</section>
</template>

<style scoped>
.canban {
	display: flex;
	flex-direction: column;
	gap: 40px;
}
</style>