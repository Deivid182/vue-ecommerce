import { addDoc, collection, doc, runTransaction } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { computed, ref, watchEffect } from 'vue'
import { useFirestore } from 'vuefire'
import { getCurrentDate } from '../helpers'
import { useCouponStore } from './coupons'

export const useCartStore = defineStore('cart', () => {
  const store = useCouponStore()
  const db = useFirestore()

  const items = ref([])
  const subTotal = ref(0)
  const taxes = ref(0)
  const total = ref(0)

  const MAX_PRODUCTS = 5
  const TAX_RATE = 0.1

  watchEffect(() => {
    subTotal.value = items.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
    taxes.value = Number((subTotal.value * TAX_RATE).toFixed(2))
    total.value = subTotal.value + taxes.value - store.discount
  })

  const addItem = (item) => {
    const index = isItemInCart(item.id)
    if (index >= 0) {
      if (isProductAvailable(item, index))
        return alert('You cannot add more than ' + MAX_PRODUCTS + ' of this product')
      items.value[index].quantity++
    } else {
      items.value.push({ ...item, quantity: 1, id: item.id })
    }
  }

  const deleteItem = (id) => {
    const index = items.value.findIndex((item) => item.id === id)
    items.value.splice(index, 1)
  }

  const updateQuantity = (id, quantity) => {
    //console.log(quantity)
    const index = items.value.findIndex((item) => item.id === id)
    items.value[index].quantity = quantity
    //console.log(items.value[index])
  }

  const isEmpty = computed(() => {
    return items.value.length === 0
  })

  const checkProductAvailable = computed(() => {
    return (product) => (product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS)
  })

  const isItemInCart = (id) => {
    return items.value.findIndex((item) => item.id === id)
  }

  const isProductAvailable = (item, index) => {
    return (
      items.value[index].quantity >= item.availability ||
      items.value[index].quantity >= MAX_PRODUCTS
    )
  }

  const checkout = async () => {
    try {
      await addDoc(collection(db, 'sales'), {
        items: items.value.map((item) => {
          // eslint-disable-next-line no-unused-vars
          const { availability, category, ...data } = item
          return data
        }),
        subTotal: subTotal.value,
        taxes: taxes.value,
        total: total.value,
        discount: store.discount,
        date: getCurrentDate()
      })

      items.value.forEach(async (item) => {
        const docRef = doc(db, 'products', item.id)
        await runTransaction(db, async (transaction) => {
          const currentProduct = await transaction.get(docRef)
          const availability = currentProduct.data().availability - item.quantity

          transaction.update(docRef, {
            availability
          })
        })
      })

      items.value = []
      subTotal.value = 0
      taxes.value = 0
      total.value = 0

      store.$reset()

      alert('Order placed')
    } catch (error) {
      console.error(error)
    }
  }

  return {
    addItem,
    isEmpty,
    items,
    checkProductAvailable,
    updateQuantity,
    subTotal,
    taxes,
    total,
    deleteItem,
    checkout
  }
})
