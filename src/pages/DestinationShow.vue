<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import sourceData from '@/data.json';

const route = useRoute();
//const destinationId = computed(() => parseInt(route.params.id));

const destination = ref(null);

async function getData() {
	const response = await fetch(`https://travel-dummy-api.netlify.app/${route.params.slug}.json`);
	destination.value = await response.json();
}

/* 
The advantage of this approach is that we still get
the performance benefits of not having to completely
recreate the component from scratchthat fetches data 
between pages.

However this performance boost is negligible for our page components.
Besides that, calling $watch every time you have a page component
can be a mental burden that must be remembered every time. 

Therefore, I only suggest using this approach, when your application
has a limited number of pages that fetch data in one of the Vue lifecycle hooks or if your application is suffering from performance issues when navigating between pages.

		watch(
			() => route.params,
			async () => {
				await getData();
			}
		);

*/

getData();
</script>

<template>
	<section
		v-if="destination"
		class="destination"
	>
		<h1>{{ destination.name }}</h1>
		<div class="destination-details">
			<img
				:src="`/images/${destination.image}`"
				:alt="destination.name"
			/>
			<p>{{ destination.description }}</p>
		</div>
	</section>
</template>

<style scoped></style>
