import React, { useEffect } from "react";

import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useBox } from "@react-three/cannon";

import { KurbObject } from "../utils/useStore";

const objectCap = 75;

export default ({ objects }: { objects: KurbObject[] }) => {
  const [ref, api] = useBox((index) => ({
    position: [0, -50000, 0],
    mass: 1,
    args: [2, 2, 2],
    type: "Dynamic",
  }));

  const {
    // @ts-expect-error
    nodes: { Cube },
  } = useLoader(GLTFLoader, `../models/traffic-cone.glb`);

  useEffect(() => {
    if (objects.length && objects.length <= objectCap) {
      const { position, rotation = [0, 0, 0] }: KurbObject = objects[
        objects.length - 1
      ];
      api
        .at(objects.length - 1)
        .position.set(position[0], position[1], position[2]);
      api
        .at(objects.length - 1)
        .rotation.set(rotation[0], rotation[1], rotation[2]);

      api.at(objects.length - 1).velocity.set(0, -5, 0);
      api.at(objects.length - 1).angularVelocity.set(0, 0, 0);
    }
  }, [api, objects]);

  return (
    <instancedMesh
      ref={ref}
      args={[Cube.geometry, Cube.material, objectCap]}
      castShadow
      receiveShadow
    />
  );
};
