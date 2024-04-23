<template>
  <view class="nav-body">
    <view class="nav-bar">
      <view
        class="status-bar"
        :style="{ height: `${statusBarHeight}px` }"
      ></view>
      <view class="nav-title" :style="{ height: `${MenuHeight}px` }">
        <text class="title">{{ title }}</text>
        <view class="search" v-if="isSearch">
          <my-icon class="icon" type="search" :size="16" color="#333" />
          <text class="text">搜索</text>
        </view>
      </view>
    </view>
    <view class="fill" :style="{ height: `${NavHeight}px` }"></view>
  </view>
</template>

<script setup lang="ts">
import { statusBarHeight, MenuHeight, NavHeight } from "../utils/navStyle";
defineProps({
  title: {
    type: String,
    required: true,
  },
  isSearch: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped lang="scss">
.nav-body {
  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: linear-gradient(to right, #beecd8, #f4e2d8);
    .nav-title {
      display: flex;
      align-items: center;
      padding: 0 30rpx;
      .title {
        font-size: 22px;
        font-weight: 600;
        color: #333;
        margin-right: 10rpx;
      }
      .search {
        width: 220rpx;
        height: 50rpx;
        border-radius: 60rpx;
        background: rgba(255, 255, 255, 0.5);
        border: 1px solid #fff;
        margin-left: 10rpx;
        color: #999;
        font-size: 28rpx;
        line-height: 50rpx;
        .icon {
          margin-left: 10rpx;
        }
        .text {
          padding-left: 10rpx;
        }
      }
    }
  }
}
</style>
