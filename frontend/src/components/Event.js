import React from "react";
import { Card, Row, Col, Tag } from "antd";

const Event = () => {
  return (
    <Card>
      <Row>
        <Col>
          <Tag color="orange">Moonquake</Tag>
        </Col>
        <Col>Start 07/27/1969 23:48</Col>
        <Col>End 07/28/1969 </Col>
        <Col>See Detail</Col>
      </Row>
    </Card>
  );
};

export default Event;
