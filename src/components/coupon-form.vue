<script setup>
import { useCouponStore } from '../stores/coupons';
import Button from './button.vue';

const store = useCouponStore()
</script>
<template>
  <p class="mt-5 py-5 font-bold border-t border-gray-300">You have a coupon?</p>
  <div class="flex gap-2">
    <input
      placeholder="Your coupon code"
      class="w-full p-2 border border-gray-300 rounded-lg"
      type="text"
      v-model="store.couponUser"
    />
    <Button 
      type="button"
      :disabled="store.isValidCoupon"
      @onClick="store.applyCoupon">Apply</Button>
  </div>
  <p class="py-2 text-center font-extrabold text-sm">
    {{ store.couponValidationMessage }}
  </p>
</template>
