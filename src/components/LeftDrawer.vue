<script setup>
import IconLogo from "@/components/icons/IconLogo.vue"
import IconButton from "@/components/IconButton.vue"
import IconHome from "@/components/icons/IconHome.vue"
import IconStorage from "@/components/icons/IconStorage.vue"
import IconKanban from "@/components/icons/IconKanban.vue"
import IconSettings from "@/components/icons/IconSettings.vue"
import IconChat from "@/components/icons/IconChat.vue"
import IconVisual from "@/components/icons/IconVisual.vue"

</script>

<template>
	<section class="drawer">
		<header class="logo">
			<IconLogo class="logo-icon"/>
			<p class="logo-text">Time.</p>
		</header>
		<nav class="navigation">
			<ul class="navigation-list">
				<li class="navigation-item">
					<IconButton v-slot="{ theme }">
						<IconHome :theme="theme"/>
					</IconButton>
				</li>
				<li class="navigation-item">
					<IconButton v-slot="{ theme }">
						<IconStorage :theme="theme"/>
					</IconButton>
				</li>
				<li class="navigation-item">
					<IconButton v-slot="{ theme }">
						<IconKanban :theme="theme"/>
					</IconButton>
				</li>
				<li class="navigation-item">
					<IconButton v-slot="{ theme }">
						<IconVisual :theme="theme"/>
					</IconButton>
				</li>
				<li class="navigation-item">
					<IconButton v-slot="{ theme }">
						<IconChat :theme="theme"/>
					</IconButton>
				</li>
				<li class="navigation-item">
					<IconButton v-slot="{ theme }">
						<IconSettings :theme="theme"/>
					</IconButton>
				</li>
			</ul>
		</nav>
	</section>
</template>

<style scoped>
.drawer { 
	width: 10vw;
	height: 100vh;
	max-width: 80px;
	padding: 20px 15px;
	background-color: var(--vt-c-white);

	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 150px;
}
.logo {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 5px;
}
.logo-text {
	font-weight: 600;
}
.navigation-list {
	display: flex;
	flex-direction: column;
	gap: 5px;
}
</style>