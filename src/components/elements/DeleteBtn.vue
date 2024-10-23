<script setup>

</script>

<template>
  <button tabindex="-1" class="del-btn"><slot></slot></button>
</template>

<style scoped>
.del-btn {
  border: none;
  outline: none;
  background: none;
  color: #dc2b4c;
  cursor: pointer;
  position: relative;
  font-size: 14px;
  padding: 0 18px;
  -webkit-tap-highlight-color: transparent;
}
.del-btn:hover {
  color: #671020;
}
</style>
