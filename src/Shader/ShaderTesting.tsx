import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { ShaderTestingScreenMaterial } from "./ShaderTestingMaterial";
import { OrbitControls } from "@react-three/drei";
import { BackSide, Euler } from "three";
import { useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

extend({ ShaderTestingScreenMaterial });

export function ShaderTesting() {
  return (
    <div className="shader-testing-wrapper">
      <Canvas>
        <ShaderTestingCanvasElements />
      </Canvas>
    </div>
  );
}

function ShaderTestingCanvasElements() {
  const [time, setTime] = useState(0);
  useFrame((x) => setTime(x.clock.elapsedTime));
  const gltf = useLoader(GLTFLoader, "/SubdividedPlane.glb");

  return (
    <mesh
      scale={10.2}
      rotation={new Euler(Math.PI)}
      geometry={gltf.scene.children[0].geometry}
    >
      <OrbitControls />
      <shaderTestingScreenMaterial
        uniforms-u_time-value={time}
        side={BackSide}
      />
    </mesh>
  );
}
