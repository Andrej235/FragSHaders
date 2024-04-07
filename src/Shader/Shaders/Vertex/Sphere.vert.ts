const sphereVertexShader: string = /* glsl */ `
    uniform float uTime;

    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    varying float vDisplacement;

    uniform float u_time;
    uniform vec2 u_resolution;
    
/*     #define OCTAVES 16
    float FBM(in float seed) {
        float value = 0.;
        float amplitude = .5;
        float frequency = 2.;
    
        for(int i = 0; i < OCTAVES; i++) {
            value += amplitude * sin(seed * frequency + u_time);
            amplitude *= .5923;
            frequency *= 1.74523;
        }
    
        return value;
    } */

    void main() {
        vec3 coords = position;

        // float pattern = FBM(coords.x * coords.z);
        float wave = sin(coords.x * coords.z);
        
        vPosition = position;
        vUv = uv;
        vDisplacement = wave;
        vec3 newPosition = position + vec3(0.0, wave, 0.0);

        vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.0);
        vec4 projectedPosition = projectionMatrix * modelViewPosition;

        // vNormal = (transpose(inverse(modelViewMatrix)) * vec4(newPosition, 1.0) * projectionMatrix).xyz;
        // vNormal = normalMatrix * newPosition;

/*         vec3 dx = vec3(coords.x, 0.0, 0.0) * cos(coords);
        vec3 dz = vec3(0.0, 0.0, coords.z) * cos(coords);
        vNormal = vec3(normalize(cross(dx, dz))); */

        vec4 worldPosition = modelMatrix * vec4(newPosition, 1.0);
        vec3 dx = coords * cos(coords.z); 
        vec3 dz = coords * cos(coords.x); 
        dx = normalize(dx);
        dz = normalize(dz);

        vNormal = vec3(normalize(cross(dx, dz)));

        gl_Position = projectedPosition;
    }
`;

export default sphereVertexShader;
