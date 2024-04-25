import { Request } from "../../utils/requst";

export const getSearchBz = (data: Data): Promise<getSearchBzRes> => {
  return Request<getSearchBzRes>({
    url: "/searchWall",
    method: "GET",
    data,
  });
};
interface Data {
  keyword: string;
  pageNum: number;
  pageSize: number;
}
interface Res {
  cookies: any;
  errMsg: string;
  statusCode: number;
  header: any;
}
interface getSearchBzRes extends Res {
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
  userScore?: string;
  picurl?: string;
}
