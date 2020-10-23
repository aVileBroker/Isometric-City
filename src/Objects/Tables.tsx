import React, { useEffect, useRef } from "react";

import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useCylinder } from "@react-three/cannon";

import { KurbObject } from "../utils/useStore";

const objectCap = 50;
const glbUri: string = `../models/table-large.glb`;

export default ({ objects }: { objects: KurbObject[] }) => {
  const objectCount = useRef(objects.length);

  // @ts-expect-error
  const [ref, api] = useCylinder((index) => ({
    position: [Math.random() * 50000, -50000, Math.random() * 50000],
    mass: 1,
    args: [2.665, 2.665, 2.3, 32],
    type: "Dynamic",
  }));

  const {
    // @ts-expect-error
    nodes: { Table },
  } = useLoader(GLTFLoader, glbUri);

  useEffect(() => {
    if (objects.length === 0 && objectCount.current > 0) {
      // reset!
      for (let i = 0; i < objectCount.current; i++) {
        api
          .at(i)
          .position.set(Math.random() * 50000, -50000, Math.random() * 50000);
      }
    }

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

      api.at(objects.length - 1).velocity.set(0, -2, 0);
      api.at(objects.length - 1).angularVelocity.set(0, 0, 0);
    }

    objectCount.current = objects.length;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objects.length]);

  return (
    <instancedMesh
      ref={ref}
      args={[Table.geometry, Table.material, objectCap]}
      castShadow
      receiveShadow
    />
  );
};

// useLoader.preload(GLTFLoader, glbUri);
