<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../components/button.vue';
import DeleteIcon from '../components/icons/delete-icon.vue';
import EditIcon from '../components/icons/edit-icon.vue';
import StarsIcon from '../components/icons/stars-icon.vue';
import { formatCurrency } from '../helpers';
import { useProductsStore } from '../stores/products';

const router = useRouter()

const productsStore = useProductsStore()

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const isProductNoAvailable = computed(() => {
  return props.product.availability === 0
})

</script>

<template>
  <li 
    :class="{ 'opacity-50': isProductNoAvailable }"
    class="border bg-white rounded-lg p-4 border-gray-400">
    <img
      :src="product.image"
      :alt="product.name"
      class="w-full object-cover object-center"
      width="150"
      height="150"
    />
    <div class="space-y-2">
      <h5 class="text-xl font-semibold tracking-tight text-gray-900">{{ product.name }}</h5>
      <p class="tracking-tight text-gray-500">Stock: {{ product.availability }}</p>
      <StarsIcon />
      <div class="flex items-center justify-between">
        <span class="text-3xl font-bold text-gray-900">{{ formatCurrency(product.price) }}</span>
        <div class="flex items-center gap-3">

          <Button
            secondary
            @onClick="() => router.push({ name: 'edit-product', params: { id: product.id } })"
          >
            <EditIcon />
          </Button>
          <Button
            secondary
            @onClick="() => productsStore.deleteProduct(product.id)"
          >
            <DeleteIcon />
          </Button>
        </div>
      </div>
    </div>
  </li>
</template>