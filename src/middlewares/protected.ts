import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { store } from '../store'

export default (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  if (store.getters.getAuth.msalToken) {
    next()
  } else {
    next('/')
  }
}
