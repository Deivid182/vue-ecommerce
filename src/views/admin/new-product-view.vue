<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import Link from '../../components/link.vue';
import useImage from '../../composables/use-image';
import { useProductsStore } from '../../stores/products';

const router = useRouter()

const formData = reactive({
  name: '',
  image: '',
  category: '',
  price: 0,
  availability: 0
})
const { onFileChange, isUploaded, url } = useImage()
const productsStore = useProductsStore()


const onSubmit = async (data) => {
  const { image, ...rest } = data

  try {
    await productsStore.createProduct({
      ...rest,
      image: url.value
    })
    router.push({ name: 'products' })
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <div class="space-y-6">
    <Link
      to="products"
    >
      Back
    </Link>
    <h2 class="text-3xl font-semibold">
      New Product
    </h2>
      <div class="bg-white shadow-md rounded-md flex justify-center">
      <div class="p-6 w-full md:w-1/2 mx-auto">
        <FormKit
          type="form"
          :actions="false"
          @submit="onSubmit"
        >
          <FormKit
            type="text"
            label="Name"
            name="name"
            validation="required"
            placeholder="Product Name"
            :validation-messages="{ required: 'Product name is required' }"
            v-model="formData.name"
          />

          <FormKit
            type="file"
            label="Product Image"
            name="image"
            validation="required"
            :validation-messages="{ required: 'Product image is required' }"
            accept="image/*"
            @change="onFileChange"
            v-model="formData.image"
          />

          <div v-if="isUploaded">
            <p class="font-black">Product Image: </p>
            <img
              width="70"
              class="w-32 object-contain"
              :src="isUploaded" 
              alt="product image"
            >
          </div>

          <FormKit
            type="select"
            label="Product Category"
            name="category"
            validation="required"
            placeholder="Product Category"
            :validation-messages="{ required: 'Product category is required' }"
            :options="productsStore.categoryOptions"
            v-model="formData.category"
          />

          <FormKit
            type="number"
            label="Product Price"
            name="price"
            placeholder="Product Price"
            validation="required"
            :validation-messages="{ required: 'Product price is required' }"
            min="1"
            v-model.number="formData.price"
          />

          <FormKit
            type="number"
            label="Available Quantity"
            name="availability"
            placeholder="Available Quantity"
            validation="required"
            :validation-messages="{ required: 'Product Quantity is required' }"
            v-model.number="formData.availability"
          />

          <FormKit 
            label="Add Product"
            type="submit" />
        </FormKit>
      </div>
    </div>
  </div>

</template>
