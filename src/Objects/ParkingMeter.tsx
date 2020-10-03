import React, { useEffect } from "react";
import * as THREE from "three";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// @ts-ignore
import { a, useSpring } from "react-spring/three";

export default ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  position?: number[];
  rotation?: number[];
}) => {
  // @ts-ignore
  const { nodes } = useLoader(GLTFLoader, `../models/parking-meter.glb`);

  const [{ scale }, set] = useSpring(() => ({
    scale: 0,
  }));

  useEffect(() => {
    set({ scale: 1 });
  }, [set]);

  console.log(scale.value);

  return (
    <a.group
      position={new THREE.Vector3(...position)}
      rotation={new THREE.Euler(...rotation)}
      scale={[scale, scale, scale]}
    >
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
    </a.group>
  );
};
