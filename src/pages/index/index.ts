import { Request } from "../../utils/requst";
//获取轮播图图片
export function getHomeBarImg(): Promise<getHomeBarImgRes> {
  return Request<getHomeBarImgRes>({
    url: "homeBanner",
    method: "GET",
  });
}
//获取每日推荐图片
export function getHomeRandomImg(data:Data): Promise<getClassifyListRes> {
  return Request<getClassifyListRes>({
    url: "wallList",
    method: "GET",
    data
  });
}
//首页壁纸分类 
export function getHomeWallClass(
  options: WallClassBody
): Promise<getHomeWallClassRes> {
  return Request<getHomeWallClassRes>({
    url: "classify",
    method: "GET",
    data: options.select
      ? { select: options.select }
      : { pageNum: options.pageNum, pageSize: options.pageSize },
  });
}
interface Res {
  cookies: any;
  errMsg: string;
  statusCode: number;
  header: any;
}
interface Data {
  classid: string;
  pageNum: number;
  pageSize: number;
}
interface getClassifyListRes extends Res {
  data: {
    author: string;
    errCode: number;
    errMsg: string;
    timeCost?: number;
    data: ClassifyItem[];
    total: number;
  };
}
export interface ClassifyItem {
  description: string;
  classid: string;
  smallPicurl: string;
  tabs: [string];
  _id: string;
  score: string;
  nickname: string;
  userScore?:string
  picurl?:string
}

interface getHomeBarImgRes extends Res {
  data: {
    author: string;
    errCode: number;
    errMsg: string;
    timeCost?: number;
    data: getHomeBarImgItem[];
  };
}
interface getHomeRandomImgRes extends Res {
  data: {
    author: string;
    errCode: number;
    errMsg: string;
    timeCost?: number;
    data: getHomeRandomImgItem[];
  };
}
interface getHomeWallClassRes extends Res {
  data: {
    author: string;
    errCode: number;
    errMsg: string;
    timeCost?: number;
    data: getHomeWallClassItem[];
  };
}
export interface getHomeBarImgItem {
  picurl: string;
  sort: number;
  target: string;
  url: string;
  _id: string;
}
export interface getHomeRandomImgItem {
  description: string;
  classid: string;
  smallPicurl: string;
  tabs: [string];
  _id: string;
  score: string;
  nickname: string;
}
export interface getHomeWallClassItem {
  name: string;
  sort: number;
  picurl: string;
  select: boolean;
  updateTime: number;
  _id: string;
}
interface WallClassBody {
  pageNum?: number;
  pageSize?: number;
  select?: boolean;
}
