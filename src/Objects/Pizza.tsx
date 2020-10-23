import React from "react";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useCylinder } from "@react-three/cannon";

export default ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  position?: number[];
  rotation?: number[];
}) => {
  // @ts-expect-error
  const [pizzaRef] = useCylinder(() => ({
    args: [2, 2, 0.084191, 32],
    position,
    mass: 0.5,
    type: "Dynamic",
  }));
  // @ts-expect-error
  const { nodes } = useLoader(GLTFLoader, `../models/pizza.glb`);

  return (
    <group ref={pizzaRef}>
      {nodes.Scene.children[0].children.map((child: any) => (
        <mesh
          key={child.uuid}
          geometry={child.geometry}
          castShadow
          receiveShadow
        >
          <meshPhysicalMaterial attach="material" {...child.material} />
        </mesh>
      ))}
    </group>
  );
};
