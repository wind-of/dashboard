<script setup>
import { computed } from "vue"
import { LIGHT_THEME } from "@/constants"
const props = defineProps({ 
	theme: { 
		type: String, 
		default: LIGHT_THEME 
	}
})
const fillColor = computed(() => props.theme === LIGHT_THEME ? "#5F6388" : "white" )
</script>

<template>
	<slot :fillColor="fillColor"></slot>
</template>