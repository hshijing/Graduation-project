export function formatDate(updateTime:number) {
  // 获取当前时间的时间戳（毫秒）
  const currentTime = Date.now();
  // 计算时间差（单位：毫秒）
  const timeDifference = currentTime - updateTime;
  // 转换时间差为几天前的格式
  if (timeDifference < 0) {
    return "未来时间";
  }
  switch (true) {
    case timeDifference < 60000: // 一分钟内
      return "刚刚";
    case timeDifference < 3600000: // 超过一分钟少于1小时
      return Math.ceil(timeDifference / 60000) + "分钟前";
    case timeDifference < 86400000: // 超过1小时少于24小时
      return Math.ceil(timeDifference / 3600000) + "小时前";
    default:
      return Math.ceil(timeDifference / 86400000) + "天前";
  }
  //如果这种判断 是否可以直接用对象映射
 /*  const timeMap = {
    60000: "刚刚",
    3600000: `${(timeDifference / 60000).toFixed(0)}分钟前`,
    86400000: `${(timeDifference / 3600000).toFixed(0)}小时前`,
    864000000: `${(timeDifference / 86400000).toFixed(0)}天前`,
  };

  for (const key in timeMap) {
    if (timeDifference < parseInt(key)) {
      return timeMap[key];
    } else {
      return `${(timeDifference / 86400000).toFixed(0)}天前`;
    }
  } */
}
