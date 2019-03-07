// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com
// https://thebookofshaders.com/10/?lan=jp

float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 st = fragCoord.xy/iResolution.xy;
    float rnd = random(st);
    fragColor = vec4(vec3(rnd),1.0);
}
