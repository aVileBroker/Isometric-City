import React from "react";
import TrafficCone from "./Objects/TrafficCone";

import useStore, {
  KurbObject,
  ObjectLayerType,
  ObjectType,
} from "./utils/useStore";
import ObjectInstancer from "./ObjectInstancer";

type ObjectInstances = {
  [key in string]: KurbObject[];
};

export default ({ layer }: { layer: ObjectLayerType }) => {
  const objects = useStore((state) => state.objects);
  const objectsByLayer = objects[layer];

  const objectsByType: ObjectInstances = {};

  Object.keys(ObjectType).forEach((type) => {
    objectsByType[type] = objectsByLayer.filter((obj) => obj.type === type);
  });

  console.log(objectsByType);

  return <ObjectInstancer objects={Object.values(objectsByType)[0]} />;
};
