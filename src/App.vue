<template>
  <div
    class="box"
    :style="{ background: `url(${bg}) no-repeat`, backgroundSize: '100% 100%' }"
  >
    <div class="box-left"></div>
    <div class="box-middle"></div>
    <div class="box-right"></div>
  </div>
</template>

<script setup lang="ts">
import bg from "@/assets/1.jpg";
import { useStore } from "./stores";

const store = useStore();
store.getList();
</script>

<style lang='scss' scoped>
.box {
  display: flex;
  height: 100%;
  &-left {
    width: 400px;
  }
  &-middle {
    flex: 1;
  }
  &-right {
    width: 400px;
  }
}
</style>