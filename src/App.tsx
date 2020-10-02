import React from "react";
import { Provider } from "jotai";

import Scene from "./Scene";

export default () => (
  <Provider>
    <Scene />
  </Provider>
);
