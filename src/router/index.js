import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Admin from '../views/Admin.vue'
import Overview from '../views/Overview.vue'
import SingleItem from '../views/SingleItem.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import Orders from '../views/Orders.vue'
import Products from '../views/Products.vue'
import ProductsAdmin from '../views/ProductsAdmin.vue'
//import AuthGuard from './auth-guard'

import {store} from '../store'


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
    path: "/products",
    name: "products",
    props: true,
    component: Products,
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
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/admin/overview",
    name: "overview",
    component: Overview,
    //beforeEnter: AuthGuard
    meta: {requiresAuth: true}
  },
  {
    path: "/admin/orders",
    name: "orders",
    component: Orders,
    //beforeEnter: AuthGuard
   // meta: {requiresAuth: true}
  },
  {
    path: "/admin/products",
    name: "productsAdmin",
    props: true,
    component: ProductsAdmin,
    //beforeEnter: AuthGuard
    //meta: {requiresAuth: true}
  },
  {
    path: "/about",
    name: "about",
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

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if(requiresAuth && !store.getters.user){
    next('/login')
  }else if(requiresAuth && store.getters.user){
    next()
  }else{
    next()
  }
})

export default router;
