import React from "react";
import { Button } from "@headstorm/foundry-react-ui";
import styled from "styled-components";
import { mdiHelp } from "@mdi/js";

import useStore from "../utils/useStore";

const FloatingArea = styled.div`
  position: absolute;
  top: calc(100vh - 14rem);
  right: 3rem;
`;

export default () => {
  const setTutorialState = useStore((state) => state.setTutorialState);

  return (
    <FloatingArea>
      <Button
        iconPrefix={mdiHelp}
        color="white"
        onClick={() => setTutorialState(true)}
      />
    </FloatingArea>
  );
};
