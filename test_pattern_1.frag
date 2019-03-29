#iChannel0 https://66.media.tumblr.com/tumblr_mcmeonhR1e1ridypxo1_500.jpg

void mainImage(out vec4 c, in vec2 f){
    vec2 u=(f/iResolution.xy)/vec2(1,16);
    c=vec4((fract(texture(iChannel0,u).r+iTime*.5)<.5||fract(u.y*256.)<.15)?1:0);
}