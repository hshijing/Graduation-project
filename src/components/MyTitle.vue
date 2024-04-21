<template>
  <view class="myTitle">
    <view class="name">
      <slot name="name"></slot>
    </view>
    <view class="custom">
      <slot name="custom"></slot>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.myTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20rpx;
  .name {
    font-size: 40rpx;
    font-weight: 600;
  }
  .custom {
    font-size: 30rpx;
    color: #999;
  }
}
</style>
