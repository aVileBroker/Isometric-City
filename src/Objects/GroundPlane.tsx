import React from "react";
import { BodyProps, usePlane } from "@react-three/cannon";

export default (props: BodyProps) => {
  const [ref] = usePlane(() => ({
    ...props,
    type: "Static",
    position: [0, 0.5, 0],
  }));
  return (
    <mesh ref={ref} receiveShadow>
      {/* <planeBufferGeometry attach="geometry" args={[1000, 1000]} /> */}
      {/* <meshPhysicalMaterial color="#393" /> */}
    </mesh>
  );
};
