import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue")
    },
    {
      path: "/canban",
      name: "canban",
      component: () => import("../views/CanbanView.vue")
    },
    {
      path: "/timeline",
      name: "timeline",
      component: () => import("../views/TimelineView.vue")
    }
  ]
})

export default router
