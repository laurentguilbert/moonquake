import { Line } from '@ant-design/plots';
import { Card, Col, Row, Space, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import { setSelectedEvent, useEventsContext } from '../contexts/EventsContext';
import { EventTypeColor, EventTypeLabel } from '../core/enums';
import { api } from '../services/api';

const { Text } = Typography;

const EventDataTag = ({ mission, value }) => {
  return (
    <Tag color="grey">
      {mission}: <Text strong>{value}mm</Text>
    </Tag>
  );
};

const Event = ({ event }) => {
  const { state, dispatch } = useEventsContext();
  const { selectedEvent } = state;

  const [dataPoints, setDataPoints] = useState(null);

  const { start_date, end_date, type, data_1, data_2, data_3, data_4 } = event;
  const startDate = dayjs(start_date);
  const endDate = dayjs(end_date);

  const isSelected = selectedEvent?.id === event.id;

  useEffect(() => {
    if (isSelected) {
      api.getEventDataPoints(event.id).then(setDataPoints);
    }
  }, [isSelected, event.id]);

  const getChartConfig = (data) => ({
    data: data.map(([date, value, label]) => ({ date, value, label })),
    padding: 'auto',
    xField: 'date',
    yField: 'value',
    seriesField: 'label',
    height: 200,
    limitInPlot: true,
  });

  return (
    <Card
      className={'event ' + (isSelected ? 'is-active' : '')}
      onClick={() => dispatch(setSelectedEvent(event))}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Row className="event-header" align="middle" gutter={[20, 5]}>
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
                <EventDataTag mission="11" value={data_1} />
              ) : (
                <EventDataTag mission="12" value={data_1} />
              ))}
            {data_2 && <EventDataTag mission="14" value={data_2} />}
            {data_3 && <EventDataTag mission="15" value={data_3} />}
            {data_4 && <EventDataTag mission="16" value={data_4} />}
          </Col>
        </Row>

        {isSelected && dataPoints && (
          <>
            {Object.entries(dataPoints).map(([mission, missionData], index) => (
              <>
                <div key={`title-${mission}-${index}`}>{mission}</div>
                <Line
                  {...getChartConfig(missionData)}
                  key={`chart-${mission}-${index}`}
                />
              </>
            ))}
          </>
        )}
      </Space>
    </Card>
  );
};

export default Event;
