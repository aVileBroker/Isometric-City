import React from "react";
import * as THREE from "three";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useAtom } from "jotai";

import { focalDistanceAtom } from "../Scene";
import ParkingMeter from "./ParkingMeter";

enum curbTypes {
  "metered",
  "public",
  "barricaded",
}

export default ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  type = "straight",
  curbs = [null, null, null, null], // y, x, -y, -x directions
}: {
  position?: number[];
  rotation?: number[];
  type?: string;
  curbs?: curbTypes[] | null[];
}) => {
  // @ts-ignore
  const { nodes } = useLoader(GLTFLoader, `../models/road-${type}.glb`);
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
      {type !== "intersection" && (
        <>
          <ParkingMeter position={[-12, 0, 12]} />
          <ParkingMeter position={[-6, 0, 12]} />
          <ParkingMeter position={[0, 0, 12]} />
          <ParkingMeter position={[6, 0, 12]} />
          <ParkingMeter position={[12, 0, 12]} />
        </>
      )}
    </group>
  );
};
