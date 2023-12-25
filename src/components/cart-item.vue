<script setup>
import { formatCurrency } from '../helpers';
import { useCartStore } from '../stores/cart';
import Button from './button.vue';
import DeleteIcon from './icons/delete-icon.vue';

const cartStore = useCartStore()

defineProps({
  item: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <li class="flex gap-6 py-6 relative">
    <img :src="item.image" :alt="item.name" class="w-24 h-24 object-contain rounded-lg flex-none" />
    <div class="flex-auto space-y-2">
      <h4 class="text-gray-900">
        {{ item.name }}
      </h4>
      <p class="text-gray-500">
        {{ formatCurrency(item.price) }}
      </p>
      <select 
        :value="item.quantity"
        @change="cartStore.updateQuantity(item.id, +$event.target.value)"
        class="w-32 text-center p-2 bg-white rounded-lg">
        <option v-for="n in cartStore.checkProductAvailable(item)" :key="n">
          {{ n }}
        </option>
      </select>
    </div>
    <div class="absolute -right-6 top-1">
      <Button
        type="button"
        danger
        isRelative
        customClass="w-6 h-6"
        @onClick="cartStore.deleteItem(item.id)"
      >
        <DeleteIcon customClass="w-4 h-4 text-white`"/>
      </Button>
    </div>
  </li>
</template>
