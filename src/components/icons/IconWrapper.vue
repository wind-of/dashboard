<script setup>
import { computed } from "vue"
import { LIGHT_THEME } from "@/constants"
const { theme } = defineProps({ 
	theme: { 
		type: String, 
		default: LIGHT_THEME 
	}
})
const fillColor = computed(() => theme === LIGHT_THEME ? "#5F6388" : "white" )
</script>

<template>
	<slot :fillColor="fillColor"></slot>
</template>