import { Request } from "../../utils/requst";

// 获取用户信息
export const ReqGetUserInfo = (): Promise<getUserInfoRes> => {
  return Request<getUserInfoRes>({
    url: "userInfo",
    method: "GET",
  });
};



interface Res {
  cookies: any;
  errMsg: string;
  statusCode: number;
  header: any;
}
interface getUserInfoRes extends Res {
  data: {
    author: string;
    errCode: number;
    errMsg: string;
    timeCost?: number;
    data: UserInfo;
    total: number;
  };
}
export interface UserInfo {
  IP: string;
  address: {
    country: string;
    province: string;
    city: string;
  };
  downloadSize: number;
  scoreSize: number;
}


export interface Icons {
  icon: string;
  title: string;
  isRight: boolean;
  count?: number;
  type?: "score" | "download";
}
export type IconList = Icons[];


//底部

export const iconsBottom: IconList = [
  {
    icon: "chatboxes-filled",
    title: "联系我们",
    isRight: false,
  },
  {
    icon: "flag-filled",
    title: "常见问题",
    isRight: false,
  },
];
