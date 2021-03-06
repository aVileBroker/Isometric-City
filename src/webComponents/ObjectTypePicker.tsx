import React from "react";
import { Button, Card, colors, variants } from "@headstorm/foundry-react-ui";
import styled from "styled-components";
import { mdiTrafficCone, mdiTruck, mdiTrashCan, mdiTableChair } from "@mdi/js";

import useStore, { ObjectType } from "../utils/useStore";

type ObjectInfo = {
  name: string;
  icon: string;
};

const objectTypeNames: { [key in string]: ObjectInfo } = {
  cone: {
    name: "Traffic Cone",
    icon: mdiTrafficCone,
  },
  foodTruck: {
    name: "Food Truck",
    icon: mdiTruck,
  },
  tables: {
    name: "Table",
    icon: mdiTableChair,
  },
};

const StyledCardContainer = styled(Card.Container)`
  position: absolute;
  overflow: hidden;
  top: 12rem;
  left: 3rem;
  min-width: 12rem;
`;

const StyledCardHeader = styled(Card.Header)`
  padding: 1rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
`;
const StyledCardBody = styled(Card.Body)`
  padding: 0;
  display: flex;
  flex-flow: column nowrap;
`;
const StyledButtonContainer = styled(Button.Container)`
  border-radius: 0;
  font-weight: bold;
`;

const ResetButtonContainer = styled(Button.Container)``;

export default () => {
  const {
    currentObjectTypeMode,
    setObjectTypeMode,
    removeAllObjects,
  } = useStore();

  return (
    <Card
      StyledContainer={StyledCardContainer}
      StyledHeader={StyledCardHeader}
      StyledBody={StyledCardBody}
      header={
        <>
          <div>Objects</div>
          <Button
            StyledContainer={ResetButtonContainer}
            iconPrefix={mdiTrashCan}
            variant={variants.text}
            onClick={removeAllObjects}
          />
        </>
      }
    >
      {Object.values(ObjectType).map((type: string) => (
        <Button
          key={type}
          variant={
            currentObjectTypeMode === type ? variants.fill : variants.text
          }
          iconPrefix={objectTypeNames[type].icon}
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
          {objectTypeNames[type].name}
        </Button>
      ))}
    </Card>
  );
};
