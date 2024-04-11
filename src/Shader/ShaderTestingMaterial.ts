import { ReactThreeFiber } from "@react-three/fiber";
import { ShaderMaterial, UniformsLib, UniformsUtils, Vector3 } from "three";
import sphereFragmentShader from "./Shaders/Fragment/Sphere.frag";
import sphereVertexShader from "./Shaders/Vertex/Sphere.vert";

export class ShaderTestingScreenMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: UniformsUtils.merge([
        UniformsLib.lights,
        {
          uTime: {
            value: 0,
          },
          uLightDirection: {
            value: new Vector3(0),
          },
          uFresnelNormalStrength: {
            value: 2,
          },
          uFresnelStrength: {
            value: 1,
          },
          uFresnelShininess: {
            value: 1,
          },
          uFresnelBias: {
            value: 1,
          },
          uFresnelColor: {
            value: new Vector3(0.5, 0.5, 0.5),
          },
        },
      ]),
      transparent: true,
      vertexShader: sphereVertexShader,
      fragmentShader: sphereFragmentShader,
      lights: true,
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
