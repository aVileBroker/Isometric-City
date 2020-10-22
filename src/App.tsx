import React from "react";
import { Provider } from "jotai";

import Scene from "./Scene";
import ObjectTypePicker from "./webComponents/ObjectTypePicker";
import MapControls from "./webComponents/MapControls";

import Header from "./webComponents/Header";
import Tutorial from "./webComponents/Tutorial";

export default () => (
  <Provider>
    <Header />
    <Scene />
    <ObjectTypePicker />
    <MapControls />

    <Tutorial />

    <h1>What is Kurb anyway?</h1>
  </Provider>
);
