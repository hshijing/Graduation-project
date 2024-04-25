<template>
  <view class="searchLayout">
    <!-- 搜索框 -->
    <view class="search">
      <uni-search-bar
        @confirm="onSearch"
        @cancel="onClear"
        @clear="onClear"
        focus
        placeholder="搜索"
        v-model="queryParams.keyword"
      >
      </uni-search-bar>
    </view>

    <!-- 搜索历史 -->
    <view v-if="!classList.length || noSearch">
      <view class="history" v-if="historySearch.length > 0">
        <view class="topTitle">
          <view class="text">最近搜索</view>
          <view class="icon" @click="removeHistory">
            <uni-icons type="trash" size="25"></uni-icons>
          </view>
        </view>
        <view class="tabs">
          <view
            class="tab"
            v-for="tab in historySearch"
            :key="tab"
            @click="clickTab(tab)"
            >{{ tab }}</view
          >
        </view>
      </view>

      <view class="recommend">
        <view class="topTitle">
          <view class="text">热门搜索</view>
        </view>
        <view class="tabs">
          <view
            class="tab"
            v-for="tab in recommendList"
            :key="tab"
            @click="clickTab(tab)"
            >{{ tab }}</view
          >
        </view>
      </view>
    </view>

    <!-- 搜索结果 -->
    <view v-if="noSearch" class="noSearch">
      <my-icon class="icon"  type="search" color="#999" :size="100" />
      <text class="text">没有搜索结果  换个关键词试试</text>
    </view>

    <view v-else>
      <view class="list">
        <navigator
          :url="`/pages/perview/perview?id=${item._id}&name=${queryParams.keyword}`"
          class="item"
          v-for="item in classList"
          :key="item._id"
        >
          <image
            class="image"
            @click="goToPreview"
            :src="item.smallPicurl"
            mode="aspectFill"
          ></image>
        </navigator>
      </view>
      <view v-if="noData || classList.length"
        ><uni-load-more :status="noData ? 'noMore' : 'loading'"
      /></view>
    </view>
  </view>
  <!-- 底部安全区 -->
  <view class="safe"></view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad, onUnload, onReachBottom } from "@dcloudio/uni-app";
import { getSearchBz, type ClassifyItem } from "./index";
//查询参数
const queryParams = ref({
  pageNum: 1,
  pageSize: 12,
  keyword: "",
});
//搜索历史
const historySearch = ref<string[]>(uni.getStorageSync("historySearch") || []);
//热门搜索
const recommendList = ref(["美女", "帅哥", "宠物", "动漫"]);
//没有更多
const noData = ref(false);
//没有搜索结果
const noSearch = ref(false);
const imgTotal = ref(0);
//搜索结果列表
const classList = ref([] as ClassifyItem[]);

//点击搜索
const onSearch = () => {
  //添加搜索历史
  pushSearchHistory();
  init(queryParams.value.keyword)
  //搜索壁纸
  getSearch();
};
//获取搜索壁纸
const getSearch = async () => {
  try {
    //只需要在第一次
    if (queryParams.value.pageNum === 1) {
      uni.showLoading({
        title: "搜索中...",
        mask: true,
      });
    }

    const res = await getSearchBz(queryParams.value);
    uni.hideLoading();
    classList.value = [...classList.value, ...res.data.data];
    imgTotal.value = res.data.total;
    //判断是否存在数据
    if (res.data.data.length === 0 && classList.value.length === 0) {
      noSearch.value = true;
    }
    //判断是否没有更多
    if (classList.value.length >= imgTotal.value) {
      noData.value = true;
    }
  } catch (error) {
    uni.showToast({ title: "搜索失败" });
    noSearch.value = true;
    uni.hideLoading();
    return Promise.reject(error);
  }
};

//初始化搜索
const init = (value='') => {
  classList.value = [];
  noData.value = false;
  noSearch.value = false;
  queryParams.value.keyword = value
  queryParams.value.pageNum = 1;
};


//添加搜索历史
const pushSearchHistory = () => {
  //判断是否为空
  if (queryParams.value.keyword !== "") {
    //长度限制为10
    if (historySearch.value.length >= 10) {
      historySearch.value.splice(10, 1);
    }
    //判断是否已经存在
    if (historySearch.value.includes(queryParams.value.keyword)) {
      //删除
      historySearch.value.splice(
        historySearch.value.findIndex(
          (item) => item === queryParams.value.keyword
        ),
        1
      );
    }
    //添加
    historySearch.value.unshift(queryParams.value.keyword);
    //存入缓存
    uni.setStorageSync("historySearch", historySearch.value);
  }
};
//点击清除按钮
const onClear = () => {
  noSearch.value = true;
};

//点击标签进行搜索
const clickTab = (value) => {
  //清空参数
  init(value);
  //缓存
  pushSearchHistory();
  classList.value = [];
  //切换标签
  getSearch();
};

//点击清空搜索记录
const removeHistory = () => {
  uni.showModal({
    title: "是否清空历史搜索？",
    success: (res) => {
      if (res.confirm) {
        historySearch.value = [];
        uni.setStorageSync("historySearch", []);
        uni.showToast({ title: "清除成功" });
        return;
      }
    },
  });
};
//点击图片进行预览 缓存数据->进入预览需要
const goToPreview = () => uni.setStorageSync("dataImgList", classList.value);
//触底加载更多
onReachBottom(() => {
  if (noData.value) return;
  queryParams.value.pageNum++;
  getSearch();
});

onLoad(() => {
  init();
});
//关闭有页面
onUnload(() => {
  uni.removeStorageSync("dataImgList");
});
</script>

<style lang="scss" scoped>
.searchLayout {
  .search {
    padding: 0 10rpx;
  }
  .topTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32rpx;
    color: #999;
  }
  .history {
    padding: 30rpx;
  }
  .recommend {
    padding: 30rpx;
  }
  .tabs {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding-top: 20rpx;
    .tab {
      background: #f4f4f4;
      font-size: 28rpx;
      color: #333;
      padding: 10rpx 28rpx;
      border-radius: 50rpx;
      margin-right: 20rpx;
      margin-top: 20rpx;
    }
  }
  .noSearch{
    margin-top: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon{
      margin-bottom: 20rpx;
    }
    .text{
      font-size: 30rpx;
      color: #999;
    }
  }

  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rpx;
    padding: 20rpx 5rpx;
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
