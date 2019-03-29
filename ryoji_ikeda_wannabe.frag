// Fork of "Ryoji Ikeda Wannabe" by pickledchickenfoot. https://shadertoy.com/view/4dlyDS
// 2018-10-01 16:56:33

#define WIDTH 1.0

float audio_freq( in sampler2D channel, in float f) { return texture( channel, vec2(f, 0.25) ).x; }
float audio_ampl( in sampler2D channel, in float t) { return texture( channel, vec2(t, 0.75) ).x; }


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;
    vec2 mouseUV = iMouse.xy / iResolution.xy;
    if (mouseUV == vec2(0.0)) {
        mouseUV = vec2(1.0);
    }

    float freq = audio_freq(iChannel0, abs(uv.x-0.5)+0.03); // 0.0 => 1.0
    float ampl = audio_ampl(iChannel0, 0.0)
        + audio_ampl(iChannel0, 0.2)
        + audio_ampl(iChannel0, 0.4)
        + audio_ampl(iChannel0, 0.6)
        + audio_ampl(iChannel0, 0.8)
        + audio_ampl(iChannel0, 1.0);
    ampl = ampl / 5.0;
    ampl += 0.1;
    float mono = mod(fragCoord.y, round((freq+mouseUV.x *ampl*5.0) * mouseUV.y *ampl*ampl*10.0));
    mono = 1.0 - mono;
    //mono = mod(fragCoord.x, uv.x );

    vec3 color = vec3(freq);
    //color = vec3( floor(freq+0.5) );
    //color = vec3(ampl);
    color = vec3(mono);
    fragColor = vec4(color, 1.0);
//    fragColor = vec4(, 1.0);
}