import React from "react";
import { Card, Row, Col, Tag, Typography } from "antd";

const { Text } = Typography;

const EventTypeLabel = Object.freeze({
  A: "Moonquake (deep) C",
  M: "Moonquake (deep) U",
  C: "Meteoroid impact",
  H: "Moonquake (shallow)",
  Z: "Short period event",
  L: "Lunar module impact",
  S: "S-IVB",
});

const EventTypeColor = Object.freeze({
  A: "#ff8f00",
  M: "#ff8f00",
  C: "#a22222",
  H: "#df9f4e",
  Z: "#848484",
  L: "#7627c6",
  S: "#ad32e6",
});

const EventDataTag = ({ mission, value }) => {
  return (
    <Tag>
      {mission} : <Text strong>{value} mm</Text>
    </Tag>
  );
};

const Event = ({ event }) => {
  const { type, data_1, data_2, data_3, data_4 } = event;
  return (
    <Card className="event">
      <Row align="middle">
        <Col span={6}>
          {type ? (
            <Tag color={EventTypeColor[type]}>{EventTypeLabel[type]}</Tag>
          ) : (
            <Tag>Unclassfied</Tag>
          )}
        </Col>
        <Col span={8}>
          07/27/1969 <Text strong>23:48 - 00:40</Text> UTC
        </Col>
        <Col span={10} className="event-data">
          {data_1 && <EventDataTag mission="A11-12" value={data_1} />}
          {data_2 && <EventDataTag mission="A14" value={data_2} />}
          {data_3 && <EventDataTag mission="A15" value={data_3} />}
          {data_4 && <EventDataTag mission="A16" value={data_4} />}
        </Col>
      </Row>
    </Card>
  );
};

export default Event;
