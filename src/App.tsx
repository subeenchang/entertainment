import dayjs from "dayjs";
import "dayjs/locale/ko";
import duration from "dayjs/plugin/duration";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import "./App.css";
import Banner from "./component/Banner";
import { useEffect, useState } from "react";
import { Button, message } from "antd";
import PopUp from "src/component/PopUp";
import Magazine from "src/component/Magazine";
import TextArea from "antd/es/input/TextArea";
import { IPopUpState } from "src/type/PopUp";
import { IBannerState } from "src/type/Banner";
import { IMagazineState } from "src/type/Magazine";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ko");
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(duration);
dayjs.extend(isBetween);
dayjs.extend(relativeTime);

function App() {
  const [type, setType] = useState<"POPUP" | "BANNER" | "MAGAZINE" | "ALL">(
    "POPUP",
  );

  const [json, setJson] = useState("");
  const [popUpJson, setPopUpJson] = useState("");
  const [bannerJson, setBannerJson] = useState("");
  const [magazineJson, setMagazineJson] = useState("");

  const saveData = (init?: string) => {
    try {
      const localData = JSON.parse(
        localStorage.getItem("entertainment") ?? init ?? "",
      ) as {
        popUpState: IPopUpState;
        bannerState: IBannerState;
        magazineState: IMagazineState;
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
    } catch {
      setJson("");
    }
  };

  useEffect(() => {
    if (popUpJson && bannerJson && magazineJson) {
      const popUpState = JSON.parse(popUpJson);
      const bannerState = JSON.parse(bannerJson);
      const magazineState = JSON.parse(magazineJson);

      const data = JSON.stringify({
        popUpState,
        bannerState,
        magazineState,
      });
      setJson(data);
      message.info("Local Storage에 저장됨");
      localStorage.setItem("entertainment", data);
    }
  }, [popUpJson, bannerJson, magazineJson]);

  useEffect(() => {
    saveData();
  }, []);

  return (
    <div style={{ margin: 30 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
        {type === "ALL" && (
          <>
            <TextArea
              value={json}
              onChange={(e) => saveData(e.target.value)}
              style={{ height: 1000 }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
