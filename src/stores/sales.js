import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { query, collection, where } from "firebase/firestore";
import { useFirestore, useCollection } from "vuefire";


export const useSalesStore = defineStore('sales', () => {
  const date = ref('')
  const db = useFirestore();

  const salesSource = computed(() => {
    if (date.value) {
      return query(collection(db, 'sales'), where('date', '==', date.value))
    }
    return null
  });

  const salesCollection = useCollection(salesSource);

  const isDateSelected = computed(() => date.value.length)

  const noSales = computed(() => !salesCollection.length && isDateSelected)

  const totalRevenue = computed(() => {
    return salesCollection.value ? salesCollection.value.reduce((total, sale) => total + sale.total,  0) : 0
  })

  return {
    date,
    isDateSelected,
    salesSource,
    salesCollection,
    noSales,
    totalRevenue
  }
})