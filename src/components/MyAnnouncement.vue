<template>
  <view class="announcementBody">
    <view class="left">
      <MyIcon type="sound-filled" color="#28b389" :size="20"/>
      <text class="title">公告</text>
    </view>
    <view class="center">
      <my-swiper class="swiper"  :isTransverse="false" :announcementData="announcementData"/>
    </view>
    <view class="right">></view>
  </view>
</template>

<script setup lang="ts">
//公告数据
const announcementData=[
  {
    id:1,
    text:'关于系统升级的通知12312321312312312',
  },
  {
    id:2,
    text:'公告2',
  },
  {
    id:3,
    text:'公告3',
  },
  {
    id:4,
    text:'耳机how i七二九七我饿环球网joie后切后i去',
  }
]
</script>

<style scoped lang="scss">
.announcementBody{
  width: 690rpx;
  height: 80rpx;
  background-color: #f9f9f9;
  border-radius: 80rpx;
  line-height: 80rpx;
  display: flex;
  margin: 0 auto;
  .left{
    width: 140rpx;
    margin-left: 10rpx;
    display: flex;
    align-items: center;
    justify-items: center;
    .title{
      color: #28b389;
      font-size: 28rpx;
      font-weight: bold;
    }
  }
  .center{
    flex: 1;
  }
  .right{
    width: 70rpx;
    display: flex;
    align-items: center;
    justify-items: center;
  }
}
</style>
