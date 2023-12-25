<!-- eslint-disable vue/multi-word-component-names -->
<script setup>

import MenuIcon from './icons/menu-icon.vue';
import Link from './link.vue';
import Logo from './logo.vue';


</script>

<template>
  <header class="px-10 py-5 bg-gray-700 flex justify-between w-full fixed top-0 z-20">
    <Logo />
    <nav>
      <div class="max-lg:hidden flex items-center gap-4">
        <RouterLink
          :active-class="'border-b-2 border-green-400 transition-colors'"
          :to="{ name: 'sales' }"
          class="text-white p-2"
        >
          Sales
        </RouterLink>
        <RouterLink
          :active-class="'border-b-2 border-green-400 transition-colors'"
          class="text-white p-2"
          :to="{ name: 'products' }"
        >
          Products
        </RouterLink>
        <Link
          to="home"
        >
          Go to Store
        </Link>
      </div>
      <div class="relative">
        <button
          class="max-lg:flex hidden text-white p-2"
        >
          <MenuIcon />
        </button>
        <div class="absolute right-0 top-4 rounded-md ">

        </div>
      </div>
    </nav>
  </header>
</template>
