import React from "react";
import { ControlsProvider, Controls } from "react-three-gui";

import Scene from "./Scene";

export default () => (
  <ControlsProvider>
    <Scene />
    <Controls />
  </ControlsProvider>
);
