<script setup>
import RoundedButton from '@/components/RoundedButton.vue'
</script>

<template>
  <div class="home">
    <div class="bg"></div>
    <div class="wrapper">
      <rounded-button @click="$router.push({ name: 'Home' })">На главную</rounded-button>
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 425px) {
  .wrapper {
    width: 335px;
  }
  .bg {
    background-color: #fff;
  }
}

@media (min-width: 760px) {
  .wrapper {
    width: 700px;
  }
  .bg {
    background-color: #2c3e50;
  }
}

.wrapper {
  position: relative;
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
