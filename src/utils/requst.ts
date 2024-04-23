/* 二次封装request */

type Method = "GET" | "POST" | "PUT" | "DELETE";
type DataType = "json" | "text" | "form" | "stream" | "file" | "arraybuffer";
interface Header {
  "Content-Type": string;
  Accept: string;
  Authorization: string;
  Cookie: string;
  "User-Agent": string;
  "X-Requested-With": string;
  "X-CSRF-Token": string;
  "X-Forwarded-For": string;
  "access-key": number;
}
interface Request {
  url: string;
  method: Method;
  data?: any;
  dataType?: DataType;
  header?: Header;
}
export function Request<T>(options: Request): Promise<T> {
  const {
    method,
    data,
    dataType = "json",
    header = {
      "Content-Type": "application/json",
      "access-key": 707430,
    },
  } = options;
  const url = `https://tea.qingnian8.com/api/bizhi/${options.url}`;
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method,
      data,
      dataType,
      header,
      success: (res: any) => {
        if (res.data.errCode === 0) {
          resolve(res);
        } else if (res.data.errCode === 400) {
          uni.showToast({
            title: "小程序错误，请重新打开小程序",
            icon: "none",
          });
          reject(res.data);
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
