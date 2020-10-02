import React from "react";
import * as THREE from "three";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAtom } from "jotai";

import { focalDistanceAtom } from "../Scene";

export default ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  position?: number[];
  rotation?: number[];
}) => {
  // @ts-ignore
  const { nodes } = useLoader(GLTFLoader, "../models/apartment-building.glb");

  const [, setFocusPoint] = useAtom(focalDistanceAtom);

  return (
    <group
      position={new THREE.Vector3(...position)}
      rotation={new THREE.Euler(...rotation)}
      onClick={(evt) => {
        console.log(evt);
        // setDistance(evt.intersections[0].distance);
        setFocusPoint([
          evt.intersections[0].point.x,
          evt.intersections[0].point.y,
          evt.intersections[0].point.z,
        ]);
      }}
    >
      {nodes.Cube.children.map((child: any) => (
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
