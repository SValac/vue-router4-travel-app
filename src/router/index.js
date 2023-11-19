import { createRouter, createWebHistory, useRoute } from 'vue-router';
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
		component: () => import('@/pages/DestinationShow.vue'),
		/* 
		props: true
		
		props: {
			newProp: false,
		}
		 */
		//props: (route) => ({ newProp: someExpresion ? true : false })
		props: (route) => ({ ...route.params, id: parseInt(route.params.id) }),

		// Navigation Guards
		async beforeEnter(to, from) {
			try {
				const data = await fetch(
					`https://travel-dummy-api.netlify.app/${to.params.slug}.json`
				);

				const exist = await data.json();
			} catch (error) {
				console.log('el error es...', error);
				return {
					name: 'NotFound',
					// allows to keep the URL while rendering a different page
					params: { pathMatch: to.path.split('/').slice(1) },
					query: to.query,
					hash: to.hash
				};
			}
		},
		children: [
			{
				// as this is a child the path already inlcude the parent path, so we can leave only the child path
				path: ':experienceSlug',
				name: 'experience.show',
				component: () => import('@/pages/ExperienceShow.vue'),
				props: (route) => ({ ...route.params, id: parseInt(route.params.id) })
			}
		]
	},
	/* {

		this code is now added in the childer property for destination, si it can be a nested route

		path: '/destination/:id/:slug/:experienceSlug',
		name: 'experience.show',
		component: () => import('@/pages/ExperienceShow.vue'),

		// here is important to knkow that whatever is returned from props function is all of the props that will be passed to the component.
		// in other words even though :slug and :experienceSlug exist in the path they will not make it as params to the component

		// we can spread(... operador) route params into the returned object so all the params will exist
		props: (route) => ({ ...route.params, id: parseInt(route.params.id) })
	} */

	// Not Found route
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: () => import('@/pages/NotFound.vue')
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: 'vue-school-active-link'
});

export default router;
