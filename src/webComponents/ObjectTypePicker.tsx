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
  display: flex;
  flex-flow: column nowrap;
`;
const StyledButtonContainer = styled(Button.Container)`
  border-radius: 0;
`;

export default () => {
  const { currentObjectTypeMode, setObjectTypeMode } = useStore();

  return (
    <Card StyledContainer={StyledCardContainer} StyledBody={StyledCardBody}>
      {Object.values(ObjectType).map((type: string) => (
        <Button
          key={type}
          variant={
            currentObjectTypeMode === type ? variants.fill : variants.text
          }
          color={colors.primaryDark}
          interactionFeedbackProps={{
            color:
              currentObjectTypeMode === type
                ? colors.background
                : colors.primaryDark,
          }}
          StyledContainer={StyledButtonContainer}
          onClick={() =>
            setObjectTypeMode(
              // @ts-expect-error
              currentObjectTypeMode === type ? undefined : type
            )
          }
        >
          {type}
        </Button>
      ))}
    </Card>
  );
};
