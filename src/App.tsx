import React from "react";
import { Provider } from "jotai";

import styled from "styled-components";

import Scene from "./Scene";
import ObjectTypePicker from "./webComponents/ObjectTypePicker";
import MapControls from "./webComponents/MapControls";

import Header from "./webComponents/Header";
import Tutorial from "./webComponents/Tutorial";
import FoodBuilder from "./webComponents/FoodBuilder";

const PageContainer = styled.div`
  max-width: 70rem;
  width: calc(100% - 4rem);
  margin: 0 auto;
  padding: 4rem 2rem;
`;

export default () => (
  <Provider>
    <Header />
    <Scene />
    <ObjectTypePicker />
    <MapControls />

    <Tutorial />
    <PageContainer>
      <FoodBuilder />
    </PageContainer>
  </Provider>
);
