import { defineStore } from "pinia"
import { ref } from "vue"
import { supabase } from "@/lib/supabase"

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)

  async function initialize() {
    const {data} = await supabase.auth.getSession()

    user.value = data.session?.user ?? null
    loading.value = false

    supabase.auth.onAuthStateChange((event, session) => {
      user.value = session?.user ?? null
    })
  }

  async function loginWithGoogle() {
    const {error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    })

    if (error) {
      console.error('Erreur lors de la connexion Google : ', error)
    }
  }

  async function logout() {
    const {error} = await supabase.auth.signOut({
      scope: 'local'
    })

    if (error) {
      console.error('Erreur lors de la déconnexion :', error)
    }
  }

  return {user, loading, initialize, loginWithGoogle, logout}
})
