<template>
  <view class="layout">
    <view class="title">
      <view class="tag">
        <uni-tag :inverted="true" text="置顶" type="error" />
      </view>
      <view class="font">区域填写标题</view>
    </view>
    <view class="info">
      <view class="item">回去我请问请问和</view>
      <view class="time">
        <uni-dateformat :date="Date.now()" format="yyyy/MM/dd hh:mm:ss" />
      </view>
    </view>
    <view class="content"> 内容 </view>
    <view class="count"> 312312 </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
</script>

<style scoped lang="scss">
.layout {
  padding: 30rpx;
  .title {
    font-size: 40rpx;
    color: #111;
    line-height: 1.6em;
    padding-bottom: 30rpx;
    display: flex;
    .tag {
      transform: scale(0.8);
      transform-origin: left center;
      flex-shrink: 0;
    }
    .font {
      padding-left: 6rpx;
    }
  }
  .info {
    display: flex;
    align-items: center;
    color: #999;
    font-size: 28rpx;
    .item {
      padding-right: 20rpx;
    font-size: 22rpx;
    }
  }
  .content {
    padding: 50rpx 0;
  }
  .count {
    color: #999;
    font-size: 28rpx;
  }
}
</style>
