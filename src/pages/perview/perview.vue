<template>
  <view class="perview">
    <my-swiper
      :isTransverse="true"
      :autoplay="false"
      :indicator="false"
      :isHomeVue="false"
      @swiperItemClick="maskChange"
    ></my-swiper>
    <!-- 遮罩层 -->
    <view class="mask" v-show="mask">
      <!-- 导航栏 -->
      <view class="back" @click="back" :style="{ top: `${statusBarHeight}px` }">
        <my-icon type="back" :size="26" color="#000" />
      </view>
      <view class="count pos">3 / 9</view>
      <view class="time pos">14:58</view>
      <view class="data pos">
        <uni-dateformat :date="Date.now()" format="M月dd日"></uni-dateformat>
      </view>
      <!-- 底部 -->
      <view class="footer pos">
        <view class="box" @click="openPopup">
          <my-icon type="info" :size="26" color="#000" />
          <text class="title">信息</text>
        </view>
        <view class="box" @click="openStar">
          <my-icon type="star" :size="26" color="#000" />
          <text class="title">评分</text> </view
        ><view class="box" @click="openDownload">
          <my-icon type="download" :size="26" color="#000" />
          <text class="title">下载</text>
        </view>
      </view>
    </view>
    <!-- 壁纸信息 -->
    <view class="popup-box">
      <uni-popup
        ref="popupBz"
        type="bottom"
        borderRadius="10rpx 10rpx 0 0"
        background-color="#fff"
      >
        <!-- 用户信息 -->
        <view class="userInfo">
          <view class="header">
            <view><!-- 占位 --></view>
            <view class="title">壁纸信息</view>
            <view class="close" @click="closePopup">
              <my-icon type="closeempty" :size="18" color="#666" />
            </view>
          </view>
          <scroll-view class="box" scroll-y>
            <view class="content">
              <view class="item">
                <text class="label">壁纸ID:</text>
                <text class="value" selectable>12312312312qwe</text>
              </view>
              <view class="item">
                <text class="label">分类:</text>
                <text class="value class">明星美女</text>
              </view>
              <view class="item">
                <text class="label">作者:</text>
                <text class="value">hhhh</text>
              </view>
              <view class="item">
                <text class="label">评分:</text>
                <view class="value rateBox">
                  <uni-rate :readonly="true" :value="2" size="16" />
                  <text class="cors">5 分</text>
                </view>
              </view>
              <view class="item">
                <text class="label">摘要:</text>
                <text class="value">1231231231</text>
              </view>
              <view class="item">
                <text class="label">标签:</text>
                <view class="value tabs">
                  <view class="tab" v-for="item in 3" :key="item">标签名</view>
                </view>
              </view>
              <view class="copyright">
                声明:本图片仅用于学习交流，禁止用于商业用途，如有侵权，请拷贝壁纸ID联系管理员删除。
                邮箱:<text :selectable="true">2097294126@qq.com</text>
              </view>
            </view>
          </scroll-view>
        </view>
      </uni-popup>
    </view>
    <!-- 评分弹窗 -->
    <view class="star-box">
      <uni-popup
        ref="popupStar"
        type="center"
        borderRadius="10rpx 10rpx 10rpx 10rpx"
        background-color="#fff"
        :is-mask-click="false"
      >
        <view class="star">
          <view class="header">
            <view class="title">壁纸评分</view>
            <view class="close" @click="closePopup">
              <my-icon type="closeempty" :size="18" color="#666" />
            </view>
          </view>
          <view class="content">
            <uni-rate
              :readonly="false"
              allowHalf
              v-model="userStar"
              size="28"
            />
            <text class="cors">{{ userStar }} 分</text>
          </view>
          <view class="footer">
            <button
              :disabled="!userStar"
              @click="starSend"
              class="btn"
              type="default"
              size="mini"
            >
              确定
            </button>
          </view>
        </view>
      </uni-popup>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { statusBarHeight } from "../../ts/navStyle";
const mask = ref(true);
//返回上一页
const back = () => uni.navigateBack({ delta: 0 });
//壁纸弹窗实例
const popupBz = ref();
const popupStar = ref();
const userStar = ref(5);
//图片点击隐藏遮罩层
const maskChange = () => {
  mask.value = !mask.value;
};
//点击图标打开弹窗
const openPopup = () => {
  popupBz.value.open();
};
//弹窗关闭
const closePopup = () => {
  popupBz.value.close();
  popupStar.value.close();
};

//评分弹窗
const openStar = () => {
  popupStar.value.open();
};
//确定评分
const starSend = () => {
  popupStar.value.close();
};
//下载弹窗
const openDownload = () => {};
</script>

<style lang="scss">
.perview {
  width: 100vw;
  height: 100vh;
  position: relative;
  .mask {
    .pos {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      backdrop-filter: 10rpx;
    }
    .back {
      position: absolute;
      left: 30rpx;
      border-radius: 50%;
      width: 38px;
      height: 38px;
      backdrop-filter: blur(10rpx);
      background: rgba(0, 0, 0, 0.1);
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .count {
      top: 10vh;
      width: fit-content;
      padding: 8rpx 28rpx;
      background: rgba(0, 0, 0, 0.2);
      font-size: 28rpx;
      border-radius: 40rpx;
    }
    .time {
      width: fit-content;
      font-size: 120rpx;
      top: calc(10vh + 80rpx);
      text-shadow: 0 4rpx rgba(0, 0, 0, 0.2);
    }
    .data {
      width: fit-content;
      font-size: 35rpx;
      top: calc(10vh + 230rpx);
      text-shadow: 0 4rpx rgba(0, 0, 0, 0.2);
    }
    .footer {
      background: rgba(255, 255, 255, 0.5);
      bottom: 10vh;
      width: 65vw;
      height: 120rpx;
      border-radius: 120rpx;
      color: #000;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rpx 12rpx;
        .title {
          font-size: 26rpx;
        }
      }
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      color: #666;
      font-size: 26rpx;
    }
    .close {
      padding: 12rpx;
    }
  }
  .userInfo {
    box-sizing: border-box;
    padding: 30rpx;
    overflow: hidden;

    .box {
      max-height: 50vh;
      .content {
        .item {
          display: flex;
          padding: 20rpx 0;
          font-size: 32rpx;
          line-height: 1.7em;
          .label {
            color: #666;
            font-size: 26rpx;
            width: 100rpx;
            text-align: left;
          }
          .rateBox {
            display: flex;
            align-items: center;
            .cors {
              margin-left: 10rpx;
              font-size: 20rpx;
              color: #333;
            }
          }
          .value {
            flex: 1;
            color: #333;
            font-size: 28rpx;
          }
          .class {
            color: #37b389;
          }
          .tabs {
            display: flex;
            flex-wrap: wrap;
            .tab {
              border: 1px solid #37b389;
              color: #37b389;
              padding: 10rpx 30rpx;
              border-radius: 40rpx;
              font-size: 22rpx;
              line-height: 1em;
              margin: 0 10rpx 10rpx 0;
            }
          }
        }
        .copyright {
          font-size: 28rpx;
          padding: 20rpx;
          background: #f6f6f6;
          color: #666;
          border-radius: 20rpx;
          margin: 20rpx 0;
          line-height: 1.6em;
        }
      }
    }
  }
  .star-box {
    .star {
      background: #fff;
      padding: 30rpx;
      widows: 60vw;
      border-radius: 30rpx;
      .content {
        display: flex;
        justify-content: center;
        align-items: center;
        .cors {
          margin-left: 10rpx;
          font-size: 28rpx;
          width: 80rpx;
          color: #ffca3e;
        }
      }
      .footer {
        display: flex;
        .btn {
          width: 200rpx;
          height: 60rpx;
          margin-top: 10rpx;
          border-radius: 20rpx;
          color: #000;
          font-size: 28rpx;
        }
      }
    }
  }
}
</style>
