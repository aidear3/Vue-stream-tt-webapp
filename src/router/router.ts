import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import protectedRoute from '../middlewares/protected';
import Home from '../views/Home.vue';
import DynamicHome from '../views/DynamicHome.vue';
import DynamicHomeSub from '../views/DynamicHomeSub.vue';
import Profile from '../views/Profile.vue';
import ProfileNoGuard from '../views/ProfileNoGuard.vue';
import Failed from "../views/Failed.vue";
import SVODAcess from '../views/SVOD/Access.vue';
import SVODSeries from '../views/SVOD/Series.vue';
import SVODContents from '../views/SVOD/Contents.vue';
import SVODAcessContent from '../views/SVOD/AcessContent.vue';
import SVODPlayer from '../views/SVOD/Player.vue';
import LivePlayer from '../views/Live/Player.vue';
import EventPlayer from '../views/Events/Player.vue';
import SportPlayer from '../views/Sports/Player.vue';
import CategoryContents from '../views/Category/CategoryContents.vue';
import Provider from '../views/Provider/index.vue';
import MoviePlayer from '../views/Player/MoviePlayer.vue';
import SeriesPlayer from '../views/Player/SeriesPlayer.vue';
import { registerGuard } from "./Guard";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/menu/:menuId',
    name: 'DynamicHome',
    component: DynamicHome,
  },
  {
    path: '/menu/:menuId/s/:subMenuId',
    name: 'DynamicHomeSub',
    component: DynamicHomeSub,
  },
  {
    path: '/live/player/:liveId',
    name: 'LivePlayer',
    component: LivePlayer,
  },
  {
    path: '/sport/player/:sportId',
    name: 'SportPlayer',
    component: SportPlayer,
  },
  {
    path: '/event/player/:eventId',
    name: 'EventPlayer',
    component: EventPlayer,
  },
  {
    path: '/svod/movie/:id',
    name: 'SVODAcess',
    component: SVODAcess,
  },
  {
    path: '/svod/series/:id',
    name: 'SVODSeries',
    component: SVODSeries,
  },
  {
    path: '/svod/package/:packageId',
    name: 'SVODAcessContent',
    component: SVODAcessContent,
  },
  {
    path: '/svod/contents',
    name: 'SVODContents',
    component: SVODContents,
  },
  {
    path: '/svod/player/:vodId',
    name: 'SVODPlayer',
    component: SVODPlayer,
  },
  {
    path: '/provider/:providerId',
    name: 'Provider',
    component: Provider,
  },
  {
    path: '/player/movie/:playerId',
    name: 'MoviePlayer',
    component: MoviePlayer,
  },
  {
    path: '/player/series/:playerId',
    name: 'SeriesPlayer',
    component: SeriesPlayer,
  },
  {
    path: '/category/:categoryId/:menuContentType',
    name: 'CategoryContents',
    component: CategoryContents,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
        requiresAuth: true
    },
    beforeEnter: protectedRoute,
  },
  {
    path: '/profileNoGuard',
    name: 'ProfileNoGuard',
    component: ProfileNoGuard
  },
  {
    path: '/failed',
    name: 'Failed',
    component: Failed
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

registerGuard(router);

export default router;
