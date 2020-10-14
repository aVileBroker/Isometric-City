import React from "react";
import { Provider } from "jotai";

import Scene from "./Scene";
import ObjectTypePicker from "./webComponents/ObjectTypePicker";

export default () => (
  <Provider>
    <Scene />
    <ObjectTypePicker />
  </Provider>
);
