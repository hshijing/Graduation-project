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
import {
  onLoad,
  onShareAppMessage,
  onPullDownRefresh,
} from "@dcloudio/uni-app";
import { ref } from "vue";
import {
  getHomeBarImg,
  getHomeRandomImg,
  getHomeWallClass,
  type getHomeBarImgItem,
  ClassifyItem,
  getHomeWallClassItem,
} from "./index";
import { onUnload } from "@dcloudio/uni-app";
//轮播图
const swiperImgList = ref([] as getHomeBarImgItem[]);
const RandomImgPageNum = ref(1);
const RandomImgTotal = ref(0);
//每日推荐图
const RandomImgList = ref([] as ClassifyItem[]);
//分类
const classifyList = ref([] as getHomeWallClassItem[]);
//点击图片跳转预览
const imgClickToPreview = (row: ClassifyItem) => {
  uni.navigateTo({
    url: `/pages/perview/perview?id=${row._id}`,
  });
  uni.setStorageSync("dataImgList", RandomImgList.value);
};
//获取轮播图
const getBarImg = async () => {
  const res = await getHomeBarImg();
  swiperImgList.value = res.data.data;
};
//获取每日推荐图
const getRandomImg = async () => {
  const res = await getHomeRandomImg({
    classid: "6524ace7213929cbcee72e4d",
    pageNum: RandomImgPageNum.value,
    pageSize: 9,
  });
  RandomImgTotal.value = res.data.total;
  RandomImgList.value = res.data.data;
};
//获取分类
const getClassify = async () => {
  const res = await getHomeWallClass({ select: true });
  classifyList.value = res.data.data;
};
//更新每日推荐图片
const updateRandomImg = () => {
  RandomImgPageNum.value++;
  if (RandomImgPageNum.value > Math.ceil(RandomImgTotal.value / 9)) {
    RandomImgPageNum.value = 1;
  }
  getRandomImg();
};
const timeId = setInterval(() => {
  updateRandomImg();
}, 1000 * 60 * 60 * 24);
onLoad(() => {
  getBarImg();
  getRandomImg();
  getClassify();
});
onUnload(() => {
  clearInterval(timeId);
});

//分享给朋友
onShareAppMessage(() => {
  return {
    title: "甄选壁纸",
    path: "/pages/index/index",
  };
});
onPullDownRefresh(() => {
  getBarImg();
  getRandomImg();
  getClassify();
  uni.stopPullDownRefresh();
});
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
