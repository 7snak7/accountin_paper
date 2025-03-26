<script setup>
// eslint-disable-next-line no-undef
const model = defineModel()
</script>

<template>
  <input type="date" v-model="model">
</template>

<style scoped>
input {
  border: none;
  outline: none;
  color: #fff;
  background-color: #5874C6;
  border-radius: 30px;
  padding-left: 10px;
  font-weight: bold;
  font-size: 15px;
  width: 130px;
}
::-webkit-calendar-picker-indicator {

}
</style>
