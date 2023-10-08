<script setup>
import IconArrowDown from './icons/IconArrowDown.vue';
import IconNotification from './icons/IconNotification.vue';
</script>

<template>
	<header class="header">
		<section class="search">
			<input type="text" placeholder="Search anything..." class="input">
		</section>
		<section class="user-details">
			<section class="notification">
				<i class="notification-icon"><IconNotification /></i>
			</section>
			<section class="user-profile">
				<div class="profile"></div>
				<i class="dropdown"><IconArrowDown /></i>
			</section>
		</section>
	</header>
</template>

<style scoped>
.header {
	width: 100%;
	height: 8vh;
	max-height: 76px;
	padding: 20px 40px 20px 35vw;

	display: flex;
	align-items: center;
	justify-content: space-between;

	background-color: var(--vt-c-white);
}
.user-details {
	display: flex;
	align-items: center;
	gap: 32px;
}

.input {
	width: 290px;
	padding: 15px 13px;
	border-radius: 7px;
	border: none;
	outline: none;
	background-color: var(--vt-c-white-soft);
	color: var(--color-text)
}
.user-profile {
	display: flex;
	align-items: center;
	gap: 12px;
}
.profile {
	width: 40px;
	height: 40px;
	border-radius: 20px;
	background: grey;
}
.dropdown {
	cursor: pointer;
}
.notification-icon {
	cursor: pointer;
	display: flex;
	align-items: center;
}
</style>
