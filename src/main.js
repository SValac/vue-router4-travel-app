import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// importing AppLink in the main.js to be able to useit in all the application so we dont have to import it in each component
import AppLink from '@/components/AppLink.vue';

createApp(App).component('AppLink', AppLink).use(router).mount('#app');
