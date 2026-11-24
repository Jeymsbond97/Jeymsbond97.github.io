/* The Lumi home scene's world: sky with aurora and stars, a ringed planet, a distant city of light,
   a rolling wireframe terrain, the glowing floor grid and the charging pad with its HUD rings.
   Shaders, colours and sizes are ported unchanged from the Lumi app (web/home3d.html). */
import * as THREE from 'three';

const NOISE = `
  float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
  float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<3;i++){v+=a*noise(p);p*=2.03;a*=.5;}return v;}`;

const PLANE_VS = `varying vec2 vP; void main(){ vP=position.xy; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`;

export interface World {
  /** Advance every animated material to scene time `t` (s); `camDir` keeps the planet behind the robot. */
  update(t: number, camDir: THREE.Vector3): void;
  /** Point size scale for the particles: device pixels per CSS pixel times canvas height / 900. */
  setPointScale(px: number): void;
}

export function buildWorld(scene: THREE.Scene): World {
  const timed: THREE.ShaderMaterial[] = [];
  const shader = (p: THREE.ShaderMaterialParameters) => {
    const m = new THREE.ShaderMaterial({ ...p, uniforms: { uTime: { value: 0 }, ...p.uniforms } });
    timed.push(m);
    return m;
  };

  // sky: the same all round, so every angle looks finished
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(200, 64, 32), shader({
    side: THREE.BackSide, depthWrite: false, fog: false,
    vertexShader: `varying vec3 vDir; void main(){ vDir=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
    fragmentShader: `
      uniform float uTime; varying vec3 vDir; ${NOISE}
      void main(){
        vec3 d=normalize(vDir); float h=d.y;
        float az=atan(d.z,d.x);
        vec3 top=vec3(0.006,0.010,0.028), mid=vec3(0.012,0.030,0.060), hor=vec3(0.03,0.16,0.22);
        vec3 col=mix(mid,top,smoothstep(0.05,0.7,h));
        col=mix(col,hor,exp(-abs(h-0.02)*14.)*0.9);
        col+=vec3(0.30,0.18,0.55)*exp(-abs(h-0.01)*40.)*0.25;
        float a=fbm(vec2(az*3.0+uTime*0.02, h*4.0-uTime*0.03));
        float band=smoothstep(0.08,0.28,h)*smoothstep(0.65,0.3,h);
        col+=mix(vec3(0.0,0.55,0.45),vec3(0.25,0.2,0.75),a)*pow(a,3.0)*band*0.55;
        vec2 g=vec2(az*90.0, asin(clamp(h,-1.,1.))*90.0);
        vec2 cell=floor(g); float r=hash(cell);
        float star=step(0.985,r)*smoothstep(0.35,0.0,length(fract(g)-0.5));
        star*=0.6+0.4*sin(uTime*(1.0+r*3.0)+r*40.0);
        col+=vec3(0.75,0.9,1.0)*star*smoothstep(0.02,0.2,h);
        gl_FragColor=vec4(col,1.);
      }`,
  })));

  // a planet that keeps to the upper left of whatever way you look, with an atmosphere and a ring
  const planetRig = new THREE.Group();
  planetRig.rotation.order = 'YXZ';
  scene.add(planetRig);
  const planet = new THREE.Mesh(new THREE.SphereGeometry(9, 64, 48), shader({
    fog: false,
    vertexShader: `varying vec3 vN; varying vec3 vP; varying vec3 vV;
      void main(){ vN=normalize(normalMatrix*normal); vP=position; vec4 mv=modelViewMatrix*vec4(position,1.); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }`,
    fragmentShader: `uniform float uTime; varying vec3 vN; varying vec3 vP; varying vec3 vV; ${NOISE}
      void main(){
        vec3 p=normalize(vP);
        float bands=fbm(vec2(p.y*7.0, atan(p.z,p.x)*1.5+uTime*0.01));
        vec3 base=mix(vec3(0.03,0.10,0.16),vec3(0.10,0.32,0.38),bands);
        float lit=clamp(dot(vN,normalize(vec3(-0.6,0.3,0.7))),0.,1.);
        float fres=pow(1.0-max(dot(vN,vV),0.),3.0);
        vec3 col=base*(0.08+lit*0.9)+vec3(0.2,0.9,1.0)*fres*0.9;
        gl_FragColor=vec4(col,1.);
      }`,
  }));
  const ring = new THREE.Mesh(new THREE.RingGeometry(12, 17, 128, 1), new THREE.ShaderMaterial({
    transparent: true, side: THREE.DoubleSide, depthWrite: false, fog: false,
    vertexShader: `varying float vR; void main(){ vR=length(position.xy); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
    fragmentShader: `varying float vR; void main(){ float t=(vR-12.)/5.;
      float a=(0.25+0.25*sin(t*60.))*smoothstep(0.,0.1,t)*smoothstep(1.,0.75,t);
      gl_FragColor=vec4(vec3(0.45,0.85,0.95),a*0.35); }`,
  }));
  ring.rotation.x = Math.PI * 0.42;
  ring.rotation.y = 0.35;
  const planetBody = new THREE.Group();
  planetBody.add(planet, ring);
  planetBody.position.set(-68, 44, -178);
  planetBody.scale.setScalar(1.6);
  planetRig.add(planetBody);

  // distant city of light all round the horizon
  {
    const N = 260;
    const geo = new THREE.BoxGeometry(1, 1, 1);
    geo.translate(0, 0.5, 0);
    const mesh = new THREE.InstancedMesh(geo, shader({
      transparent: true, depthWrite: false, fog: false,
      vertexShader: `attribute float aSeed; varying vec3 vL; varying float vSeed; varying vec3 vNrm;
        void main(){ vL=position; vSeed=aSeed; vNrm=normal; gl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.); }`,
      fragmentShader: `uniform float uTime; varying vec3 vL; varying float vSeed; varying vec3 vNrm;
        float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
        void main(){
          float side=1.0-abs(vNrm.y);
          vec2 w=vec2((vL.x+vL.z)*6.0, vL.y*22.0);
          float win=step(0.6,fract(w.x))*step(0.5,fract(w.y))*step(0.55,hash(floor(w)+vSeed));
          float edge=smoothstep(0.96,1.0,vL.y);
          vec3 c=mix(vec3(0.15,0.85,1.0),vec3(0.6,0.45,1.0),vSeed);
          float blink=step(0.92,fract(vSeed*13.0))*step(0.5,fract(uTime*0.5+vSeed*7.0));
          vec3 col=vec3(0.008,0.018,0.034)+c*(win*0.35*side+edge*0.6+blink*edge*2.0);
          float fade=smoothstep(0.0,0.35,vL.y);
          gl_FragColor=vec4(col, 0.92*mix(0.35,1.0,fade));
        }`,
    }), N);
    const seeds = new Float32Array(N);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0);
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2 + Math.random() * 0.02, r = 140 + Math.random() * 40;
      const tall = Math.random() < 0.1 ? 9 + Math.random() * 9 : 2 + Math.random() * 5;
      const w = 2 + Math.random() * 4;
      q.setFromAxisAngle(up, -a);
      m.compose(new THREE.Vector3(Math.cos(a) * r, -0.5, Math.sin(a) * r), q, new THREE.Vector3(w, tall, w * (0.6 + Math.random())));
      mesh.setMatrixAt(i, m);
      seeds[i] = Math.random();
    }
    geo.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 1));
    scene.add(mesh);
  }

  // wireframe landscape as a ring round the stage, rolling slowly
  const terrain = new THREE.Mesh(new THREE.PlaneGeometry(120, 120, 110, 110), shader({
    transparent: true, wireframe: true, depthWrite: false, fog: false,
    vertexShader: `uniform float uTime; varying float vH; varying float vR; ${NOISE}
      void main(){
        vec3 p=position; float r=length(p.xy);
        vec2 q=p.xy*0.12+vec2(0.,uTime*0.05);
        float h=fbm(q)*3.2*smoothstep(6.,22.,r)+sin(r*0.35-uTime*0.6)*0.08*smoothstep(4.,9.,r);
        p.z=h; vH=h; vR=r;
        gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);
      }`,
    fragmentShader: `varying float vH; varying float vR;
      void main(){
        float a=(0.05+vH*0.12)*smoothstep(4.5,9.,vR)*smoothstep(60.,30.,vR);
        vec3 c=mix(vec3(0.15,0.95,0.75),vec3(0.35,0.75,1.0),clamp(vH/3.,0.,1.));
        gl_FragColor=vec4(c*1.2,a);
      }`,
  }));
  terrain.rotation.x = -Math.PI / 2;
  terrain.position.y = -0.03;
  scene.add(terrain);

  // floor: a fine glowing grid that fades away from the stage, with a scan wave
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), shader({
    transparent: true, depthWrite: false,
    vertexShader: PLANE_VS,
    fragmentShader: `uniform float uTime; varying vec2 vP;
      float grid(vec2 p,float s){ vec2 g=abs(fract(p/s-0.5)-0.5)/fwidth(p/s); return 1.0-min(min(g.x,g.y),1.0); }
      void main(){
        float r=length(vP);
        float g=grid(vP,0.5)*0.5+grid(vP,2.5)*0.8;
        float wave=exp(-pow((r-mod(uTime*1.6,9.0)-1.0)*2.2,2.0));
        float a=g*(0.05+wave*0.35)*smoothstep(7.,1.8,r)*smoothstep(1.05,1.6,r);
        gl_FragColor=vec4(vec3(0.25,0.9,1.0),a);
      }`,
  }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.005;
  scene.add(floor);

  // the stage: a charging pad of dark smoked glass with a glowing lip and live HUD rings
  const stage = new THREE.Group();
  scene.add(stage);
  const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.96, 0.045, 128),
    new THREE.MeshPhysicalMaterial({ color: 0x02040a, roughness: 0.6, metalness: 0.9, envMapIntensity: 0.35, clearcoat: 0 }));
  pad.position.y = -0.0225;
  pad.receiveShadow = true;
  stage.add(pad);
  const lipMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.35, 1.6, 2.0), toneMapped: false });
  const lip = new THREE.Mesh(new THREE.TorusGeometry(0.94, 0.006, 8, 160), lipMat);
  lip.rotation.x = Math.PI / 2;
  lip.position.y = 0.001;
  stage.add(lip);

  // HUD rings drawn by one shader: dashes, ticks and arcs that turn at different speeds, plus the charging flow
  const hud = new THREE.Mesh(new THREE.CircleGeometry(0.9, 128), shader({
    transparent: true, depthWrite: false, toneMapped: false, uniforms: { uCharge: { value: 1 } },
    vertexShader: PLANE_VS,
    fragmentShader: `uniform float uTime; uniform float uCharge; varying vec2 vP;
      float ringL(float r,float c,float w){ return smoothstep(w,0.,abs(r-c)); }
      void main(){
        float r=length(vP); float a=atan(vP.y,vP.x); float t=uTime;
        vec3 cyan=vec3(0.3,1.0,1.25), vio=vec3(0.7,0.55,1.4);
        float v=0.;
        v+=ringL(r,0.86,0.004)*0.8;
        v+=ringL(r,0.80,0.006)*step(0.5,fract((a+t*0.15)*24./6.2832))*0.9;
        float ticks=step(0.82,fract(a*120./6.2832))*step(0.74,r)*step(r,0.77);
        v+=ticks*0.5;
        float arc=step(0.,sin(a*3.+t*-0.4))*ringL(r,0.70,0.010);
        vec3 col=cyan*v+vio*arc*1.1;
        float flow=fract(r*3.0+t*0.8); float inner=smoothstep(0.62,0.4,r)*smoothstep(0.30,0.40,r);
        col+=cyan*pow(flow,8.)*inner*0.9*uCharge;
        float alpha=clamp(max(max(col.r,col.g),col.b),0.,1.);
        gl_FragColor=vec4(col,alpha*0.9);
      }`,
  }));
  hud.rotation.x = -Math.PI / 2;
  hud.position.y = 0.0015;
  stage.add(hud);

  // thin light lines rising from the pad rim
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.93, 0.93, 1.4, 96, 1, true), shader({
    transparent: true, side: THREE.FrontSide, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
    fragmentShader: `uniform float uTime; varying vec2 vUv;
      void main(){ float lines=step(0.97,fract(vUv.x*48.0))*pow(1.0-vUv.y,3.0)*0.06;
        gl_FragColor=vec4(vec3(0.3,0.9,1.0),lines); }`,
  }));
  beam.position.y = 0.7;
  stage.add(beam);

  // particles drifting up inside the column
  const PN = 220, pPos = new Float32Array(PN * 3), pSeed = new Float32Array(PN);
  for (let i = 0; i < PN; i++) {
    const a = Math.random() * Math.PI * 2, r = 0.45 + Math.random() * 0.48;
    pPos.set([Math.cos(a) * r, Math.random() * 1.4, Math.sin(a) * r], i * 3);
    pSeed[i] = Math.random();
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  pGeo.setAttribute('aSeed', new THREE.BufferAttribute(pSeed, 1));
  const pMat = shader({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uPx: { value: 1 } },
    vertexShader: `uniform float uTime; uniform float uPx; attribute float aSeed; varying float vA;
      void main(){ vec3 p=position; p.y=mod(p.y+uTime*(0.05+aSeed*0.08),1.4);
        vA=smoothstep(0.,0.15,p.y)*smoothstep(1.4,0.6,p.y);
        vec4 mv=modelViewMatrix*vec4(p,1.); gl_PointSize=uPx*(2.0+aSeed*2.5)*(3.0/-mv.z); gl_Position=projectionMatrix*mv; }`,
    fragmentShader: `varying float vA; void main(){ float d=length(gl_PointCoord-0.5); gl_FragColor=vec4(vec3(0.5,1.0,1.2),vA*smoothstep(0.5,0.,d)*0.8); }`,
  });
  stage.add(new THREE.Points(pGeo, pMat));

  return {
    update(t, camDir) {
      for (const m of timed) m.uniforms.uTime.value = t;
      planetRig.rotation.y = Math.atan2(-camDir.x, -camDir.z);
      planetRig.rotation.x = Math.asin(THREE.MathUtils.clamp(camDir.y, -1, 1));
      planet.rotation.y = t * 0.01;
      lipMat.color.setRGB(0.35, 1.6 + 0.3 * Math.sin(t * 2), 2.0);
    },
    setPointScale(px) {
      pMat.uniforms.uPx.value = px;
    },
  };
}

/** Free every geometry, material and texture under `root`. */
export function disposeTree(root: THREE.Object3D) {
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    mesh.geometry?.dispose();
    const mats = mesh.material ? (Array.isArray(mesh.material) ? mesh.material : [mesh.material]) : [];
    for (const m of mats) {
      for (const v of Object.values(m)) if (v instanceof THREE.Texture) v.dispose();
      m.dispose();
    }
  });
}
