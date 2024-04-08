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
        // vec3 lightDirection = directionalLights[0].direction;
        vec3 lightDirection = vec3(0.5, 0.123, 0.43);

        float diffuse = dot(lightDirection, vNormal);
        gl_FragColor = vec4(vec3(diffuse), 1.0);
    }
`;

export default sphereFragmentShader;
