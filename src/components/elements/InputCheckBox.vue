<script setup>
import { v4 as uuidv4 } from 'uuid';
const check = uuidv4();
// eslint-disable-next-line no-undef
const model = defineModel()
</script>

<template>
  <div>
    <input type="checkbox" :id="check" class="switcher" v-model="model"/>
    <label :for="check" class="switch">
      <svg viewBox="0 0 212.4992 84.4688" height="100" overflow="visible">
        <path
            pathLength="360"
            fill="none"
            stroke="currentColor"
            d="M 42.2496 0 A 42.24 42.24 90 0 0 0 42.2496 A 42.24 42.24 90 0 0 42.2496 84.4688 A 42.24 42.24 90 0 0 84.4992 42.2496 A 42.24 42.24 90 0 0 42.2496 0 A 42.24 42.24 90 0 0 0 42.2496 A 42.24 42.24 90 0 0 42.2496 84.4688 L 170.2496 84.4688 A 42.24 42.24 90 0 0 212.4992 42.2496 A 42.24 42.24 90 0 0 170.2496 0 A 42.24 42.24 90 0 0 128 42.2496 A 42.24 42.24 90 0 0 170.2496 84.4688 A 42.24 42.24 90 0 0 212.4992 42.2496 A 42.24 42.24 90 0 0 170.2496 0 L 42.2496 0"
        ></path>
      </svg>
    </label>
  </div>
</template>

<style scoped>
div {
  display: inline-block;
  padding: 5px;
}

.switch {
  position: relative;
  display: inline-block;
  top: 5px;
  width: 50px;
  height: 20px;
  background: #818181;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 0 0 5px #818181;
  transition: 0.8s ease-in-out;
}

.switcher:checked ~ .switch {
  background: #628bb5;
  box-shadow: 0 0 0 5px #628bb5;
}

.switch svg {
  height: 100%;
}

.switch svg path {
  color: #fff;
  stroke-width: 16;
  stroke-dasharray: 136 224;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: all 0.8s ease-in-out, 0s transform;
  transform-origin: center;
}

.switcher:checked ~ .switch svg path {
  stroke-dashoffset: 180;
  transform: scaleY(-1);
}

.switcher {
  width: 0;
  height: 0;
  opacity: 0;
}
</style>
