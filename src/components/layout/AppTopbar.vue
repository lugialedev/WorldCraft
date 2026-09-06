<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth.js';

import AppIcon from '../ui/AppIcon.vue'

const authStore = useAuthStore()
const isAuthenticated = computed(() => !!authStore.user)

async function handleAuth() {
  if (isAuthenticated.value) {
    await authStore.logout()
  } else {
    await authStore.loginWithGoogle()
  }
}
</script>

<template>
  <header class="topbar">
    <div class="topbar_left">
      <RouterLink to="/" class="topbar_logo">
        <img src="../../assets/images/logo.svg" alt="Logo WorldCraft">
        WorldCraft
      </RouterLink>
    </div>

    <div v-if="isAuthenticated" class="topbar_center">
      <!--barre de recherche qui s'affiche que quand l'utilisateur est connecter et qui fait un recherche uniquement parmis ses projets-->
    </div>

    <div class="topbar_right">
      <button v-if="!isAuthenticated" class="button_auth" type="button" @click="handleAuth">
        <AppIcon :name="LogIn" />
        Connexion
      </button>

      <button v-else class="button_auth" type="button" @click="handleAuth">
        <AppIcon :name="LogOut" />
        Déconnexion
      </button>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: var(--topbar-height);
  padding: 0 24px;

  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}

.topbar_left, .topbar_center, .topbar_right {
  display: flex;
  align-items: center;
}

.topbar_logo {
  font-family: var(--text-title);
  font-size: 20px;
  text-decoration: none;
}

.topbar_logo img {
  height: 40px;
  width: 40px;
/*  box-sizing: border-box;*/
}

.button_auth {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 8px 14px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius);

  background-color: var(--color-surface);

  font-size: 0.9rem;

  cursor: pointer;
}

.button_auth:hover {
  border-color: var(--color-border-hover);
}
</style>
