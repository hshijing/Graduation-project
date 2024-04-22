<template>
  <view class="homeLayout page">
    <!-- 导航栏 -->
    <view class="nav">
      <my-nav :title="'首页'" />
    </view>
    <!-- 轮播图 -->
    <view class="swiper">
      <my-swiper :isTransverse="true" />
    </view>
    <!-- 公告 -->
    <view class="announcement">
      <My-announcement />
    </view>
    <!-- 推荐 -->
    <view class="select">
      <!-- 标题 -->
      <My-title>
        <template #name>每日推荐</template>
        <template #custom>
          <view class="date">
            <my-icon type="calendar-filled" :size="30" />
            <view class="text">
              <uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
            </view>
          </view>
        </template>
      </My-title>
      <view class="content">
        <scroll-view scroll-x>
          <view
            class="box"
            v-for="item in 10"
            :key="item"
            @click="imgClickToPreview(item)"
          >
            <image src="../../static/image/preview1.jpg" mode="scaleToFill" />
          </view>
        </scroll-view>
      </view>
    </view>
    <!-- 专题 -->
    <view class="theme">
      <My-title>
        <template #name>专题精选</template>
        <template #custom>more+</template>
      </My-title>
      <view class="content">
        <MyTheme v-for="item in 8" :key="item"> </MyTheme>
        <MyTheme :isMore="true" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import MySwiper from "@/components/MySwiper.vue";
import MyAnnouncement from "@/components/MyAnnouncement.vue";
import MyTheme from "@/components/MyTheme.vue";

//点击图片跳转预览
const imgClickToPreview = (row: any) => {
  uni.navigateTo({
    url: `/pages/perview/perview`,
  });
};
</script>
<style lang="scss">
.homeLayout {
  width: 750rpx;
  padding: 30rpx 0;
  .swiper {
    width: inherit;
    height: 340rpx;
  }
  .select {
    padding-top: 50rpx;
    .date {
      color: #37b389;
      display: flex;
      align-items: center;
    }
    .content {
      width: 720rpx;
      margin-top: 30rpx;
      margin-left: 30rpx;
      display: flex;
      scroll-view {
        white-space: nowrap;
        .box {
          display: inline-block;
          width: 200rpx;
          height: 430rpx;
          margin-right: 30rpx;
          image {
            width: 100%;
            height: 100%;
            border-radius: 20rpx;
          }
        }
      }
    }
  }
  .theme {
    padding-top: 50rpx;
    .content {
      margin-top: 30rpx;
      padding: 0 30rpx;
      display: grid;
      gap: 15rpx;
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
