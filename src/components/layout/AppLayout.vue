<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import AppTopbar from './AppTopbar.vue'
import AppSidebar from './AppSidebar.vue'

const route = useRoute()

const sidebarOpen = ref(false)

function updateSidebarForViewport() {
  sidebarOpen.value = window.innerWidth > 768
}

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function closeSidebar() {
  if (window.innerWidth <= 768) {
    sidebarOpen.value = false
  }
}

function handleResize() {
  updateSidebarForViewport()
}

onMounted(() => {
  updateSidebarForViewport()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="appLayout">
    <AppTopbar
      :sidebar-open="sidebarOpen"
      @toggle-sidebar="toggleSidebar"
    />

    <div class="appLayoutBody">
      <AppSidebar
        :world-id="route.params.worldId ?? null"
        :open="sidebarOpen"
        @navigate="closeSidebar"
      />

      <main class="appLayoutContent">
        <RouterView />
      </main>

      <button
        v-if="sidebarOpen"
        class="appLayoutOverlay"
        type="button"
        aria-label="Fermer le menu"
        @click="closeSidebar" />
    </div>
  </div>
</template>

<style scoped>
.appLayout {
  min-height: 100vh;
  background-color: var(--color-surface);
}

.appLayoutBody {
  display: flex;
  min-height: calc(100vh - var(--topbar-height));
}

.appLayoutContent {
  flex: 1;
  min-width: 0;
  padding: 24px;
  overflow-x: hidden;
}

.appLayoutOverlay {
  display: none;
}

@media (max-width: 768px) {
  .appLayoutContent {
    padding: 16px;
  }

  .appLayoutOverlay {
    display: block;
    position: fixed;
    inset: var(--topbar-height) 0 0;
    z-index: 80;

    width: 100%;
    height: calc(100vh - var(--topbar-height));

    padding: 0;
    border: none;
    background: rgb(0 0 0 / 40%);
    cursor: pointer;
  }
}
</style>
