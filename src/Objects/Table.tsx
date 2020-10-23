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
  const [tableRef] = useCylinder(() => ({
    args: [1.34, 1.34, 1.16, 32],
    position,
    mass: 2,
    type: "Dynamic",
  }));
  // @ts-expect-error
  const { nodes } = useLoader(GLTFLoader, `../models/table.glb`);

  return (
    <mesh
      ref={tableRef}
      key={nodes.Cylinder.uuid}
      geometry={nodes.Cylinder.geometry}
      castShadow
      receiveShadow
    >
      <meshPhysicalMaterial attach="material" {...nodes.Cylinder.material} />
    </mesh>
  );
};
