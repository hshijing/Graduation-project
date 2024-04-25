import { Request } from "../../utils/requst";
import { ClassifyItem } from "../classifyList/index";
//用户评分
export const SetUserScore = (data: Data): Promise<SetUserScoreRes> => {
  return Request<SetUserScoreRes>({
    url: "setupScore",
    method: "GET",
    data,
  });
};
//单个壁纸信息
export const biZhiInfo = (id: string): Promise<biZhiInfoRes> => {
  return Request<biZhiInfoRes>({
    url: "detailWall",
    method: "GET",
    data: { id },
  });
};
//壁纸下载
export const DownloadWallpaper = (data: {
  wallId: string;
  classid: string;
}): Promise<SetUserScoreRes> => {
  return Request<SetUserScoreRes>({
    url: "downloadWallpaper",
    method: "GET",
    data,
  });
};
interface Data {
  classid: string;
  wallId: string;
  userScore: string;
}
interface Res {
  cookies: any;
  errMsg: string;
  statusCode: number;
  header: any;
}
interface SetUserScoreRes extends Res {
  data: {
    errCode: number;
    errMsg: string;
    data: {
      id: string;
    };
    timeCost: number;
  };
}
interface biZhiInfoRes extends Res {
  data: {
    errCode: number;
    errMsg: string;
    data: ClassifyItem[];
  };
}
