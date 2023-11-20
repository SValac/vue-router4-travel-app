<script setup>
import sourceData from '@/data.json';

const destinations = sourceData.destinations;
</script>

<template>
	<div id="nav">
		<RouterLink
			id="logo"
			:to="{ name: 'home' }"
			>Vue School Travel App</RouterLink
		>

		<RouterLink
			v-for="destination in destinations"
			:key="destination.id"
			:to="{
				name: 'destination.show',
				params: { id: destination.id, slug: destination.slug }
			}"
			>{{ destination.name }}</RouterLink
		>
		<RouterLink :to="{ name: 'protected' }">Protected</RouterLink>
	</div>
</template>

<style lang="css">
#nav .vue-school-active-link {
	color: red;
	border-bottom: 2px solid red;
}
</style>
