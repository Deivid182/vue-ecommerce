<script setup>
import VUeTailwindDatepicker from 'vue-tailwind-datepicker';
</script>
<template>
  <div>
    <h2 class="text-3xl font-semibold">Summary sales</h2>
    <div class="md:flex gap-5">
      <div class="bg-white flex justify-center md:w-1/2 lg:w-1/3">
        <VUeTailwindDatepicker />
      </div>
      <div class="bg-white flex justify-center md:w-1/2 lg:w-2/3 space-y-5 lg:overflow-y-scroll p-5 pb-32">
        <p>Sales</p>
      </div>
    </div>
  </div>
</template>
