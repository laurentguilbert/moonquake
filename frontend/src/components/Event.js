import { Card, Col, Row, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

import { setSelectedEvent, useEventsContext } from '../contexts/EventsContext';
import { EventTypeColor, EventTypeLabel } from '../core/enums';

const { Text } = Typography;

const EventDataTag = ({ mission, value }) => {
  return (
    <Tag color="grey">
      {mission} : <Text strong>{value} mm</Text>
    </Tag>
  );
};

const Event = ({ event }) => {
  const { state, dispatch } = useEventsContext();
  const { selectedEvent } = state;

  const { start_date, end_date, type, data_1, data_2, data_3, data_4 } = event;
  const startDate = dayjs(start_date);
  const endDate = dayjs(end_date);

  return (
    <Card
      className={'event ' + (selectedEvent?.id === event.id ? 'is-active' : '')}
      onClick={() => dispatch(setSelectedEvent(event))}
    >
      <Row align="middle" gutter={[20, 5]}>
        <Col style={{ width: '180px' }}>
          {type ? (
            <Tag color={EventTypeColor[type]}>{EventTypeLabel[type]}</Tag>
          ) : (
            <Tag>Unclassfied</Tag>
          )}
        </Col>
        <Col style={{ width: '250px' }}>
          {startDate.format('MM/DD/YYYY')}{' '}
          <Text strong>
            {startDate.format('HH:mm')} - {endDate.format('HH:mm')}
          </Text>
        </Col>
        <Col className="event-data">
          {data_1 &&
            (dayjs(start_date).isBefore('1969-09-01') ? (
              <EventDataTag mission="A11" value={data_1} />
            ) : (
              <EventDataTag mission="A12" value={data_1} />
            ))}
          {data_2 && <EventDataTag mission="A14" value={data_2} />}
          {data_3 && <EventDataTag mission="A15" value={data_3} />}
          {data_4 && <EventDataTag mission="A16" value={data_4} />}
        </Col>
      </Row>
    </Card>
  );
};

export default Event;
