//获取状态栏高度
import { computed } from "vue";
export const statusBarHeight = computed(() => {
  return uni.getSystemInfoSync().statusBarHeight || 40;
});
export const MenuHeight = computed(() => {
  if (uni.getMenuButtonBoundingClientRect) {
    const { top, height } = uni.getMenuButtonBoundingClientRect();
    return height + (top - statusBarHeight.value) * 2;
  }
  return 40;
});

export const NavHeight = computed(() => {
  return MenuHeight.value + statusBarHeight.value;
});



