<script setup>
import { ref } from 'vue';
import VueTailwindDatepicker from 'vue-tailwind-datepicker';
import { useSalesStore } from '../../stores/sales';
import SalesDetails from '../../components/sales-details.vue';
import { formatCurrency } from '../../helpers';

const sales = useSalesStore();

const formatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMM',
})

</script>
<template>
  <div>
    <h2 class="text-3xl font-semibold">Summary sales</h2>
    <div class="md:flex gap-5">
      <div class="bg-white flex justify-center md:w-1/2 lg:w-1/3">
        <VueTailwindDatepicker
          i18n="es-MX"
          as-single
          v-model="sales.date"
          :formatter="formatter"
        />
      </div>
      <div class="bg-white md:w-1/2 lg:w-2/3 space-y-5 lg:overflow-y-scroll p-5 pb-32">
        <p v-if="sales.isDateSelected">
          Sales to date: 
          <span class="font-black">
            {{ sales.date }}
          </span>
        </p>
        <p v-else class="text-center text-lg">
          Select a date
        </p>
        <div v-if="sales.salesCollection.length" class="space-y-5">
          <SalesDetails
            v-for="sale in sales.salesCollection"
            :key="sale.id"
            :sale="sale"
          />
          <!-- total revenue -->
          <p class="text-2xl text-right">Total revenue: 

            <span class="font-black">{{ formatCurrency(sales.totalRevenue) }}</span>
          </p>
        </div>
        <p v-else-if="sales.noSales" class="text-lg font-bold">Nothing to show here</p>
      </div>
    </div>
  </div>
</template>
