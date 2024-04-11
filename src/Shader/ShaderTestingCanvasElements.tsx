import { extend, useFrame, useLoader } from "@react-three/fiber";
import { ShaderTestingScreenMaterial } from "./ShaderTestingMaterial";
import { OrbitControls } from "@react-three/drei";
import { FrontSide, Vector3 } from "three";
import { useEffect, useRef, useState } from "react";
//@ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GUI } from "dat.gui";
extend({ ShaderTestingScreenMaterial });

export default function ShaderTestingCanvasElements() {
  const [time, setTime] = useState(0);
  useFrame((x) => setTime(x.clock.elapsedTime));
  const gltf = useLoader(GLTFLoader, "/Plane66KVerts.glb");

  const light = useRef<any>(null);
  const mesh = useRef(null);
  const material = useRef<ShaderTestingScreenMaterial>(null);

  //@ts-ignore
  //console.log(material.current?.uniforms.directionalLights.value.map(x => x.direction));

  useEffect(() => {
    if (!material.current) return;

    const guiWrapper = document.createElement("div");
    guiWrapper.classList.add("gui-wrapper");
    document.body.append(guiWrapper);

    const gui = new GUI();
    guiWrapper.appendChild(gui.domElement);
    gui.width = 500;

    gui.add<any>(
      material.current!.uniforms.uLightDirection.value,
      "x",
      0,
      100,
      0.005
    );
    gui.add<any>(
      material.current!.uniforms.uLightDirection.value,
      "y",
      0,
      100,
      0.005
    );
    gui.add<any>(
      material.current!.uniforms.uLightDirection.value,
      "z",
      0,
      100,
      0.005
    );
    //   gui.add(ref.current.rotation, "y", 0, Math.PI * 2);
    //   gui.add(ref.current.rotation, "z", 0, Math.PI * 2);
    return () => {
      guiWrapper.remove();
    };
  }, [material.current]);

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
        position={[10, 0, 3]}
        geometry={gltf.scene.children[0].geometry}
      >
        <OrbitControls />
        <shaderTestingScreenMaterial
          uniforms-uTime-value={time}
          uniforms-uLightDirection-value={new Vector3(0, -0.5, 0.5)}
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
