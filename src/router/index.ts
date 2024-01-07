import HomeView from "@/views/HomeView.vue"
import { createRouter, createWebHistory } from "vue-router"

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
      component: () => import("@/views/AboutView.vue")
    },
    {
      path: "/canban",
      name: "canban",
      component: () => import("@/views/CanbanView.vue")
    },
    {
      path: "/timeline",
      name: "timeline",
      component: () => import("@/views/TimelineView.vue")
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("@/views/AuthView.vue"),
      redirect: { name: "login" },
      children: [
        {
          path: "login",
          name: "login",
          component: () => import("@/components/auth/AuthFormSignIn.vue")
        },
        {
          path: "sign-up",
          name: "sign-up",
          component: () => import("@/components/auth/AuthFormSignUp.vue")
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.path === "/auth") {
    return next()
  }
  next()
  // next({ name: "auth", replace: true })
})

export default router
