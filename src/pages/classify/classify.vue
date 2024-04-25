<template>
  <!-- 导航栏 -->
  <view class="nav">
    <my-nav :title="'分类'" />
  </view>
  <view class="classify page">
    <MyTheme v-for="item in imgList" :key="item._id" :classifyItem="item" />
  </view>
</template>

<script lang="ts" setup>
import MyTheme from "@/components/MyTheme.vue";
import { getHomeWallClass, type getHomeWallClassItem } from "../index/index";
import {
  onLoad,
  onShareAppMessage,
  onPullDownRefresh,
} from "@dcloudio/uni-app";

import { ref } from "vue";
const imgList = ref([] as getHomeWallClassItem[]);

const getImg = async () => {
  const res = await getHomeWallClass({ pageNum: 1, pageSize: 15 });
  imgList.value = res.data.data;
};
onLoad(() => {
  getImg();
});
//分享给朋友
onShareAppMessage(() => {
  return {
    title: "甄选壁纸,精选分类",
    path: "/pages/classify/classify",
  };
});
onPullDownRefresh(() => {
  getImg();
  uni.stopPullDownRefresh();
});
</script>

<style lang="scss">
.classify {
  padding: 30rpx;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15rpx;
}
</style>
