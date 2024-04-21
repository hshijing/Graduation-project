<template>
  <view class="row" @click="click(iconType)">
    <view class="left">
      <uni-icons
        class="icon"
        :type="iconType"
        :color="iconColor"
        :size="iconSize"
      />
      <text class="title">{{ title }}</text>
    </view>
    <view class="right">
      <text v-if="isRight" class="count">{{ count }}</text>
      <uni-icons class="icon" type="right" color="#999999" />
    </view>
  </view>
</template>

<script setup lang="ts">
const _props = defineProps({
  iconType: {
    type: String,
    default: "contact",
  },
  iconColor: {
    type: String,
    default: "#37b389",
  },
  iconSize: {
    type: Number,
    default: 20,
  },
  title: {
    type: String,
    default: "标题",
  },
  isRight: {
    type: Boolean,
    default: false,
  },
  count: {
    type: Number,
  },
});

const emit = defineEmits(["iconClick"]);

const click = (row: string) => {
  emit("iconClick", row);
};
</script>

<style scoped lang="scss">
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30rpx;
  height: 100rpx;
  border-bottom: 1px solid #eeeeee;
  .left {
    display: flex;
    align-items: center;
    .title {
      font-size: 28rpx;
      color: #666;
      margin-left: 10rpx;
    }
  }
  .right {
    font-size: 28rpx;
    color: #aaa;
  }
}
.row:hover {
  background-color: #f0eeee;
}
</style>
