import { Request } from "../../utils/requst";

export const getClassifyList = async (
  data: Data
): Promise<getClassifyListRes> => {
  return Request<getClassifyListRes>({
    url: "/wallList",
    method: "GET",
    data,
  });
};
//获取用户的下载列表与评分列表
export const getUserScore = (data: ScoreDate): Promise<getUserScoreRes> => {
  return Request<getUserScoreRes>({
    url: "userWallList",
    method: "GET",
    data,
  });
};
interface Data {
  classid: string;
  pageNum: number;
  pageSize: number;
}
interface Res {
  cookies: any;
  errMsg: string;
  statusCode: number;
  header: any;
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

interface ScoreDate {
  type: "score" | "download";
  pageNum: number;
  pageSize: number;
}
interface getUserScoreRes extends Res {
  data: {
    errCode: number;
    errMsg: string;
    timeCost: number;
    data: UserScore[];
  };
}
export interface UserScore {
  classid: string;
  createTime: number;
  userScore: string;
  _id: string;
  classname: string;
  description: string;
  nickname: string;
  score: string;
  smallPicurl: string;
  tabs: [string];
}
export interface ClassifyItem {
  description: string;
  classid: string;
  smallPicurl: string;
  tabs: [string];
  _id: string;
  score: string;
  nickname: string;
  userScore?: string;
  picurl?: string;
}
