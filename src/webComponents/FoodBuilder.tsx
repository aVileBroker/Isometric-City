import React, { Suspense, useState } from "react";
import styled from "styled-components";
import { Button, Card, Checkbox, TextInput } from "@headstorm/foundry-react-ui";
import { Canvas } from "react-three-fiber";
import { Physics } from "@react-three/cannon";
import { Plane } from "drei";

import GroundPlane from "src/Objects/GroundPlane";
import Table from "src/Objects/Table";
import Pizza from "src/Objects/Pizza";
import Burger from "src/Objects/Burger";
import Topping from "src/Objects/Topping";

const SideBySide = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const Steps = styled.div`
  flex: 1 1 40rem;
  display: flex;
  flex-flow: column wrap;

  & > * {
    margin-bottom: 1rem;
  }
`;

const SaveButtonContainer = styled(Button.Container)`
  align-self: flex-end;
`;

type ToppingType = {
  name: string;
  modelName: string;
  count: number;
  dimensions: number[];
};

const pizzaToppings: { [key in string]: ToppingType } = {
  pepperoni: {
    name: "Pepperoni",
    modelName: "pepperoni",
    count: 50,
    dimensions: [0.144, 0.01, 0.144],
  },
  pineapple: {
    name: "Pineapple",
    modelName: "pineapple",
    count: 50,
    dimensions: [0.056, 0.026, 0.0797],
  },
};

export default () => {
  const [foodChoice, setFoodChoice] = useState("");
  const [toppings, setToppings] = useState([""]);

  const [renderStuff, setRenderMode] = useState(false);

  window.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight - 192 - window.innerHeight / 2) {
      setRenderMode(true);
    } else {
      setRenderMode(false);
    }
  });

  return (
    <SideBySide>
      <Steps>
        <h1>What are yinz serving?</h1>
        <TextInput placeholder="Menu item name" />
        <Card elevation={0} header="Pick the food item">
          <Checkbox
            checkboxType={Checkbox.Types.fill}
            onClick={() =>
              foodChoice === "pizza"
                ? setFoodChoice("")
                : setFoodChoice("pizza")
            }
            checked={foodChoice === "pizza"}
          >
            Pizza
          </Checkbox>
          <Checkbox
            checkboxType={Checkbox.Types.fill}
            onClick={() =>
              foodChoice === "burger"
                ? setFoodChoice("")
                : setFoodChoice("burger")
            }
            checked={foodChoice === "burger"}
          >
            Burger
          </Checkbox>
        </Card>
        {foodChoice === "pizza" && (
          <Card elevation={0} header="What'll be on it?">
            {Object.keys(pizzaToppings).map((topping) => (
              <Checkbox
                onClick={() => {
                  if (toppings.includes(topping)) {
                    setToppings(toppings.filter((top) => top !== topping));
                  } else {
                    setToppings([...toppings, topping]);
                  }
                }}
                checked={toppings.includes(topping)}
              >
                {pizzaToppings[topping].name}
              </Checkbox>
            ))}
          </Card>
        )}
        <Button
          StyledContainer={SaveButtonContainer}
          disabled={foodChoice === ""}
          onClick={() => {
            setToppings([]);
            setFoodChoice("");
          }}
          color="darkgreen"
        >
          Save to Menu
        </Button>
      </Steps>
      <Canvas
        style={{
          width: "100%",
          height: "40rem",
          position: "sticky",
          bottom: 0,
        }}
        shadowMap
        camera={{
          position: [0, 2, -3],
          zoom: 1.5,
          near: 1,
          far: 7,
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight intensity={0.5} position={[-4, 2, -1]} />
        <directionalLight intensity={0.5} position={[0, -1.5, 5]} />
        <directionalLight
          intensity={7}
          castShadow
          position={[6, 5, 1]}
          shadow-bias={-0.002}
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
          position={[0, -1, 0]}
          scale={[10, 10, 10]}
          rotation={[Math.PI / -2, 0, 0]}
          receiveShadow
        >
          <meshPhysicalMaterial color="#ffffff" />
        </Plane>
        <Physics>
          <GroundPlane position={[0, -1, 0]} />

          <Suspense fallback={null}>
            {renderStuff && (
              <>
                <Table position={[0, 2, 0]} />
                {foodChoice === "pizza" && <Pizza position={[0, 3, 0]} />}
                {foodChoice === "burger" && <Burger />}
                {Object.values(toppings).map(
                  (key) =>
                    pizzaToppings[key] && <Topping {...pizzaToppings[key]} />
                )}
              </>
            )}
          </Suspense>
        </Physics>
      </Canvas>
    </SideBySide>
  );
};
