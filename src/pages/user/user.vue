<template>
  <view v-if="!userInfo.IP">
    <uni-load-more status="loading" />
  </view>
  <view v-else class="userLayout page" :style="{ height: `${isH5}vh` }">
    <!-- 导航栏 -->
    <view class="nav">
      <my-nav title="个人中心" :isSearch="false" />
    </view>
    <view class="info">
      <view class="avatar">
        <image class="image" src="../../static/g4925.jpg" mode="scaleToFill" />
      </view>
      <view class="ip">{{ userInfo.IP }} </view>
      <view class="address">
        <!-- 城市|省份|国家   -->
        来自:{{
          userInfo.address.city ||
          userInfo.address.province ||
          userInfo.address.country
        }}</view
      >
    </view>
    <view class="list">
      <view class="item" v-for="item in iconsTop" :key="item.icon">
        <MyListItem
          :iconType="item.icon"
          :title="item.title"
          :isRight="item.isRight"
          :count="item.count"
          @iconClick="iconClick(item)"
        >
          <template #title>
            <text class="title">{{ item.title }}</text>
          </template>
        </MyListItem>
      </view>
    </view>
    <view class="section">
      <view class="item" v-for="item in iconsBottom" :key="item.icon">
        <MyListItem
          :iconType="item.icon"
          :title="item.title"
          :isRight="item.isRight"
          :count="item.count"
          @iconClick="btnClick(item)"
        >
          <template #title>
            <button
              v-if="item.icon === 'chatboxes-filled'"
              open-type="contact"
              class="btn"
            >
              {{ item.title }}
            </button>
            <text v-else class="title">{{ item.title }}</text>
          </template>
        </MyListItem>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import MyListItem from "@/components/MyListItem.vue";
import { IconList, iconsBottom, type Icons } from "./index";
import { computed, ref } from "vue";
import {
  onLoad,
  onShareAppMessage,
  onPullDownRefresh,
} from "@dcloudio/uni-app";
import { ReqGetUserInfo, type UserInfo } from "./index";
//如果是h5就不给导航栏了 open-type="contact"
const isH5 = computed(() => {
  const environment: any = uni.getSystemInfoSync();
  // #ifdef H5
  return ((environment.screenHeight - 50) / environment.screenHeight) * 100;
  // #endif
  // #ifndef H5
  return 100;
  // #endif
});
const userInfo = ref({} as UserInfo);
const iconsTop: IconList = [
  {
    icon: "download-filled",
    title: "我的下载",
    isRight: true,
    type: "download",
  },
  {
    icon: "star-filled",
    title: "我的评分",
    isRight: true,
    type: "score",
  },
];
const getUserInfo = async () => {
  const res = await ReqGetUserInfo();
  userInfo.value = res.data.data;
  iconsTop[0].count = res.data.data.downloadSize;
  iconsTop[1].count = res.data.data.scoreSize;
};

onLoad(() => {
  getUserInfo();
});
const iconClick = (item: Icons) => {
  // 下载与评分
  if (item.type) {
    uni.navigateTo({
      url: `/pages/classifyList/classifyList?type=${item.type}&name=${item.title}&total=${item.count}`,
    });
  }
};

const btnClick = (item: Icons) => {
  // #ifdef H5
  if (item.title === iconsBottom[0].title) {
    uni.navigateTo({
      url: "/pages/erWeiMa/erWeiMa",
    });
    return;
  }
  // #endif
  if (item.icon === "flag-filled") {
    uni.navigateTo({
      url: "/pages/AnnouncementDetails/frequently",
    });
  }
};
//分享给朋友
onShareAppMessage(() => {
  return {
    title: "甄选壁纸_个人中心",
    path: "/pages/user/user",
  };
});

onPullDownRefresh(() => {
  getUserInfo();
  uni.stopPullDownRefresh();
});
</script>

<style lang="scss">
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
    .title {
      font-size: 28rpx;
      color: #666;
      margin-left: 10rpx;
    }
  }
  .section {
    width: 690rpx;
    background: #fff;
    margin: 50rpx auto;
    border: 1px solid #eee;
    border-radius: 10rpx;
    box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.1);
    .title {
      font-size: 28rpx;
      color: #666;
      margin-left: 10rpx;
    }
    /* #ifdef H5 */
    uni-button:after {
      border: none;
    }
    /* #endif */
    button::after {
      border: none;
    }
    .btn {
      font-size: 28rpx;
      width: 550rpx;
      padding-left: 10rpx;
      text-align: left;
      color: #666;
      background: #fff;
      .btn::after {
        border: none;
      }
    }
  }
}
</style>
