import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";
import React from "react";

function BackDrop() {
  const shadnows = React.useRef();

  return (
    <AccumulativeShadows
      ref={shadnows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.55}
        ambient={0.5}
        position={[5, 5, -10]}
      />

      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.55}
        ambient={0.5}
        position={[5, 5, -10]}
      />
    </AccumulativeShadows>
  );
}

export default BackDrop;
