import { createRouter, createWebHistory } from 'vue-router';
import home from './views/home.vue';
import about from './views/about.vue';
import films from './views/films.vue';
import tvShows from './views/tv-shows.vue';
import defaultLayout from './layouts/default.layout.vue';
import initialLayout from './layouts/initial.layout.vue';
import authLayout from './layouts/auth.layout.vue';
import login from './views/login.vue';
import initial from './views/initial.vue';
const routes = [
    {
        path: "/home",
        component: defaultLayout,
        children: [
            {
                path: "", component: home
            },
            {
                path: "films", component: films
            },
            {
                path: "tvshows", component: tvShows
            },
        ],
    },
    {
        path: "/auth",
        component: authLayout,
        children: [
            {
                path: "login", component: login
            }
        ]
    }, 
      {
        path: "/",
        component: initialLayout,
        children: [
            {
                path: "", component: initial
            }
        ]
    }, 

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

