<template>
  <view class="classify page">
    <MyTheme v-for="item in 15" :key="item" :title="item"/>
  </view>
</template>

<script lang="ts" setup>
import MyTheme from '@/components/MyTheme.vue'

</script>

<style lang="scss">
.classify{
  padding: 30rpx;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 15rpx;
}
</style>
