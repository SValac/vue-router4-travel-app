<script setup></script>

<template>
	<div id="nav">
		<RouterLink to="/">Home</RouterLink>
		<RouterLink to="/brazil">Brazil</RouterLink>
		<RouterLink to="/jamaica">Jamaica</RouterLink>
		<RouterLink to="/panama">Panama</RouterLink>
		<RouterLink to="/hawaii">Hawaii</RouterLink>
	</div>

	<div class="container">
		<RouterView></RouterView>
	</div>
</template>

<style scoped></style>
