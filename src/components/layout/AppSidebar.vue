<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { mainNavigation, worldNavigation, toolsNavigation } from '@/data/navigation'
import AppIcon from '../ui/AppIcon.vue'

const props = defineProps({
  worldId: {
    type: [String, Number],
    default: null,
  },
  open: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['navigate'])
const route = useRoute()

const isWorldPage = computed(() => {
  return Boolean(props.worldId)
})

function getRoute(item) {
  if (!item.route) {
    return null
  }

  if (item.route.startsWith('world')) {
    if (!props.worldId) {
      return null
    }
    return {
      name: item.route,
      params: {
        worldId: props.worldId,
      },
    }
  }

  return {
    name: item.route,
  }
}

function isActive(item) {
  if (!item.route) {
    return false
  }

  if (item.route.startsWith('world')) {
    return route.name === item.route
  }

  return route.name === item.route
}

function handleNavigation() {
  emit('navigate')
}
</script>

<template>
  <aside class="sidebar" :class="{ 'sidebar-open' : open }">
    <div class="sidebar_content">
      <nav class="sidebar_navigation">
        <section class="sidebar_section">
          <RouterLink v-for="item in mainNavigation" :key="item.route" :to="getRoute(item)" class="sidebar_item" :class="{ 'sidebar_item-active' : isActive(item) }" @click="handleNavigation">
            <AppIcon :name="item.icon" color="var(--color-accent)" />

            <span>{{ item.name }}</span>
          </RouterLink>
        </section>

        <section v-if="isWorldPage" class="sidebar_section">
          <div class="sidebar_section-title">
            Mon univers
          </div>

          <RouterLink v-for="item in worldNavigation" :key="item.route" :to="getRoute(item)" class="sidebar_item" :class="{ 'sidebar_item-active' : isActive(item) }" @click="handleNavigation">
            <AppIcon :name="item.icon" color="var(--color-accent)" />

            <span>{{ item.name }}</span>
          </RouterLink>
        </section>

        <section class="sidebar_section">
          <div class="sidebar_section-title">
            Outils
          </div>

          <button v-for="item in toolsNavigation" :key="item.name" class="sidebar_item sidebar_item-button" type="button" :disabled="!item.route">
            <AppIcon :name="item.icon" color="var(--color-accent)" />

            <span>{{ item.name }}</span>

            <span v-if="!item.route" class="sidebar_comingSoon">
              Bientôt
            </span>
          </button>
        </section>
      </nav>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  flex: 0 0 var(--sidebar-max-width);

  width: var(--sidebar-max-width);
  height: calc(100vh - var(--topbar-height));

  position: sticky;
  top: var(--topbar-height);

  overflow-y: auto;

  background-color: var(--color-bg);
  border-right: 1px solid var(--color-border);
}

.sidebar_content {
  padding: 16px 12px;
}

.sidebar_section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar_section + .sidebar_section {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
}

.sidebar_section-title {
  padding: 0 10px 7px;

  color: var(--color-text-muted);

  font-size: 0.7rem;
  text-transform: uppercase;
}

.sidebar_item {
  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;
  min-height: 40px;

  padding: 10px;

  background-color: transparent;
  border-radius: var(--radius-sm);

  font-size: 0.9rem;
}

.sidebar_item:hover {
  background-color: var(--color-surface);
}

.sidebar_item-active {
  background-color: var(--color-surface);
  color: var(--color-accent);
}

.sidebar_item-active span {
  color: var(--color-text);
}

.sidebar_item-button {
  text-align: left;
}

.sidebar_item-button:disabled {
  cursor: default;
  opacity: 0.5;
}

.sidebar_comingSoon {
  margin-left: auto;

  color: var(--color-text-muted);
  font-size: 0.6rem;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: var(--topbar-height);
    left: 0;
    z-index: 90;
    height: calc(100vh - var(--topbar-height));
    transform: translateX(-100%);
    transition: transform 0.2s ease;
    box-shadow: 12px 0 30px rgb(0 0 0 / 20%);
  }

  .sidebar-open {
    transform: translateX(0);
  }
}
</style>
