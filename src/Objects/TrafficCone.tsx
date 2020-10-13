import React from "react";
import { useBox } from "@react-three/cannon";

import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  ...props
}: {
  position?: number[];
  rotation?: number[];
}) => {
  const [coneRef] = useBox(() => ({
    position,
    rotation,
    ...props,
    mass: 1,
    material: { restitution: 1.5 },
  }));

  // @ts-expect-error
  const { nodes } = useLoader(GLTFLoader, `../models/traffic-cone.glb`);

  console.log(coneRef);

  return (
    <group ref={coneRef}>
      {nodes.Scene.children[0].children.map((child: any) => (
        <mesh
          key={child.uuid}
          visible
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
