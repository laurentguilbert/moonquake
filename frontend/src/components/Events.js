import { Checkbox, Col, DatePicker, Form, Row, Typography } from 'antd';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import {
  incrementPage,
  setDateRange,
  setTypes,
  useEventsContext,
} from '../contexts/EventsContext';
import Event from './Event';

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

const Events = () => {
  const { state, dispatch } = useEventsContext();
  const { startDate, endDate, types, events, count, loading } = state;

  useEffect(() => {
    const scrollableNode = document.getElementById('events-list-scrollable');
    if (scrollableNode) scrollableNode.scrollTop = 0;
  }, [loading]);

  return (
    <div className="events">
      <Title>Seismic events</Title>

      <Form layout="vertical" className="events-filters">
        <Form.Item label="Date range">
          <RangePicker
            showTime
            disabledDate={(current) =>
              current.isBefore('1969-07-20') || current.isAfter('1978-01-01')
            }
            value={[startDate, endDate]}
            onChange={(range) => {
              dispatch(setDateRange([range && range[0], range && range[1]]));
            }}
          />
        </Form.Item>
        <Form.Item label="Event type">
          <Checkbox.Group
            value={types}
            onChange={(types) => {
              dispatch(setTypes(types));
            }}
            options={[
              { label: 'Moonquake (deep) C', value: 'A' },
              { label: 'Moonquake (deep) U', value: 'M' },
              { label: 'Moonquake (shallow)', value: 'H' },
              { label: 'Meteoroid impact', value: 'C' },
              { label: 'Short period event', value: 'Z' },
              { label: 'Lunar module impact', value: 'L' },
              { label: 'S-IVB', value: 'S' },
              { label: 'Unclassified', value: 'U' },
            ]}
          />
        </Form.Item>
      </Form>

      {count ? (
        <div className="events-count">
          <Text strong>{count}</Text> events available
        </div>
      ) : null}

      <Row className="events-labels">
        <Col style={{ width: '192px' }}>
          <Text strong>Type</Text>
        </Col>
        <Col style={{ width: '250px' }}>
          <Text strong>Date</Text>
        </Col>
        <Col>
          <Text strong>Amplitude (in mm)</Text>
        </Col>
      </Row>

      {loading ? (
        <div className="events-loading">Loading events...</div>
      ) : (
        <div id="events-list-scrollable" className="events-list">
          <InfiniteScroll
            dataLength={events.length}
            scrollableTarget="events-list-scrollable"
            next={() => {
              dispatch(incrementPage());
            }}
            loader={
              <div className="events-loading">Loading more events...</div>
            }
            hasMore={events.length < count}
          >
            {events.map((event) => (
              <Event key={event.id} event={event} />
            ))}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default Events;
