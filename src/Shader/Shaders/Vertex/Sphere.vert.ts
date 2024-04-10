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

    #define DRAG_MULT 0.38 // changes how much waves pull on the water
    #define WATER_DEPTH 1.0 // how deep is the water
    #define CAMERA_HEIGHT 1.5 // how high the camera should be
    #define ITERATIONS_RAYMARCH 12 // waves iterations of raymarching
    #define ITERATIONS_NORMAL 37 // waves iterations when calculating normals

    vec2 wavedx(vec2 position, vec2 direction, float frequency, float timeshift) {
        float dotProduct = position.x * direction.x + position.y * direction.y;
        
        float x = dotProduct * frequency + timeshift;
        float wave = pow(e, sin(x) - 1.0);
        float dx = wave * cos(x);
        return vec2(wave, -dx);
    }

    float getwaves(vec2 position, int iterations) {
        float iterationDirectionMultiplier = 0.0; // this will help generating well distributed wave directions
        float frequency = 1.0; // frequency of the wave, this will change every iteration
        float timeMultiplier = 2.0; // time multiplier for the wave, this will change every iteration
        float weight = 1.0;// weight in final sum for the wave, this will change every iteration
        float sumOfValues = 0.0; // will store final sum of values
        float sumOfWeights = 0.0; // will store final sum of weights

        for(int i=0; i < iterations; i++) {
          // generate some wave direction that looks kind of random
          vec2 direction = vec2(sin(iterationDirectionMultiplier), cos(iterationDirectionMultiplier));
          // calculate wave data
          vec2 res = wavedx(position, direction, frequency, uTime * timeMultiplier);
      
          // shift position around according to wave drag and derivative of the wave
          position += direction * res.y * weight * DRAG_MULT; //May not be doing anything... Check later
      
          // add the results to sums
          sumOfValues += res.x * weight;
          sumOfWeights += weight;
      
          // modify next octave ;
          weight = mix(weight, 0.0, 0.2);
          frequency *= 1.18;
          timeMultiplier *= 1.07;
      
          // add some kind of random value to make next wave look random too
          iterationDirectionMultiplier += 1232.399963;
        }
        // calculate and return
        return sumOfValues / sumOfWeights;
      }

    void main() {
        vec3 coords = position;
        vec3 newPosition = vec3(position.x, 0.0, position.z);

/*         float amplitude = .2;
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
        newPosition.y /= 2.0; */
        
        newPosition.y = getwaves(newPosition.xz, 32);
        // vNormal = calculateNormal(newPosition.xz, 0.1, 1.0);

        vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.0);
        vec4 projectedPosition = projectionMatrix * modelViewPosition;
        gl_Position = projectedPosition;

        vUv = uv;
        vCameraPosition = (modelViewMatrix * vec4(newPosition, 1.0)).xyz;
        vLightDirectionView = (viewMatrix * vec4(uLightDirection, 0.)).xyz;
    }
`;

export default sphereVertexShader;
