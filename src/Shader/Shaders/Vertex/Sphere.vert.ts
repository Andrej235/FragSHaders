const sphereVertexShader: string = /* glsl */ `
    #define e 2.71828
    uniform float uTime;

    varying vec3 vNormal;
    varying vec2 vUv;
    varying vec3 vCameraPosition;
    varying vec3 vLightDirectionView;

    uniform vec3 uLightDirection;

    vec2 random(vec2 seed) {
        return fract(sin(vec2(dot(seed, vec2(127.1, 311.7)), dot(seed, vec2(269.5, 183.3)))) * 43758.5453);
    }

    void main() {
        vec3 coords = position;
        vec3 newPosition = vec3(position.x, 0.0, position.z);

        float amplitude = .02;
        float frequency = 1.;
        const float phase = 3.;

        vec3 dx = vec3(1.0, 0.0, 0.0);
        vec3 dz = vec3(0.0, 0.0, 1.0);

        float x = position.x;
        float z = position.z;

        for(int i = 0; i < 8; i++) {
            vec2 direction = random(position.xz);
            newPosition.y += amplitude * sin((direction.x * x + direction.y * z) * frequency + uTime * phase);
            // newPosition.y += amplitude * sin(z * frequency + uTime * phase);
            dx.y += amplitude * cos((direction.x * x + direction.y * z) * frequency + uTime * phase) * frequency * direction.x;
            dz.y += amplitude * cos((direction.x * x + direction.y * z) * frequency + uTime * phase) * frequency * direction.y;
            // dz.y += amplitude * cos(z * frequency + uTime * phase);
            amplitude *= .8;
            frequency *= 1.2;
        }
        vNormal = normalize(cross(dx, dz));
        newPosition.y /= 2.0;
        
        vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.0);
        vec4 projectedPosition = projectionMatrix * modelViewPosition;
        gl_Position = projectedPosition;

        vUv = uv;
        vCameraPosition = (modelViewMatrix * vec4(newPosition, 1.0)).xyz;
        vLightDirectionView = (viewMatrix * vec4(uLightDirection, 0.)).xyz;
    }
`;

export default sphereVertexShader;
