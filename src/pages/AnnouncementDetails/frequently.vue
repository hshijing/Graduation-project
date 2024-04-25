<template>
  <view class="frequently">
    <view class="header">
      <view class="title">常见问题</view>
      <view class="desc">
        <text class="nickName">Huang</text>
        <text class="time"> 2024-4-25 19:30:42 </text>
      </view>
    </view>
    <view class="list">
      <view class="item" v-for="item in data" :key="item.title">
        <view class="title">{{ item.title }}</view>
        <text class="content"> {{ item.content }} </text>
      </view>
    </view>
  </view>
  <view class="safe"></view>
</template>

<script lang="ts" setup>
const data = [
  {
    title: "壁纸是否可以免费使用？",
    content:
      "小程序/H5内所有图片均可免费使用,但是图片版权属于上传者或者图片来源者,下载的图片仅限自己欣赏或个人使用,如用于其他用途，一切后果本站概不负责",
  },
  {
    title: "进入预览后,图片无法显示?",
    content:
      "壁纸图片体积比较大,受到服务器带宽以及您的网络环境的影响，图片加载需要一定的时间，请耐心等待,如果图片还是无法啊显示。请检查网络是否正常刷新页面,或者联系管理员vx:H101914_",
  },
  {
    title: "图片版权声明",
    content:
      "图片来源于网络,监管无法及时,如果您觉得图片侵犯到了您的权益,请提供侵权证据联系管理员vx:H101914_",
  },
];
</script>

<style lang="scss">
.frequently {
  width: 750rpx;
  height: 100vh;
  background: #fff;
  padding: 20rpx;
  .header {
    .title {
      font-size: 40rpx;
      font-weight: 600;
    }
    .desc {
      margin-top: 10rpx;
      .nickName {
        color: #999;
      }
      .time {
        margin-left: 18rpx;
        color: #999;
      }
    }
  }
  .list {
    .item {
      margin-top: 50rpx;
      .title {
        font-size: 32rpx;
        font-weight: 600;
      }
      .content {
        padding: 20rpx 30rpx;
        color: #999;
      }
    }
  }
}
</style>
