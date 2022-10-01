import { Layout } from "antd";
import React from "react";

import Events from "./components/Events";
import Moon from "./components/Moon";

import "./App.less";

const { Header, Footer, Content, Sider } = Layout;

function App() {
  return (
    <Layout id="app">
      <Layout>
        <Header>
          <div id="logo">MOONQUAKE</div>
        </Header>
        <Content>
          <Moon />
        </Content>
        <Footer></Footer>
      </Layout>
      <Sider width="40%" style={{ padding: "20px" }}>
        <Events />
      </Sider>
    </Layout>
  );
}

export default App;
