<template>
  <uni-icons
    :type="type"
    :size="size"
    :color="color"
    @click="click"
  ></uni-icons>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: "info",
  },
  size: {
    type: Number,
    default: 20,
  },
  color: {
    type: String,
    default: "#37b389",
  },
});
const emit = defineEmits<{ iconClick: [] }>();
const click = () => {
  emit("iconClick");
};
</script>

<style scoped lang="scss"></style>
