<script setup>
import { storeToRefs } from 'pinia';
import Navbar from '../components/navbar.vue';
import ProductCardShop from '../components/product-card-shop.vue';
import ShoppingCart from '../components/shopping-cart.vue';
import { useProductsStore } from '../stores/products';

const productsStore = useProductsStore()

const { filteredProducts, noResults } = storeToRefs(productsStore)
</script>
<template>
  <Navbar />

  <main class="pt-10 lg:flex lg:h-screen lg:overflow-y-hidden">
    <div class="lg:w-3/4 lg:h-screen lg:overflow-y-scroll pt-64 lg:pt-24 pb-32 px-10">
      <p v-if="noResults" class="text-4xl font-semibold">No products found</p>
      <div v-else
        class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4"
      >
        <ProductCardShop v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>
    </div>
    <aside class="lg:w-1/4 lg:h-screen lg:overflow-y-scroll pt-24 pb-32 px-10">
      <ShoppingCart />
    </aside>
  </main>
</template>
