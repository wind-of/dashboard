import { checkUserAuthentiocationRequest } from "@/api/auth.requests"
import { useUserStore } from "@/stores/user"
import HomeView from "@/views/HomeView.vue"
import { createRouter, createWebHistory } from "vue-router"

export const HOME_ROUTE_NAME = "home"
export const ABOUT_ROUTER_NAME = "about"
export const AUTH_ROUTE_NAME = "auth"
export const PROFILE_ROUTE_NAME = "profile"
export const LOGIN_ROUTE_NAME = "login"
export const REGISTER_ROUTE_NAME = "register"
export const CANBAN_ROUTE_NAME = "canban"
export const TIMELINE_ROUTE_NAME = "timeline"
export const PROJECT_ROUTE_NAME = "project"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: HOME_ROUTE_NAME,
      component: HomeView
    },
    {
      path: "/about",
      name: ABOUT_ROUTER_NAME,
      component: () => import("@/views/AboutView.vue")
    },
    {
      path: "/canban",
      name: CANBAN_ROUTE_NAME,
      component: () => import("@/views/CanbanView.vue")
    },
    {
      path: "/timeline",
      name: TIMELINE_ROUTE_NAME,
      component: () => import("@/views/TimelineView.vue")
    },
    {
      path: "/project",
      name: PROJECT_ROUTE_NAME,
      component: () => import("@/views/ProjectView.vue")
    },
    {
      path: "/profile",
      name: PROFILE_ROUTE_NAME,
      component: () => import("@/views/ProfileView.vue")
    },
    {
      path: "/auth",
      name: AUTH_ROUTE_NAME,
      component: () => import("@/views/AuthView.vue"),
      redirect: { name: "login" },
      children: [
        {
          path: "login",
          name: LOGIN_ROUTE_NAME,
          component: () => import("@/components/auth/AuthFormSignIn.vue")
        },
        {
          path: "register",
          name: REGISTER_ROUTE_NAME,
          component: () => import("@/components/auth/AuthFormSignUp.vue")
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  const isAuthPage = /\/auth\/*/.test(to.path)
  const isAuthenticated = await checkUserAuthentiocationRequest()
    .then((res) => res.data)
    .catch(() => false)
  const home = { name: HOME_ROUTE_NAME, replace: true }
  const auth = { name: AUTH_ROUTE_NAME, replace: true }

  if (isAuthenticated) {
    useUserStore().updateByAuthenticatedUser()
  }

  if (isAuthPage && isAuthenticated) return home
  if (!isAuthPage && !isAuthenticated) return auth
})

export default router
