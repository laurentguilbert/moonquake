import React from "react";
import { Card, Row, Col, Tag, Typography } from "antd";

const { Text } = Typography;

const Event = () => {
  return (
    <Card className="event">
      <Row align="middle">
        <Col span={6}>
          <Tag color="#ff8f00">Moonquake (deep)</Tag>
        </Col>
        <Col span={8}>
          07/27/1969 <Text strong>23:48 - 00:40</Text> UTC
        </Col>
        <Col span={10}>
          <Tag color="#6a6a6a">
            A 11: <Text strong>3.1</Text> mm
          </Tag>
          <Tag color="#6a6a6a">
            A 14: <Text strong>3.1</Text> mm
          </Tag>
          <Tag color="#6a6a6a">
            A 15: <Text strong>3.1</Text> mm
          </Tag>
        </Col>
      </Row>
    </Card>
  );
};

export default Event;
