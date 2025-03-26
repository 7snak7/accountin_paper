<script setup>
import { ref } from 'vue'
// eslint-disable-next-line no-undef
const model = defineModel()
const txt = ref(null)
txt.value = undefined
function changeSize () {
  txt.value.style.height = '29px'
  const scHeight = txt.value.scrollHeight + 2
  txt.value.style.height = scHeight + 'px'
}
</script>

<template>
  <textarea ref="txt" @keyup="changeSize" v-model="model"></textarea>
</template>

<style scoped>
textarea {
  box-sizing:border-box;
  margin: 2px 2px;
  width: 100%;
  height: 29px;
  padding: 5px 5px 5px 5px;
  outline: none;
  resize: none;
  font-size: 14px;
  border-radius: 5px;
  border-color: #5874C6;
  max-height: 330px;
}
textarea:focus {
  border-color: #4463bf;
}
textarea::-webkit-scrollbar {
  width: 0;
}
</style>
