import React from 'react';
import ReactDOM from 'react-dom';

// 1、引入flexible 移动端rem
require("./js/flexible");
// 2、reset css
require("./styles/base.css");

import App from "./components/App";
ReactDOM.render(<App />, document.getElementById('app'));

