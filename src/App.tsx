import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import duration from "dayjs/plugin/duration";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useCallback, useEffect, useState } from "react";
import Magazine from "src/component/Magazine";
import PopUp from "src/component/PopUp";
import { IBannerState } from "src/type/Banner";
import { IMagazineState } from "src/type/Magazine";
import { IPopUpState } from "src/type/PopUp";
import "./App.css";
import Banner from "./component/Banner";
import { ILeafletState } from "src/type/Leaflet";
import Leaflet from "src/component/Leaflet";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ko");
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(duration);
dayjs.extend(isBetween);
dayjs.extend(relativeTime);

function App() {
  const [type, setType] = useState<
    "POPUP" | "BANNER" | "MAGAZINE" | "LEAFLET" | "ALL"
  >("POPUP");

  const [json, setJson] = useState("");
  const [popUpJson, setPopUpJson] = useState("");
  const [bannerJson, setBannerJson] = useState("");
  const [magazineJson, setMagazineJson] = useState("");
  const [leafletJson, setLeafletJson] = useState("");

  const fetchData = (init?: string) => {
    try {
      const localData = JSON.parse(
        init || (localStorage.getItem("entertainment") ?? ""),
      ) as {
        popUpState: IPopUpState;
        bannerState: IBannerState;
        magazineState: IMagazineState;
        leafletState: ILeafletState;
      };

      setPopUpJson(
        JSON.stringify(
          Object.keys(localData?.popUpState ?? {}).length === 0
            ? { popUps: [] }
            : localData?.popUpState,
        ),
      );
      setBannerJson(
        JSON.stringify(
          Object.keys(localData?.bannerState ?? {}).length === 0
            ? { banners: [] }
            : localData?.bannerState,
        ),
      );
      setMagazineJson(
        JSON.stringify(
          Object.keys(localData?.magazineState ?? {}).length === 0
            ? { magazines: [] }
            : localData?.magazineState,
        ),
      );
      setLeafletJson(
        JSON.stringify(
          Object.keys(localData?.leafletState ?? {}).length === 0
            ? { leaflets: [] }
            : localData?.leafletState,
        ),
      );
    } catch {
      setJson("");
    }
  };

  const saveData = useCallback(() => {
    if (popUpJson && bannerJson && magazineJson && leafletJson) {
      const popUpState = JSON.parse(popUpJson);
      const bannerState = JSON.parse(bannerJson);
      const magazineState = JSON.parse(magazineJson);
      const leafletState = JSON.parse(leafletJson);

      const data = JSON.stringify({
        popUpState,
        bannerState,
        magazineState,
        leafletState,
      });
      setJson(data);
      localStorage.setItem("entertainment", data);
    }
  }, [popUpJson, bannerJson, magazineJson, leafletJson]);

  useEffect(() => {
    fetchData(json);
  }, [json]);

  useEffect(() => {
    saveData();
  }, [saveData]);

  return (
    <div style={{ margin: 30 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 10 }}>
            <Button
              onClick={() => setType("POPUP")}
              type={type === "POPUP" ? "primary" : "default"}
            >
              팝업
            </Button>
            <Button
              onClick={() => setType("BANNER")}
              type={type === "BANNER" ? "primary" : "default"}
            >
              생활제안 배너
            </Button>
            <Button
              onClick={() => setType("MAGAZINE")}
              type={type === "MAGAZINE" ? "primary" : "default"}
            >
              생활제안 매거진
            </Button>
            <Button
              onClick={() => setType("LEAFLET")}
              type={type === "LEAFLET" ? "primary" : "default"}
            >
              프로모션 광고
            </Button>
          </div>
          <Button
            onClick={() => {
              setType("ALL");
              saveData();
            }}
            type={type === "ALL" ? "primary" : "default"}
          >
            전체 JSON
          </Button>
        </div>
        <a href="https://jsonformatter.org/json-pretty-print">JSON Prettier</a>
        {type === "POPUP" && <PopUp json={popUpJson} setJson={setPopUpJson} />}
        {type === "BANNER" && (
          <Banner json={bannerJson} setJson={setBannerJson} />
        )}
        {type === "MAGAZINE" && (
          <Magazine json={magazineJson} setJson={setMagazineJson} />
        )}
        {type === "LEAFLET" && (
          <Leaflet json={leafletJson} setJson={setLeafletJson} />
        )}
        {type === "ALL" && (
          <>
            <TextArea
              value={json}
              onChange={(e) => setJson(e.target.value)}
              style={{ height: 1000 }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
