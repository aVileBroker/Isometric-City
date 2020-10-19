import React, { useEffect, useRef } from "react";

import clamp from "lodash.clamp";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Event, useBox } from "@react-three/cannon";

import useStore, { KurbObject, ObjectStore } from "../utils/useStore";

const objectCap = 20;
const glbUri: string = `../models/food-truck.glb`;

export default ({ objects }: { objects: KurbObject[] }) => {
  const {
    truckHonkAudio,
    truckAudio,
  }: {
    truckHonkAudio: HTMLAudioElement;
    truckAudio: HTMLAudioElement;
  } = useStore((state: ObjectStore) => state);

  const objectCount = useRef(objects.length);

  const [ref, api] = useBox((index) => ({
    position: [Math.random() * 50000, -50000, Math.random() * 50000],
    mass: 3000,
    args: [9.64763, 6.31864, 4.78622],
    type: "Dynamic",
    onCollide: (e: Event): void => {
      if (index < objectCount.current) {
        // @ts-expect-error clamp doesn't exist on cannon Event?
        const velocity = e.contact.impactVelocity;
        if (velocity > 0.001) {
          truckAudio.currentTime = 0;
          // @ts-expect-error clamp doesn't exist on cannon Event?
          truckAudio.volume = clamp(e.contact.impactVelocity / 20, 0.1, 1);
          truckAudio.play();
        }
        if (velocity > 10) {
          truckHonkAudio.currentTime = 0;
          // @ts-expect-error clamp doesn't exist on cannon Event?
          truckHonkAudio.volume = clamp(e.contact.impactVelocity / 20, 0.5, 1);
          truckHonkAudio.play();
        }
      }
    },
  }));

  const {
    // @ts-expect-error
    nodes: { Cube },
  } = useLoader(GLTFLoader, glbUri);

  objectCount.current = objects.length;

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

      api.at(objects.length - 1).velocity.set(0, -2, 0);
      api.at(objects.length - 1).angularVelocity.set(0, 0, 0);
    }
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
