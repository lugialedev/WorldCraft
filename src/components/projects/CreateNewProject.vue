<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { X, Plus, Check, Sparkles } from 'lucide-vue-next';

import médiévalFantasyImage from '@/assets/images/projects/médiévalFantasy.png'
import steampunkFantasyImage from '@/assets/images/projects/steampunkFantasy.png'
import murimImage from '@/assets/images/projects/murim.png'
import postApoImage from '@/assets/images/projects/postApo.png'
import scienceFictionImage from '@/assets/images/projects/scienceFiction.png'

const emit = defineEmits(['close', 'create'])

const projectName = ref('')
const projectDescription = ref('')
const projectType = ref('Fantasy')
const projectImage = ref(médiévalFantasyImage)

const projectTypes = [
  {
    name: 'Médiéval fantasy',
    description: 'Magie, royaume, créatures...',
    image: médiévalFantasyImage,
  },
  {
    name: 'Murim',
    description: 'Arts martiaux, clans, sectes...',
    image: murimImage,
  },
  {
    name: 'Steampunk',
    description: 'Magie, artefact, revolution industrielle...',
    image: steampunkFantasyImage,
  },
  {
    name: 'Post-apocalypse',
    description: 'Ruine, survie, reconstruction...',
    image: postApoImage,
  },
  {
    name: 'Cyberpunk',
    description: 'Ruine, survie, reconstruction...',
    image: postApoImage,
  },
  {
    name: 'Science-fiction',
    description: 'Espace, technologie, civilisation...',
    image: scienceFictionImage,
  },
]

const isValid = computed(() => {
  return projectName.value.trim().length > 0
})

function selectType(type) {
  projectType.value = type.name
  projectImage.value = type.image
}

function closeModal() {
  emit('close')
}

function handleEscape(event) {
  if (event.key === 'Escape') {
    closeModal()
  }
}

function createProject() {
  if (!isValid.value) {
    return
  }

  emit('create', {
    name:projectName.value.trim(),
    description: projectDescription.value.trim(),
    type: projectType.value,
    image: projectImage.value,
  })
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)

  //empeche le scroll de la page derriere la modale
  document.body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscape)

  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @mousedown.self="closeModal">
      <section class="modal" role="dialog" aria-modal="true" aria-labelledby="create-project-title">
        <!-- HEADER -->
        <header class="modal-header">

          <div class="header-title">
            <div class="header-icon">
              <Sparkles :size="18" />
            </div>

            <div>
              <h2 id="create-project-title">
                Nouveau projet
              </h2>

              <p>
                Commencer à construire votre nouvel univers.
              </p>
            </div>
          </div>

          <button class="close-button" type="button" aria-label="Fermer" @click="closeModal">
            <X :size="18" />
          </button>
        </header>

         <!-- CONTENT -->
        <div class="modal-content">
          <!-- NOM -->
          <div class="form-group">
            <label for="project-name">
              Nom de l'univers
              <span>*</span>
            </label>

            <input id="project-name" v-model="projectName" type="text" maxlength="80" placeholder="Ex. Les Royaumes d'Eldoria" autocomplete="off" />

            <div class="input-footer">
              <small>Donnez un nom à votre univers.</small>

              <small>{{ projectName.length }}/80</small>
            </div>
          </div>

          <!-- TYPE -->
          <div class="form-group">
            <label>
              Type d'univers
            </label>

            <div class="type-grid">
              <button v-for="type in projectTypes" :key="type.name" class="type-card" :class="{selected: projectType === type.name,}" type="button" @click="selectType(type)">
                <div class="type-image">
                  <img :src="type.image" :alt="type.name" />

                  <div v-if="projectType === type.name" class="selected-icon">
                    <Check :size="14" />
                  </div>
                </div>

                <div class="type-content">
                  <strong>{{ type.name }}</strong>

                  <span>{{ type.description }}</span>
                </div>
              </button>
            </div>
          </div>

          <!-- DESCRIPTION -->
          <div class="form-group">
            <label for="project-description">
              Description

              <span class="optional">
                (optionnel)
              </span>
            </label>

            <textarea id="project-description" v-model="projectDescription" maxlength="500" rows="4" placeholder="Décrivez brièvement votre univers..."></textarea>

            <div class="input-footer">
              <small>Vous pourrez modifier cette description plus tard.</small>

              <small>{{ projectDescription.length }}/500</small>
            </div>
          </div>
        </div>

        <!-- FOOTER -->
        <footer class="modal-footer">
          <button class="cancel-button" type="button" @click="closeModal">
            Annuler
          </button>

          <button class="create-button" type="button" :disabled="!isValid" @click="createProject">
            <Plus :size="18" />
            Créer le projet
          </button>
        </footer>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background-color: var(--color-modal);
  backdrop-filter: blur(5px);

  animation: overlay-in 0.2s ease-out;
}

/* MODAL */
.modal {
  width: min(720px, 100%);
  max-height: min(850px, calc(100vh - 40px));

  display: flex;
  flex-direction: column;

  overflow: hidden;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  background-color: var(--color-surface);

  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.5), 0 0 1px rgba(255, 255, 255, 0.05);

  animation: modal-in 0.2s ease-out;
}

/* HEADER */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 10px;

  padding: 20px;

  border-bottom: 1px solid var(--color-border);
}

.header-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon {
  display: grid;
  place-items: center;

  width: 35px;
  height: 35px;
  flex: 0 0 40px;

  border-radius: var(--radius-sm);

  background-color: var(--color-accent);
  color: black;
}

.modal-header h2 {
  margin: 0;

  font-family: var(--font-title);
  font-size: 1.4rem;
  font-weight: 600;
}

.modal-header p {
  margin: 4px 0 0;

  color: var(--color-text-muted);
  font-size: 0.8rem;
}

.close-button {
  display: grid;
  place-items: center;

  width: 37px;
  height: 37px;
  flex: 0 0 37px;

  padding: 0;

  border: 1px solid transparent;
  border-radius: var(--radius-sm);

  background-color: var(--color-text-muted);

  cursor: pointer;

  transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

.close-button:hover {
  border-color: var(--color-border);
  background-color: var(--color-surface-light);
  color: var(--color-text);
}

/* CONTENT */
.modal-content {
  overflow-y: auto;

  padding: 20px;
}

.form-group + .form-group {
  margin-top: 20px;
}

.form-group > label {
  display: block;

  margin-bottom: 10px;

  color: var(--color-text);

  font-size: 0.9rem;
  font-weight: 600;
}

.form-group > label > span {
  color: var(--color-accent);
}

.form-group > label .optional {
  color: var(--color-text-muted);
  font-size: 0.8rem;
  font-weight: 400;
}

/* INPUT */
input, textarea {
  width: 100%;
  box-sizing: border-box;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);

  background-color: var(--color-bg);

  color: var(--color-text);
  font-family: inherit;
  font-size: 0.9rem;

  outline: none;

  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

input {
  height: 40px;
  padding: 0 12px;
}

textarea {
  min-height: 100px;
  padding: 12px;

  resize: vertical;
  line-height: 1.5;
}

input::placeholder, textarea::placeholder {
  color: var(--color-text-muted);
}

input:focus, textarea:focus {
  border-color: var(--color-accent);

  box-shadow: 0 0 0 3px rgba(211, 155, 79, 0.1);
}

.input-footer {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 4px;
}

.input-footer small {
  color: var(--color-text-muted);
  font-size: 0.7rem;
}

/* TYPES */
.type-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.type-card {
  position: relative;

  display: flex;
  align-items: center;

  min-width: 0;
  padding: 0;

  overflow: hidden;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);

  background-color: var(--color-bg);
  color: var(--color-text);

  text-align: left;

  cursor: pointer;

  transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
}

.type-card:hover {
  border-color: var(--color-border-hover);
  background-color: var(--color-surface-light);
  transform: translateY(-2px);
}

.type-card.selected {
  border-color: var(--color-accent);

  box-shadow: 0 0 0 1px var(--color-accent);
}

.type-image {
  position: relative;

  width: 85px;
  height: 75px;
  flex: 0 0 85px;

  overflow: hidden;
}

.type-image::after {
  content: '';

  position: absolute;
  inset: 0;

  background-color: linear-gradient(90deg, transparent 50%, var(--color-bg) 100%);
}

.type-image img {
  width: 100%;
  height: 100%;

  object-fit: cover;
}

.selected-icon {
  position: absolute;
  top: 4px;
  left: 4px;
  z-index: 2;

  display: grid;
  place-items: center;

  width: 20px;
  height: 20px;

  border-radius: 50%;

  background-color: var(--color-accent);
  color: black;
}

.type-content {
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 10px;

  padding: 10px 10px 10px 4px;
}

.type-content strong {
  font-size: 0.8rem;
  font-weight: 600;
}

.type-content span {
  color: var(--color-text-muted);
  font-size: 0.7rem;
  line-height: 1.4;
}

/* FOOTER */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  gap: 10px;
  padding: 16px 20px;

  border-top: 1px solid var(--color-border);
}

.cancel-button, .create-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 40px;

  padding: 0 16px;

  border-radius: var(--radius-sm);

  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;

  cursor: pointer;

  transition: transform 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
}

.cancel-button {
  border: 1px solid var(--color-border);

  background-color: transparent;
  color: var(--color-text);
}

.cancel-button:hover {
  background-color: var(--color-surface-light);
  border-color: var(--color-border-hover);
}

.create-button {
  gap: 10px;

  border: 1px solid var(--color-accent);
  color: black;
}

.create-button:hover:not(:disabled) {
  background-color: var(--color-accent-hover);
  transform: translateY(-2px);
}

.create-button:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

/* ANIMATION */
@keyframes overlay-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* RESPONSIVE */
@media (max-width: 600px) {
  .modal-overlay {
    align-items: flex-end;
    padding: 0;
  }

  .modal {
    width: 100%;
    max-height: 92vh;

    border-radius: 14px 14px 0 0;
  }

  .modal-header {
    padding: 16px;
  }

  .modal-content {
    padding: 20px 16px;
  }

  .modal-footer {
    padding: 14px 16px;
  }

  .type-grid {
    grid-template-columns: 1fr;
  }

  .type-image {
    width: 95px;
    height: 70px;
    flex-basis: 95px;
  }

  .modal-footer {
    justify-content: stretch;
  }

  .cancel-button,
  .create-button {
    flex: 1;
  }
}
</style>
