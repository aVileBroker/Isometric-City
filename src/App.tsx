import React from "react";
import { Provider } from "jotai";

import Scene from "./Scene";
import ObjectTypePicker from "./webComponents/ObjectTypePicker";
import Header from "./webComponents/Header";

export default () => (
  <Provider>
    <Header />
    <Scene />
    <ObjectTypePicker />
  </Provider>
);
