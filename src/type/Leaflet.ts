import { ICondition } from "./Condition";

export interface ILeafletState {
  categories: {
    categoryId: string;
    categoryName: string;
    description: string;
  }[];
  leaflets: IFormLeaflet[];
}

export interface IFormLeaflet {
  /*
    광고 ID
    유니크한 값으로 설정 해야함
  */
  leafletId: string;
  /*
    광고 카테고리
  */
  categoryId: string;
  /*
      광고 제목
    */
  title: string;
  /*
     링크
    */
  link?: string;
  /*
      전화번호
    */
  phoneNumber?: string;
  /*
      광고 조건
      조건 없으면 무조건 실행
    */
  conditions?: ICondition;
  isShow: boolean;
}

export interface ILeaflet {
  bannerId: number;
  title: string;
  kakaoLink?: string;
  phoneNumber?: string;
  conditions?: Omit<ICondition, "siteIds" | "bybClients"> & {
    siteIds: string[];
    bybClients?: {
      bybClientIds?: string[];
      useBybClients: boolean;
    };
  };
  isShow: boolean;
}
