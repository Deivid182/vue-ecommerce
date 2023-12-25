<script setup>
import Link from '../../components/link.vue';
import ProductCard from '../../components/product-card.vue';
import { useProductsStore } from '../../stores/products';

const productsStore = useProductsStore();

</script>

<template>
  <div class="space-y-6">
    <Link
      to="new-product"
    >
      Add Product
    </Link>
    <h2 class="text-3xl font-semibold">
      Products
    </h2>

    <p v-if="productsStore.noResults">
      No products found
    </p>

    <ul v-else class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
      <ProductCard v-for="product in productsStore.allProducts" :key="product.id" :product="product"/>
    </ul>
  </div>
</template>