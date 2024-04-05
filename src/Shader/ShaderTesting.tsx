import { Canvas, extend } from "@react-three/fiber";
import { ShaderTestingScreenMaterial } from "./ShaderTestingMaterial";
import { OrbitControls } from "@react-three/drei";

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
  return (
    <mesh scale={1.2}>
      <OrbitControls />
      <sphereGeometry />
      <shaderTestingScreenMaterial />
    </mesh>
  );
}
