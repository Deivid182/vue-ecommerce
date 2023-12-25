<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
  <div>
    <RouterLink :to="{ name: 'home' }" class="text-3xl text-white font-bold p-2">
      Vue<span class="text-green-400">Store</span>
    </RouterLink>
  </div>
</template>
