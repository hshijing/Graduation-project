<template>
  <view class="homeLayout page">
    <!-- 导航栏 -->
    <view class="nav">
      <my-nav :title="'首页'" />
    </view>
    <!-- 轮播图 -->
    <view class="swiper">
      <my-swiper :isTransverse="true" :ImgList="swiperImgList" />
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
            v-for="item in RandomImgList"
            :key="item._id"
            @click="imgClickToPreview(item)"
          > 
            <image :src="item.smallPicurl" mode="scaleToFill" />
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
        <MyTheme
          :isMore="false"
          v-for="item in classifyList"
          :key="item._id"
          :classifyItem="item"
        >
        </MyTheme>
        <MyTheme :isMore="true" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import MySwiper from "@/components/MySwiper.vue";
import MyAnnouncement from "@/components/MyAnnouncement.vue";
import MyTheme from "@/components/MyTheme.vue";
import { isH5 } from "../../utils/isH5";
import { ref } from "vue";
import {
  getHomeBarImg,
  getHomeRandomImg,
  getHomeWallClass,
  type getHomeBarImgItem,
  getHomeRandomImgItem,
  getHomeWallClassItem,
} from "./index";
//轮播图
const swiperImgList = ref([] as getHomeBarImgItem[]);
//每日推荐图
const RandomImgList = ref([] as getHomeRandomImgItem[]);
//分类
const classifyList = ref([] as getHomeWallClassItem[]);
//点击图片跳转预览
const imgClickToPreview = (row: getHomeRandomImgItem) => {
  uni.navigateTo({
    url: `/pages/perview/perview?isHome=yes`,
    success: () => {
      //h5环境uni.$emit需要等$on初始化完毕,牺牲用户体验
      if (isH5()) {
        setTimeout(() => {
          uni.$emit("RandomImgList", row);
        }, 500);
      } else {
        uni.$emit("RandomImgList", row);
      }
    },
  });
};
//获取轮播图
const getBarImg = async () => {
  const res = await getHomeBarImg();
  swiperImgList.value = res.data.data;
};
//获取每日推荐图
const getRandomImg = async () => {
  const res = await getHomeRandomImg();
  RandomImgList.value = res.data.data;
};
//获取分类
const getClassify = async () => {
  const res = await getHomeWallClass({ select: true });
  classifyList.value = res.data.data;
};

getBarImg();
getRandomImg();
getClassify();
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
