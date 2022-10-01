import { Layout } from "antd";
import React, { useEffect } from "react";

import { useEventsContext, setEvents } from "./contexts/EventsContext";
import Events from "./components/Events";
import Moon from "./components/Moon";
import Timeline from "./components/Timeline";
import { api } from "./services/api";

import "./App.less";

const { Content, Sider } = Layout;

function App() {
  const { state, dispatch } = useEventsContext();
  const { startDate, endDate, types } = state;

  useEffect(() => {
    api
      .getEvents({ startDate, endDate, types })
      .then((response) => dispatch(setEvents(response.results)));
  }, [dispatch, startDate, endDate, types]);

  return (
    <Layout id="app">
      <Layout>
        <div id="logo">MOONQUAKE</div>
        <Content id="main">
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
