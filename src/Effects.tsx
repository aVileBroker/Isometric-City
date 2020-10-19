import React, { useEffect } from "react";
import * as THREE from "three";
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Vignette,
  SSAO,
  // Noise,
  SMAA,
} from "react-postprocessing";
import { useResource } from "react-three-fiber";
import { EdgeDetectionMode } from "postprocessing";
import { useAtom } from "jotai";

import { focalDistanceAtom } from "./Scene";

export default () => {
  const [focalPoint] = useAtom(focalDistanceAtom);

  // TODO: setup a spring which animates between the old focal point and the new one for smoother racking

  // const dofRef = useResource();

  // useEffect(() => {
  //   if (dofRef && dofRef.current) {
  //     // @ts-ignore
  //     dofRef.current.target = new THREE.Vector3(...focalPoint);
  //   }
  // }, [dofRef, focalPoint]);

  return (
    <EffectComposer multisampling={0}>
      <DepthOfField
        // don't @ts-expect-error
        // ref={dofRef}
        focalLength={0.15}
        focusDistance={0.3}
        bokehScale={4}
        height={640}
      />
      <Bloom intensity={0.25} luminanceThreshold={0.7} />
      <SSAO
        // @ts-expect-error
        samples={25}
        intensity={40}
        luminanceInfluence={0.25}
        radius={3}
        scale={0.5}
        bias={0.5}
      />
      {/* <Noise opacity={0.1} /> */}
      <Vignette />
      <SMAA edgeDetectionMode={EdgeDetectionMode.DEPTH} />
    </EffectComposer>
  );
};
