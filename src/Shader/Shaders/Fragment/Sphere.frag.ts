const sphereFragmentShader: string = /* glsl */ `
    precision mediump float;

    struct DirectionalLight {
        vec3 direction;
        vec3 color;
    };

    uniform DirectionalLight directionalLights[1];

    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    varying float vDisplacement;

    void main() {
        float diffuse = dot(directionalLights[0].direction, vNormal);
        gl_FragColor = vec4(vNormal, 1.0);
    }
`;

export default sphereFragmentShader;
