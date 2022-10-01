import React from "react";
import { Space, Typography, Form, DatePicker, Checkbox } from "antd";

import Event from "./Event";

const { RangePicker } = DatePicker;
const { Title } = Typography;

const Events = () => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Title>Events</Title>
      <Form layout="vertical">
        <Form.Item label="Date range">
          <RangePicker showTime />
        </Form.Item>
        <Form.Item label="Event type">
          <Checkbox.Group
            defaultValue={[
              "moonquake_deep",
              "moonquake_shallow",
              "asteroid_impact",
              "other",
            ]}
            options={[
              { label: "Moonquake (deep)", value: "moonquake_deep" },
              { label: "Moonquake (shallow)", value: "moonquake_shallow" },
              { label: "Asteroid impact", value: "asteroid_impact" },
              { label: "Other", value: "other" },
            ]}
          />
        </Form.Item>
      </Form>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Event />
        <Event />
        <Event />
      </Space>
    </Space>
  );
};

export default Events;
