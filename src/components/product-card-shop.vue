<script setup>
import Button from '../components/button.vue';
import CartIcon from '../components/icons/cart-icon.vue';
import StarsIcon from '../components/icons/stars-icon.vue';
import { formatCurrency } from '../helpers';
import { useCartStore } from '../stores/cart';

const cartStore = useCartStore()

defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="border bg-white rounded-lg p-4 border-gray-400">
    <img
      :src="product.image"
      :alt="product.name"
      class="w-full object-cover object-center"
      width="150"
      height="150"
    />
    <div class="space-y-2">
      <h5 class="text-xl font-semibold tracking-tight text-gray-900">{{ product.name }}</h5>
      <p class="text-gray-500 font-medium">
        Available: {{ product.availability }}
      </p>
      <StarsIcon />
      <div class="flex items-center justify-between">
        <span class="text-3xl font-bold text-gray-900">{{ formatCurrency(product.price) }}</span>
        <div class="flex items-center gap-3">
          <Button
            type="button"
            @onClick="() => cartStore.addItem(product)"            
          >
            <div class="flex items-center gap-2">
              <CartIcon />
              <span>Add to cart</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>