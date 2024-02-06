import { isUserAuthenticated } from "@/api"
import { getMeRequest } from "@/api/user.requests"
import { useUserStore } from "@/stores/user"
import HomeView from "@/views/HomeView.vue"
import { createRouter, createWebHistory } from "vue-router"

// TODO: route names should be constant
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
      path: "/project",
      name: "project",
      component: () => import("@/views/ProjectView.vue")
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

router.beforeEach(async (to) => {
  const isAuthPage = /\/auth\/*/.test(to.path)
  const isAuthenticated = await isUserAuthenticated()
    .then((res) => res.data)
    .catch(() => false)
  const home = { name: "home", replace: true }
  const auth = { name: "auth", replace: true }

  if (isAuthenticated) {
    const { data: user } = await getMeRequest()
    useUserStore().saveUser(user)
  }

  if (isAuthPage && isAuthenticated) return home
  if (!isAuthPage && !isAuthenticated) return auth
})

export default router
