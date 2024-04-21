<template>
  <view class="themeItem">
    <navigator
      v-if="!isMore"
      class="box"
      url="/pages/classifyList/classifyList"
    >
      <image
        class="themeImg"
        src="../static/image/classify1.jpg"
        mode="scaleToFill"
      />
      <view class="mask">明星美女</view>
      <view class="tag">3天前更新</view>
    </navigator>
    <navigator url="/pages/classify/classify" open-type="switchTab" v-else class="box more">
      <image
        class="themeImg"
        src="../static/image/classify2.jpg"
        mode="scaleToFill"
      />
      <view class="mask">
        <my-icon type="more" :size="30" color="#fff" />
        <view class="text">更多</view>
      </view>
    </navigator>
  </view>
</template>

<script setup lang="ts">
defineProps({
  isMore: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="scss">
.themeItem {
  .box {
    height: 340rpx;
    padding-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    position: relative;
    .themeImg {
      width: 100%;
      height: 100%;
    }
    .mask {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50rpx;
      line-height: 50rpx;
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
      font-size: 26rpx;
      text-align: center;
      backdrop-filter: blur(20rpx);
      font-weight: bold;
    }
    .tag {
      position: absolute;
      top: 0;
      left: 0;
      width: 120rpx;
      height: 30rpx;
      padding: 2rpx;
      line-height: 30rpx;
      border-radius: 5rpx;
      background: rgba(250, 129, 90, 0.7);
      backdrop-filter: blur(20rpx);
      color: #fff;
      font-size: 22rpx;
      text-align: center;
    }
  }
  .box.more {
    .mask {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .text {
      font-size: 25rpx;
    }
  }
}
</style>
