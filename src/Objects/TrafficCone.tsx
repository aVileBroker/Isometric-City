import React, { useEffect, useRef } from "react";

import clamp from "lodash.clamp";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Event, useBox } from "@react-three/cannon";

import useStore, { KurbObject, ObjectStore } from "../utils/useStore";

const objectCap = 200;
const glbUri: string = `../models/traffic-cone.glb`;

export default ({ objects }: { objects: KurbObject[] }) => {
  const plasticAudio: HTMLAudioElement = useStore(
    (state: ObjectStore): HTMLAudioElement => state.plasticAudio
  );

  const objectCount = useRef(objects.length);

  const [ref, api] = useBox((index) => ({
    position: [Math.random() * 50000, -50000, Math.random() * 50000],
    mass: 1,
    args: [2, 2, 2],
    type: "Dynamic",
    onCollide: (e: Event): void => {
      if (index < objectCount.current) {
        // @ts-expect-error clamp doesn't exist on cannon Event?
        const velocity = e.contact.impactVelocity / 20;
        if (velocity > 0.0125) {
          plasticAudio.currentTime = 0;
          // @ts-expect-error clamp doesn't exist on cannon Event?
          plasticAudio.volume = clamp(e.contact.impactVelocity / 20, 0.01, 1);
          plasticAudio.play();
        }
      }
    },
  }));

  const {
    // @ts-expect-error
    nodes: { Cube },
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
      args={[Cube.geometry, Cube.material, objectCap]}
      castShadow
      receiveShadow
    />
  );
};

// useLoader.preload(GLTFLoader, glbUri);
