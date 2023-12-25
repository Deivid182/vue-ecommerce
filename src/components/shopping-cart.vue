<script setup>
import { formatCurrency } from '../helpers';
import { useCartStore } from '../stores/cart';
import { useCouponStore } from '../stores/coupons';
import Amount from './amount.vue';
import Button from './button.vue';
import CartItem from './cart-item.vue';
import CouponForm from './coupon-form.vue';

const cartStore = useCartStore()
const store = useCouponStore()
</script>

<template>
  <p v-if="cartStore.isEmpty" class="text-xl text-center text-neutral-900">Your cart is empty</p>
  <div v-else class="space-y-6">
    <h3 class="text-3xl font-extrabold text-gray-900">Your cart</h3>
    <ul class="divide-y divide-gray-400 space-y-2">
      <CartItem v-for="item in cartStore.items" :key="item.id" :item="item" />
    </ul>
    <dl class="space-y-6 border-t border-gray-200 text-sm font-medium">
      <Amount>
        <template #label>Subtotal: </template>
        {{ formatCurrency(cartStore.subTotal) }}
      </Amount>
      <Amount>
        <template #label>Taxes: </template>
        {{ formatCurrency(cartStore.taxes) }}
      </Amount>
      <Amount v-if="store.isValidCoupon">
        <template #label>Discount: </template>
        {{ formatCurrency(store.discount) }}
      </Amount>
      <Amount>
        <template #label>Total to pay: </template>
        {{ formatCurrency(cartStore.total) }}
      </Amount>
    </dl>
    <CouponForm />
    <Button
      @onClick="cartStore.checkout"
      fullWidth
      outline
    >
      Checkout
    </Button>

  </div>
</template>
