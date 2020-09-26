import * as React from "react";
import { Suspense } from "react";
// import * as THREE from "three";
// import { a, useSpring } from "react-spring/three";
import { useControl } from "react-three-gui";
import {
  EffectComposer,
  DepthOfField,
  // Bloom,
  Vignette,
  SSAO,
  // Noise,
  SMAA,
} from "react-postprocessing";
import { EdgeDetectionMode } from "postprocessing";

import {
  Canvas,
  // useFrame
} from "react-three-fiber";
import {
  // softShadows,
  ContactShadows,
  Stats,
  Box,
  OrbitControls,
  Plane,
} from "drei";
// import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";

// softShadows({});
// RectAreaLightUniformsLib.init();

export default () => {
  const distance = useControl("DoF Distance", {
    type: "number",
    value: 10,
    max: 150,
  });
  console.log(distance);

  return (
    <Canvas
      camera={{
        position: [100, 40, 100],
        focus: distance,
        zoom: 20,
      }}
      orthographic
      colorManagement
      shadowMap
      pixelRatio={window.devicePixelRatio}
      style={{ height: "100vh", width: "100vw" }}
    >
      <OrbitControls />
      <Stats />
      <color attach="background" args={[0.7, 0.7, 1]} />
      <fog attach="fog" args={["#DDF", 80, 500]} />

      {/* Ambient */}
      <ambientLight intensity={0.6} color="#DDF" />
      {/* Sun light */}
      <directionalLight
        position={[-15, 5, -10]}
        color="#FF5"
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={200}
        shadow-camera-near={5}
        shadow-camera-left={-200}
        shadow-camera-right={200}
        shadow-camera-top={50}
        shadow-camera-bottom={0}
      />

      <Suspense fallback={null}>
        <Box position={[0, 6, 0]} args={[10, 12, 10]} castShadow>
          <meshPhysicalMaterial color="white" />
        </Box>

        <Plane
          position={[0, -0.01, 0]}
          scale={[200, 200, 200]}
          rotation={[Math.PI / -2, 0, 0]}
          receiveShadow
        >
          <meshPhysicalMaterial color="#393" />
        </Plane>

        <ContactShadows
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          opacity={0.7}
          width={40}
          height={40}
          blur={1}
          far={9}
        />
        <EffectComposer multisampling={0}>
          <DepthOfField
            focusDistance={distance}
            focalLength={0.5}
            bokehScale={4}
            height={240}
          />
          {/* <Bloom intensity={0.5} /> */}
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
          <SMAA edgeDetectionMode={EdgeDetectionMode.DEPTH} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
};
