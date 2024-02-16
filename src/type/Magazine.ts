import { ICondition } from "./Condition";

export interface IMagazineState {
  magazines: IFormMagazine[];
}

export interface IFormMagazine {
  /*
      배너 ID
      유니크한 값으로 설정 해야함
    */
  magazineId: number;
  /*
      외부 링크
    */
  href?: string;
  /*
      버튼 타이틀
    */
  buttonTitle?: string;
  /*
      노출 순서
    */
  displayOrder: number;
  /*
      배너 조건
      조건 없으면 무조건 실행
    */
  conditions?: ICondition;
  isShow: boolean;
}

export interface IMagazine {
  magazineId: number;
  href?: string;
  buttonTitle?: string;
  displayOrder: number;
  conditions?: Omit<ICondition, "siteIds" | "bybClients"> & {
    siteIds: string[];
    bybClients?: {
      bybClientIds?: string[];
      useBybClients: boolean;
    };
  };
  isShow: boolean;
}
