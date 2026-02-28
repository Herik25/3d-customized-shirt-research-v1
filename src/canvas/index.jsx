import { Center, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import CameraRig from "./CameraRig";
import BackDrop from "./BackDrop";
import Shirt from "./Shirt";

function CanvasModel() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <CameraRig>
      {/* <BackDrop> */}
      <Center>
        <Shirt />
      </Center>
      {/* </BackDrop> */}
      </CameraRig>
    </Canvas>
  );
}

export default CanvasModel;
