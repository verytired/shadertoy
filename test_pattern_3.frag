float func(float t)
{
    float u = iTime*8.;
    return (sin(t*57.+u)+sin(t*59.+u*1.1)+t*13.313)*.8;
}
float func(vec2 t)
{
    return func(t.x + 8.5463*t.y);
}
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord/iResolution.xy;

    // chevron pattern
    //uv.x += abs(mod(uv.y,.2)-.1)*.5;

    float f = fract(func(vec2(
        uv.x*.5,
        floor(uv.y*10.)
    ))+iTime*3.);

    fragColor = vec4(step(.85,f)*step(.3,fract(uv.y*10.+.15)));
}