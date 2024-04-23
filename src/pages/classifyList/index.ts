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
export interface ClassifyItem {
  description: string;
  classid: string;
  smallPicurl: string;
  tabs: [string];
  _id: string;
  score: string;
  nickname: string;
}
