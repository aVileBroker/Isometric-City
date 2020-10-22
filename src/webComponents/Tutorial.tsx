import * as React from "react";
import { Suspense } from "react";
import styled from "styled-components";
import {
  Button,
  Card,
  Modal,
  Text,
  variants,
} from "@headstorm/foundry-react-ui";
import {
  mdiCheck,
  mdiChevronLeft,
  mdiChevronRight,
  mdiRotate3dVariant,
  mdiCursorMove,
} from "@mdi/js";
import { Canvas } from "react-three-fiber";
import { Plane } from "drei";
import { EffectComposer, SMAA } from "react-postprocessing";
import { EdgeDetectionMode } from "postprocessing";

import Mouse from "src/Objects/Mouse";
import useStore from "src/utils/useStore";

const pages = [
  {
    name: (
      <Text iconPrefix={mdiRotate3dVariant}>
        Hold the middle mouse button to rotate
      </Text>
    ),
    button: 2,
  },
  {
    name: (
      <Text iconPrefix={mdiCursorMove}>
        Use the right mouse button to move around the map
      </Text>
    ),
    button: 1,
  },
];

const StyledCanvas = styled(Canvas)`
  height: 20rem !important;
  width: 40rem !important;
`;

const StyledCardContainer = styled(Card.Container)`
  overflow: hidden;
`;

const StyledCardHeader = styled(Card.Header)`
  padding: 1rem;
`;

const StyledCardBody = styled(Card.Body)`
  padding: 0;
  overflow: hidden;
`;

export default () => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const { tutorialOpen, setTutorialState } = useStore();

  const handleModalClose = () => {
    setTutorialState(false);
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      handleModalClose();
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  React.useEffect(() => setCurrentPage(0), [tutorialOpen]);

  if (!tutorialOpen) {
    return null;
  }

  const isLastPage = currentPage === pages.length - 1;

  return (
    <Modal
      backgroundDarkness={0.8}
      onClose={handleModalClose}
      onClickOutside={handleModalClose}
    >
      <Card
        StyledContainer={StyledCardContainer}
        StyledHeader={StyledCardHeader}
        StyledBody={StyledCardBody}
        header={pages[currentPage].name}
        footer={
          <>
            {currentPage > 0 && (
              <Button
                onClick={prevPage}
                color="#2F1750"
                variant={variants.text}
                iconPrefix={mdiChevronLeft}
              >
                Prev
              </Button>
            )}
            <Button
              onClick={nextPage}
              color="#2F1750"
              variant={variants.text}
              iconSuffix={isLastPage ? mdiCheck : mdiChevronRight}
            >
              {isLastPage ? "Got it!" : "Next"}
            </Button>
          </>
        }
      >
        <StyledCanvas
          colorManagement
          shadowMap
          pixelRatio={window.devicePixelRatio * 1.5}
          camera={{
            position: [0, 2.5, -1],
            zoom: 3,
            far: 50,
            near: 1,
          }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight intensity={0.5} position={[-4, 2, -1]} />
          <directionalLight intensity={0.5} position={[0, -1.5, 5]} />
          <directionalLight
            intensity={7}
            castShadow
            position={[6, 5, 1]}
            shadow-bias={-0.0001}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={12}
            shadow-camera-near={5}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-top={2}
            shadow-camera-bottom={-1}
          />
          <Plane
            position={[0, 0, 0]}
            rotation={[Math.PI / -2, 0, 0]}
            args={[50, 50, 50]}
            receiveShadow
          >
            <meshPhysicalMaterial color="#333" />
          </Plane>
          <Suspense fallback={null}>
            <Mouse highlightedButton={pages[currentPage].button} />
            <EffectComposer multisampling={0}>
              <SMAA edgeDetectionMode={EdgeDetectionMode.LUMA} />
            </EffectComposer>
          </Suspense>
        </StyledCanvas>
      </Card>
    </Modal>
  );
};
