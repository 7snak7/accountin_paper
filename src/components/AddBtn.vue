<script setup>

</script>

<template>
  <button tabindex="-1" class="add-btn"><slot></slot></button>
</template>

<style scoped>
.add-btn {
  border: none;
  outline: none;
  background: none;
  color: #4463bf;
  cursor: pointer;
  position: relative;
  font-size: 14px;
  padding: 0 18px;
  -webkit-tap-highlight-color: transparent;
}
.add-btn:hover {
  color: #094888;
}
</style>
