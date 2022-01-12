import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
          {
            path: "/ssk",
            name: "Ssk",
            component: () => import("../syan/Ssk.vue"),
          },
        {
          path: "/mine",
          name: "Mine",
          component: () => import("../views/Mine.vue"),
        },
      {
        path: "/category",
        name: "Category",
        component: () => import("../views/Category.vue"),
      },
    {
      path: "/homepage",
      name: "HomePage",
      component: () => import("../views/HomePage.vue"),
    },
  {
    path: "/",
    name: "Index",
    component: () => import("../views/index.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
