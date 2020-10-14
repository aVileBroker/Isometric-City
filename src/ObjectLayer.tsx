import React from "react";

import useStore, {
  KurbObject,
  ObjectLayerType,
  ObjectType,
} from "./utils/useStore";
import ObjectInstancer from "./ObjectInstancer";

type ObjectInstances = {
  [key in string]: KurbObject[];
};

// this component parses the object list for the layer and passes it to the instancer to get physics
export default ({ layer }: { layer: ObjectLayerType }) => {
  const objects = useStore((state) => state.objects);
  const objectsByLayer = objects[layer];

  const types: string[] = Object.keys(ObjectType);

  const objectsByType: ObjectInstances = {};
  types.forEach((type: string) => {
    objectsByType[type] = objectsByLayer.filter(
      (obj: KurbObject) => obj.type === type
    );
  });

  return (
    <>
      {types.length
        ? Object.values(objectsByType).map((objArray) => (
            <ObjectInstancer objects={objArray} />
          ))
        : null}
    </>
  );
};
