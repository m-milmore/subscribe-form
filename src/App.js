import React from "react";
import "./App.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AddSubscriber from "./components/AddSubscriber";
import FindSubscriber from "./components/FindSubscriber";
import UnsubscribeSubscriber from "./components/UnsubscribeSubscriber";

function App() {
  return (
    <div className="App">
      <p className="h2 ms-4 mt-3">Subscriber Manager</p>
      <Tabs
        defaultActiveKey="unsubscribe"
        id="uncontrolled-tab-example"
        className="my-4 mx-4 fs-6"
      >
        <Tab eventKey="add" title="Add Subscriber">
          <AddSubscriber />
        </Tab>
        <Tab eventKey="find" title="Find Subscriber">
          <FindSubscriber />
        </Tab>
        <Tab eventKey="unsubscribe" title="Unsubscribe Subscriber">
          <UnsubscribeSubscriber />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
