<template>
  <view v-if="isTransverse">
    <swiper class="swiperBody" indicator-dots autoplay circular>
      <swiper-item v-for="item in 3" :key="item">
        <image
          class="image"
          :src="`../static/image/banner${item}.jpg`"
          mode="scaleToFill"
        />
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
        {{ item.text }}
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
interface AnnouncementData {
  id: number;
  text: string;
}

defineProps({
  isTransverse: {
    type: Boolean,
    required: true,
  },
  // 公告数据
  announcementData: {
    type: Array as () => AnnouncementData[],
  },
});
</script>

<style scoped lang="scss">
.swiperBody {
  width: 100%;
  padding: 0 30rpx;
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
