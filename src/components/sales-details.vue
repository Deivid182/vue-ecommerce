<script setup>
import { formatCurrency } from '../helpers'
import Amount from './amount.vue';
defineProps({
  sale: Object
})
</script>
<template>
  <div class="border-t border-gray-200 space-y-5">
    <h2 class="text-2xl font-black">Sale's details</h2>
    <p class="text-xl font-black text-gray-500">Products</p>

    <ul
      role="list"
      class="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-400"
    >
      <li v-for="item in sale.items" :key="item.id" class="flex flex-col gap-6 py-6">
        <img :src="item.image" :alt="`${item.name} image`" class="size-24 rounded-lg flex-none" />
        <div class="flex-auto space-y-2">
          <h3 class="text-gray-900 text-lg font-bold">{{ item.name }}</h3>
          <p class="text-gray-500 text-sm">Price: {{ formatCurrency(item.price) }}</p>
          <p>Quantity: {{ item.quantity }}</p>
        </div>
        <dl class="space-y-6 border-t border-gray-200 text-sm font-medium">
          <Amount>
            <template #label>Subtotal: </template>
            {{ formatCurrency(sale.subTotal) }}
          </Amount>
          <Amount>
            <template #label>Taxes: </template>
            {{ formatCurrency(sale.taxes) }}
          </Amount>
          <Amount v-if="sale.discount" class="bg-green-200 py-2 rounded">
            <template #label>Discount: </template>
            {{ formatCurrency(sale.discount) }}
          </Amount>
          <Amount>
            <template #label>Total to pay: </template>
            {{ formatCurrency(sale.total) }}
          </Amount>
        </dl>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
