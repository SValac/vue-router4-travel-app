<script setup>
import TheNavigation from './components/TheNavigation.vue';
</script>

<template>
	<TheNavigation />

	<div class="container">
		<RouterView :key="$route.path"></RouterView>
	</div>
</template>

<style scoped></style>
