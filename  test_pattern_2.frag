void mainImage(out vec4 c, in vec2 f){
    vec2 u=(f/iResolution.xy)/vec2(1,8);
    vec2 speed = texture(iChannel0,vec2(0,u.y)).rg;
    u.x*=speed.g*.9+.1;
    u.x+=iTime*(speed.r-.5)*.3;
    c=vec4((fract(texture(iChannel0,u).r+iTime*.5)<.5||fract(u.y*256.)<.15)?1:0);
}