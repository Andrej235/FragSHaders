import { Canvas, extend } from "@react-three/fiber";
import ShaderTestingCanvasElements from "./ShaderTestingCanvasElements";
import { Water } from "three/examples/jsm/Addons.js";
extend({ Water });

export function ShaderTesting() {
  return (
    <div className="shader-testing-wrapper">
      <Canvas>
        <ShaderTestingCanvasElements />
        {/* <fog color={0x000000} near={1} far={100} /> */}
        {/* <Ocean /> */}
      </Canvas>
    </div>
  );
}
