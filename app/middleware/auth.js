export default defineNuxtRouteMiddleware((to, from) => {
  const cookie = document.cookie
  if (!cookie) {
    return navigateTo('/admin')
  }
})
