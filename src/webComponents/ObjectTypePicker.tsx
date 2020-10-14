import React from "react";
import { Button, Card, colors, variants } from "@headstorm/hs-react-ui";
import styled from "styled-components";

import useStore, { ObjectType } from "../utils/useStore";

const StyledCardContainer = styled(Card.Container)`
  position: fixed;
  overflow: hidden;
  top: 4rem;
  left: 1rem;
`;
const StyledCardBody = styled(Card.Body)`
  padding: 0;
`;
const StyledButtonContainer = styled(Button.Container)`
  border-radius: 0;
`;

export default () => {
  const { currentObjectTypeMode, setObjectTypeMode } = useStore();

  return (
    <Card StyledContainer={StyledCardContainer} StyledBody={StyledCardBody}>
      <Button
        variant={
          currentObjectTypeMode === ObjectType.cone
            ? variants.fill
            : variants.text
        }
        color={colors.primaryDark}
        interactionFeedbackProps={{
          color:
            currentObjectTypeMode === ObjectType.cone
              ? colors.background
              : colors.primaryDark,
        }}
        StyledContainer={StyledButtonContainer}
        onClick={() =>
          setObjectTypeMode(
            currentObjectTypeMode === ObjectType.cone
              ? undefined
              : ObjectType.cone
          )
        }
      >
        Traffic Cone
      </Button>
    </Card>
  );
};
