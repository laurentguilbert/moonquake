import React, { useEffect, useState } from "react";
import moment from "moment";
import { Space, Typography, Form, DatePicker, Checkbox } from "antd";
import { api } from "../api";
import Event from "./Event";

const { RangePicker } = DatePicker;
const { Title } = Typography;

const Events = () => {
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    types: ["A", "M", "H", "C", "Z", "L", "S"],
  });
  const [events, setEvents] = useState([]);

  console.log("filters", filters);

  useEffect(() => {
    api.getEvents(filters).then((response) => setEvents(response.results));
  }, [filters]);

  return (
    <Space direction="vertical" className="events" style={{ width: "100%" }}>
      <Title>Seismic events</Title>
      <Form layout="vertical">
        <Form.Item label="Date range">
          <RangePicker
            showTime
            allowEmpty={[true, true]}
            disabledDate={(current) =>
              current.isBefore("1969-07-25") || current.isAfter("1978-01-01")
            }
            onChange={(range) => {
              setFilters({
                ...filters,
                startDate: (range && range[0]) || undefined,
                endDate: (range && range[1]) || undefined,
              });
            }}
            defaultPickerValue={[moment("1969-07")]}
          />
        </Form.Item>
        <Form.Item label="Event type">
          <Checkbox.Group
            defaultValue={["A", "M", "H", "C", "Z", "L", "S"]}
            onChange={(types) => {
              setFilters({ ...filters, types });
            }}
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
