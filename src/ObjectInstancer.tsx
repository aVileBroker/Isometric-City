import React from "react";
import { useBox } from "@react-three/cannon";

import TrafficCone from "./Objects/TrafficCone";
import { KurbObject, ObjectType } from "./utils/useStore";

type ObjectProperty = {
  uri: string;
  mass: number;
  material: any;
  args: number[];
};

type ObjectPropertyMap = {
  [key in ObjectType]: ObjectProperty;
};

const objectProperties: ObjectPropertyMap = {
  cone: {
    uri: `../models/traffic-cone.glb`,
    mass: 1,
    material: { restitution: 1.5 },
    args: [2, 2, 2],
  },
  foodTruck: {
    uri: "",
    mass: 1,
    material: { restitution: 1.5 },
    args: [2, 2, 2],
  },
};

export default ({ objects }: { objects: KurbObject[] }) => {
  const [ref] = useBox((index) => ({
    position: objects[index].position,
    rotation: objects[index].rotation,
    args: objectProperties[objects[index].type].args,
    mass: objectProperties[objects[index].type].mass,
    material: objectProperties[objects[index].type].material,
  }));

  switch (obj.type) {
    case ObjectType.cone:
      return <TrafficCone ref={ref} />;
  }
};
