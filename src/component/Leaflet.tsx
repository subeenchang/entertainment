import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect } from "react";
import { ILeaflet, ILeafletState } from "../type/Leaflet";

interface LeafletProps {
  json: string;
  setJson: React.Dispatch<React.SetStateAction<string>>;
}

export default function Leaflet({ json, setJson }: LeafletProps) {
  const [form] = Form.useForm<ILeafletState>();

  const makeJson = () => {
    const { leaflets } = form.getFieldsValue();
    setJson(
      JSON.stringify({
        leaflets: leaflets.map((leaflet) => ({
          ...leaflet,
          conditions: leaflet.conditions
            ? {
                ...leaflet.conditions,
                siteIds: leaflet.conditions.siteIds
                  ? leaflet.conditions.siteIds.split(", ")
                  : [],
                startDate: dayjs(leaflet.conditions.startDate).format(
                  "YYYYMMDDHHmm",
                ),
                endDate: dayjs(leaflet.conditions.endDate).format(
                  "YYYYMMDDHHmm",
                ),
                bybClients: {
                  ...leaflet.conditions.bybClients,
                  bybClientIds: leaflet.conditions.bybClients?.bybClientIds
                    ? leaflet.conditions.bybClients?.bybClientIds.split(", ")
                    : [],
                },
              }
            : undefined,
        })),
      }),
    );
  };

  useEffect(() => {
    if (json) {
      const jsonData = JSON.parse(json);

      form.setFieldsValue({
        leaflets: jsonData.leaflets.map((leaflet: ILeaflet) => ({
          ...leaflet,
          conditions: leaflet.conditions
            ? {
                ...leaflet.conditions,
                siteIds:
                  leaflet.conditions.siteIds.length > 0
                    ? leaflet.conditions.siteIds.join(", ")
                    : "",
                containsFreeApartment:
                  leaflet.conditions.containsFreeApartment ?? true,
                startDate: dayjs(leaflet.conditions.startDate),
                endDate: dayjs(leaflet.conditions.endDate),
                bybClients: {
                  ...leaflet.conditions.bybClients,
                  bybClientIds: leaflet.conditions.bybClients?.bybClientIds
                    ? leaflet.conditions.bybClients?.bybClientIds.join(", ")
                    : "",
                },
              }
            : undefined,
        })),
      });
    }
  }, [form, json]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 100 }}>
      <Form form={form}>
        <Form.List name="leaflets">
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
                    border: "1px solid",
                    padding: 10,
                  }}
                >
                  <Typography.Text strong>
                    광고 {field.name + 1}번
                  </Typography.Text>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Form.Item
                      name={[field.name, "leafletId"]}
                      label="leafletId"
                    >
                      <Input placeholder="leafletId" />
                    </Form.Item>
                    <Form.Item name={[field.name, "isShow"]} label="isShow">
                      <Radio.Group
                        options={[
                          { value: true, label: "공개" },
                          { value: false, label: "비공개" },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item name={[field.name, "category"]} label="category">
                      <Radio.Group
                        options={[
                          { value: "food", label: "food" },
                          { value: "wellness", label: "wellness" },
                          { value: "edu", label: "edu" },
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <Divider style={{ margin: 0 }} />
                  <Form.Item
                    name={[field.name, "conditions", "siteIds"]}
                    label="siteIds"
                  >
                    <TextArea placeholder="예) EDGE186, EDGE205, EDGE428, EDGE13" />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, "conditions", "containsFreeApartment"]}
                    label="containsFreeApartment"
                  >
                    <Radio.Group
                      options={[
                        { value: true, label: "포함" },
                        { value: false, label: "미포함" },
                      ]}
                    />
                  </Form.Item>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Form.Item
                      name={[field.name, "conditions", "startDate"]}
                      label="startDate"
                    >
                      <DatePicker
                        format="YYYY-MM-DD HH:mm"
                        showTime
                        placeholder="startDate"
                      />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, "conditions", "endDate"]}
                      label="endDate"
                    >
                      <DatePicker
                        format="YYYY-MM-DD HH:mm"
                        showTime
                        placeholder="endDate"
                      />
                    </Form.Item>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Form.Item
                      name={[
                        field.name,
                        "conditions",
                        "bybClients",
                        "bybClientIds",
                      ]}
                      label="bybClientIds"
                    >
                      <Input placeholder="예) BYB, IS_DONGSEO" />
                    </Form.Item>
                    <Form.Item
                      name={[
                        field.name,
                        "conditions",
                        "bybClients",
                        "useBybClients",
                      ]}
                      label="useBybClients"
                    >
                      <Radio.Group
                        options={[
                          { value: true, label: "사용" },
                          { value: false, label: "미사용" },
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <Divider style={{ margin: 0 }} />
                  <Form.Item name={[field.name, "title"]} label="title">
                    <Input placeholder="title" />
                  </Form.Item>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Form.Item
                      name={[field.name, "kakaoLink"]}
                      label="kakaoLink"
                    >
                      <Input
                        placeholder="kakaoLink"
                        style={{ width: "50vw" }}
                      />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, "phoneNumber"]}
                      label="phoneNumber"
                    >
                      <Input placeholder="phoneNumber" />
                    </Form.Item>
                  </div>
                  <Button onClick={() => remove(field.name)}>삭제</Button>
                </div>
              ))}
              <Button
                onClick={() =>
                  add({
                    isShow: true,
                    conditions: { bybClients: { useBybClients: false } },
                  })
                }
              >
                추가
              </Button>
            </div>
          )}
        </Form.List>
      </Form>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Button onClick={makeJson}>JSON 생성</Button>
        <TextArea
          value={json}
          style={{ height: 400 }}
          onChange={(e) => setJson(e.target.value)}
        />
      </div>
    </div>
  );
}
