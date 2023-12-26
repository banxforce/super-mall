import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
   {
      path: "/home",
      component: () => import('@/views/home/Home.vue'),
   },
   {
      path: "/category",
      component: () => import('@/views/category/Category.vue'),
   },
   {
      path: "/cart",
      component: () => import('@/views/cart/Cart.vue'),
   },
   {
      path: "/profile",
      component: () => import('@/views/profile/Profile.vue'),
   },
   {
      path: "/detail",
      component: () => import('@/views/detail/Detail.vue'),
      props: route => ({ iid: route.query.iid })
   }
];

const router = new VueRouter({
   mode: "history",
   base: process.env.BASE_URL,
   routes,
});

export default router;
