import React from "react";
import ReactDOM from "react-dom";


import { Provider } from "react-redux";



import App from "./App";
import reportWebVitals from "./reportWebVitals";



import "./index.css";
import "./bootstrap.min.css";
import store from "./redux/store/store";

ReactDOM.render(
  <Provider store={store}>
    
    <App />
  </Provider>,
  document.getElementById("root")
);


reportWebVitals();
