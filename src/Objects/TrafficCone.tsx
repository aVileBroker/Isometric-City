import React from "react";
// import { useBox } from "@react-three/cannon";

import { useLoader } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default React.forwardRef(
  (
    {
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      ...props
    }: {
      position?: number[];
      rotation?: number[];
    },
    ref
  ) => {
    // const [coneRef] = useBox(() => ({
    //   position,
    //   rotation,
    //   ...props,
    //   args: [2, 2, 2],
    //   mass: 1,
    //   material: { restitution: 1.5 },
    // }));

    const {
      // @ts-expect-error
      nodes: { Cube },
    } = useLoader(GLTFLoader, `../models/traffic-cone.glb`);

    return (
      <instancedMesh
        // @ts-expect-error - ref type is wonky?
        ref={ref}
        key={Cube.uuid}
        visible
        geometry={Cube.geometry}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial attach="material" {...Cube.material} />
      </instancedMesh>
    );
  }
);
