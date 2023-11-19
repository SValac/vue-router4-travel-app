<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const props = defineProps({
	id: {
		type: Number,
		required: true
	},
	experienceSlug: {
		type: String,
		required: true
	}
});

const experience = ref(null);
async function getExperience() {
	try {
		const response = await fetch(
			`https://travel-dummy-api.netlify.app/${route.params.slug}.json`
		);
		const destination = await response.json();
		console.log(destination);
		experience.value = destination.experiences.find((exp) => props.experienceSlug === exp.slug);
	} catch (error) {
		console.log(error);
	}
}

console.log('props: ', props.experienceSlug);
console.log('route params: ', route.params);

getExperience();
</script>

<template>
	<section v-if="experience">
		<h1>{{ experience.name }}</h1>
		<img
			:src="`/images/${experience.image}`"
			:alt="experience.nane"
		/>
		<p>{{ experience.description }}</p>
	</section>
</template>

<style scoped></style>
