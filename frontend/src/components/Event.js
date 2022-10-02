import { Line } from '@ant-design/plots';
import { Card, Col, Row, Space, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

import { setSelectedEvent, useEventsContext } from '../contexts/EventsContext';
import { EventTypeColor, EventTypeLabel } from '../core/enums';

const { Text } = Typography;

const EventDataTag = ({ mission, value }) => {
  return (
    <Tag color="grey">
      {mission}: <Text strong>{value}mm</Text>
    </Tag>
  );
};

const Event = ({ event, showEventDetail }) => {
  const { state, dispatch } = useEventsContext();
  const { selectedEvent } = state;

  const { start_date, end_date, type, data_1, data_2, data_3, data_4 } = event;
  const startDate = dayjs(start_date);
  const endDate = dayjs(end_date);

  // console.log('selectedEvent', selectedEvent?.id, event.id);
  const isSelected = selectedEvent?.id === event.id;

  // selectedEvent.data_points['S11']['MH1']
  const get_event_data = (event) => {
    const items = Object.entries(event.data_points)
      .reduce((acc, curr) => {
          const [label, data] = curr;
          return [...acc, ...data.map(point => ({...point, label: `${label}-${point.label}`}))]
      } , [])
    return items
  }

  const get_chart_config = (mission, data) => {
    const config = {
        data: data,
        padding: 'auto',
        xField: 'date',
        yField: 'value',
        seriesField: 'label',
        height: 200,
        limitInPlot: true,
      };
    return config
  }

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

        {isSelected && (
          <>
          {
            Object.entries(event.data_points).map(
              ([mission, missionData], i) => (
                <>
                  <div key={`title-${mission}-${i}`}>{mission}</div>
                  <Line {...get_chart_config(mission, missionData)} key={`chart-${mission}-${i}`}/>
                </>
              )
            )
          }
          </>
        )}
      </Space>
    </Card>
  );
};

export default Event;



