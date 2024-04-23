<template>
  <view class="layout">
    <view class="title">
      <view class="tag">
        <uni-tag :inverted="true" text="置顶" type="error" />
      </view>
      <view class="font">{{ Detail.title }}</view>
    </view>
    <view class="info">
      <view>
        <text> 作者: </text>
        <text class="item">{{ Detail.author }}</text></view
      >
    </view>
    <text :selectable="true" class="content">{{ Detail.content }}</text>
    <view class="footer">
      <text>发布时间:</text>
      <uni-dateformat :date="Detail.create_time" format="yyyy/MM/dd hh:mm:ss" />
      <my-icon class="icon" type="eye-filled" :size="20" color="#999" />
      <view> {{ Detail.view_count }} </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { type NoticeItem } from "../../components/MyAnnouncement.vue";
const Detail = ref({} as NoticeItem);
onLoad(() => {
  //在要跳转入的页面中
  uni.$on("NoticeItem", (data: NoticeItem) => {
    Detail.value = data;
  });
  uni.$emit("test");
});
</script>

<style scoped lang="scss">
.layout {
  padding: 30rpx;
  .title {
    font-size: 40rpx;
    color: #111;
    line-height: 1.6em;
    padding-bottom: 30rpx;
    display: flex;
    align-items: center;
    .tag {
      transform: scale(0.8);
      transform-origin: left center;
      flex-shrink: 0;
    }
    .font {
      padding-left: 6rpx;
    }
  }
  .info {
    display: flex;
    align-items: center;
    color: #999;
    font-size: 28rpx;
    .item {
      padding-right: 200rpx;
      font-size: 40rpx;
      color: #000;
    }
  }
  .content {
    padding: 50rpx 0;
  }
  .footer {
    margin-top: 100rpx;
    display: flex;
    align-items: center;
    font-size: 26rpx;
    color: #999;
    display: flex;
    align-items: center;
    .icon {
      margin-left: 20rpx;
    }
    .count {
      color: #999;
      font-size: 20rpx;
    }
  }
}
</style>
