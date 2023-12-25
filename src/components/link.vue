<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  to: {
    type: String,
    required: true
  }
})
</script>
<template>
  <RouterLink
    :to="{ name: to }"
    class="rounded-lg bg-green-400 hover:bg-green-500 transition-colors p-3"
  >
    <slot />
  </RouterLink>
</template>
