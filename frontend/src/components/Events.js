import React from "react";
import dayjs from "dayjs";
import { Space, Typography, DatePicker, Form, Checkbox } from "antd";
import Event from "./Event";

import {
  useEventsContext,
  setStartDate,
  setEndDate,
  setTypes,
} from "../contexts/EventsContext";

const { RangePicker } = DatePicker;
const { Title } = Typography;

const Events = () => {
  const { state, dispatch } = useEventsContext();
  const { startDate, endDate, types, events } = state;

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
            value={[startDate, endDate]}
            onChange={(range) => {
              dispatch(setStartDate(range && range[0]));
              dispatch(setEndDate(range && range[1]));
            }}
            defaultPickerValue={[dayjs("1969-07")]}
          />
        </Form.Item>
        <Form.Item label="Event type">
          <Checkbox.Group
            value={types}
            onChange={(types) => {
              dispatch(setTypes(types));
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
