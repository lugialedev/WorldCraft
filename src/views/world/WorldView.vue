<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase';

import mythologiqueImage from '@/assets/images/projects/mythologique.png'
import lowFantasyImage from '@/assets/images/projects/médiévalFantasy.png'
import darkFantasyImage from '@/assets/images/projects/darkFantasy.png'
import highFantasyImage from '@/assets/images/projects/highFantasy.png'
import murimImage from '@/assets/images/projects/murim.png'
import historiqueImage from '@/assets/images/projects/historique.png'
import steampunkImage from '@/assets/images/projects/steampunk.png'
import horreurImage from '@/assets/images/projects/horreur.png'
import urbanFantasyImage from '@/assets/images/projects/urbanFantasy.png'
import postApoImage from '@/assets/images/projects/postApo.png'
import pirateImage from '@/assets/images/projects/pirate.png'
/*import scienceFantasyImage from '@/assets/images/projects/scienceFantasy.png'
import cyberpunkImage from '@/assets/images/projects/cyberpunk.png'
import biopunkImage from '@/assets/images/projects/biopunk.png'
import scienceFictionImage from '@/assets/images/projects/scienceFiction.png'*/

import { ArrowLeft, CalendarDays, ChevronRight, Clock3, GlobeOff, Edit3, FileText, Map, Sparkles, UsersRound } from 'lucide-vue-next';

const route = useRoute()
const router = useRouter()

const world = ref(null)
const loading = ref(true)
const error = ref(null)

const stats = ref({
  characters: 0,
  location: 0,
  notes: 0,
})

const quickActions = [
  {
    title: 'Carte',
    description: 'Explorez et construisez la géographie de votre monde.',
    icon: Map,
    route: 'world-map',
  },
  {
    title: 'Personnages',
    description: 'Créez les personnages qui peuplent votre univers.',
    icon: UsersRound,
    route: 'world-characters',
  },
  {
    title: 'Histoire',
    description: 'Construisez la chronologie et les événements majeurs.',
    icon: CalendarDays,
    route: 'world-history',
  },
  {
    title: 'Wiki',
    description: 'Centralisez les informations de votre univers.',
    icon: FileText,
    route: 'world-wiki',
  },
]

function getProjectImage(type) {
  switch (type) {
    case 'Low fantasy':
      return lowFantasyImage
    case 'Murim':
      return murimImage
    case 'Steampunk':
      return steampunkImage
    case 'Mythologique':
      return mythologiqueImage
    case 'Dark fantasy':
      return darkFantasyImage
    case 'High fantasy':
      return highFantasyImage
    case 'Historique':
      return historiqueImage
    case 'Horreur':
      return horreurImage
    case 'Urban fantasy':
      return urbanFantasyImage
    case 'Pirate':
      return pirateImage
    case 'Post-apocalypse':
      return postApoImage
    /*case 'Gaslamp':
      return GaslampFantasyImage
    case 'Cyberpunk':
      return cyberpunkImage
    case 'Biopunk':
      return biopunkImage
    case 'Science-fantasy':
      return scienceFantasyImage
    case 'ScienceFiction':
      return scienceFictionImage*/
    default:
      return lowFantasyImage
  }
}

function formatDate(dateString) {
  if (!dateString) {
    return ''
  }

  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatRelativeDate(dateString) {
  if (!dateString) {
    return ''
  }

  const date = new Date(dateString)
  const now = new Date()

  const diff = now.getTime() - date.getTime()

  const minutes = Math.floor(diff / 1000 / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (minutes < 1) {
    return "à l'instant"
  }

  if (minutes < 60) {
    return `il y a ${minutes} min`
  }

  if (hours < 24) {
    return `il y a ${hours} h`
  }

  if (days < 7) {
    return `il y a ${days} j`
  }

  return formatDate(dateString)
}

async function loadWorld() {
  loading.value = true
  error.value = null

  const worldId = route.params.worldId

  if (!worldId) {
    error.value = 'Aucun monde n’a été indiqué.'
    loading.value = false
    return
  }

  const { data, error: supabaseError } = await supabase
    .from('worlds')
    .select('*')
    .eq('id', worldId)
    .single()

  if (supabaseError) {
    console.error(
      'Erreur lors du chargement du monde :',
      supabaseError
    )

    error.value = 'Impossible de charger ce monde.'
    loading.value = false
    return
  }

  world.value = {
    ...data,
    image: data.cover_url || getProjectImage(data.type),
  }

  loading.value = false
}

function navigateTo(routeName) {
  router.push({
    name: routeName,
    params: {
      worldId: route.params.worldId,
    },
  })
}

function goBackHome() {
  router.push({
    name: 'home',
  })
}

function goBackProjects() {
  router.push({
    name: 'dashboard',
  })
}

onMounted(() => {
  loadWorld()
})
</script>

<template>
  <main class="world-view">
    <!-- LOADING -->
    <section v-if="loading" class="state-card">
      <div class="loading-spinner"></div>

      <h1>chargement du monde...</h1>

      <p>Préparation de votre univers.</p>
    </section>

    <!-- ERROR -->
    <section v-else-if="error" class="state-card state-card-error">
      <div class="state-icon">
        <GlobeOff :size="36" />
      </div>

      <h1>Monde introuvable</h1>

      <p>{{ error }}</p>

      <button type="button" @click="goBackHome">
        <ArrowLeft :size="18" />
        Retour à l'accueil
      </button>
    </section>

    <!-- WORLD -->
    <template v-if="world">
      <!-- HEADER -->
      <section class="header">
        <div class="header-image">
          <img :src="world.image" :alt="`Illustration de ${world.name}`">

          <div class="header-image-overlay"></div>
        </div>

        <div class="header-content">
          <div class="breadcrumb">
            <button type="button" @click="goBackProjects">
              Mes projets
            </button>

            <ChevronRight :size="18" />

            <span>{{ world.name }}</span>
          </div>

          <div class="world-title-row">
            <div>
              <span class="world-type">
                {{ world.type }}
              </span>

              <h1>{{ world.name }}</h1>
            </div>

            <button class="world-edit-button" type="button">
              <Edit3 :size="18" />
              Modifier
            </button>
          </div>

          <p v-if="world.description" class="world-description">
            {{ world.description }}
          </p>

          <p v-else class="world-description world-description-empty">
            Aucun résumé n'a encore été ajouté à ce monde.
          </p>

          <div class="world-meta">
            <span>
              <CalendarDays :size="18" />
              Créé le {{ formatDate(world.created_at) }}
            </span>

            <span>
              <Clock3 :size="18" />
              Modifié {{ formatRelativeDate(world.updated_at) }}
            </span>
          </div>
        </div>
      </section>

      <!-- STATS -->
      <section class="section">
        <div class="section-heading">
          <div>
            <h2>Vue d'ensemble</h2>

            <p>
              Un aperçu rapide du contenu de votre univers.
            </p>
          </div>
        </div>

        <div class="stats-grid">

          <article class="stat-card">
            <div class="stat-card-icon">
              <UsersRound :size="18" />
            </div>

            <div>
              <span>Personnages : </span>

              <strong>{{ stats.characters }}</strong>
            </div>
          </article>

          <article class="stat-card">
            <div class="stat-card-icon">
              <Map :size="18" />
            </div>

            <div>
              <span>Lieux : </span>

              <strong>{{ stats.location }}</strong>
            </div>
          </article>

          <article class="stat-card">
            <div class="stat-card-icon">
              <FileText :size="18" />
            </div>

            <div>
              <span>Notes : </span>

              <strong>{{ stats.notes }}</strong>
            </div>
          </article>
        </div>
      </section>

      <!-- QUICK ACCESS -->
      <section class="section">
        <div class="section-heading">
          <div>
            <h2>Commencer à construire</h2>

            <p>
              Accédez rapidement aux principaux outils de votre monde.
            </p>
          </div>
        </div>

        <div class="quick-actions-grid">
          <button v-for="action in quickActions" :key="action.route" class="quick-action-card" type="button" @click="navigateTo(action.route)">
            <div class="quick-action-icon">
              <component :is="action.icon" :size="18"/>
            </div>

            <div class="quick-action-content">
              <h3>{{ action.title }}</h3>

              <p>
                {{ action.description }}
              </p>
            </div>

            <ChevronRight class="quick-action-arrow" :size="18"/>
          </button>
        </div>
      </section>

      <!-- RECENT ACTIVITY -->
      <section class="section">
        <div class="section-heading">
          <div>
            <h2>Activité récente</h2>

            <p>
              Suivez les dernières modifications apportées à votre univers.
            </p>
          </div>
        </div>

        <div class="activity-card">
          <div class="activity-empty-icon">
            <Clock3 :size="18" />
          </div>

          <div>
            <strong>
              Votre historique apparaîtra ici
            </strong>

            <p>
              Les modifications de votre monde seront bientôt
              affichées dans cette section.
            </p>
          </div>
        </div>
      </section>

      <!-- BOTTOM CTA -->
      <section class="world-cta">
        <div class="world-cta-icon">
          <Sparkles :size="18" />
        </div>

        <div>
          <h2>
            Commencez à donner vie à "{{ world.name }}"
          </h2>

          <p>
            Chaque grand univers commence par une première idée.
          </p>
        </div>

        <button type="button" @click="navigateTo('world-map')">
          <Plus :size="18" />
          Commencer
        </button>
      </section>
    </template>
  </main>
</template>

<style scoped>

.world-view {
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  color: var(--color-text);
}


/* STATES */
.state-card {
  min-height: 420px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 40px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  background: var(--color-surface);

  text-align: center;
}

.state-card h1 {
  margin: 18px 0 6px;

  font-family: var(--font-title);
}

.state-card p {
  max-width: 420px;
  margin: 0 0 22px;

  color: var(--color-text-muted);
}

.state-card-error {
  border-color: var(--color-border);
}

.state-card-error button {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;
  padding: 4px 8px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);

  background-color: var(--color-surface);
  color: var(--color-text);

  transition: border-color 0.2s ease;
}

.state-card-error button:hover {
  border-color: var(--color-border-hover);
}

.state-icon {
  width: 58px;
  height: 58px;

  display: grid;
  place-items: center;

  border-radius: 50%;

  background: var(--color-accent);
  color: var(--color-bg);
}

.loading-spinner {
  width: 38px;
  height: 38px;

  border: 3px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;

  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* WORLD HEADER */
.header {
  position: relative;

  min-height: 330px;

  overflow: hidden;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  background: var(--color-surface);
}

.header-image {
  position: absolute;
  inset: 0;

  overflow: hidden;
}

.header-image img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  opacity: 0.42;

  filter: saturate(0.8);
}

.header-image-overlay {
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      90deg,
      var(--color-surface) 0%,
      transparent 30%,
      transparent 70%,
      var(--color-surface) 100%
      ),
    linear-gradient(
      0deg,
      var(--color-surface) 0%,
      transparent 30%,
      transparent 70%,
      var(--color-surface) 100%
      );
}

.header-content {
  position: relative;
  z-index: 1;

  min-height: 330px;

  padding: 30px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.breadcrumb {
  display: flex;
  align-items: center;

  gap: 4px;

  margin-bottom: 20px;

  color: var(--color-text-muted);
  font-size: 0.8rem;
}

.breadcrumb button {
  padding: 0;

  border: 0;
  background: transparent;

  color: var(--color-text-muted);

  cursor: pointer;
}

.breadcrumb button:hover {
  color: var(--color-accent);
}

.world-title-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 10px;
}

.world-type {
  display: inline-flex;

  margin-bottom: 10px;
  padding: 4px 10px;

  border: 1px solid var(--color-accent);
  border-radius: 999px;

  color: var(--color-accent);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.world-title-row h1 {
  margin: 0;

  font-family: var(--font-title);
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 1;
}

.world-description {
  max-width: 680px;

  margin: 20px 0;

  color: var(--color-text);

  font-size: 0.9rem;
  line-height: 1.5;
}

.world-description-empty {
  color: var(--color-text-muted);
  font-style: italic;
}

.world-meta {
  display: flex;
  flex-wrap: wrap;

  gap: 20px;

  color: var(--color-text-muted);

  font-size: 0.8rem;
}

.world-meta span {
  display: inline-flex;
  align-items: center;

  gap: 4px;
}

.world-edit-button {
  display: inline-flex;
  align-items: center;

  flex: 0 0 auto;

  gap: 10px;

  padding: 9px 13px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);

  background: var(--color-surface);

  color: var(--color-text);

  cursor: pointer;

  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.world-edit-button:hover {
  border-color: var(--color-border-hover);
  background: var(--color-surface-light);
}

/* SECTIONS */
.section {
  margin-top: 30px;
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  margin-bottom: 15px;
}

.section-heading h2 {
  margin: 0;
}

.section-heading p {
  margin: 5px 0 0;

  color: var(--color-text-muted);

  font-size: 0.85rem;
}

/* STATS */
.stats-grid {
  display: flex;
  justify-content: space-between;

  gap: 10px;
}

.stat-card {
  display: flex;
  align-items: center;

  min-height: 90px;
  min-width: 250px;
  width: 400px;
  padding: 15px;
  gap: 10px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  background: var(--color-surface);

  transition: transform 0.2s ease, border-color 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-border-hover);
}

.stat-card-icon {
  width: 40px;
  height: 40px;

  display: grid;
  place-items: center;

  flex: 0 0 40px;

  border-radius: var(--radius-sm);

  background: color-mix(
    in srgb,
    var(--color-accent) 15%,
    var(--color-surface)
  );

  color: var(--color-accent);
}

.stat-card span {
  display: block;

  margin-bottom: 3px;

  color: var(--color-text-muted);

  font-size: 0.8rem;
}

.stat-card strong {
  font-size: 1.3rem;

  color: var(--color-text);
}

/* QUICK ACTIONS */
.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 10px;
}

.quick-action-card {
  display: flex;
  align-items: center;

  gap: 10px;
  min-height: 90px;
  padding: 15px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  background: var(--color-surface);

  color: var(--color-text);
  text-align: left;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.quick-action-card:hover {
  transform: translateY(-2px);

  border-color: var(--color-border-hover);

  background: var(--color-surface-light);
}

.quick-action-icon {
  width: 40px;
  height: 40px;

  display: grid;
  place-items: center;

  flex: 0 0 40px;

  border-radius: var(--radius-sm);

  background: var(--color-accent);

  color: var(--color-bg);
}

.quick-action-content {
  min-width: 0;
}

.quick-action-content h3 {
  margin: 0 0 4px;

  font-size: 1rem;
}

.quick-action-content p {
  margin: 0;

  color: var(--color-text-muted);

  font-size: 0.8rem;
  line-height: 1.5;
}

.quick-action-arrow {
  margin-left: auto;

  flex: 0 0 auto;

  color: var(--color-text-muted);

  transition:
    transform 0.2s ease,
    color 0.2s ease;
}

.quick-action-card:hover .quick-action-arrow {
  transform: translateX(2px);

  color: var(--color-accent);
}

/* ACTIVITY */
.activity-card {
  display: flex;
  align-items: center;

  gap: 10px;
  min-height: 100px;
  padding: 20px;

  border: 1px dashed var(--color-border);
  border-radius: var(--radius-lg);

  background: var(--color-surface);
}

.activity-empty-icon {
  width: 40px;
  height: 40px;

  display: grid;
  place-items: center;

  flex: 0 0 40px;

  border-radius: 50%;

  background: var(--color-surface-light);

  color: var(--color-accent);
}

.activity-card strong {
  display: block;

  margin-bottom: 4px;
}

.activity-card p {
  margin: 0;

  color: var(--color-text-muted);

  font-size: 0.8rem;
}

/* CTA */
.world-cta {
  display: flex;
  align-items: center;

  gap: 10px;
  margin-top: 30px;
  margin-bottom: 10px;
  padding: 20px;

  border: 1px solid var(--color-border);

  border-radius: var(--radius-lg);

  background:
    linear-gradient(
      120deg,
      color-mix(in srgb, var(--color-accent) 15%, var(--color-surface)),
      var(--color-surface));
}

.world-cta-icon {
  width: 40px;
  height: 40px;

  display: grid;
  place-items: center;

  flex: 0 0 40px;

  border-radius: var(--radius-sm);

  background: var(--color-accent);

  color: var(--color-bg);
}

.world-cta h2 {
  margin: 0 0 4px;

  font-size: 1rem;
}

.world-cta p {
  margin: 0;

  color: var(--color-text-muted);

  font-size: 0.8rem;
}

.world-cta button {
  display: inline-flex;
  align-items: center;

  margin-left: auto;
  padding: 8px 10px;

  border: 1px solid var(--color-accent);
  border-radius: var(--radius-sm);

  background: var(--color-accent);

  color: var(--color-bg);
  font-weight: 700;

  cursor: pointer;

  white-space: nowrap;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.world-cta button:hover {
  background: var(--color-accent-hover);
  border-color: var(--color-accent-hover);
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .stats-grid {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  .stat-card {
    min-width: 33%;
  }

  .world-header-content {
    padding: 30px;
  }
}

@media (max-width: 700px) {
  .world-header {
    min-height: 390px;
  }

  .world-header-content {
    min-height: 390px;

    padding: 24px;
  }

  .world-title-row {
    gap: 10px;
  }

  .world-edit-button {
    align-self: flex-start;
  }

  .quick-actions-grid {
    grid-template-columns: 1fr;
  }

  .world-cta {
    align-items: flex-start;

    flex-wrap: wrap;
  }

  .world-cta button {
    margin-left: 0;
  }
}

@media (max-width: 500px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .world-header {
    min-height: 430px;
  }

  .world-header-content {
    min-height: 430px;

    padding: 20px;
  }

  .world-meta {
    flex-direction: column;

    gap: 8px;
  }

  .world-title-row h1 {
    font-size: 2rem;
  }
}
</style>
