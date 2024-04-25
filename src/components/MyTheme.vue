<template>
  <view class="themeItem">
    <view v-if="!isMore" class="box" @click="goToClassify(classifyItem)">
      <image
        class="themeImg"
        :src="classifyItem.picurl"
        mode="scaleToFill"
      />
      <view class="mask">{{ classifyItem.name }}</view>
      <view class="tag"> {{ formatDate(classifyItem.updateTime) }}</view>
    </view>

    <view
      v-else
      @click="goToClassifyList"
      open-type="switchTab"
      class="box more"
    >
      <image
        class="themeImg"
        src="../static/g4925.jpg"
        mode="scaleToFill"
      />
      <view class="mask">
        <my-icon type="more" :size="30" color="#fff" />
        <view class="text">更多</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { type getHomeWallClassItem } from "../pages/index/index";
import { formatDate } from "../utils/formDate";

//打开当前主题的图片列表
const goToClassify = (item: getHomeWallClassItem) => {
  uni.navigateTo({
    url: `/pages/classifyList/classifyList?id=${item._id}&name=${item.name}`,
  });
};
//更多
const goToClassifyList = () => {
  uni.switchTab({
    url: "/pages/classify/classify",
  });
};

defineProps({
  isMore: {
    type: Boolean,
    default: false,
  },
  classifyItem: {
    type: Object as () => getHomeWallClassItem,
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
