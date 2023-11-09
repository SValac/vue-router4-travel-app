import { createRouter, createMemoryHistory } from 'vue-router';

import Home from '@/pages/Home.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('@/pages/About.vue')
	},
	{
		path: '/brazil',
		name: 'Brazil',
		component: () => import('@/pages/Brazil.vue')
	},
	{
		path: '/jamaica',
		name: 'Jamaica',
		component: () => import('@/pages/Jamaica.vue')
	},
	{
		path: '/panama',
		name: 'Panama',
		component: () => import('@/pages/Panama.vue')
	},
	{
		path: '/hawaii',
		name: 'Hawaii',
		component: () => import('@/pages/Hawaii.vue')
	}
];

const router = createRouter({
	history: createMemoryHistory(),
	routes
});

export default router;
