<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  Plus,
  Play,
  FolderOpen,
  Link2,
  Lightbulb,
  Bot,
  ShieldCheck,
  Users,
  FileText,
  ChevronRight,
  MoreVertical,
  InfinityIcon,
  Sparkles
} from 'lucide-vue-next';

import CreateNewProject from '@/components/projects/CreateNewProject.vue';

import médiévalFantasyImage from '@/assets/images/projects/médiévalFantasy.png'
import murimImage from '@/assets/images/projects/murim.png'
import postApoImage from '@/assets/images/projects/postApo.png'
import scienceFictionImage from '@/assets/images/projects/scienceFiction.png'

const router = useRouter()

const isCreateProjectModalOpen = ref(false)

const projects = ref([
  {
    id: 1,
    name: 'Fantasia',
    type: 'Fantasy',
    updated: 'il y a 5 min',
    image: médiévalFantasyImage,
    stats: {
      character: 30,
      locations: 30,
      notes: 30,
    },
  },
  {
    id: 2,
    name: 'Murim',
    type: 'Murim',
    updated: 'il y a 5 heures',
    image: murimImage,
    stats: {
      character: 30,
      locations: 30,
      notes: 30,
    },
  },
  {
    id: 3,
    name: 'Post-apocalypse',
    type: 'Post-apo',
    updated: 'il y a 5 jours',
    image: postApoImage,
    stats: {
      character: 30,
      locations: 30,
      notes: 30,
    },
  },
  {
    id: 4,
    name: 'Science-fiction',
    type: 'SF',
    updated: 'il y a 5 mois',
    image: scienceFictionImage,
    stats: {
      character: 30,
      locations: 30,
      notes: 30,
    },
  },
])

const features = [
  {
    icon: FolderOpen,
    title: 'Tout centralisé',
    description: 'Organisez chaque élément de votre univers au même endroit.',
  },
  {
    icon: Link2,
    title: 'Liens et cohérence',
    description: 'Reliez vos idées entre elles pour des mondes profonds et cohérents.',
  },
  {
    icon: Lightbulb,
    title: 'Libérez votre créativité',
    description: 'Des outils puissants pour vous concentrer sur ce qui compte.'
  },
  {
    icon: Bot,
    title: 'Assistant IA',
    description: 'Obtenez de l\'aide et surmontez le syndrome de la page blanche.'
  },
  {
    icon: ShieldCheck,
    title: 'Privé et sécurisé',
    description: 'Vos données sont chiffrées et sécurisées'
  }
]

function openCreateProjectModal() {
  isCreateProjectModalOpen.value = true
}

function closeCreateProjectModal() {
  isCreateProjectModalOpen.value = false
}

function createProject(project) {
  const newProject = {
    id: Date.now(),
    name: project.name,
    type: project.type,
    updated: 'à l\'instant',
    image: project.image,
    description: project.description,
    stats: {
      character: 0,
      location: 0,
      notes: 0,
    },
  }

  projects.value.unshift(newProject)

  isCreateProjectModalOpen.value = false
}

function openProject(projects) {
  router.push({
    name: 'world',
    params: {
      worldId: projects.id,
    },
  })
}
</script>

<template>
  <main class="home">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1>
            Créer des <span class="h1_accent">mondes</span><br>
            Donnez-leur <span class="h1_accent">vie</span>
          </h1>

          <p class="hero-description">
            WorldCraft est votre atelier complet pour imaginer, organiser et
            développer divers univers de fictions aussi sublimes qu'inoubliables.
          </p>

          <div class="hero-actions">
            <button
              class="button button-primary"
              type="button"
              @click="openCreateProjectModal"
            >
              <Plus :size="18" />
              Nouveau projet
            </button>

            <button
              class="button button-secondary"
              type="button"
            >
              <Play :size="18" />
              Découvrir WorldCraft
            </button>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-image">
            <img
              src="../assets/images/home/bureau_cartographe.png"
              alt="Atelier de création d'univers"
            />
          </div>
        </div>
      </div>
    </section>

    <!--  STATISTIQUE  -->
    <section class="stats">
      <div class="stat">
        <span class="stat-icon">
          <Users :size="18" />
        </span>

        <div>
          <strong>+300k</strong><br />
          <span> d'utilisateur</span>
        </div>
      </div>

      <div class="stat">
        <span class="stat-icon">
          <FolderOpen :size="18" />
        </span>

        <div>
          <strong>+50M</strong><br />
          <span> projets</span>
        </div>
      </div>

      <div class="stat">
        <span class="stat-icon">
          <FileText :size="18" />
        </span>

        <div>
          <strong>+30k</strong><br />
          <span> assets gratuit</span>
        </div>
      </div>

      <div class="stat">
        <span class="stat-icon">
          <Sparkles :size="18" />
        </span>

        <div>
          <strong>
            <InfinityIcon :size="18" />
          </strong><br />
          <span> possibilités</span>
        </div>
      </div>
    </section>

    <!--  PROJETS  -->
    <section class="projects">
      <div class="project-heading">
        <div>
          <h2>Mes projets récents</h2>
          <p>Reprenez rapidement là où vous vous êtes arrêté.</p>
        </div>

        <button
          class="project-link"
          type="button"
          @click="router.push({name: 'dashboard'})"
        >
          Voir tous mes projets
          <ChevronRight :size="18" />
        </button>
      </div>

      <div class="projects-grid">
        <article
          v-for="project in projects"
          :key="project.id"
          class="project-card"
          @click="openProject(project)"
        >
          <div class="project-image">
            <img :src="project.image" :alt="project.type" @error="$event.target.style.display = 'none'" />

            <div class="project-overlay"></div>

            <button class="project-menu" type="button" aria-label="Option du projet" @click.stop>
              <MoreVertical :size="18" />
            </button>
          </div>

          <div class="project-content">
            <h3>{{ project.name }}</h3>
            <p class="project-updated">Mis à jour {{ project.updated }}</p>

            <div class="project-stats">
              <span>
                <Users :size="14" />
                {{ project.stats.character }}
              </span>

              <span>
                <FolderOpen :size="14" />
                {{ project.stats.locations }}
              </span>

              <span>
                <FileText :size="14" />
                {{ project.stats.notes }}
              </span>
            </div>
          </div>
        </article>

        <!--  NOUVEAU PROJET  -->
        <button class="new-project-card" type="button" @click="openCreateProjectModal">
          <span class="new-project-icon">
            <Plus :size="38" />
          </span>

          <strong>Nouveau projet</strong>
          <span>Créer un univers</span>
        </button>
      </div>
    </section>

    <!--  FEATURE  -->
    <section class="features">
      <article v-for="feature in features" :key="feature.title" class="feature-card">
        <div class="feature-icon">
          <component :is="feature.icon" :size="18" />
        </div>

        <div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </article>
    </section>

    <!--  CTA  -->
    <section class="bottom-cta">
      <span>Prêt à commencer votre prochain chef-d'oeuvre ?</span>

      <button type="button" @click="openCreateProjectModal">
        Créer un projet
        <Plus :size="18" />
      </button>
    </section>
  </main>

  <CreateNewProject v-if="isCreateProjectModalOpen" @close="closeCreateProjectModal" @create="createProject" />
</template>

<style scoped>
.home {
  width: 100%;
  max-width: 1500px;
  margin: 0 5px;
  color: var(--color-text);
}

/* HERO */
.hero {
  margin-bottom: 24px;
}

.hero-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(360px, 0.9fr);
  min-height: 300px;
  gap: 10px;
  align-items: center;
}

.hero-text {
  padding: 20px 0;
}

.hero h1 {
  margin: 0;

  font-family: var(--font-title);
  line-height: 1.02;
  color: var(--color-text);
}

.hero h1 span {
  color: var(--color-accent);
}

.hero-description {
  max-width: 650px;
  margin: 12px 0 24px;

  color: var(--color-text);
  font-size: 1rem;
  line-height: 1.55;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  min-height: 40px;
  padding: 0 18px;

  border-radius: var(--radius);
  border: 1px solid var(--color-border);

  font-weight: 700;

  transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
}

.button-primary {
  background-color: var(--color-accent);
  color: var(--color-bg);
  border: 1px solid var(--color-accent);
}

.button-primary:hover {
  border: 1px solid var(--color-accent-hover);
}

.button-secondary {
  background-color: transparent;
  color: var(--color-text);
}

.button-secondary:hover {
  background-color: var(--color-surface-light);
  border-color: var(--color-border-hover);
}

.hero-visual {
  height: 100%;
  min-height: 270px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.hero-image {
  position: relative;
  width: 100%;
  max-width: 464px;
  max-height: 250px;

  overflow: hidden;

  border-radius: var(--radius-lg);
}

.hero-image::after {
  content: '';
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

  pointer-events: none;
}

.hero-image img {
  width: 100%;
  height: 100%;

  object-fit: cover;
}

/* STATS */
.stats  {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  margin-bottom: 35px;
  max-width: 800px;

  overflow: hidden;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  background-color: var(--color-surface);
}

.stat {
  display: flex;
  align-items: center;

  gap: 10px;

  min-height: 64px;
  padding: 15px 10px;

  border-right: 1px solid var(--color-border);
}

.stat:last-child {
  border-right: 0;
}

.stat-icon {
  margin-right: 5px;

  display: grid;
  place-items: center;
  width: 35px;
  height: 35px;
  flex: 0 0 35px;
  border-radius: 5px;
  background: var(--color-accent);
  color: #101010;
}

.stat strong {
  color: var(--color-accent);
  font-size: 1rem;
}

.stat div>span {
  color: var(--color-text);
  font-size: 0.9rem;
}

/* Projets */
.projects {
  margin-bottom: 24px;
}

.project-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
}

.project-heading h2 {
  margin: 0;
}

.project-heading p {
  margin: 4px 0 0;

  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.project-link {
  display: inline-flex;
  align-items: center;

  gap: 10px;
  padding: 8px 10px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: transparent;

  color: var(--color-accent);
  font-size: 0.9rem;

  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.project-link:hover {
  border-color: var(--color-border-hover);
  background-color: var(--color-surface-light);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
}

.project-card,
.new-project-card {
  min-width: 0;
  min-height: 195px;

  overflow: hidden;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.project-card {
  cursor: pointer;

  text-align: left;

  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
}

.project-card:hover {
  transform: translateY(-3px);
  border-color: var(--color-border-hover);
}

.project-image {
  position: relative;
  height: 112px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-overlay {
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

.project-menu {
  position: absolute;
  top: 8px;
  right: 7px;

  display: grid;
  place-items: center;

  width: 30px;
  height: 30px;
  padding: 0;

  border: 0;
  border-radius: 50%;

  background: rgba(8, 13, 22, 0.65);

  color: white;
}

.project-content {
  padding: 10px 12px;
}

.project-content h3 {
  margin: 0;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
}

.project-updated {
  margin: 2px 0 9px;
  color: var(--color-text-muted);
  font-size: 0.78rem;
}
.stat-icon
.project-stats {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-text);
  font-size: 0.75rem;
}

.project-stats span {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  margin-right: 14px;
}

.new-project-card {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  flex-direction: column;
  padding: 20px;
  color: var(--color-text);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.new-project-card:hover {
  transform: translateY(-3px);
  border-color: var(--color-border-hover);
  background: var(--color-surface-light);
}

.new-project-icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin-bottom: 5px;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-accent);
}

.new-project-card strong {
  font-size: 1rem;
  font-weight: 500;
}

.new-project-card > span:last-child {
  color: var(--color-text-muted);
  font-size: 0.8rem;
}

/* FEATURES */
.features {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-top: 18px;
}

.feature-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-height: 110px;
  padding: 15px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.feature-icon {
  display: grid;
  place-items: center;
  width: 35px;
  height: 35px;
  flex: 0 0 35px;
  border-radius: 5px;
  background: var(--color-accent);
  color: #101010;
}

.feature-card h3 {
  margin: 0 0 5px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
}

.feature-card p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.76rem;
  line-height: 1.45;
}

/* Call To Action (CTA) */
.bottom-cta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 26px 0 4px;
  padding: 4px;
  font-size: 0.95rem;
}

.bottom-cta span {
  color: var(--color-text);
}

.bottom-cta button {
  display: inline-flex;
  align-items: center;

  gap: 10px;
  padding: 4px 8px;

  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-accent);

  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.bottom-cta button:hover {
  border-color: var(--color-border);
  background-color: var(--color-surface-light);
}

/* RESPONSIVE */
@media (max-width: 1200px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .features {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .hero-content {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    display: none;
  }

  .stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat:nth-child(2) {
    border-right: 0;
  }

  .stat:nth-child(-n + 2) {
    border-bottom: 1px solid var(--color-border);
  }
}

@media (max-width: 650px) {
  .hero-text {
    padding-left: 0;
  }

  .hero h1 {
    font-size: 2.2rem;
  }

  .stats,
  .projects-grid,
  .features {
    grid-template-columns: 1fr;
  }

  .stats {
    max-width: 450px;
  }

  .stat {
    border-right: 0;
    border-bottom: 1px solid var(--color-border);
  }

  .stat:last-child {
    border-bottom: 0;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .bottom-cta {
    flex-direction: column;
    text-align: center;
  }
}
</style>
