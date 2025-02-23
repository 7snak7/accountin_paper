<script setup>

</script>

<template>
<button tabindex="-1"><slot></slot></button>
</template>

<style scoped>
button {
  display: block;
  font-weight: bold;
  color: #ff0000;
  font-size: 15px;
  margin: 2px;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
button:hover {
  background-color: #ff0000;
  color: #fff;
}
</style>
