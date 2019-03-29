#define fGlobalTime iTime

float noise(float a)
{
  return fract(a*126.38921+13.156);
}

float noise2d(vec2 a)
{
  return fract(sin(dot(a,vec2(12.9345,4.3742)))*131.1563);
}

float verticalNoise(int a){
  float n = noise(float(a));
  return (n*.5+.5) * (n>.5?-1.:1.);
}

float digit(ivec2 p, int d)
{
  int[16] font=int[16](
    0xEAAAE0,
    0x4C44E0,
    0xE2E8E0,
    0xE2E2E0,
    0xAAE220,
    0xE8E2E0,
    0xE8EAE0,
    0xE22220,
    0xEAEAE0,
    0xEAE2E0,
    0xEAEAA0,
    0xCACAC0,
    0xE888E0,
    0xCAAAC0,
    0xE8E8E0,
    0xE8E880
  );
  return float((font[d]>>((3-p.x)+p.y*4))&1);
}

void mainImage(out vec4 out_color, in vec2 fragCoord)
{
  vec2 uv = fragCoord.xy / iResolution.xy;
  int cellx = int(floor(uv.x * 8.));
  float speed = 1.;
  float verticalShift = fract(verticalNoise(cellx) * fGlobalTime * speed);
  uv.y += verticalShift;
  int celly = int(floor((uv.y) * 8.));
  vec2 subspace = fract(uv*8.);
  bool isNumbers = (celly&1)!=0;

  vec2 cellsize = iResolution.xy/8.;
  ivec2 pixelspace = ivec2(subspace * cellsize);

  if(isNumbers)
  {
    out_color = vec4(digit(pixelspace%ivec2(4,6),int(noise2d(fract(fGlobalTime)+3.*vec2(pixelspace/ivec2(4,6)))*16.)));
    out_color *= step(.5,noise2d(fract(fGlobalTime)+.5*vec2(pixelspace/ivec2(4,6))));
  }
  else
  {
    out_color = vec4(noise2d(subspace) * (noise2d(vec2(cellx,celly)+fract(fGlobalTime))));
    out_color *= noise(uv.x*noise(uv.x+fract(fGlobalTime))+float(celly)*5.1);
    out_color *= noise(uv.y*noise(uv.y+fract(fGlobalTime))+float(cellx)*7.1);
    out_color *= 3.;
  }
}