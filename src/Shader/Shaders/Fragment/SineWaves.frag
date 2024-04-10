#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 pos = gl_FragCoord.xy / u_resolution;
    pos.x *= u_resolution.x / u_resolution.y;

    //Map the y axis for to see both peaks
    pos.y = .5 - pos.y;
    pos.y *= 3.;

    //Speed
    float phase = 5.;
    float y = 0.0;
    y += 0.3 * sin(pos.x * 8. + u_time * phase);
    y += 0.183 * sin(pos.x * 12. + u_time * phase);
    y += 0.53 * sin(pos.x * 5. + u_time * phase);
    // y += sin(pos.x * 10. + u_time * phase * 3.);
    // y += sin(pos.y * 10. + u_time * phase * 4.);

    vec3 color = vec3(1.);
    color *= step(y - 0.0075, pos.y) * (1.0 - step(y + 0.0075, pos.y));

    gl_FragColor = vec4(color, 1.0);

    exp(vec2(0.));
    cross(vec3(0.0), vec3(0.0));
}