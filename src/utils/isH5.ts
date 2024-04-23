export function isH5() {
  const environment: any = uni.getSystemInfoSync();
  if (environment.ua) {
    //h5
    return true;
  } else {
    return false;
  }
}
