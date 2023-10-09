<script setup>
import IconWrapper from "./IconWrapper.vue"
</script>

<template>
	<IconWrapper v-slot="{ fillColor }" defaultColor="#6772FE">
		<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect x="4" width="2" height="10" :fill="fillColor"/>
			<rect y="6" width="2" height="10" transform="rotate(-90 0 6)" :fill="fillColor"/>
		</svg>
	</IconWrapper>
</template>
