import { Button, Divider, Form, Input, Radio, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect } from "react";
import CategoryList from "src/component/shared/CategoryList";
import Conditions, { DEFAULT_VALUE } from "src/component/shared/Conditions";
import { ILeaflet, ILeafletState } from "../type/Leaflet";

interface LeafletProps {
  json: string;
  setJson: React.Dispatch<React.SetStateAction<string>>;
}

export default function Leaflet({ json, setJson }: LeafletProps) {
  const [form] = Form.useForm<ILeafletState>();
  const categories = Form.useWatch("categories", form);

  const makeJson = () => {
    const { categories, leaflets } = form.getFieldsValue();
    setJson(
      JSON.stringify({
        categories,
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
        categories: jsonData.categories,
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
        <span style={{ fontWeight: 700, fontSize: 20 }}>카테고리 목록</span>
        <CategoryList />
        <div style={{ marginBottom: "20px" }} />
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
                    border: "1px solid #007AFF",
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
                    <Form.Item
                      name={[field.name, "categoryId"]}
                      label="category"
                    >
                      <Radio.Group
                        options={categories.map((category) => ({
                          value: category.categoryId,
                          label: category.categoryName,
                        }))}
                      />
                    </Form.Item>
                  </div>
                  <Divider style={{ margin: 0 }} />
                  <Conditions index={field.name} />
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
                        style={{ width: "400px" }}
                      />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, "phoneNumber"]}
                      label="phoneNumber"
                    >
                      <Input placeholder="phoneNumber" />
                    </Form.Item>
                  </div>
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
