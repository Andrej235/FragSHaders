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
        vec3 lightDirection = vec3(0.91, 0.0, .4);

        //Normalize this value to get all shaded areas to be black  
        float diffuse = dot(lightDirection, vNormal);
        vec3 color = vec3(0.3, 0.3, 1.0) * diffuse;
        color += (1.0 - diffuse) * vec3(0.1, 0.1, 0.4);
        gl_FragColor = vec4(color, 1.0);
    }
`;

export default sphereFragmentShader;
