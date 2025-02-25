<script setup>
import { computed, ref } from 'vue'
// eslint-disable-next-line no-undef
const model = defineModel()
const txt = ref(null)
// eslint-disable-next-line no-undef
const props = defineProps(['option'])
txt.value = undefined
console.log(model.value)
function changeSize () {
  txt.value.style.height = '29px'
  const scHeight = txt.value.scrollHeight + 2
  txt.value.style.height = scHeight + 'px'
}
function itemClick (st) {
  model.value = st
}

const options = computed(() => {
  return props.option.filter(f => f.toLowerCase().includes(model.value.toLowerCase()))
})

</script>

<template>
  <div class="dropdown">
    <textarea ref="txt" @keyup="changeSize" v-model="model" v-bind="$attrs"></textarea>

    <div class="dropdown-list">
        <div v-for="(item, index) in options"
             :key="index" class="dropdown-list__item"
             @click="itemClick(item)"
        >{{ item }}</div>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  max-width: 100%;
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
  max-height: 490px;
  overflow-y: auto;
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
  transform: translateY(-5px);
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
  box-sizing:border-box;
  margin: 2px 2px;
  width: 100%;
  height: 29px;
  padding: 5px 5px 5px 20px;
  outline: none;
  resize: none;
  font-size: 14px;
  border-radius: 5px;
  border-color: #89b1d8;
  max-height: 330px;
}
textarea:focus {
  border-color: #000000;
}
textarea::-webkit-scrollbar {
  width: 0;
}
</style>
