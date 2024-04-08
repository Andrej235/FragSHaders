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

    float getwaves(vec2 x){
        return sin(x.x + x.y);
    }

    vec3 getnormal(vec2 pos, float e, float depth) {
        vec2 ex = vec2(e, 0);
        float H = getwaves(pos.xy) * depth;
        vec3 a = vec3(pos.x, H, pos.y);
        return normalize(
          cross(
            a - vec3(pos.x - e, getwaves(pos.xy - ex.xy) * depth, pos.y), 
            a - vec3(pos.x, getwaves(pos.xy + ex.yx) * depth, pos.y + e)
          )
        );
      }

    void main() {
        vec3 coords = position;
        
        vPosition = position;
        vUv = uv;
        // vDisplacement = wave;
        
        vec3 newPosition = vec3(position.x, sin((position.x + position.z)  + u_time), position.z);
        vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.0);
        vec4 projectedPosition = projectionMatrix * modelViewPosition;
        gl_Position = projectedPosition;

        // vNormal = (transpose(inverse(modelViewMatrix)) * vec4(newPosition, 1.0) * projectionMatrix).xyz;
        // vNormal = normalMatrix * newPosition;

/*         vec3 dx = vec3(coords.x, 0.0, 0.0) * cos(coords);
        vec3 dz = vec3(0.0, 0.0, coords.z) * cos(coords);
        vNormal = vec3(normalize(cross(dx, dz))); */

/*         vec4 worldPosition = modelMatrix * vec4(newPosition, 1.0);
        vec3 dx = coords * cos(coords.z); 
        vec3 dz = coords * cos(coords.x); 
        dx = normalize(dx);
        dz = normalize(dz);

        vNormal = vec3(normalize(cross(dx, dz))); */

        // vNormal = getnormal(position.xz, 1.1, 1.0);

        vec3 dx = vec3(1.0, cos((position.x + position.z) + u_time), 0.0);
        vec3 dz = vec3(0.0, cos((position.x + position.z) + u_time), 1.0);
        vNormal = normalize(cross(dx, dz));
    }
`;

export default sphereVertexShader;
