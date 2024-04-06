const sphereVertexShader: string = /* glsl */ `
    uniform float uTime;

    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec2 vUv;
    varying float vDisplacement;

    uniform float u_time;
    uniform vec2 u_resolution;
    
    #define OCTAVES 16
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
    }

    void main() {
        vec3 coords = position;
        coords.y = .5 - coords.y;
        coords.y *= 3.;

        float pattern = FBM(coords.x * coords.z);
        
        vPosition = position;
        vNormal = normal;
        vUv = uv;
        vDisplacement = pattern;

        // generate a displacement value using the pattern
        float displacement = pattern ;

        // move the vertex in the displacement direction
        vec3 newPosition = position + normal * vec3(0.0, displacement, 0.0);

        // calculate the final position of the vertex, taking into account the model, view and projection matrices
        vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.0);
        vec4 projectedPosition = projectionMatrix * modelViewPosition;

        // set the gl_Position to the final position
        gl_Position = projectedPosition;
    }
`;

export default sphereVertexShader;
