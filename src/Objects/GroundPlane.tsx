import React from "react";
import { usePlane } from "@react-three/cannon";

export default ({
  position = [0, 0.5, 0],
  rotation = [Math.PI / -2, 0, 0],
}: {
  position?: number[];
  rotation?: number[];
}) => {
  const [ref] = usePlane(() => ({
    type: "Static",
    rotation,
    position,
  }));
  return <mesh ref={ref} receiveShadow />;
};
