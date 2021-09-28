import React from "react";
import ReactDOM from "react-dom";
import Login from "@/login";
import "./style/index.scss";
import "./style/index.css";
import "./style/index.less";
function App() {
  return (
    <div className="box">
      <Login /> hello webpack5!
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
