import { Button, Form, Input, Radio } from "antd";

interface PopContentProps {
  index: number;
}

export default function PopContent({ index }: PopContentProps) {
  return (
    <Form.List name={[index, "contents"]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field2) => (
            <div
              key={field2.key}
              style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid #007AFF",
                borderColor: "lightgray",
                padding: 10,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 10 }}>
                  <Form.Item name={[field2.name, "title"]} label="title">
                    <Input placeholder="title" />
                  </Form.Item>
                  <Form.Item name={[field2.name, "src"]} label="src">
                    <Input placeholder="src" />
                  </Form.Item>
                  <Form.Item name={[field2.name, "isShow"]} label="isShow">
                    <Radio.Group
                      options={[
                        { value: true, label: "공개" },
                        { value: false, label: "비공개" },
                      ]}
                    />
                  </Form.Item>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Button danger onClick={() => remove(field2.name)}>
                    삭제
                  </Button>
                  <Button type="primary" onClick={() => add()}>
                    추가
                  </Button>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <Form.Item name={[field2.name, "href"]} label="href">
                  <Input placeholder="href" style={{ width: "400px" }} />
                </Form.Item>
                <Form.Item name={[field2.name, "alt"]} label="alt">
                  <Input placeholder="alt" />
                </Form.Item>
              </div>
            </div>
          ))}
        </>
      )}
    </Form.List>
  );
}
