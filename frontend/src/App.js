import { Layout } from 'antd';
import React, { useEffect } from 'react';

import './App.less';
import Events from './components/Events';
import Moon from './components/Moon';
import Timeline from './components/Timeline';
import { setEvents, useEventsContext } from './contexts/EventsContext';
import { api } from './services/api';

const { Content, Sider } = Layout;

function App() {
  const { state, dispatch } = useEventsContext();
  const { startDate, endDate, types, page } = state;

  useEffect(() => {
    api
      .getEvents({ startDate, endDate, types, page })
      .then((response) =>
        dispatch(setEvents(response.results, response.count))
      );
  }, [dispatch, startDate, endDate, types, page]);

  return (
    <Layout id="app">
      <Layout>
        <Content id="main">
          <div id="logo">MOONQUAKE</div>
          <Moon />
          <Timeline />
        </Content>
      </Layout>
      <Sider width="45%" id="sidebar">
        <Events />
      </Sider>
    </Layout>
  );
}

export default App;
