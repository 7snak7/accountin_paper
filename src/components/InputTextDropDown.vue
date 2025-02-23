<script setup>
import { ref } from 'vue'
// eslint-disable-next-line no-undef
const model = defineModel()
const txt = ref(null)
// eslint-disable-next-line no-undef
const props = defineProps(['option'])
txt.value = undefined
function changeSize () {
  txt.value.style.height = 'min-content'
  const scHeight = txt.value.scrollHeight
  txt.value.style.height = scHeight + 'px'
}
function itemClick (st) {
  model.value = st
}
</script>

<template>
  <div class="dropdown">
    <textarea ref="txt" @keyup="changeSize" v-model="model"></textarea>

    <div class="dropdown-list">
      <div v-for="(item, index) in props.option" :key="index" class="dropdown-list__item" @click="itemClick(item)">{{ item }}</div>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  width: 100%;
  position: relative;
}
.dropdown:hover .dropdown-list {
  opacity: 1;
  visibility: visible;
}

textarea:focus + .dropdown-list {
  opacity: 1;
  visibility: visible;
}

.dropdown-list {
  border-radius: 4px;
  background-color: white;
  position: absolute;
  z-index: 999;
  top: 100%;
  left: 0;
  right: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s linear, visibility 0.2s linear;
  transform: translateY(10px);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.dropdown-list:before {
  content: "";
  width: 100%;
  height: 10px;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-100%);
}
.dropdown-list__item {
  padding: 1rem;
}
.dropdown-list__item:hover {
  background-color: #89b1d8;
  cursor: pointer;
}

textarea {
  width: 100%;
  margin: 1px 0;
  padding: 2px 0;
  height: 35px;
  background: none;
  outline: none;
  border: 1px solid #89b1d8;
  border-radius: 5px;
  resize: none;
}
textarea:focus {
  border: 1px solid #000000;
}
textarea::-webkit-scrollbar {
  width: 0;
}
</style>
