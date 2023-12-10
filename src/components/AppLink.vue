<script setup>
import { computed } from 'vue';
import { RouterLink, useLink } from 'vue-router';

// spread the props form RouterLink to ouse compenent
const props = defineProps({
	...RouterLink.props
});

// `props` contains `to` and any other prop that can be passed to <router-link>
const { to, navigate, href, route, isActive, isExactActive } = props;

// compured property to check if the links is esternal or not
const isExternal = computed(() => {
	console.log(RouterLink.props);
	console.log(typeof to === 'string' && to.startsWith('http'));
	return typeof to === 'string' && to.startsWith('http');
});
</script>
<!-- 
    We areate a App link to use either a or router-link to manage liks
    as per vue style guilnes because this compenes is a Base component
    and will be used in all the application the prefix "App" is added 
    in name
-->
<template>
	<!-- use anchor for external link and bind href to prop "to" -->
	<a
		v-if="isExternal"
		target="_blank"
		rel="noopener"
		class="external-link"
		:href="to"
		><slot></slot
	></a>
	<!-- use routerLink for internal navigation and binf the props for this components -->
	<RouterLink
		v-else
		v-bind="props"
		class="internal-link"
		><slot></slot
	></RouterLink>
</template>

<style scoped></style>
