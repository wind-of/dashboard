<script setup>
defineProps({
	task: {
		type: Object,
		requried: true
	}
})
</script>

<template>
	<section class="item">
		<header class="header">
			<section class="tags">
				<div class="tag" v-for="tag in task.tags" :key="tag.id">{{ tag.title }}</div>
			</section>
		</header>
		<section class="item-content">
			<h3 class="title">{{ task.title }}</h3>
			<p class="description">{{ task.description }}</p>
		</section>
	</section>
</template>

<style lang="scss" scoped>

.item {
	@include flex-column;
	gap: 15px;
	padding: 16px;
	border-radius: 12px; 
	background-color: var(--white);
}
.tags {
	@include flex-row;
	gap: 6px;
}
.tag {
	display: inline-block;
	padding: 3px 9px;
	border-radius: 4px;
	background-color: var(--blue);
	font-size: 12px;
	font-weight: 500;
	color: var(--white);
	cursor: pointer;
}
.item-content {
	@include flex-column;
	font-weight: 500;
	gap: 7px;
}
.title {
	font-size: 13px;
}
.description {
	font-size: 12px;
	color: var(--subtitle);
}
</style>