<template>
  <view class="classifyList">
    <view v-if="dataImgList.length === 0 && !noData">
      <uni-load-more status="loading" />
    </view>
    <view class="content" v-else>
      <view v-for="item in dataImgList" :key="item._id" class="item">
        <image
          @click="goToPerview(item)"
          class="image"
          :src="item.smallPicurl"
          mode="aspectFill"
        />
      </view>
    </view>
    <!-- 当前已经加载图片完成且已经全部加载了 -->
    <view>
      <uni-load-more
        :status="imgTotal === dataImgList.length ? 'noMore' : 'loading'"
      />
    </view>
    <view class="safe"><!-- 底部安全区域 --></view>
  </view>
</template>

<script lang="ts" setup>
import {
  onLoad,
  onUnload,
  onReachBottom,
  onShareAppMessage,
} from "@dcloudio/uni-app";
import {
  getClassifyList,
  getUserScore,
  type ClassifyItem,
} from "./index";
import { ref } from "vue";
//数据
const params = ref({
  classid: "",
  pageNum: 1,
  pageSize: 12,
  type: "",
});
//优化触底网络请求
const noData = ref(false);
const dataImgList = ref([] as ClassifyItem[]);
const imgTotal = ref(0);
const currIndexName = ref("");
//监听页面加载
onLoad((res) => {
  currIndexName.value = res.name;
  if (res.type) {
    imgTotal.value = parseInt(res.total)
    params.value.type = res.type;
  }
  if (res.id) {
    params.value.classid = res.id;
  }
  getData(params.value);
  //设置标题
  uni.setNavigationBarTitle({
    title: currIndexName.value,
  });
});
//上拉加载 类似于监听滚动条到底刷新拿新图片
onReachBottom(() => {
  //判断是否还有数据
  if (noData.value) return;
  params.value.pageNum++;
  getData(params.value);
});

onUnload(() => {
  uni.removeStorageSync("dataImgList");
});


//获取分类图片
const getData = async (params) => {
  let result;
  if (params.type) {
    result = await getUserScore(params);
  } else {
    result = await getClassifyList(params);
    imgTotal.value = result.data.total;
  }
  dataImgList.value = [...dataImgList.value, ...result.data.data];

  uni.setStorageSync("dataImgList", dataImgList.value);
  //判断是否还有数据
  if (dataImgList.value.length >= imgTotal.value) {
    noData.value = true;
  }
};

//预览
const goToPerview = (item: ClassifyItem) => {
  uni.navigateTo({
    url: `/pages/perview/perview?id=${item._id}`,
  });
};
//分享给朋友
onShareAppMessage(() => {
  return {
    title: `精选分类,${currIndexName.value}`,
    path: `/pages/classifyList/classifyList?id=${params.value.classid}&name=${currIndexName.value}`,
  };
});
</script>

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
