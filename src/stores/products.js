import { addDoc, collection, deleteDoc, doc, getDoc, orderBy, query, updateDoc } from 'firebase/firestore'
import { deleteObject, ref as storageRef } from 'firebase/storage'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useCollection, useFirebaseStorage, useFirestore } from 'vuefire'

export const useProductsStore = defineStore('useProductsStore', () => {
  const db = useFirestore()
  const storage = useFirebaseStorage()

  const selectedCategory = ref(1)
  const loading = ref(false)

  const q = query(collection(db, 'products'), orderBy('availability', 'asc'))

  const allProducts = useCollection(q)

  const categories = [
    { id: 1, name: 'footwear' },
    { id: 2, name: 'sunglasses' },
    { id: 3, name: 'sweatshirts' }
  ]

  const categoryOptions = computed(() => {
    const options = [
      { value: '', label: 'Select a category', attrs: { disabled: true } },
      ...categories.map((category) => ({ value: category.id, label: category.name }))
    ]

    return options
  })

  const createProduct = async (data) => {
    await addDoc(collection(db, 'products'), data)
  }

  const updateProduct = async (docRef, data) => {
    const { image, url, ...rest } = data
    if (image.length) {
      await updateDoc(docRef, {
        ...rest,
        image: url.value
      })
    } else {
      await updateDoc(docRef, rest)
    }
  }

  const deleteProduct = async id => {
    if (confirm('Are you sure you want to delete this product?')) {
      const docRef = doc(db, 'products', id)

      const docSnap = await getDoc(docRef)
      const {image} = docSnap.data()

      const imageRef = storageRef(storage, image) 
      await Promise.all([deleteObject(imageRef), deleteDoc(docRef)])
      alert('Product deleted')
    }
  }

  const noResults = computed(() => {
    return !allProducts.value || allProducts.value.length === 0
  })

  const filteredProducts = computed (() => {
    return allProducts.value.filter(product => product.category === selectedCategory.value).filter(product => product.availability > 0)
  })

  return {
    createProduct,
    categoryOptions,
    allProducts,
    noResults,
    updateProduct,
    deleteProduct,
    filteredProducts,
    categories,
    selectedCategory,
    loading
  }
})
