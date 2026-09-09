<script setup>
import { computed, ref } from 'vue';
import { useAuthStore } from '@/stores/auth.js';

import AppIcon from '../ui/AppIcon.vue'

defineProps({
  sidebarOpen: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['toggle-sidebar'])

const authStore = useAuthStore()

const profileMenuOpen = ref(false)

const user = computed(() => authStore.user)
const userName = computed(() => {
  return (
    user.value?.user_metadata?.full_name ||
    user.value?.user_metadata?.name ||
    user.value?.email ||
    'Utilisateur')
})
const userEmail = computed(() => user.value?.email || '')

const userAvatar = computed(() => {
  return user.value?.user_metadata?.avatar_url || null
})

async function handleLogin() {
  await authStore.loginWithGoogle()
}

async function handleLogout() {
  profileMenuOpen.value = false
  await authStore.logout()
}

function toggleProfileMenu() {
  profileMenuOpen.value = !profileMenuOpen.value
}
</script>

<template>
  <header class="topbar">
    <div class="topbar_left">
      <button class="topbar_menu_sidebar"
      type="button"
      aria-label="Ouvrir le menu"
      @click="emit('toggle-sidebar')">
        <AppIcon name="Menu" />
      </button>

      <RouterLink to="/accueil" class="topbar_logo">
        <img src="../../assets/images/logo.svg" alt="Logo WorldCraft">
        <h1>WorldCraft</h1>
      </RouterLink>
    </div>

    <div v-if="user" class="topbar_center">
      <!--barre de recherche qui s'affiche que quand
      l'utilisateur est connecter et qui fait une
      recherche uniquement parmis les élément de ses
      propres projets-->
    </div>

    <div class="topbar_right">
      <button v-if="user" type="button" class="topbar_notification">
        <AppIcon name="Bell" />
      </button>

      <button v-if="!user" class="button_login" type="button" @click="handleLogin">
        <AppIcon name="LogIn" />
        <span>Se connecter</span>
      </button>

      <div v-else class="topbar_profile">
        <button class="topbar_profile-button" type="button" aria-haspopup="menu" :aria-expanded="profileMenuOpen" @click="toggleProfileMenu">
          <img :src="userAvatar" class="topbar_avatar" />

          <span class="topbar_profile-name"> {{ userName }}</span>
          <AppIcon name="ChevronDown" :size="16" />
        </button>

        <div v-if="profileMenuOpen" class="topbar_profile-menu" role="menu">
          <div class="topbar_profile-header">
            <strong>{{ userName }}</strong>
            <span>{{ userEmail }}</span>
          </div>

          <div class="topbar_separator"></div>

          <button class="topbar_menu-item" type="button" role="menuitem">
            <AppIcon name="Settings" />
            <span>Paramètres</span>
          </button>

          <button class="topbar_menu-item topbar_menu-item-danger" type="button" role="menuitem" @click="handleLogout">
            <AppIcon name="LogOut" />
            <span>Se déconnecter</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: space-between;

  height: var(--topbar-height);
  padding: 0 24px;

  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}

.topbar_left, .topbar_center, .topbar_right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.topbar_menu_sidebar {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  padding: 0;

  border: 0;
  border-radius: var(--radius-sm);

  background-color: transparent;
  color: var(--color-text);
}

.topbar_menu_sidebar:hover {
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
}

.topbar_logo {
  display: flex;
  align-items: center;

  font-family: var(--text-title);
  font-size: 0.7rem;
  text-decoration: none;

  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  padding: 5px;

  gap: 3px;
}

.topbar_logo:hover {
  border-color: var(--color-border-hover);
}

.topbar_logo img {
  height: 35px;
  width: 35px;
}

.topbar_logo h1 {
  margin: 0;
}

.topbar_notification {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  width: 40px;
  height: 40px;

  border-radius: 50%;
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);

  object-fit: cover;
}

.topbar_notification:hover {
  border-color: var(--color-border-hover);
}

.button_login {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 8px 14px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);

  background-color: var(--color-surface);
  color: var(--color-text);

  font-size: 0.9rem;

  cursor: pointer;
}

.button_login:hover {
  border-color: var(--color-border-hover);
}

.topbar_profile {
  position: relative;
}

.topbar_profile-button {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 5px 8px;

  border: 1px solid transparent;
  border-radius: var(--radius-sm);

  background-color: transparent;
  color: var(--color-text);
}

.topbar_profile-button:hover {
  border-color: var(--color-border-hover);
}

.topbar_profile-name {
  max-width: 180px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.topbar_avatar {
  width: 40px;
  height: 40px;

  border-radius: 50%;
  border: 1px solid var(--color-border);

  object-fit: cover;
}

.topbar_profile-menu {
  position: absolute;
  top: calc(100% +8px);
  right: 0;

  width: 240px;
  padding: 8px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius);

  background-color: var(--color-surface);

  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
}

.topbar_profile-header {
  display: flex;
  flex-direction: column;

  padding: 10px 10px 12px;

  overflow: hidden;
}

.topbar_profile-header strong, .topbar_profile-header span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.topbar_profile-header span {
  margin-top: 3px;

  color: var(--color-text-muted);
  font-size: 0.8rem;
}

.topbar_separator {
  height: 1px;
  margin: 4px 0;

  background-color: var(--color-border);
}

.topbar_menu-item {
  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;
  padding: 10px;

  border: 0;
  border-radius: var(--radius-sm);

  background-color: transparent;
  color: var(--color-text);

  text-align: left;
}

.topbar_menu-item:hover {
  background-color: var(--color-surface-light);
}

.topbar_menu-item-danger {
  color: var(--color-danger);
}

@media (max-width: 768px) {
  .app-topbar {
    padding: 0 12px;
  }

  .app-topbar__menu-button {
    display: flex;
  }

  .app-topbar__profile-name {
    display: none;
  }
}
</style>
