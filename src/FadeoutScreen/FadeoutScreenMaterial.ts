import { ReactThreeFiber } from "@react-three/fiber";
import { ShaderMaterial } from "three";

export class FadeoutScreenMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {},
      transparent: true,
      vertexShader: /*glsl*/ `
                varying vec2 v_uv;
                void main() {
                    v_uv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
      fragmentShader: /*glsl*/ `
                precision mediump float;

                varying vec2 v_uv;

                void main() {
                    gl_FragColor = vec4(v_uv, 0.0, 1.0);
                }
            `,
    });
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      fadeoutScreenMaterial: ReactThreeFiber.Object3DNode<
        FadeoutScreenMaterial,
        typeof FadeoutScreenMaterial
      >;
    }
  }
}
