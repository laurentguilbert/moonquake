import { Layout } from "antd";
import React from "react";
import { MoonProvider } from "./contexts/MoonContext";

import Events from "./components/Events";
import Moon from "./components/Moon";
import Timeline from "./components/Timeline";

import "./App.less";

const { Content, Sider } = Layout;

function App() {
  return (
    <MoonProvider>
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
    </MoonProvider>
  );
}

export default App;
