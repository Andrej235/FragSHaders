import { Canvas, extend, useThree } from "@react-three/fiber";
import { FadeoutScreenMaterial } from "./FadeoutScreenMaterial";
import "./FadeoutScreen.scss";
import { OrbitControls } from "@react-three/drei";

extend({ FadeoutScreenMaterial });

export function FadeOutScreen() {
  return (
    <div className="fade-screen">
      <Canvas>
        <FadeoutScreenCanvasElements />
      </Canvas>
    </div>
  );
}

function FadeoutScreenCanvasElements() {
  const { width, height } = useThree((state) => state.viewport);

  return (
    <mesh scale={3}>
      <OrbitControls />
      <sphereGeometry />
      <fadeoutScreenMaterial />
    </mesh>
  );
}
