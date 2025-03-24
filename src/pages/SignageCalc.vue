<script setup>
import RoundedButton from '@/components/RoundedButton.vue'
</script>

<template>
  <rounded-button @click="$router.push({ name: 'Home' })">На главную</rounded-button>
</template>

<style scoped>

</style>
