import React from "react";
import styled from "styled-components";

import Logo from "./Logo";

const HeaderSolid = styled.div`
  background-color: white;
  position: relative;
  height: 4rem;
  width: 100%;
  font-size: 3rem;
  z-index: 1;

  filter: drop-shadow(
    0rem 0.06653090368236622rem 0.25rem rgba(39, 47, 78, 0.4292196217912265)
  );
`;

const StyledLogo = styled(Logo)`
  position: absolute;
  top: 2.25rem;
  left: 3rem;
  height: 4rem;
  width: auto;
  z-index: 5;
`;

const HeaderSlashContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 0;
  overflow: hidden;
  height: 5rem;
  width: 100%;
`;

const HeaderSlash = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  transform-origin: bottom left;
  background-color: white;
  transform: skewY(${Math.tan(80 / window.innerWidth) * -(180 / Math.PI)}deg);
`;

export default () => (
  <>
    <HeaderSolid>
      <StyledLogo />
      <HeaderSlashContainer>
        <HeaderSlash />
      </HeaderSlashContainer>
    </HeaderSolid>
  </>
);
