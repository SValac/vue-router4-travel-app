<script setup>
import sourceData from '@/data.json';

const destinations = sourceData.destinations;
</script>

<template>
	<div id="nav">
		<AppLink
			id="logo"
			:to="{ name: 'home' }"
			>Vue School Travel App</AppLink
		>

		<AppLink
			v-for="destination in destinations"
			:key="destination.id"
			:to="{
				name: 'destination.show',
				params: { id: destination.id, slug: destination.slug }
			}"
			>{{ destination.name }}</AppLink
		>
		<AppLink :to="{ name: 'protected' }">Protected</AppLink>
		<AppLink to="https://vueschool.io/lessons/extending-router-link-for-external-urls"
			>External</AppLink
		>
	</div>
</template>

<style lang="css">
#nav .vue-school-active-link {
	color: red;
	border-bottom: 2px solid red;
}
</style>
