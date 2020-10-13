import React from "react";
import TrafficCone from "./Objects/TrafficCone";
import useStore, {
  KurbObject,
  ObjectLayerType,
  ObjectType,
  ObjectTypeList,
} from "./utils/useStore";

type ObjectLayer = {
  objectTypeFilter: ObjectLayerType;
};

const getObjectComponent = (obj: KurbObject) => {
  switch (obj.type) {
    case ObjectType.cone:
      return (
        <TrafficCone
          position={obj.position}
          rotation={obj.rotation}
          key={obj.id}
        />
      );
  }

  return null;
};

export default ({ objectTypeFilter }: ObjectLayer) => {
  const objects = useStore<ObjectTypeList>((state) => state.objects);
  const filteredObjects = objects[objectTypeFilter];
  console.log(filteredObjects);

  return (
    <>
      {filteredObjects &&
        filteredObjects.map((obj: KurbObject) => getObjectComponent(obj))}
    </>
  );
};
