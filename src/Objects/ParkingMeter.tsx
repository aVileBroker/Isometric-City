import React, { useRef } from "react";
import * as THREE from "three";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// @ts-expect-error
import { a, useSpring } from "react-spring/three";

export default ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  position?: number[];
  rotation?: number[];
}) => {
  const meterRef = useRef();
  // @ts-expect-error
  const { nodes } = useLoader(GLTFLoader, `../models/parking-meter.glb`);

  const [,] = useSpring(() => ({
    from: { scale: 0 },
    to: { scale: 1 },
    config: { tension: 500, friction: 15 },
    delay: 500,
    onFrame: ({ scale }: { scale: number }) => {
      if (meterRef.current) {
        // @ts-expect-error
        meterRef.current.scale.set(scale, scale, scale);
      }
    },
  }));

  return (
    <a.group
      position={new THREE.Vector3(...position)}
      rotation={new THREE.Euler(...rotation)}
      scale={[0, 0, 0]}
      ref={meterRef}
    >
      {nodes.Scene.children.map((child: any) => (
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
