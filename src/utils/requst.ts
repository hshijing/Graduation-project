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
  "access-key":number
}
interface Request {
  url: string;
  method: Method;
  data?: any;
  dataType?: DataType;
  header?: Header;
}
export function Request(options: Request) {
  const {
    url,
    method,
    data,
    dataType = "json",
    header = {
      "Content-Type": "application/json",
      "access-key":120853
    },
  } = options;
  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method,
      data,
      dataType,
      header,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
      complete: (res) => {
        resolve(res);
      },
    });
  });
}
