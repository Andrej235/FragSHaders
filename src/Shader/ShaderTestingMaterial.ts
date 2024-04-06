import { ReactThreeFiber } from "@react-three/fiber";
import { ShaderMaterial } from "three";
import sphereFragmentShader from "./Shaders/Fragment/Sphere.frag";
import sphereVertexShader from "./Shaders/Vertex/Sphere.vert";

export class ShaderTestingScreenMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        u_time: {
          value: 0,
        },
      },
      transparent: true,
      vertexShader: sphereVertexShader,
      fragmentShader: sphereFragmentShader,
    });
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      shaderTestingScreenMaterial: ReactThreeFiber.Object3DNode<
        ShaderTestingScreenMaterial,
        typeof ShaderTestingScreenMaterial
      >;
    }
  }
}
