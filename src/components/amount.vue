<!-- eslint-disable vue/multi-word-component-names -->
<script setup>

</script>

<template>
  <div class="flex justify-between p-1 items-center">
    <dt class="font-bold">
      <slot name="label"/>
    </dt>
    <dd class="text-gray-900">
      <slot />
    </dd>
  </div>
</template>
