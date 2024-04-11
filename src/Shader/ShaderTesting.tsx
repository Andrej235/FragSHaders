import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import { ShaderTestingScreenMaterial } from "./ShaderTestingMaterial";
import { OrbitControls } from "@react-three/drei";
import { FrontSide, Vector3 } from "three";
import { useRef, useState } from "react";
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
  const gltf = useLoader(GLTFLoader, "/Plane66KVerts.glb");

  const light = useRef<any>(null);
  const mesh = useRef(null);
  const material = useRef<ShaderTestingScreenMaterial>(null);

  //@ts-ignore
  //console.log(material.current?.uniforms.directionalLights.value.map(x => x.direction));

  return (
    <>
      <directionalLight
        target={mesh.current ?? undefined}
        intensity={0.6}
        ref={light}
      />

      <mesh
        ref={mesh}
        scale={100}
        position={[10, -10, 3]}
        geometry={gltf.scene.children[0].geometry}
      >
        <OrbitControls />
        <shaderTestingScreenMaterial
          uniforms-uTime-value={time}
          uniforms-uLightDirection-value={new Vector3(0., -0.5, 0.5)}
          side={FrontSide}
          ref={material}
        />
      </mesh>

{/*       <mesh position={[0, 0.5, -0.5]}>
        <sphereGeometry />
        <meshStandardMaterial />
      </mesh> */}
    </>
  );
}
