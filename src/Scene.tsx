import * as React from "react";
import { Suspense } from "react";
import { atom, Bridge, useBridge } from "jotai";

import { Canvas } from "react-three-fiber";
import { Stats, OrbitControls, Plane } from "drei";

import camera from "./constants/camera";

import Building from "./Objects/Building";
import Road from "./Objects/Road";
import Effects from "./Effects";

export const focalDistanceAtom = atom([0, 0, 0]);
const orthographic = true;

const cityLayout = [
  ["road-ns", "apt", "apt", "road-ns", "apt", "apt", "road-ns"],
  ["road-ns", "apt", "apt", "road-ns", "apt", "apt", "road-ns"],
  [
    "road-nsew",
    "road-ew",
    "road-ew",
    "road-nsew",
    "road-ew",
    "road-ew",
    "road-nsew",
  ],
  ["road-ns", "apt", "apt", "road-ns", "apt", "apt", "road-ns"],
  ["road-ns", "apt", "apt", "road-ns", "apt", "apt", "road-ns"],
];

const getLot = (lot: string | null, rowInd: number, colInd: number) => {
  switch (lot) {
    case "apt":
      return (
        <Building
          position={[colInd * 30 - 60, 0, rowInd * 30 - 60]}
          rotation={[0, Math.PI, 0]}
        />
      );
    case "road-ns":
      return (
        <Road
          position={[colInd * 30 - 60, 0.1, rowInd * 30 - 60]}
          rotation={[0, Math.PI / 2, 0]}
        />
      );
    case "road-ew":
      return (
        <Road
          position={[colInd * 30 - 60, 0.1, rowInd * 30 - 60]}
          rotation={[0, 0, 0]}
        />
      );
    case "road-nsew":
      return (
        <Road
          position={[colInd * 30 - 60, 0.1, rowInd * 30 - 60]}
          rotation={[0, 0, 0]}
          type="intersection"
        />
      );

    default:
      return null;
  }
};

export default () => {
  return (
    <Canvas
      camera={{
        position: [100, 90, -100],
        zoom: orthographic ? 10 : 1,
        near: camera.near,
        far: camera.far,
      }}
      invalidateFrameloop
      orthographic={orthographic}
      colorManagement
      shadowMap
      pixelRatio={window.devicePixelRatio}
      style={{ height: "100vh", width: "100vw" }}
    >
      <OrbitControls enableKeys={false} maxPolarAngle={1} minPolarAngle={1} />
      <Stats />
      <color attach="background" args={[0.7, 0.7, 1]} />
      <fog attach="fog" args={["#DDF", 80, 500]} />

      {/* Ambient */}
      <ambientLight intensity={0.6} color="#DDF" />
      {/* Sun light */}
      <directionalLight
        position={[-150, 50, -100]}
        color="#FFA"
        intensity={3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={500}
        shadow-camera-near={50}
        shadow-camera-left={-200}
        shadow-camera-right={200}
        shadow-camera-top={150}
        shadow-camera-bottom={-100}
      />

      <Suspense fallback={null}>
        <Bridge value={useBridge()}>
          {cityLayout.map((row, rowInd) =>
            row.map((lot, colInd) => getLot(lot, rowInd, colInd))
          )}
        </Bridge>

        <Plane
          position={[0, -0.01, 0]}
          scale={[500, 500, 500]}
          rotation={[Math.PI / -2, 0, 0]}
          receiveShadow
        >
          <meshPhysicalMaterial color="#393" />
        </Plane>

        {/* <ContactShadows
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          scale={[10, 1, 10]}
          opacity={0.7}
          width={512}
          height={512}
          blur={1}
          far={9}
        /> */}
        <Bridge value={useBridge()}>
          <Effects />
        </Bridge>
      </Suspense>
    </Canvas>
  );
};
