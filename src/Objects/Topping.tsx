import React from "react";

import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useBox } from "@react-three/cannon";

const getRandomCircularPosition = () => {
  const angle = Math.random() * Math.PI * 2;
  const distance = Math.random() * 0.7 + 0.1;
  return [
    Math.cos(angle) * distance,
    3 + Math.random(),
    Math.sin(angle) * distance,
  ];
};

export default ({
  modelName,
  count,
  dimensions = [0.1, 0.01, 0.1],
}: {
  modelName: string;
  count: number;
  dimensions: number[];
}) => {
  const [ref] = useBox((index) => {
    const position = getRandomCircularPosition();
    return {
      position: position,
      rotation: [
        (Math.PI * 2) / Math.random(),
        (Math.PI * 2) / Math.random(),
        (Math.PI * 2) / Math.random(),
      ],
      mass: 0.01,
      args: [0.1, 0.01, 0.1],
      type: "Dynamic",
    };
  });

  // @ts-expect-error
  const { nodes } = useLoader(GLTFLoader, `../models/${modelName}.glb`);

  return (
    <instancedMesh
      ref={ref}
      args={[
        nodes.Scene.children[0].geometry,
        nodes.Scene.children[0].material,
        count,
      ]}
      castShadow
      receiveShadow
    />
  );
};
