<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
defineProps({
  type: String,
  fullWidth: Boolean,
  secondary: Boolean,
  disabled: Boolean,
  danger: Boolean,
  customClass: String,
  outline: Boolean
})

defineEmits(['onClick'])

</script>
<template>
  <button
    :type="type"
    @click="$emit('onClick')"
    class="flex items-center justify-center rounded-md p-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    :class="[
      secondary ? 'text-gray-900' : 'text-white',
      outline ? 'border border-gray-900 bg-gray-900 text-white' : '',
      fullWidth ? 'w-full' : 'w-auto',
      customClass ? customClass : '',
      disabled ? 'cursor-not-allowed disabled:opacity-70' : 'cursor-pointer',
      danger ? 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-500' : '',
      !secondary && !danger && !outline && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
    ]"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped></style>
