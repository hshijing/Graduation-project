<template>
  <view class="box" v-if="isTransverse">
    <swiper
      :class="['swiperBody', { isHome: isHomeVue }]"
      :indicator-dots="indicator"
      :autoplay="autoplay"
      :circular="circular"
      :current="current"
      @change="change"
    >
      <swiper-item
        v-for="(item, index) in ImgList"
        :key="item._id"
        @click="jump(item)"
      >
        <template v-if="readImgIndex.length >= 1">
          <image
            v-if="readImgIndex.includes(index)"
            class="image"
            :src="item.picurl"
            mode="aspectFill"
          />
        </template>
        <template v-else>
          <image class="image" :src="item.picurl" mode="aspectFill" />
        </template>
      </swiper-item>
    </swiper>
  </view>
  <view v-else>
    <swiper
      class="announcementBody"
      vertical
      autoplay
      circular
      :interval="1500"
      :duration="300"
    >
      <swiper-item
        v-for="item in noticeList"
        :key="item._id"
        @click="goToDetail(item)"
      >
        {{ item.title }}
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import { type getHomeBarImgItem } from "../pages/index/index";
import { type NoticeItem } from "./MyAnnouncement.vue";
const emit = defineEmits(["swiperItemClick", "swiperChange"]);
const jump = (item) => {
  emit("swiperItemClick", item);
};
// 公告跳转
const goToDetail = (item: NoticeItem) => {
  uni.navigateTo({
    url: "/pages/AnnouncementDetails/detail",
    success: () => {
      // #ifdef H5
      uni.$on("test", function () {
        uni.$emit("NoticeItem", item);
      });
      // #endif

      // #ifndef H5
      uni.$emit("NoticeItem", item);

      // #endif
    },
  });
};
const change = (e) => {
  emit("swiperChange", e);
};
defineProps({
  isTransverse: {
    type: Boolean,
    required: true,
  },
  indicator: {
    type: Boolean,
    default: true,
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  circular: {
    type: Boolean,
    default: true,
  },
  //是否首页
  isHomeVue: {
    type: Boolean,
    default: true,
  },
  // 公告数据
  noticeList: {
    type: Array as () => NoticeItem[],
  },
  //图片列表
  ImgList: {
    type: Array as () => getHomeBarImgItem[],
  },
  //是否为分类图片列表内容？
  readImgIndex: {
    type: Array,
    default: [],
  },
  //当前图片下标
  current: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  .isHome {
    padding: 10rpx 30rpx;
  }
  .swiperBody {
    width: inherit;
    height: inherit;
    &-item {
      width: 100%;
      height: 100%;
    }
    .image {
      width: 100%;
      height: 100%;
      border-radius: 10rpx;
    }
  }
}

.announcementBody {
  width: 100%;
  height: 80rpx;
  &-item {
    height: 100%;
    font-size: 30rpx;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
