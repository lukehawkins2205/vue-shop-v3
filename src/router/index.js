import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from '../views/Admin.vue'
import Overview from '../views/Overview.vue'
import SingleItem from '../views/SingleItem.vue'
import SignUp from '../views/SignUp.vue'
import SignIn from '../views/SignIn.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
  },
  {
    path: "/product/:id",
    name: "product",
    props: true,
    component: SingleItem,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp
  },
  {
    path: "/signin",
    name: "signin",
    component: SignIn
  },
  {
    path: "/admin/overview",
    name: "overview",
    component: Overview
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
