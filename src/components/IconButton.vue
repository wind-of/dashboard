<script setup>
import { computed } from "vue"
import { DARK_THEME, LIGHT_THEME } from "@/constants"
const { isActive } = defineProps({
	isActive: {
		type: Boolean,
		default: false
	}
})
const theme = computed(() => isActive ? DARK_THEME : LIGHT_THEME)
</script>

<template>
	<div class="wrapper" :class="isActive ? 'active-icon-class' : ''">
		<slot :theme="theme"></slot>
	</div>
</template>

<style>
.active-icon-class {
	background-color: var(--blue);
}
</style>
<style scoped>
.wrapper {
	width: 40px;
	height: 40px;
	border-radius: 10px;

	display: flex;
	align-items: center;
	justify-content: space-around;

	cursor: pointer;
	transition: background-color .2s;
}
</style>