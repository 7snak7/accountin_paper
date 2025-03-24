<script setup>
import RoundedButton from '@/components/RoundedButton.vue'
</script>

<template>
  <rounded-button @click="$router.push({ name: 'AccPaper' })">Акт выполненных работ</rounded-button>
  <rounded-button @click="$router.push({ name: 'SignageCalc' })">Расчет стоимости вывесок</rounded-button>
  <rounded-button @click="$router.push({ name: 'Signage' })">Ранее посчитанные вывески</rounded-button>
</template>

<style scoped>
</style>
