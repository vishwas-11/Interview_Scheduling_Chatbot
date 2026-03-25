// import { useEffect, useRef } from 'react';
// import {
//   Clock,
//   Mesh,
//   OrthographicCamera,
//   PlaneGeometry,
//   Scene,
//   ShaderMaterial,
//   Vector2,
//   Vector3,
//   WebGLRenderer
// } from 'three';

// const vertexShader = `
// precision highp float;
// void main() {
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }
// `;

// const fragmentShader = `
// precision highp float;
// uniform float iTime;
// uniform vec3  iResolution;
// uniform float animationSpeed;
// uniform bool enableTop;
// uniform bool enableMiddle;
// uniform bool enableBottom;
// uniform int topLineCount;
// uniform int middleLineCount;
// uniform int bottomLineCount;
// uniform float topLineDistance;
// uniform float middleLineDistance;
// uniform float bottomLineDistance;
// uniform vec3 topWavePosition;
// uniform vec3 middleWavePosition;
// uniform vec3 bottomWavePosition;
// uniform vec2 iMouse;
// uniform bool interactive;
// uniform float bendRadius;
// uniform float bendStrength;
// uniform float bendInfluence;
// uniform bool parallax;
// uniform float parallaxStrength;
// uniform vec2 parallaxOffset;
// uniform vec3 lineGradient[8];
// uniform int lineGradientCount;

// const vec3 BLACK = vec3(0.0);
// const vec3 PINK  = vec3(233.0, 71.0, 245.0) / 255.0;
// const vec3 BLUE  = vec3(47.0,  75.0, 162.0) / 255.0;

// mat2 rotate(float r) {
//   return mat2(cos(r), sin(r), -sin(r), cos(r));
// }

// vec3 background_color(vec2 uv) {
//   vec3 col = vec3(0.0);
//   float y = sin(uv.x - 0.2) * 0.3 - 0.1;
//   float m = uv.y - y;
//   col += mix(BLUE, BLACK, smoothstep(0.0, 1.0, abs(m)));
//   col += mix(PINK, BLACK, smoothstep(0.0, 1.0, abs(m - 0.8)));
//   return col * 0.5;
// }

// vec3 getLineColor(float t, vec3 baseColor) {
//   if (lineGradientCount <= 0) return baseColor;
//   vec3 gradientColor;
//   if (lineGradientCount == 1) {
//     gradientColor = lineGradient[0];
//   } else {
//     float clampedT = clamp(t, 0.0, 0.9999);
//     float scaled = clampedT * float(lineGradientCount - 1);
//     int idx = int(floor(scaled));
//     float f = fract(scaled);
//     int idx2 = min(idx + 1, lineGradientCount - 1);
//     gradientColor = mix(lineGradient[idx], lineGradient[idx2], f);
//   }
//   return gradientColor * 0.5;
// }

// float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
//   float time = iTime * animationSpeed;
//   float x_offset = offset;
//   float x_movement = time * 0.1;
//   float amp = sin(offset + time * 0.2) * 0.3;
//   float y = sin(uv.x + x_offset + x_movement) * amp;
//   if (shouldBend) {
//     vec2 d = screenUv - mouseUv;
//     float influence = exp(-dot(d, d) * bendRadius);
//     y += (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
//   }
//   float m = uv.y - y;
//   return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
// }

// void mainImage(out vec4 fragColor, in vec2 fragCoord) {
//   vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
//   baseUv.y *= -1.0;
//   if (parallax) baseUv += parallaxOffset;
//   vec3 col = vec3(0.0);
//   vec3 b = lineGradientCount > 0 ? vec3(0.0) : background_color(baseUv);
//   vec2 mouseUv = vec2(0.0);
//   if (interactive) {
//     mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
//     mouseUv.y *= -1.0;
//   }
//   if (enableBottom) {
//     for (int i = 0; i < 8; ++i) {
//       if(i >= bottomLineCount) break;
//       float fi = float(i);
//       float t = fi / max(float(bottomLineCount - 1), 1.0);
//       vec2 ruv = baseUv * rotate(bottomWavePosition.z * log(length(baseUv) + 1.0));
//       col += getLineColor(t, b) * wave(ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y), 1.5 + 0.2 * fi, baseUv, mouseUv, interactive) * 0.2;
//     }
//   }
//   if (enableMiddle) {
//     for (int i = 0; i < 8; ++i) {
//       if(i >= middleLineCount) break;
//       float fi = float(i);
//       float t = fi / max(float(middleLineCount - 1), 1.0);
//       vec2 ruv = baseUv * rotate(middleWavePosition.z * log(length(baseUv) + 1.0));
//       col += getLineColor(t, b) * wave(ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y), 2.0 + 0.15 * fi, baseUv, mouseUv, interactive);
//     }
//   }
//   if (enableTop) {
//     for (int i = 0; i < 8; ++i) {
//       if(i >= topLineCount) break;
//       float fi = float(i);
//       float t = fi / max(float(topLineCount - 1), 1.0);
//       vec2 ruv = baseUv * rotate(topWavePosition.z * log(length(baseUv) + 1.0));
//       ruv.x *= -1.0;
//       col += getLineColor(t, b) * wave(ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y), 1.0 + 0.2 * fi, baseUv, mouseUv, interactive) * 0.1;
//     }
//   }
//   fragColor = vec4(col, 1.0);
// }

// void main() {
//   vec4 color = vec4(0.0);
//   mainImage(color, gl_FragCoord.xy);
//   gl_FragColor = color;
// }
// `;

// const MAX_GRADIENT_STOPS = 8;

// function hexToVec3(hex) {
//   let value = hex.trim().replace('#', '');
//   let r, g, b;
//   if (value.length === 3) {
//     r = parseInt(value[0] + value[0], 16);
//     g = parseInt(value[1] + value[1], 16);
//     b = parseInt(value[2] + value[2], 16);
//   } else {
//     r = parseInt(value.slice(0, 2), 16);
//     g = parseInt(value.slice(2, 4), 16);
//     b = parseInt(value.slice(4, 6), 16);
//   }
//   return new Vector3(r / 255, g / 255, b / 255);
// }

// export default function FloatingLines({
//   linesGradient = ['#4A4AE2', '#E24AE2'],
//   enabledWaves = ['top', 'middle', 'bottom'],
//   lineCount = [6, 6, 6],
//   lineDistance = [5, 5, 5],
//   topWavePosition = { x: 10.0, y: 0.5, rotate: -0.4 },
//   middleWavePosition = { x: 5.0, y: 0.0, rotate: 0.2 },
//   bottomWavePosition = { x: 2.0, y: -0.7, rotate: 0.4 },
//   animationSpeed = 1,
//   interactive = true,
//   bendRadius = 5.0,
//   bendStrength = -0.5,
//   mouseDamping = 0.05,
//   parallax = true,
//   parallaxStrength = 0.2,
//   mixBlendMode = 'screen'
// }) {
//   const containerRef = useRef(null);
//   const targetMouseRef = useRef(new Vector2(-1000, -1000));
//   const currentMouseRef = useRef(new Vector2(-1000, -1000));
//   const targetInfluenceRef = useRef(0);
//   const currentInfluenceRef = useRef(0);
//   const targetParallaxRef = useRef(new Vector2(0, 0));
//   const currentParallaxRef = useRef(new Vector2(0, 0));

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;
//     let active = true;
//     const scene = new Scene();
//     const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
//     const renderer = new WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     container.appendChild(renderer.domElement);

//     const uniforms = {
//       iTime: { value: 0 },
//       iResolution: { value: new Vector3() },
//       animationSpeed: { value: animationSpeed },
//       enableTop: { value: enabledWaves.includes('top') },
//       enableMiddle: { value: enabledWaves.includes('middle') },
//       enableBottom: { value: enabledWaves.includes('bottom') },
//       topLineCount: { value: lineCount[0] || 6 },
//       middleLineCount: { value: lineCount[1] || 6 },
//       bottomLineCount: { value: lineCount[2] || 6 },
//       topLineDistance: { value: (lineDistance[0] || 5) * 0.01 },
//       middleLineDistance: { value: (lineDistance[1] || 5) * 0.01 },
//       bottomLineDistance: { value: (lineDistance[2] || 5) * 0.01 },
//       topWavePosition: { value: new Vector3(topWavePosition.x, topWavePosition.y, topWavePosition.rotate) },
//       middleWavePosition: { value: new Vector3(middleWavePosition.x, middleWavePosition.y, middleWavePosition.rotate) },
//       bottomWavePosition: { value: new Vector3(bottomWavePosition.x, bottomWavePosition.y, bottomWavePosition.rotate) },
//       iMouse: { value: new Vector2(-1000, -1000) },
//       interactive: { value: interactive },
//       bendRadius: { value: bendRadius },
//       bendStrength: { value: bendStrength },
//       bendInfluence: { value: 0 },
//       parallax: { value: parallax },
//       parallaxStrength: { value: parallaxStrength },
//       parallaxOffset: { value: new Vector2(0, 0) },
//       lineGradient: { value: Array.from({ length: 8 }, () => new Vector3(1, 1, 1)) },
//       lineGradientCount: { value: linesGradient.length }
//     };

//     linesGradient.slice(0, 8).forEach((hex, i) => {
//       const color = hexToVec3(hex);
//       uniforms.lineGradient.value[i].copy(color);
//     });

//     const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true });
//     const mesh = new Mesh(new PlaneGeometry(2, 2), material);
//     scene.add(mesh);

//     const clock = new Clock();
//     const resize = () => {
//       const { clientWidth: w, clientHeight: h } = container;
//       renderer.setSize(w, h);
//       uniforms.iResolution.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio(), 1);
//     };
//     window.addEventListener('resize', resize);
//     resize();

//     const handleMove = (e) => {
//       const rect = container.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       targetMouseRef.current.set(x * renderer.getPixelRatio(), (rect.height - y) * renderer.getPixelRatio());
//       targetInfluenceRef.current = 1.0;
//       if (parallax) {
//         targetParallaxRef.current.set(((x - rect.width / 2) / rect.width) * parallaxStrength, (-(y - rect.height / 2) / rect.height) * parallaxStrength);
//       }
//     };
//     container.addEventListener('pointermove', handleMove);
//     container.addEventListener('pointerleave', () => targetInfluenceRef.current = 0);

//     const loop = () => {
//       if (!active) return;
//       uniforms.iTime.value = clock.getElapsedTime();
//       currentMouseRef.current.lerp(targetMouseRef.current, mouseDamping);
//       uniforms.iMouse.value.copy(currentMouseRef.current);
//       currentInfluenceRef.current += (targetInfluenceRef.current - currentInfluenceRef.current) * mouseDamping;
//       uniforms.bendInfluence.value = currentInfluenceRef.current;
//       currentParallaxRef.current.lerp(targetParallaxRef.current, mouseDamping);
//       uniforms.parallaxOffset.value.copy(currentParallaxRef.current);
//       renderer.render(scene, camera);
//       requestAnimationFrame(loop);
//     };
//     loop();

//     return () => {
//       active = false;
//       window.removeEventListener('resize', resize);
//       renderer.dispose();
//     };
//   }, [linesGradient, enabledWaves, lineCount, lineDistance, topWavePosition, middleWavePosition, bottomWavePosition, animationSpeed, interactive, bendRadius, bendStrength, mouseDamping, parallax, parallaxStrength]);

//   return <div ref={containerRef} className="absolute inset-0 z-0" style={{ mixBlendMode }} />;
// }










import { useEffect, useRef } from 'react';
import {
  Clock,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer
} from 'three';

const vertexShader = `
precision highp float;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform float iTime;
uniform vec3 iResolution;
uniform float animationSpeed;
uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;
uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;
uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;
uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;
uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;
uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;
uniform vec3 lineGradient[8];
uniform int lineGradientCount;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 getLineColor(float t) {
  if (lineGradientCount <= 0) return vec3(1.0);
  if (lineGradientCount == 1) return lineGradient[0];
  
  float clampedT = clamp(t, 0.0, 0.9999);
  float scaled = clampedT * float(lineGradientCount - 1);
  int idx = int(floor(scaled));
  float f = fract(scaled);
  
  // Manual clamping for array index safety
  vec3 c1 = lineGradient[0];
  vec3 c2 = lineGradient[1];
  
  // Simple linear interpolation across the array
  for(int i = 0; i < 7; i++) {
    if(i == idx) {
        c1 = lineGradient[i];
        c2 = lineGradient[i+1];
        break;
    }
  }
  return mix(c1, c2, f);
}

float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;
  float x_offset = offset;
  float x_movement = time * 0.1;
  float amp = sin(offset + time * 0.2) * 0.3;
  float y = sin(uv.x + x_offset + x_movement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float distSq = dot(d, d);
    float influence = exp(-distSq * bendRadius);
    y += (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
  }

  float m = uv.y - y;
  return 0.0175 / (abs(m) + 0.005);
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;
  
  if (parallax) baseUv += parallaxOffset;

  vec3 col = vec3(0.0);
  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }

  // BOTTOM LAYER
  if (enableBottom) {
    for (int i = 0; i < 8; ++i) {
      if(i >= bottomLineCount) break;
      float fi = float(i);
      float t = fi / max(float(bottomLineCount - 1), 1.0);
      vec2 ruv = baseUv * rotate(bottomWavePosition.z * log(length(baseUv) + 1.0));
      col += getLineColor(t) * wave(ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y), 1.5 + 0.2 * fi, baseUv, mouseUv, interactive) * 0.2;
    }
  }

  // MIDDLE LAYER
  if (enableMiddle) {
    for (int i = 0; i < 8; ++i) {
      if(i >= middleLineCount) break;
      float fi = float(i);
      float t = fi / max(float(middleLineCount - 1), 1.0);
      vec2 ruv = baseUv * rotate(middleWavePosition.z * log(length(baseUv) + 1.0));
      col += getLineColor(t) * wave(ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y), 2.0 + 0.15 * fi, baseUv, mouseUv, interactive);
    }
  }

  // TOP LAYER
  if (enableTop) {
    for (int i = 0; i < 8; ++i) {
      if(i >= topLineCount) break;
      float fi = float(i);
      float t = fi / max(float(topLineCount - 1), 1.0);
      vec2 ruv = baseUv * rotate(topWavePosition.z * log(length(baseUv) + 1.0));
      ruv.x *= -1.0;
      col += getLineColor(t) * wave(ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y), 1.0 + 0.2 * fi, baseUv, mouseUv, interactive) * 0.1;
    }
  }

  gl_FragColor = vec4(col, 1.0);
}
`;

function hexToVec3(hex) {
  let value = hex.trim().replace('#', '');
  let r, g, b;
  if (value.length === 3) {
    r = parseInt(value[0] + value[0], 16);
    g = parseInt(value[1] + value[1], 16);
    b = parseInt(value[2] + value[2], 16);
  } else {
    r = parseInt(value.slice(0, 2), 16);
    g = parseInt(value.slice(2, 4), 16);
    b = parseInt(value.slice(4, 6), 16);
  }
  return new Vector3(r / 255, g / 255, b / 255);
}

export default function FloatingLines({
  linesGradient = ['#4A4AE2', '#E24AE2'],
  enabledWaves = ['top', 'middle', 'bottom'],
  lineCount = [6, 6, 6],
  lineDistance = [5, 5, 5],
  topWavePosition = { x: 10.0, y: 0.5, rotate: -0.4 },
  middleWavePosition = { x: 5.0, y: 0.0, rotate: 0.2 },
  bottomWavePosition = { x: 2.0, y: -0.7, rotate: 0.4 },
  animationSpeed = 1,
  interactive = true,
  bendRadius = 5.0,
  bendStrength = -0.5,
  mouseDamping = 0.05,
  parallax = true,
  parallaxStrength = 0.2,
  mixBlendMode = 'screen'
}) {
  const containerRef = useRef(null);
  const uniformsRef = useRef(null);
  const targetMouseRef = useRef(new Vector2(-1000, -1000));
  const currentMouseRef = useRef(new Vector2(-1000, -1000));
  const targetInfluenceRef = useRef(0);
  const currentInfluenceRef = useRef(0);
  const targetParallaxRef = useRef(new Vector2(0, 0));
  const currentParallaxRef = useRef(new Vector2(0, 0));

  // INITIALIZATION EFFECT
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const initialGradients = new Float32Array(8 * 3).fill(1);
    
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new Vector3() },
      animationSpeed: { value: animationSpeed },
      enableTop: { value: enabledWaves.includes('top') },
      enableMiddle: { value: enabledWaves.includes('middle') },
      enableBottom: { value: enabledWaves.includes('bottom') },
      topLineCount: { value: lineCount[0] || 6 },
      middleLineCount: { value: lineCount[1] || 6 },
      bottomLineCount: { value: lineCount[2] || 6 },
      topLineDistance: { value: (lineDistance[0] || 5) * 0.01 },
      middleLineDistance: { value: (lineDistance[1] || 5) * 0.01 },
      bottomLineDistance: { value: (lineDistance[2] || 5) * 0.01 },
      topWavePosition: { value: new Vector3(topWavePosition.x, topWavePosition.y, topWavePosition.rotate) },
      middleWavePosition: { value: new Vector3(middleWavePosition.x, middleWavePosition.y, middleWavePosition.rotate) },
      bottomWavePosition: { value: new Vector3(bottomWavePosition.x, bottomWavePosition.y, bottomWavePosition.rotate) },
      iMouse: { value: new Vector2(-1000, -1000) },
      interactive: { value: interactive },
      bendRadius: { value: bendRadius },
      bendStrength: { value: bendStrength },
      bendInfluence: { value: 0 },
      parallax: { value: parallax },
      parallaxStrength: { value: parallaxStrength },
      parallaxOffset: { value: new Vector2(0, 0) },
      lineGradient: { value: initialGradients },
      lineGradientCount: { value: linesGradient.length }
    };
    uniformsRef.current = uniforms;

    const material = new ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true });
    const mesh = new Mesh(new PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const clock = new Clock();
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      renderer.setSize(w, h);
      uniforms.iResolution.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio(), 1);
    };
    window.addEventListener('resize', resize);
    resize();

    const handleMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetMouseRef.current.set(x * renderer.getPixelRatio(), (rect.height - y) * renderer.getPixelRatio());
      targetInfluenceRef.current = 1.0;
      if (parallax) {
        targetParallaxRef.current.set(((x - rect.width / 2) / rect.width) * parallaxStrength, (-(y - rect.height / 2) / rect.height) * parallaxStrength);
      }
    };
    container.addEventListener('pointermove', handleMove);
    container.addEventListener('pointerleave', () => targetInfluenceRef.current = 0);

    let frameId;
    const loop = () => {
      uniforms.iTime.value = clock.getElapsedTime();
      currentMouseRef.current.lerp(targetMouseRef.current, mouseDamping);
      uniforms.iMouse.value.copy(currentMouseRef.current);
      currentInfluenceRef.current += (targetInfluenceRef.current - currentInfluenceRef.current) * mouseDamping;
      uniforms.bendInfluence.value = currentInfluenceRef.current;
      currentParallaxRef.current.lerp(targetParallaxRef.current, mouseDamping);
      uniforms.parallaxOffset.value.copy(currentParallaxRef.current);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      container.removeEventListener('pointermove', handleMove);
      renderer.dispose();
      material.dispose();
    };
  }, []); // Only runs on mount

  // UPDATE UNIFORMS ON PROP CHANGE
  useEffect(() => {
    if (!uniformsRef.current) return;
    const u = uniformsRef.current;
    
    u.animationSpeed.value = animationSpeed;
    u.enableTop.value = enabledWaves.includes('top');
    u.enableMiddle.value = enabledWaves.includes('middle');
    u.enableBottom.value = enabledWaves.includes('bottom');
    u.topLineCount.value = lineCount[0];
    u.middleLineCount.value = lineCount[1];
    u.bottomLineCount.value = lineCount[2];
    u.topLineDistance.value = lineDistance[0] * 0.01;
    u.middleLineDistance.value = lineDistance[1] * 0.01;
    u.bottomLineDistance.value = lineDistance[2] * 0.01;
    u.topWavePosition.value.set(topWavePosition.x, topWavePosition.y, topWavePosition.rotate);
    u.middleWavePosition.value.set(middleWavePosition.x, middleWavePosition.y, middleWavePosition.rotate);
    u.bottomWavePosition.value.set(bottomWavePosition.x, bottomWavePosition.y, bottomWavePosition.rotate);
    u.interactive.value = interactive;
    u.bendRadius.value = bendRadius;
    u.bendStrength.value = bendStrength;
    u.parallax.value = parallax;
    u.parallaxStrength.value = parallaxStrength;

    // Update Gradient Array
    const newGradients = new Float32Array(8 * 3);
    linesGradient.slice(0, 8).forEach((hex, i) => {
      const color = hexToVec3(hex);
      newGradients[i * 3] = color.x;
      newGradients[i * 3 + 1] = color.y;
      newGradients[i * 3 + 2] = color.z;
    });
    u.lineGradient.value = newGradients;
    u.lineGradientCount.value = linesGradient.length;
  }, [linesGradient, enabledWaves, lineCount, lineDistance, topWavePosition, middleWavePosition, bottomWavePosition, animationSpeed, interactive, bendRadius, bendStrength, parallax, parallaxStrength]);

  return <div ref={containerRef} className="absolute inset-0 z-0" style={{ mixBlendMode }} />;
}