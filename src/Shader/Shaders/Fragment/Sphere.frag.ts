const sphereFragmentShader: string = /* glsl */ `
    precision mediump float;

    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    varying float vDisplacement;

    void main() {
        gl_FragColor = vec4(vDisplacement, 0.0, 0.0, 1.0);
    }
`;

export default sphereFragmentShader;
