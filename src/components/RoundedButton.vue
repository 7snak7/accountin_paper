<script setup>

</script>

<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  display: block;
  width: 100%;
  background-color: #628bb5;
  font-weight: bold;
  color: #fff;
  font-size: 20px;
  margin: 10px auto;
  padding: 10px 20px;
  outline: none;
  border: none;
  border-radius: 30px;
  box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8) inset, 1px 1px 5px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.btn:hover {
  background-color: #6f9cca;
}
.btn:active {
  position: relative;
  top: 1px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4) inset;
}
.btn:focus {
  background-color: #6f9cca;
}
</style>
