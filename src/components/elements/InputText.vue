<script setup>
import { ref } from 'vue'
// eslint-disable-next-line no-undef
const model = defineModel()
const txt = ref(null)
txt.value = undefined
function changeSize () {
  txt.value.style.height = 'min-content'
  const scHeight = txt.value.scrollHeight
  txt.value.style.height = scHeight + 'px'
}
</script>

<template>
  <textarea ref="txt" @keyup="changeSize" v-model="model"></textarea>
</template>

<style scoped>
textarea {
  width: 100%;
  height: min-content;
  background: none;
  outline: none;
  border: 1px solid #2c3e50;
  border-radius: 5px;
  resize: none;
}
textarea:focus {
  border: 2px solid #2c3e50;
}
textarea::-webkit-scrollbar {
  width: 0;
}
</style>
