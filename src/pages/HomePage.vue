<script setup>

import RoundedButton from '@/components/RoundedButton.vue'
</script>

<template>
  <div class="home">
    <div class="bg"></div>
    <div class="wrapper">
      <rounded-button @click="$router.push({ name: 'AccPaper' })">Акт выполненных работ</rounded-button>
      <rounded-button @click="$router.push({ name: 'SignageCalc' })">Расчет стоимости вывесок</rounded-button>
      <rounded-button @click="$router.push({ name: 'Signage' })">Ранее посчитанные вывески</rounded-button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  width: 330px;
  height: max-content;
  background-color: #fff;
  border-radius: 10px;
  padding: 5px;
}

.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #2c3e50;
}

.home {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
</style>
