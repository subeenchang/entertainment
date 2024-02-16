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
import { IBanner, IBannerState } from "../type/Banner";

interface BannerProps {
  json: string;
  setJson: React.Dispatch<React.SetStateAction<string>>;
}

export default function Banner({ json, setJson }: BannerProps) {
  const [form] = Form.useForm<IBannerState>();

  const makeJson = () => {
    const { banners } = form.getFieldsValue();
    setJson(
      JSON.stringify({
        banners: banners.map((banner) => ({
          ...banner,
          conditions: banner.conditions
            ? {
                ...banner.conditions,
                siteIds: banner.conditions.siteIds
                  ? banner.conditions.siteIds.split(", ")
                  : [],
                startDate: dayjs(banner.conditions.startDate).format(
                  "YYYYMMDDHHmmss",
                ),
                endDate: dayjs(banner.conditions.endDate).format(
                  "YYYYMMDDHHmmss",
                ),
                bybClients: {
                  ...banner.conditions.bybClients,
                  bybClientIds: banner.conditions.bybClients?.bybClientIds
                    ? banner.conditions.bybClients?.bybClientIds.split(", ")
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
        banners: jsonData.banners.map((banner: IBanner) => ({
          ...banner,
          conditions: banner.conditions
            ? {
                ...banner.conditions,
                siteIds:
                  banner.conditions.siteIds.length > 0
                    ? banner.conditions.siteIds.join(", ")
                    : "",
                startDate: dayjs(banner.conditions.startDate),
                endDate: dayjs(banner.conditions.endDate),
                bybClients: {
                  ...banner.conditions.bybClients,
                  bybClientIds: banner.conditions.bybClients?.bybClientIds
                    ? banner.conditions.bybClients?.bybClientIds.join(", ")
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
        <Form.List name="banners">
          {(fields, { add, remove }) => (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
                    <Form.Item name={[field.name, "bannerId"]} label="bannerId">
                      <Input placeholder="bannerId" />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, "displayOrder"]}
                      label="displayOrder"
                    >
                      <Input placeholder="displayOrder" />
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
                        format="YYYY-MM-DD HH:mm:ss"
                        showTime
                        placeholder="startDate"
                      />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, "conditions", "endDate"]}
                      label="endDate"
                    >
                      <DatePicker
                        format="YYYY-MM-DD HH:mm:ss"
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
