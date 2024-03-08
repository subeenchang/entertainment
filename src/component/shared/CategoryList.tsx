import { Button, Form, Input } from "antd";

export default function CategoryList() {
  return (
    <Form.List name="categories">
      {(fields, { add, remove }) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid #007AFF",
            padding: 10,
          }}
        >
          {fields.map((field) => (
            <div
              key={field.key}
              style={{
                display: "flex",
                gap: 10,
              }}
            >
              <Form.Item name={[field.name, "categoryId"]} label="categoryId">
                <Input placeholder="categoryId" />
              </Form.Item>
              <Form.Item
                name={[field.name, "categoryName"]}
                label="categoryName"
              >
                <Input placeholder="categoryName" />
              </Form.Item>
              <Form.Item name={[field.name, "description"]} label="description">
                <Input placeholder="description" />
              </Form.Item>
              <Button danger type="primary" onClick={() => remove(field.name)}>
                -
              </Button>
            </div>
          ))}
          <Button onClick={() => add()}>+</Button>
        </div>
      )}
    </Form.List>
  );
}
