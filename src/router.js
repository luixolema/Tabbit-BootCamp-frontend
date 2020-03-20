import Vue from 'vue'
import Router from 'vue-router'
import HomePageComponent from './components/HomePageComponent';
import GuestOverviewComponent from './components/GuestOverviewComponent';


Vue.use(Router);

const routes = [
    { path: '/', component: HomePageComponent },
    { path: '/home', component: HomePageComponent },
    { path: '/guest-overview', component: GuestOverviewComponent },
]

// Create the router instance and pass the `routes` option
export default new Router({
    routes // short for `routes: routes`
})