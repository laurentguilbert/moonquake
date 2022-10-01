import React, { useEffect, useState } from "react";
import { Space, Typography, Form, DatePicker, Checkbox } from "antd";
import { api } from "../api";
import Event from "./Event";

const { RangePicker } = DatePicker;
const { Title } = Typography;

const Events = () => {
  const [filters, setFilters] = useState({});
  const [events, setEvents] = useState([]);

  console.log("filters", filters);

  useEffect(() => {
    api.getEvents(filters).then((response) => setEvents(response.results));
  }, [filters]);

  return (
    <Space direction="vertical" className="events" style={{ width: "100%" }}>
      <Title>Events</Title>
      <Form layout="vertical">
        <Form.Item label="Date range">
          <RangePicker
            showTime
            allowEmpty={[true, true]}
            onChange={(range) => {
              setFilters({
                ...filters,
                startDate: (range && range[0]) || undefined,
                endDate: (range && range[1]) || undefined,
              });
            }}
          />
        </Form.Item>
        <Form.Item label="Event type">
          <Checkbox.Group
            onChange={(types) => {
              setFilters({ ...filters, types });
            }}
            defaultValue={["A", "M", "H", "C", "Z", "L", "S"]}
            options={[
              { label: "Moonquake (deep) C", value: "A" },
              { label: "Moonquake (deep) U", value: "M" },
              { label: "Moonquake (shallow)", value: "H" },
              { label: "Meteoroid impact", value: "C" },
              { label: "Short period event", value: "Z" },
              { label: "Lunar module impact", value: "L" },
              { label: "S-IVB", value: "S" },
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
