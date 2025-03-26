<script setup>

</script>

<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  background-color: #5874C6;
  font-weight: bold;
  color: white;
  font-size: 20px;
  margin: 10px;
  padding: 10px 20px;
  outline: none;
  border: none;
  border-radius: 8px;
  box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
button:hover {
  background-color: #4463bf;
}
button:active {
  position: relative;
  top: 1px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4) inset;
}
button:focus {
  background-color: #4463bf;
}
</style>
