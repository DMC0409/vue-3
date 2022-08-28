<template>
  <div class="box">
    <div class="box-left"></div>
    <div class="box-middle"></div>
    <div class="box-right"></div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang='scss' scoped>
.box {
  display: flex;
  height: 100%;
  &-left {
    width: 400px;
    background: red;
  }
  &-middle {
    flex: 1;
  }
  &-right {
    width: 400px;
    background: green;
  }
}
</style>