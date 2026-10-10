<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { X, Check, Save, Plus, Sparkles } from 'lucide-vue-next'

import { worldTypes } from '@/data/worldType'

const props = defineProps({
  world: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close', 'submit'])

const isEditMode = computed(() => props.world !== null)

const worldName = ref('')
const worldDescription = ref('')
const selectedWorldType = ref('Low fantasy')

const projectTypes = worldTypes

const isValid = computed(() => {
  return worldName.value.trim().length > 0
})

function initializeForm() {
  if (props.world) {
    worldName.value = props.world.name || ''
    worldDescription.value = props.world.description || ''
    selectedWorldType.value = props.world.type || 'Low fantasy'
  } else {
    worldName.value = ''
    worldDescription.value = ''
    selectedWorldType.value = 'Low fantasy'
  }
}

function selectType(type) {
  selectedWorldType.value = type.name
}

function closeModal() {
  emit('close')
}

function handleEscape(event) {
  if (event.key === 'Escape') {
    closeModal()
  }
}

function submitForm() {
  if (!isValid.value) {
    return
  }

  emit('submit', {
    ...(props.world?.id ? { id: props.world.id } : {}),
    name: worldName.value.trim(),
    description: worldDescription.value.trim(),
    type: selectedWorldType.value,
  })
}

watch(
  () => props.world,
  () => {
    initializeForm()
  },
  { immediate: true }
)

let previousBodyOverflow = ''

onMounted(() => {
  previousBodyOverflow = document.body.style.overflow
  document.addEventListener('keydown', handleEscape)
  document.body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = previousBodyOverflow
})
</script>

<template>
  <Teleport to="body">
    <div
      class="modal-overlay"
      @mousedown.self="closeModal">
      <section
        class="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="world-form-title">
        <!-- HEADER -->
        <header class="modal-header">
          <div class="header-title">
            <div class="header-icon">
              <Sparkles :size="18" />
            </div>

            <div>
              <h2>
                {{ isEditMode ? 'Modifier le monde' : 'Créer un monde' }}
              </h2>

              <p>
                {{
                  isEditMode
                    ? 'Modifiez les informations principales de votre univers.'
                    : 'Créez les bases de votre nouvel univers.'
                }}
              </p>
            </div>
          </div>

          <button
            class="close-button"
            type="button"
            aria-label="Fermer"
            @click="closeModal"
          >
            <X :size="18" />
          </button>
        </header>

        <div class="modal-content">
          <!-- NOM -->
          <div class="form-group">
            <label for="world-name">
              Nom de l'univers
              <span>*</span>
            </label>

            <input
              id="world-name"
              v-model="worldName"
              type="text"
              maxlength="80"
              placeholder="Ex. Les Royaumes d'Eldoria"
              autocomplete="off"
            />

            <div class="input-footer">
              <small>
                Le nom de votre univers.
              </small>

              <small>
                {{ worldName.length }}/80
              </small>
            </div>
          </div>

          <!-- TYPE -->
          <div class="form-group">
            <label>
              Type d'univers
            </label>

            <div class="type-grid">
              <button
                v-for="type in projectTypes"
                :key="type.name"
                class="type-card"
                :class="{ selected: selectedWorldType === type.name }"
                type="button"
                @click="selectType(type)"
              >
                <div class="type-image">
                  <img
                    :src="type.image"
                    :alt="type.name"
                  />

                  <div
                    v-if="selectedWorldType === type.name"
                    class="selected-icon"
                  >
                    <Check :size="14" />
                  </div>
                </div>

                <div class="type-content">
                  <strong>
                    {{ type.name }}
                  </strong>

                  <span>
                    {{ type.description }}
                  </span>
                </div>
              </button>
            </div>
          </div>

          <!-- DESCRIPTION -->
          <div class="form-group">
            <label for="world-description">
              Description

              <span class="optional">
                (optionnel)
              </span>
            </label>

            <textarea
              id="world-description"
              v-model="worldDescription"
              maxlength="500"
              rows="4"
              placeholder="Décrivez brièvement votre univers..."
            ></textarea>

            <div class="input-footer">
              <small>
                Décrivez brièvement votre univers.
              </small>

              <small>
                {{ worldDescription.length }}/500
              </small>
            </div>
          </div>
        </div>

        <footer class="modal-footer">
          <button
            class="cancel-button"
            type="button"
            @click="closeModal"
          >
            Annuler
          </button>

          <button
            class="save-button"
            type="button"
            :disabled="!isValid"
            @click="submitForm"
          >
            <Save
              v-if="isEditMode"
              :size="18"
            />

            <Plus
              v-else
              :size="18"
            />

            {{ isEditMode ? 'Enregistrer' : 'Créer le monde' }}
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
  flex: 0 0 35px;

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

  background-color: transparent;
  color: var(--color-text-muted);

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

  background: linear-gradient(
    90deg,
    transparent 70%,
    var(--color-bg) 100%);
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

.cancel-button, .save-button {
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
  border: 2px solid var(--color-border);

  background-color: transparent;
  color: var(--color-text);
}

.cancel-button:hover {
  background-color: var(--color-surface-light);
  border-color: var(--color-border-hover);
  transform: translateY(-2px);
}

.save-button {
  gap: 10px;

  background-color: var(--color-accent);
  border: 2px solid var(--color-accent);
  color: black;
}

.save-button:hover:not(:disabled) {
  border-color: var(--color-border-hover);
  transform: translateY(-2px);
}

.save-button:disabled {
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
  .save-button {
    flex: 1;
  }
}
</style>
