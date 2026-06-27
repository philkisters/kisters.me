<template>
  <div v-if="!hidden" class="project-summary">
    <slot />
  </div>
</template>

<script setup lang="ts">
  const hidden = inject('hideProjectSummary', false)
</script>
