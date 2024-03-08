import { Button, Divider, Form, Input, Radio, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect } from "react";
import Conditions, { DEFAULT_VALUE } from "src/component/shared/Conditions";
import { IMagazine, IMagazineState } from "src/type/Magazine";

interface MagazineProps {
  json: string;
  setJson: React.Dispatch<React.SetStateAction<string>>;
}

export default function Magazine({ json, setJson }: MagazineProps) {
  const [form] = Form.useForm<IMagazineState>();

  const makeJson = () => {
    const { magazines } = form.getFieldsValue();
    setJson(
      JSON.stringify({
        magazines: magazines.map((magazine) => ({
          ...magazine,
          conditions: magazine.conditions
            ? {
                ...magazine.conditions,
                siteIds: magazine.conditions.siteIds
                  ? magazine.conditions.siteIds.split(", ")
                  : [],
                startDate: dayjs(magazine.conditions.startDate).format(
                  "YYYYMMDDHHmm",
                ),
                endDate: dayjs(magazine.conditions.endDate).format(
                  "YYYYMMDDHHmm",
                ),
                bybClients: {
                  ...magazine.conditions.bybClients,
                  bybClientIds: magazine.conditions.bybClients?.bybClientIds
                    ? magazine.conditions.bybClients?.bybClientIds.split(", ")
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
        magazines: jsonData.magazines.map((magazine: IMagazine) => ({
          ...magazine,
          conditions: magazine.conditions
            ? {
                ...magazine.conditions,
                siteIds:
                  magazine.conditions.siteIds.length > 0
                    ? magazine.conditions.siteIds.join(", ")
                    : "",
                containsFreeApartment:
                  magazine.conditions.containsFreeApartment ?? true,
                startDate: dayjs(magazine.conditions.startDate),
                endDate: dayjs(magazine.conditions.endDate),
                bybClients: {
                  ...magazine.conditions.bybClients,
                  bybClientIds: magazine.conditions.bybClients?.bybClientIds
                    ? magazine.conditions.bybClients?.bybClientIds.join(", ")
                    : "",
                },
              }
            : undefined,
        })),
      });
    }
  }, [form, json]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <Form form={form}>
        <Form.List name="magazines">
          {(fields, { add, remove }) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                overflow: "auto",
                height: 540,
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
                    매거진 {field.name + 1}번
                  </Typography.Text>
                  <div style={{ display: "flex", gap: 10 }}>
                    <Form.Item
                      name={[field.name, "magazineId"]}
                      label="magazineId"
                    >
                      <Input placeholder="magazineId" />
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
                  <Conditions index={field.name} />
                  <Divider style={{ margin: 0 }} />
                  <div style={{ display: "flex", gap: 10 }}>
                    <Form.Item name={[field.name, "href"]} label="href">
                      <Input placeholder="href" style={{ width: "400px" }} />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, "buttonTitle"]}
                      label="buttonTitle"
                    >
                      <Input placeholder="buttonTitle" />
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
      <Divider style={{ background: "#8294ba" }} />
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
