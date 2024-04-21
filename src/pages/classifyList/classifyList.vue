<template>
  <view class="classifyList">
    <view class="content">
      <navigator
        v-for="item in 20"
        :key="item"
        url="/pages/"
        class="item"
        open-type="navigate"
        hover-class="navigator-hover"
      >
        <image class="image" src="../../static/image/preview2.jpg" mode="aspectFill" />
      </navigator>
    </view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.classifyList {
  .content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rpx;
    padding: 5rpx;
    .item {
      height: 440rpx;
      .image {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>
