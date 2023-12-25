<script setup>
import { RouterView } from 'vue-router';
import AdminNavbar from '../../components/admin-navbar.vue';
</script>

<template>
  <AdminNavbar />

  <div class="pt-32 container mx-auto lg:min-h-screen pb-10">
    <RouterView />
  </div>
</template>
