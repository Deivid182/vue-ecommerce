<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useProductsStore } from '../stores/products';
import Link from './link.vue';
import Logo from './logo.vue';

const productsStore = useProductsStore()
</script>

<template>
  <header
    class="px-4 lg:px-10 py-5 bg-gray-700 flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between lg:items-center w-full fixed top-0 z-20"
  >
    <div class="space-y-3">
      <Logo />
      <div class="flex lg:items-center lg:flex-row flex-col gap-5 text-white pl-2">
        <h2 class="text-lg font-extrabold">Filters</h2>
        <div class="flex flex-col lg:flex-row  gap-4">
          <div v-for="category in productsStore.categories" :key="category.id" class="space-x-2">
            <input
              type="radio"
              name="category"
              :value="category.id"
              :checked="productsStore.selectedCategory === category.id"
              @change="productsStore.selectedCategory = +$event.target.value"
              class="h-4 w-4 border-gray-400 text-indigo-600 focus:ring-indigo-700"
            />
            <label for="{{ category.id }}" class="text-gray-500">
              {{ category.name }}
            </label>
          </div>
        </div>
      </div>
    </div>
    <nav>
      <Link to="admin"> Admin </Link>
    </nav>
  </header>
</template>
