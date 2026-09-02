import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import CommunityView from '@/views/CommunityView.vue'

import WorldView from '@/views/world/WorldView.vue'
import MapView from '@/views/world/MapView.vue'
import CharactersView from '@/views/world/CharactersView.vue'
import CulturesView from '@/views/world/CulturesView.vue'
import EconomyView from '@/views/world/EconomyView.vue'
import FaunaFloraView from '@/views/world/FaunaFloraView.vue'
import HistoryView from '@/views/world/HistoryView.vue'
import LanguageView from '@/views/world/LanguageView.vue'
import LogisticsView from '@/views/world/LogisticsView.vue'
import MagicView from '@/views/world/MagicView.vue'
import MedicineView from '@/views/world/MedicineView.vue'
import PoliticsView from '@/views/world/PoliticsView.vue'
import ReligionsView from '@/views/world/ReligionsView.vue'
import TechnologyView from '@/views/world/TechnologyView.vue'
import WarsView from '@/views/world/WarsView.vue'
import WikiView from '@/views/world/WikiView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/accueil',
    },
    {
      path: '/accueil',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/community',
      name: 'community',
      component: CommunityView,
    },
    {
      path: '/world/:worldId',
      name: 'world',
      component: WorldView,
    },
    {
      path: '/world/:worldId/map',
      name: 'world-map',
      component: MapView,
    },
    {
      path: '/world/:worldId/characters',
      name: 'world-characters',
      component: CharactersView,
    },
    {
      path: '/world/:worldId/cultures',
      name: 'world-cultures',
      component: CulturesView,
    },
    {
      path: '/world/:worldId/economy',
      name: 'world-economy',
      component: EconomyView,
    },
    {
      path: '/world/:worldId/fauna-flora',
      name: 'world-fauna-flora',
      component: FaunaFloraView,
    },
    {
      path: '/world/:worldId/history',
      name: 'world-history',
      component: HistoryView,
    },
    {
      path: '/world/:worldId/languages',
      name: 'world-languages',
      component: LanguageView,
    },
    {
      path: '/world/:worldId/logistics',
      name: 'world-logistics',
      component: LogisticsView,
    },
    {
      path: '/world/:worldId/magic',
      name: 'world-magic',
      component: MagicView,
    },
    {
      path: '/world/:worldId/medicine',
      name: 'world-medicine',
      component: MedicineView,
    },
    {
      path: '/world/:worldId/politics',
      name: 'world-politics',
      component: PoliticsView,
    },
    {
      path: '/world/:worldId/religions',
      name: 'world-religions',
      component: ReligionsView,
    },
    {
      path: '/world/:worldId/technology',
      name: 'world-technology',
      component: TechnologyView,
    },
    {
      path: '/world/:worldId/wars',
      name: 'world-wars',
      component: WarsView,
    },
    {
      path: '/world/:worldId/wiki',
      name: 'world-wiki',
      component: WikiView,
    },
  ],
})

export default router
