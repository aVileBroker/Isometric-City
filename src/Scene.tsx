import * as React from "react";
import { Suspense } from "react";
// import * as THREE from "three";
// import { a, useSpring } from "react-spring/three";
import { useControl } from "react-three-gui";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Vignette,
  SSAO,
  // Noise,
  // SMAA,
} from "react-postprocessing";
// import { EdgeDetectionMode } from "postprocessing";

import {
  Canvas,
  // useFrame
} from "react-three-fiber";
import {
  softShadows,
  ContactShadows,
  Stats,
  Box,
  OrbitControls,
  Plane,
} from "drei";
// import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

softShadows({});
// RectAreaLightUniformsLib.init();

export default () => {
  const distance = useControl("DoF Distance", { type: "number", max: 50 });
  console.log(distance);
  return (
    <Canvas
      colorManagement
      shadowMap
      pixelRatio={window.devicePixelRatio}
      style={{ height: "100vh", width: "100vw" }}
    >
      <OrbitControls />
      <Stats />
      <color attach="background" args={[0.7, 0.7, 1]} />
      <fog attach="fog" args={["#DDF", 40, 100]} />

      {/* Ambient */}
      <ambientLight intensity={0.4} color="#DDF" />
      {/* Sun light */}
      <directionalLight
        position={[-10, 5, -10]}
        color="#FF5"
        intensity={10}
        castShadow
        // shadow-mapSize-width={2048}
        // shadow-mapSize-height={2048}
        // shadow-camera-far={50}
        // shadow-camera-near={0}
        // shadow-camera-left={-10}
        // shadow-camera-right={10}
        // shadow-camera-top={10}
        // shadow-camera-bottom={-10}
      />

      <Suspense fallback={null}>
        <Box position={[0, 0, 0]} castShadow>
          <meshPhysicalMaterial color="white" />
        </Box>

        <Plane
          position={[0, -0.5, 0]}
          scale={[10, 10, 10]}
          rotation={[Math.PI / -2, 0, 0]}
          receiveShadow
        >
          <meshPhysicalMaterial color="#333" />
        </Plane>

        <ContactShadows
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, -7, 0]}
          opacity={1}
          width={40}
          height={40}
          blur={1}
          far={9}
        />
        <EffectComposer multisampling={0}>
          <DepthOfField
            focusDistance={distance}
            focalLength={0.01}
            bokehScale={2}
          />
          <Bloom intensity={0.25} />
          {/* <Noise opacity={0.1} /> */}
          <Vignette />
          <SSAO
            // @ts-ignore
            samples={25}
            intensity={40}
            luminanceInfluence={1}
            radius={2}
            scale={0.5}
            bias={0.5}
          />
          {/* <SMAA edgeDetectionMode={EdgeDetectionMode.DEPTH} /> */}
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
};
