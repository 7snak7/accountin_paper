<script setup>
const model = defineModel()
</script>

<template>
  <textarea rows="1" class="input" v-model="model"></textarea>
</template>

<style scoped>
.input {
  width: 100%;
  height: min-content;
  background: none;
  outline: none;
  border: none;
  border-bottom: 1px solid #2c3e50;
}
</style>
