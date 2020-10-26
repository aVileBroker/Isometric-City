import React from "react";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useCylinder } from "@react-three/cannon";

export default () => {
  // @ts-expect-error
  const { nodes } = useLoader(GLTFLoader, "../models/burger.glb");

  // @ts-expect-error
  const [burgerRef] = useCylinder(() => ({
    args: [2.885, 2.885, 0.473, 32],
    position: [0, 1.5, 0],
    mass: 0.5,
    type: "Dynamic",
  }));

  return (
    <group ref={burgerRef}>
      {nodes.Scene.children[0].children.map((child: any) => (
        <mesh key={child.uuid} geometry={child.geometry}>
          <meshPhysicalMaterial attach="material" {...child.material} />
        </mesh>
      ))}
    </group>
  );
};
