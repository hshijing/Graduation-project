<template>
  <view class="box" v-if="isTransverse">
    <swiper
      :class="['swiperBody', { isHome: isHomeVue }]"
      :indicator-dots="indicator"
      :autoplay="autoplay"
      :circular="circular"
    >
      <swiper-item v-for="item in imgUrlList" :key="item" @click="jump(item)">
        <image class="image" :src="item" mode="aspectFill" />
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
      <swiper-item v-for="item in announcementData" :key="item.id">
        <navigator
          url="/pages/AnnouncementDetails/detail"
          open-type="navigate"
          hover-class="navigator-hover"
        >
          {{ item.text }}
        </navigator>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import { computed } from "vue";
const emit = defineEmits(["swiperItemClick"]);
const imgUrlList = computed(() => {
  const environment: any = uni.getSystemInfoSync();
  if (!environment.ua) {
    return [
      "../static/image/banner1.jpg",
      "../static/image/banner2.jpg",
      "../static/image/banner3.jpg",
    ];
  } else {
    return [
      "/src/static/image/banner1.jpg",
      "/src/static/image/banner2.jpg",
      "/src/static/image/banner3.jpg",
    ];
  }
});

const jump = (item) => {
  emit("swiperItemClick", item);
};
interface AnnouncementData {
  id: number;
  text: string;
}
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
  isHomeVue: {
    type: Boolean,
    default: true,
  },
  // 公告数据
  announcementData: {
    type: Array as () => AnnouncementData[],
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
