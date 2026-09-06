<script setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import AppTopbar from './AppTopbar.vue'
import AppSidebar from './AppSidebar.vue'

const  route = useRoute()
const sidebarOpen = ref(false)
const worldId = computed(() => route.params.worldId ?? null)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function closeSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
  <div class="appLayout">
    <AppTopbar
    :sidebar-open="sidebarOpen"
    @toggle-sidebar="toggleSidebar" />

    <div class="appLayoutBody">
      <AppSidebar
      :world-id="worldId"
      :open="sidebarOpen"
      @navigate="closeSidebar" />

      <main class="appLayoutContent">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.appLayout {
  min-height: 100vh;
  background-color: var(--color-bg);
}

.appLayout_body {
  display: flex;
  min-height: calc(100vh - var(--topbar-height));
}

.appLayoutContent {
  flex: 1;
  min-width: 0;
  padding: 24px;
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .appLayoutContent {
    padding: 16px;
  }
}
</style>
