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
    <div style={{ display: "flex", flexDirection: "column", gap: 100 }}>
      <Form form={form}>
        <Form.List name="magazines">
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
                    배너 {field.name + 1}번
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
                  <Form.Item
                    name={[field.name, "conditions", "siteIds"]}
                    label="siteIds"
                  >
                    <TextArea placeholder="예) EDGE186, EDGE205, EDGE428, EDGE13" />
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
                  <div style={{ display: "flex", gap: 10 }}>
                    <Form.Item name={[field.name, "href"]} label="href">
                      <Input placeholder="href" style={{ width: "50vw" }} />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, "buttonTitle"]}
                      label="buttonTitle"
                    >
                      <Input placeholder="buttonTitle" />
                    </Form.Item>
                  </div>
                  <Button onClick={() => remove(field.name)}>삭제</Button>
                </div>
              ))}
              <Button
                onClick={() =>
                  add({
                    isShow: true,
                    conditions: {
                      bybClients: { useBybClients: false },
                    },
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
