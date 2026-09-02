<script setup>
import AppTopbar from './AppTopbar.vue'
import AppSidebar from './AppSidebar.vue'
</script>

<template>
  <div>
    <AppTopbar :sidebar-open="sidebarOpen" @toggle-sidebar="toggleSidebar" />

    <div>
      <AppSidebar :world-id="worldId" :open="sidebarOpen" @navigate="closeSidebar" />

      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>
