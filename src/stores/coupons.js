import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useCartStore } from './cart';

export const useCouponStore = defineStore('coupon', () => {

  const cartStore = useCartStore()

  const couponUser = ref('')
  const couponValidationMessage = ref('')
  const discountPercentage = ref(0)
  const discount = ref(0)

  const VALID_COUPON_CODES = [
    { code: '10OFF', discount: 0.10 },
    { code: '20OFF', discount: 0.20 },
    { code: '30OFF', discount: 0.30 },
    { code: '40OFF', discount: 0.40 },
    { code: '50OFF', discount: 0.50 },
  ]

  watch(discountPercentage, () => {
    discount.value = (cartStore.total * discountPercentage.value).toFixed(2)
  })

  const applyCoupon = () => {
    if(VALID_COUPON_CODES.some(code => code.code === couponUser.value)) {
      couponValidationMessage.value = 'Coupon being applied...'

      
      setTimeout(() => {
        discountPercentage.value = VALID_COUPON_CODES.find(code => code.code === couponUser.value).discount
        couponValidationMessage.value = 'Coupon applied!'
      }, 3000)
    } else {
      couponValidationMessage.value = 'Invalid coupon code'
    }

    setTimeout(() => {
      couponValidationMessage.value = ''
    }, 6000)
  }

  const isValidCoupon = computed(() => {
    return discountPercentage.value > 0
  })

  const $reset = () => {
    couponUser.value = ''
    couponValidationMessage.value = ''
    discountPercentage.value = 0
    discount.value = 0
  }

  return {
    couponUser,
    applyCoupon,
    couponValidationMessage,
    discount,
    isValidCoupon,
    $reset
  }
})