import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/pages/Home.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/destination/:id/:slug',
		name: 'destination.show',
		component: () => import('@/pages/DestinationShow.vue')
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: 'vue-school-active-link'
});

export default router;
