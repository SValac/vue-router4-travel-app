<script setup>
import TheNavigation from './components/TheNavigation.vue';

/* 

Key attribute to re-render the page when path changes

he alternative solution (to watch route.path to update component)
is to force Vue to re-create the page componenton every page change.

To understand the following approach, it's important to understand
Vue's key attribute. Vue has a special component attribute, called 
key, that is used by Vue under the hood to optimize performance. 

It does this by getting some knowledgeable developer input about what
needs to be re-rendered and when.

Whenever the value of this key attribute changes, Vue will destroy 
the currently rendered component that the key is applied to and 
then re-render it from scratch.

So, if we want to make sure Vue re-renders the page components
in our router view whenever a route changes, we can assign
the router-view a key attribute with the value of the route.path.

This works because the path is always going to be something different 
for each page. As you can see, this approach provides the same outcome 
as using $watch.

The downside is that it does take a little more javscript computation
between each page change as the component is completely destroyed 
and re-rendered

*/
</script>

<template>
	<TheNavigation />

	<!-- Transitions
		Vue 3 provies transitrions tag

		to use it we nned t add v-slot in the componentn where thre tansition  will be used and pass the transition in that slot

		then in the transition compomenten we add an anonymous component that is the component available ( v-slot). and add a Key in the anonymos component( in thi case we take key from Router view and add it to the anonymous component)

		Addig the key will ensuere that transition works correctly and in this case destroy and recreate the pages when route changes
		

		On the transition tag itself we can use the name slide, which determines what the name of the css classes applied to the element will be. and the mode of transition
	-->
	<div class="container">
		<RouterView v-slot="{ Component }">
			<Transition
				name="slide"
				mode="out-in"
			>
				<component
					:is="Component"
					:key="$route.path"
				></component>
			</Transition>
		</RouterView>
	</div>
</template>

<style scoped>
/* 
We use the class name of slide as that is the name
we have given our transition and we then use the classes
that Vue provides us with 

	enter-active, 
	leave-active, 
	enter-from, 
	leave-to,

There are 6 classes altogether

For the transition component to apply the proper classes
to each page, all the pages
need to have a single root element.
*/
.slide-enter-active,
.slide-leave-active {
	transition:
		opacity 1s,
		transform 1s;
}

.slide-enter-from,
.slide-leave-to {
	opacity: 0;
	transform: translateX(-30%);
}
</style>
