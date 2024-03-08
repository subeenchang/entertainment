import { Button, Divider, Form, Input, Radio, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect } from "react";
import PopContent from "src/component/PopContent";
import Conditions, { DEFAULT_VALUE } from "src/component/shared/Conditions";
import { IPopUp, IPopUpState } from "src/type/PopUp";

interface PopUpProps {
  json: string;
  setJson: React.Dispatch<React.SetStateAction<string>>;
}

export default function PopUp({ json, setJson }: PopUpProps) {
  const [form] = Form.useForm<IPopUpState>();

  const makeJson = () => {
    const { popUps } = form.getFieldsValue();
    setJson(
      JSON.stringify({
        popUps: popUps.map((popUp) => ({
          ...popUp,
          conditions: popUp.conditions
            ? {
                ...popUp.conditions,
                siteIds: popUp.conditions.siteIds
                  ? popUp.conditions.siteIds.split(", ")
                  : [],
                startDate: dayjs(popUp.conditions.startDate).format(
                  "YYYYMMDDHHmm",
                ),
                endDate: dayjs(popUp.conditions.endDate).format("YYYYMMDDHHmm"),
                bybClients: {
                  ...popUp.conditions.bybClients,
                  bybClientIds: popUp.conditions.bybClients?.bybClientIds
                    ? popUp.conditions.bybClients?.bybClientIds.split(", ")
                    : [],
                },
              }
            : undefined,
        })),
        enabled: true,
      }),
    );
  };

  useEffect(() => {
    if (json) {
      const jsonData = JSON.parse(json);

      form.setFieldsValue({
        popUps: jsonData.popUps.map((popUp: IPopUp) => ({
          ...popUp,
          conditions: popUp.conditions
            ? {
                ...popUp.conditions,
                siteIds:
                  popUp.conditions.siteIds.length > 0
                    ? popUp.conditions.siteIds.join(", ")
                    : "",
                containsFreeApartment:
                  popUp.conditions.containsFreeApartment ?? true,
                startDate: dayjs(popUp.conditions.startDate),
                endDate: dayjs(popUp.conditions.endDate),
                bybClients: {
                  ...popUp.conditions.bybClients,
                  bybClientIds: popUp.conditions.bybClients?.bybClientIds
                    ? popUp.conditions.bybClients?.bybClientIds.join(", ")
                    : "",
                },
              }
            : undefined,
        })),
        enabled: true,
      });
    }
  }, [form, json]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 100 }}>
      <Form form={form}>
        <Form.List name="popUps">
          {(fields, { add, remove }) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                overflow: "auto",
                height: "80vh",
              }}
            >
              {fields.map((field) => (
                <div
                  key={field.key}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    border: "1px solid #007AFF",
                    padding: 10,
                  }}
                >
                  <Typography.Text strong>
                    팝업 {field.name + 1}번
                  </Typography.Text>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Form.Item name={[field.name, "popUpId"]} label="popUpId">
                      <Input placeholder="popUpId" />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, "mainTitle"]}
                      label="mainTitle"
                    >
                      <Input placeholder="mainTitle" />
                    </Form.Item>
                    <Form.Item name={[field.name, "isShow"]} label="isShow">
                      <Radio.Group
                        options={[
                          { value: true, label: "공개" },
                          { value: false, label: "비공개" },
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <Divider style={{ margin: 0 }} />
                  <PopContent index={field.name} />
                  <Divider style={{ margin: 0 }} />
                  <Conditions index={field.name} />
                  <Button
                    danger
                    type="primary"
                    onClick={() => remove(field.name)}
                  >
                    삭제
                  </Button>
                </div>
              ))}
              <Button onClick={() => add(DEFAULT_VALUE)}>추가</Button>
            </div>
          )}
        </Form.List>
      </Form>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Button type="primary" onClick={makeJson}>
          JSON 생성
        </Button>
        <TextArea
          value={json}
          style={{ height: 200 }}
          onChange={(e) => setJson(e.target.value)}
          readOnly
        />
      </div>
    </div>
  );
}
