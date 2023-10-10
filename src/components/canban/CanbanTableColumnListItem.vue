<script setup>

</script>

<template>
	<section class="item">
		<header class="header">
			<div class="tag">Design</div>
		</header>
		<section class="text">
			<h3 class="title">Task title</h3>
			<p class="description">Description</p>
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
.tag {
	display: inline-block;
	padding: 3px 9px;
	border-radius: 4px;
	background-color: var(--blue);
	font-size: 12px;
	font-weight: 500;
	color: var(--white);
}
.text {
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