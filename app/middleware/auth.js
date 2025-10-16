export default defineNuxtRouteMiddleware((to, from) => {
  const cookie = document.cookie
  console.log(cookie)
  if (!cookie) {
    return navigateTo('/admin')
  }
})
