import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import FAQ from '../views/FAQ.vue';
import Wireframes from '../views/Wireframes.vue';
import DemonstrationVideos from '../views/DemonstrationVideos.vue';

const routes = [
  {
    path: '/faq',
    name: 'FAQ',
    component: FAQ,
  },
  {
    path: '/wireframes',
    name: 'Wireframes',
    component: Wireframes,
  },
  {
    path: '/demonstration-videos',
    name: 'DemonstrationVideos',
    component: DemonstrationVideos,
  },
];

const router = createRouter({
  // Explicitly set the base path for the router
  history: createWebHashHistory('/nccoe-mdl-project-static-website/nccoe-bank/'),
  routes,
});

export default router;
