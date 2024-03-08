import { DatePicker, Form, Input, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";

interface ConditionsProps {
  index: number;
}

export const DEFAULT_VALUE = {
  isShow: true,
  conditions: {
    containsFreeApartment: true,
    bybClients: { useBybClients: false },
  },
};

export default function Conditions({ index }: ConditionsProps) {
  return (
    <>
      <Form.Item name={[index, "conditions", "siteIds"]} label="siteIds">
        <TextArea placeholder="예) EDGE186, EDGE205, EDGE428, EDGE13" />
      </Form.Item>
      <div style={{ display: "flex", gap: 10 }}>
        <Form.Item
          name={[index, "conditions", "containsFreeApartment"]}
          label="containsFreeApartment"
        >
          <Radio.Group
            options={[
              { value: true, label: "포함" },
              { value: false, label: "미포함" },
            ]}
          />
        </Form.Item>
        <Form.Item
          name={[index, "conditions", "bybClients", "bybClientIds"]}
          label="bybClientIds"
        >
          <Input placeholder="예) BYB, IS_DONGSEO" />
        </Form.Item>
        <Form.Item
          name={[index, "conditions", "bybClients", "useBybClients"]}
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
      <div style={{ display: "flex", gap: 10 }}>
        <Form.Item name={[index, "conditions", "startDate"]} label="startDate">
          <DatePicker
            format="YYYY-MM-DD HH:mm"
            showTime
            placeholder="startDate"
          />
        </Form.Item>
        <Form.Item name={[index, "conditions", "endDate"]} label="endDate">
          <DatePicker
            format="YYYY-MM-DD HH:mm"
            showTime
            placeholder="endDate"
          />
        </Form.Item>
      </div>
    </>
  );
}
