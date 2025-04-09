<template>
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="bg-gray-100 py-2 px-10 border-gray-200 border-b-2">
      <button :id="`accordion-title-${id}`"
              class="flex items-center justify-between w-full text-left font-semibold py-2"
              @click.prevent="toggleAccordion"
              :aria-expanded="accordionOpen" :aria-controls="`accordion-text-${id}`">
        <span>{{ title }}</span>
        <svg class="fill-customSlate shrink-0 ml-8" width="16" height="16"
             xmlns="http://www.w3.org/2000/svg">
          <rect y="7" width="16" height="2" rx="1"
                class="transform origin-center transition duration-200 ease-out"
                :class="{ '!rotate-180': accordionOpen }" />
          <rect y="7" width="16" height="2" rx="1"
                class="transform origin-center rotate-90 transition duration-200 ease-out"
                :class="{ '!rotate-180': accordionOpen }" />
        </svg>
      </button>
    </h2>
    <div :id="`accordion-text-${id}`" role="region"
         :aria-labelledby="`accordion-title-${id}`"
         class="grid text-sm text-slate-600 overflow-hidden transition-all duration-300 ease-in-out"
         :class="accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
      <div class="overflow-hidden px-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  title: string
  id: string
  active?: boolean
}>()

const emit = defineEmits(['update:active'])

const accordionOpen = ref(props.active || false)

watch(() => props.active, (newVal) => {
  accordionOpen.value = newVal
})

const toggleAccordion = () => {
  accordionOpen.value = !accordionOpen.value
  emit('update:active', accordionOpen.value)
}
</script>
