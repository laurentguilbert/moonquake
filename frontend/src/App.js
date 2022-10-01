import { Layout } from "antd";
import React from "react";

import Events from "./components/Events";
import Globe from "./components/Globe";

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
          <Globe />
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
