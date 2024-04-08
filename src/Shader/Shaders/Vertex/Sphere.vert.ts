const sphereVertexShader: string = /* glsl */ `
    uniform float uTime;

    varying vec3 vNormal;
    varying vec2 vUv;
    varying vec3 vCameraPosition;
    varying vec3 vLightDirectionView;

    uniform vec3 uLightDirection;

    void main() {
        vec3 coords = position;
        vec3 newPosition = vec3(position.x, 0.0, position.z);

        float amplitude = 0.07;
        float frequency = 10.;
        const float phase = 5.;
        // newPosition.y = amplitude * sin(position.x * frequency + uTime * phase);
        // newPosition.y += amplitude * sin(position.z * frequency + uTime * phase);
        
/*         vec3 dx = vec3(1.0, 0.0, 0.0);
        dx.y = amplitude * cos(position.x * frequency + uTime * phase);
        
        vec3 dz = vec3(0.0, 0.0, 1.0);
        dz.y = amplitude * cos(position.z * frequency + uTime * phase);

        vNormal = normalize(cross(dx, dz)); */

        vec3 dx = vec3(1.0, 0.0, 0.0);
        vec3 dz = vec3(0.0, 0.0, 1.0);

        float x = position.x;
        float z = position.z;

        for(int i = 0; i < 8; i++) {
            newPosition.y += amplitude * sin(x * frequency + uTime * phase);
            newPosition.y += amplitude * sin(z * frequency + uTime * phase);
            dx.y += amplitude * cos(x * frequency + uTime * phase);
            dz.y += amplitude * cos(z * frequency + uTime * phase);
            amplitude *= .5923;
            frequency *= 1.74523;
        }
        vNormal = normalize(cross(dx, dz));
        
        vec4 modelViewPosition = modelViewMatrix * vec4(newPosition, 1.0);
        vec4 projectedPosition = projectionMatrix * modelViewPosition;
        gl_Position = projectedPosition;

        vUv = uv;
        vCameraPosition = (modelViewMatrix * vec4(newPosition, 1.0)).xyz;
        vLightDirectionView = (viewMatrix * vec4(uLightDirection, 0.)).xyz;
    }
`;

export default sphereVertexShader;
