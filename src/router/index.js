import { createRouter, createWebHistory, useRoute } from 'vue-router';
import Home from '@/pages/Home.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/protected',
		name: 'protected',
		component: () => import('@/pages/ProtectedView.vue'),
		// meta properties, to specifie this route options
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/pages/LoginView.vue')
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
	linkActiveClass: 'vue-school-active-link',
	scrollBehavior(to, from, savedPosition) {
		// retun a scrollToOptions object from this function,
		// this object can contain any for the folowing properties

		// return {top: null, from:null, savedPosition: null}

		return (
			savedPosition ||
			// set new promise to wait untill animation ends to return to top 0
			new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({ top: 0, scrollBehavior: 'smooth' });
				}, 1000);
			})
		);
	}
});

// before Each, this is called Global Navigation Guard, means every single time a rpoute changes in the Application this function is fired.

// here we can acces the meta on the route we are vaigation to and check the requited property is defined
router.beforeEach((to, from) => {
	if (to.meta.requiresAuth && !window.user) {
		// need to log in fi not Already logged in
		return { name: 'login' };
	}
});

export default router;
