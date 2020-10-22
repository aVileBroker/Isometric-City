import * as React from "react";
import * as THREE from "three";
import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// @ts-expect-error
import { a, useSpring } from "react-spring/three";
import useInterval from "use-interval";

export default ({
  position = [0, 0, 0],
  rotation = [Math.PI / 2, 0, 0],
  highlightedButton,
}: {
  position?: number[];
  rotation?: number[];
  highlightedButton?: number;
}) => {
  const {
    // @ts-expect-error
    nodes: {
      Sphere: { children: mouseParts },
    },
  } = useLoader(GLTFLoader, "../models/mouse.glb");
  const mouseRef = React.useRef();
  const lmbMaterialRef = React.useRef();
  const rmbMaterialRef = React.useRef();
  const wheelMaterialRef = React.useRef();

  const buttonRefs = [lmbMaterialRef, rmbMaterialRef, wheelMaterialRef];

  const mouseXPos = React.useRef(0);
  const mouseYRot = React.useRef(0);

  const [, set] = useSpring(() => ({
    from: { scale: 0, x: 0, yRot: 0 },
    to: { scale: 1, x: mouseXPos.current, yRot: mouseYRot.current },
    config: { tension: 100, friction: 15 },
    // delay: 500,
    onFrame: ({
      scale,
      x,
      yRot,
    }: {
      scale: number;
      x: number;
      yRot: number;
    }) => {
      if (mouseRef.current) {
        // @ts-expect-error
        mouseRef.current.scale.set(scale, scale, scale);
        // @ts-expect-error
        mouseRef.current.position.x = x;
        // @ts-expect-error
        mouseRef.current.rotation.z = yRot;
      }
    },
  }));

  useInterval(() => {
    mouseXPos.current = mouseXPos.current !== 0 ? mouseXPos.current * -1 : 0.2;
    mouseYRot.current = Math.PI / (Math.random() * 8 + 8) - Math.PI / 16;
    set({ scale: 1, x: mouseXPos.current, yRot: mouseYRot.current });
  }, 1500);

  React.useEffect(() => {
    if (highlightedButton !== undefined && highlightedButton <= 2) {
      buttonRefs.forEach((currRef, i) => {
        if (i === highlightedButton) {
          // @ts-expect-error
          currRef.current.color.setHex(0xaa0000);
        } else {
          // @ts-expect-error
          currRef.current.color.setHex(0x939393);
        }
      });
    }
  }, [buttonRefs, highlightedButton]);

  return (
    <a.group
      position={new THREE.Vector3(...position)}
      rotation={new THREE.Euler(...rotation)}
      scale={[0, 0, 0]}
      ref={mouseRef}
    >
      {/* Body */}
      <mesh
        key={mouseParts[0].uuid}
        geometry={mouseParts[0].geometry}
        castShadow
        receiveShadow
      >
        <a.meshPhysicalMaterial attach="material" {...mouseParts[0].material} />
      </mesh>
      {/* RMB */}
      <mesh
        key={mouseParts[1].uuid}
        geometry={mouseParts[1].geometry}
        castShadow
        receiveShadow
      >
        <a.meshPhysicalMaterial
          ref={rmbMaterialRef}
          attach="material"
          {...mouseParts[1].material}
        />
      </mesh>
      {/* LMB */}
      <mesh
        key={mouseParts[2].uuid}
        geometry={mouseParts[2].geometry}
        castShadow
        receiveShadow
      >
        <a.meshPhysicalMaterial
          ref={lmbMaterialRef}
          attach="material"
          {...mouseParts[2].material}
        />
      </mesh>
      {/* Wheel */}
      <mesh
        key={mouseParts[3].uuid}
        geometry={mouseParts[3].geometry}
        castShadow
        receiveShadow
      >
        <a.meshPhysicalMaterial
          ref={wheelMaterialRef}
          attach="material"
          {...mouseParts[3].material}
        />
      </mesh>
    </a.group>
  );
};
