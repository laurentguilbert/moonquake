import React, { useEffect, useState } from "react";
import { Space, Typography, Form, DatePicker, Checkbox } from "antd";
import { api } from "../api";
import Event from "./Event";

const { RangePicker } = DatePicker;
const { Title } = Typography;

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.getEvents().then(setEvents);
  }, []);

  return (
    <Space direction="vertical" className="events" style={{ width: "100%" }}>
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
              "meteoroid_impact",
              "short_period_event",
              "lm_impact",
              "sivb",
            ]}
            options={[
              { label: "Moonquake (deep)", value: "moonquake_deep" },
              { label: "Moonquake (shallow)", value: "moonquake_shallow" },
              { label: "Meteoroid impact", value: "meteoroid_impact" },
              { label: "Short period event", value: "short_period_event" },
              { label: "Lunar module impact", value: "lm_impact" },
              { label: "S-IVB", value: "sivb" },
            ]}
          />
        </Form.Item>
      </Form>
      <Space
        className="events-list"
        direction="vertical"
        style={{ width: "100%" }}
      >
        {events.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </Space>
    </Space>
  );
};

export default Events;
