<template>
  <view class="announcementBody">
    <view class="left">
      <MyIcon type="sound-filled" color="#28b389" :size="20" />
      <text class="title">公告</text>
    </view>
    <view class="center">
      <my-swiper
        class="swiper"
        :isTransverse="false"
        :noticeList="noticeList"
      />
    </view>
    <view class="right">></view>
  </view>
</template>

<script setup lang="ts">
export interface NoticeItem {
  _id: number;
  view_count: string;
  title: string;
  content: string;
  create_time: number;
  author: string;
}
 type NoticeList = NoticeItem[];
const noticeList: NoticeList = [
  {
    _id: Date.now(),
    view_count: "99+",
    title: "小程序版权声明",
    content:
      "小程序所有资源均来自互联网，如有侵权，请联系删除，邮箱：2097294126@qq.com，微信：H101914_",
    create_time: Date.now(),
    author: "Huang",
  },
  {
    _id: Date.now(),
    view_count: "99+",
    title: "小程序用途声明",
    content:
      "小程序所有图片仅限于学习交流，不允许商用,如用于商业用途，本站概不负责，谢谢！",
    create_time: Date.now(),
    author: "Huang",
  },
];
</script>

<style scoped lang="scss">
.announcementBody {
  width: 690rpx;
  height: 80rpx;
  background-color: #f9f9f9;
  border-radius: 80rpx;
  line-height: 80rpx;
  display: flex;
  margin: 0 auto;
  .left {
    width: 140rpx;
    margin-left: 10rpx;
    display: flex;
    align-items: center;
    justify-items: center;
    .title {
      color: #28b389;
      font-size: 28rpx;
      font-weight: bold;
    }
  }
  .center {
    flex: 1;
    height: initial;
  }
  .right {
    width: 70rpx;
    display: flex;
    align-items: center;
    justify-items: center;
  }
}
</style>
