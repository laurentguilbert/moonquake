import React from "react";
import { Space } from "antd";

import Event from "./Event";

const Events = () => {
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Event />
      <Event />
      <Event />
    </Space>
  );
};

export default Events;
