// 팝업관리 > 광고정보[] > 팝업이미지[]

import { ICondition } from "src/type/Condition";

// 팝업을 관리하는 메인 상태
export interface IPopUpState {
  popUps: IFormPopUp[];
}

// 광고 정보
export interface IFormPopUp {
  /*
    광고 ID
    유니크한 값으로 설정 해야함
  */
  popUpId: string;
  /*
    메인 타이틀 (광고 타이틀)
  */
  mainTitle?: string;
  /*
    광고 내용
  */
  contents: IPopUpContent[];
  /*
    광고조건
    조건 없으면 무조건 실행
  */
  conditions?: ICondition;

  isShow: boolean;
}

export interface IPopUpContent {
  title?: string;
  src: string;
  href?: string;
  alt?: string;
  isShow: boolean;
}

export interface IPopUp {
  popUpId: string;
  mainTitle?: string;
  contents: IPopUpContent[];
  conditions?: Omit<ICondition, "siteIds" | "bybClients"> & {
    siteIds: string[];
    bybClients?: {
      bybClientIds?: string[];
      useBybClients: boolean;
    };
  };
  isShow: boolean;
}
