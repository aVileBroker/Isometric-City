import React from "react";
import { Provider } from "jotai";

import styled from "styled-components";

import Scene from "./Scene";
import ObjectTypePicker from "./webComponents/ObjectTypePicker";
import MapControls from "./webComponents/MapControls";

import Header from "./webComponents/Header";
import Tutorial from "./webComponents/Tutorial";

const PageContainer = styled.div`
  max-width: 70rem;
  width: calc(100% - 4rem);
  margin: 0 auto;
  padding: 2rem;
`;

export default () => (
  <Provider>
    <Header />
    <Scene />
    <ObjectTypePicker />
    <MapControls />

    <Tutorial />
    <PageContainer>
      <h1>What's a Qurb anyway?</h1>
      <p>Nothing! It's all made up.</p>
    </PageContainer>
  </Provider>
);
