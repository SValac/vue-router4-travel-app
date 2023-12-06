<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();
const route = useRoute();

const username = ref('');
const password = ref('');

const login = () => {
	//auth user in API
	window.user = username.value;

	// using query params to redirect user
	// or if the query oarams doenst exist redirectto protected
	const redirectPath = route.query.redirect || '/protected';
	router.push(redirectPath);
	//router.push({ name: 'protected' });
};
</script>

<template>
	<div class="login">
		<form
			@submit.prevent="login"
			class="form"
		>
			<h1>Logging</h1>
			<label for="usermae">Username</label>
			<input
				v-model="username"
				type="text"
				name="username"
				id="username"
				class="input"
			/>
			<label for="password">Password</label>
			<input
				v-model="password"
				type="password"
				name="password"
				id="password"
				class="input"
			/>
			<button class="btn">Login</button>
		</form>
	</div>
</template>

<style scoped></style>
