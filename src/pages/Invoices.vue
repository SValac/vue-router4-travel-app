<script setup>
// functionto know when user is leaving the current page
import { onBeforeRouteLeave } from 'vue-router';

// takes a callback function that execute befre the use rnavigates to the next route
onBeforeRouteLeave((to, from) => {
	// retun false forn this function prevest the navigation from happening
	const answer = window.confirm('Are you sure you want to leave?');

	if (!answer) return false;
});
</script>

<template>
	<div>
		<h1>Invoices</h1>
	</div>
</template>
