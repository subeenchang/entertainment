export interface ICondition {
  /*
      노출되는 사이트 ID
      없으면 전체 사이트 =  undefined or []
    */
  siteIds?: string;
  /*
      광고시작 일시 (yyyy-MM-dd HH:mm)
    */
  startDate?: string | null;
  /*
      광고시작 종료일시 (yyyy-MM-dd HH:mm)
    */
  endDate?: string | null;
  /*
      N일간 보여주기 (0: 무제한, 1: 하루, 2: 이틀, 3: 3일 ......)
      0 == undefined or null
    */
  daysOfNotShow?: number | null;

  /*
      TODO.. bybClientIds 클라이언트 타입변경 필요 함
    */
  bybClients?: {
    bybClientIds?: string;
    useBybClients: boolean;
  };
}
