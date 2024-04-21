<template>
  <view class="userLayout page">
    <view class="info">
      <view class="avatar">
        <image class="image" src="../../static/g4925.jpg" mode="scaleToFill" />
      </view>
      <view class="ip">123213213123123 </view>
      <view class="address">来自:广西 </view>
    </view>
    <view class="list">
      <view class="item" v-for="item in iconsTop" :key="item.icon">
        <MyListItem
          :iconType="item.icon"
          :title="item.title"
          :isRight="item.isRight"
          :count="item.count"
          @iconClick="iconClick(item)"
        ></MyListItem>
      </view>
    </view>
    <view class="section">
      <view class="item" v-for="item in iconsBottom" :key="item.icon">
        <MyListItem
          :iconType="item.icon"
          :title="item.title"
          :isRight="item.isRight"
          :count="item.count"
          @iconClick="iconClick"
        ></MyListItem>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import MyListItem from "@/components/MyListItem.vue";
import { iconsTop, iconsBottom, type Icons } from "./index";

const iconClick = (item: Icons) => {
  //下载与评分
  if (item.isRight) {
    uni.navigateTo({
      url: "/pages/classifyList/classifyList",
    });
  }
  //联系我们
  if (item.title === iconsTop[2].title) {
    uni.navigateTo({
      url: "/pages/erWeiMa/erWeiMa",
    });
  }
};
</script>

<style scoped lang="scss">
.userLayout {
  width: 750rpx;
  height: 100vh;
  .info {
    padding-top: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .avatar {
      width: 200rpx;
      height: 200rpx;
      overflow: hidden;
      border-radius: 50%;
      .image {
        width: 100%;
        height: 100%;
      }
    }
    .ip {
      padding: 20rpx 0 5rpx;
      font-size: 40rpx;
      color: #333;
    }
    .address {
      font-size: 30rpx;
      color: #ababab;
    }
  }
  .list {
    width: 690rpx;
    margin: 50rpx auto;
    background: #fff;
    border: 1px solid #eee;
    border-radius: 10rpx;
    box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.1);
  }
  .section {
    width: 690rpx;
    background: #fff;
    margin: 50rpx auto;
    border: 1px solid #eee;
    border-radius: 10rpx;
    box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.1);
  }
}
</style>
