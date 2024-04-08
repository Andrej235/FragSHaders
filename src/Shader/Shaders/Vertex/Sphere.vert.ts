const sphereVertexShader: string = /* glsl */ `
    uniform float uTime;

    varying vec3 vNormal;
    varying vec2 vUv;

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
        
        vUv = uv;
        
        vec3 newPosition = vec3(position.x, 0.1 * sin((position.x + position.z) * 10. + u_time), position.z);
        vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.0);
        vec4 projectedPosition = projectionMatrix * modelViewPosition;
        gl_Position = projectedPosition;

        vec3 dx = vec3(1.0, 0.1 * cos((position.x + position.z) * 10. + u_time), 0.0);
        vec3 dz = vec3(0.0, 0.1 * cos((position.x + position.z) * 10. + u_time), 1.0);
        vNormal = normalize(cross(dx, dz));
    }
`;

export default sphereVertexShader;
