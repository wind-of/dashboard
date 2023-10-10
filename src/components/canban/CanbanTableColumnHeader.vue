<script setup>
import IconOptions from "../icons/IconOptions.vue"
import IconPlus from "../icons/IconPlus.vue"
defineProps({
	title: {
		type: String,
		default: "Column Header"
	}
})
</script>

<template>
	<header class="header">
		<h3 class="title">{{ title }}</h3>
		<section class="settings">
			<i class="options-icon"><IconOptions /></i>
			<i class="add-icon"><IconPlus /></i>
		</section>
	</header>
</template>

<style scoped>
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 14px 16px;
	border-radius: 10px;
	background: var(--vt-c-white)
}
.title {
	font-size: 16px;
}
.settings {
	display: flex;
	align-items: center;
	gap: 14px;
}
.settings > i {
	cursor: pointer;
}
.options-icon {
	margin-top: -6px;
}
.add-icon {
	padding: 3px 10px;
	border-radius: 10px;
	background-color: var(--blue-soft); 
}
</style>