"use strict";(self.webpackChunkmmsp_trees=self.webpackChunkmmsp_trees||[]).push([[67060],{63928:(e,t,i)=>{i.d(t,{W:()=>s});var r=i(45463),a=i(48168);class s extends r.i{intersect(e,t,i,r,s,o){return(0,a.Uy)(e,i,r,s,void 0,o)}intersectDraped(e,t,i,r){return(0,a.gz)(i[0],i[1],e,r)}}},86401:(e,t,i)=>{i.d(t,{Ci:()=>a,KL:()=>n,dB:()=>o,l5:()=>s,wB:()=>c});var r=i(48549);const a=(0,r.BP)().vec3f("position").freeze(),s=(0,r.BP)().vec3f("position").vec2f16("uv0").freeze(),o=(0,r.BP)().vec3f("position").vec4u8("color").freeze(),n=(0,r.BP)().vec3f("position").vec2f("uv0").freeze(),c=(0,r.BP)().vec3f("position").vec2f("uv0").vec4u8("olidColor").freeze()},88849:(e,t,i)=>{i.d(t,{L:()=>w,b:()=>z});var r=i(99443),a=i(26917),s=i(3838),o=i(87236),n=i(17698),c=i(94192),l=i(80883),p=i(20179),d=i(3799),h=i(28450),v=i(51596),u=i(58350),m=i(23148),f=i(86955),g=i(23687),S=i(70367),P=i(91911),y=i(2687);function z(e){const t=new y.N5,{space:i,anchor:z,hasTip:w,hasScreenSizePerspective:x}=e,_=2===i,b=1===i;t.include(s.s,e),t.include(n.r,e),t.include(c.Z,e);const{vertex:C,fragment:W,varyings:T}=t;(0,d.NB)(C,e),t.attributes.add("position","vec3"),t.attributes.add("previousDelta","vec4"),t.attributes.add("uv0","vec2"),T.add("vColor","vec4"),T.add("vpos","vec3",{invariant:!0}),T.add("vUV","vec2"),T.add("vSize","float"),w&&T.add("vLineWidth","float"),C.uniforms.add(new h.E("nearFar",e=>{let{camera:t}=e;return t.nearFar}),new v.I("viewport",e=>{let{camera:t}=e;return t.fullViewport})).code.add(f.H`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),C.code.add(f.H`void clip(vec4 pos, inout vec4 prev) {
float vnp = nearFar[0] * 0.99;
if (prev.z > -nearFar[0]) {
float interpolation = (-vnp - pos.z) / (prev.z - pos.z);
prev = mix(pos, prev, interpolation);
}
}`),_?(t.attributes.add("normal","vec3"),(0,d.S7)(C),C.constants.add("tiltThreshold","float",.7),C.code.add(f.H`vec3 perpendicular(vec3 v) {
vec3 n = (viewNormal * vec4(normal.xyz, 1.0)).xyz;
vec3 n2 = cross(v, n);
vec3 forward = vec3(0.0, 0.0, 1.0);
float tiltDot = dot(forward, n);
return abs(tiltDot) < tiltThreshold ? n : n2;
}`)):C.code.add(f.H`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}`);const k=_?"vec3":"vec2";return C.code.add(f.H`
      ${k} normalizedSegment(${k} pos, ${k} prev) {
        ${k} segment = pos - prev;
        float segmentLen = length(segment);

        // normalize or zero if too short
        return (segmentLen > 0.001) ? segment / segmentLen : ${_?"vec3(0.0, 0.0, 0.0)":"vec2(0.0, 0.0)"};
      }

      ${k} displace(${k} pos, ${k} prev, float displacementLen) {
        ${k} segment = normalizedSegment(pos, prev);

        ${k} displacementDirU = perpendicular(segment);
        ${k} displacementDirV = segment;

        ${1===z?"pos -= 0.5 * displacementLen * displacementDirV;":""}

        return pos + displacementLen * (uv0.x * displacementDirU + uv0.y * displacementDirV);
      }
    `),b&&(C.uniforms.add(new g.F("inverseProjectionMatrix",e=>{let{camera:t}=e;return t.inverseProjectionMatrix})),C.code.add(f.H`vec3 inverseProject(vec4 posScreen) {
posScreen.xy = (posScreen.xy / viewport.zw) * posScreen.w;
return (inverseProjectionMatrix * posScreen).xyz;
}`),C.code.add(f.H`bool rayIntersectPlane(vec3 rayDir, vec3 planeOrigin, vec3 planeNormal, out vec3 intersection) {
float cos = dot(rayDir, planeNormal);
float t = dot(planeOrigin, planeNormal) / cos;
intersection = t * rayDir;
return abs(cos) > 0.001 && t > 0.0;
}`),C.uniforms.add(new m.U("perScreenPixelRatio",e=>{let{camera:t}=e;return t.perScreenPixelRatio})),C.code.add(f.H`
      vec4 toFront(vec4 displacedPosScreen, vec3 posLeft, vec3 posRight, vec3 prev, float lineWidth) {
        // Project displaced position back to camera space
        vec3 displacedPos = inverseProject(displacedPosScreen);

        // Calculate the plane that we want the marker to lie in. Note that this will always be an approximation since ribbon lines are generally
        // not planar and we do not know the actual position of the displaced prev vertices (they are offset in screen space, too).
        vec3 planeNormal = normalize(cross(posLeft - posRight, posLeft - prev));
        vec3 planeOrigin = posLeft;

        ${(0,f.If)(e.hasCap,"if(prev.z > posLeft.z) {\n                vec2 diff = posLeft.xy - posRight.xy;\n                planeOrigin.xy += perpendicular(diff) / 2.0;\n             }")};

        // Move the plane towards the camera by a margin dependent on the line width (approximated in world space). This tolerance corrects for the
        // non-planarity in most cases, but sharp joins can place the prev vertices at arbitrary positions so markers can still clip.
        float offset = lineWidth * perScreenPixelRatio;
        planeOrigin *= (1.0 - offset);

        // Intersect camera ray with the plane and make sure it is within clip space
        vec3 rayDir = normalize(displacedPos);
        vec3 intersection;
        if (rayIntersectPlane(rayDir, planeOrigin, planeNormal, intersection) && intersection.z < -nearFar[0] && intersection.z > -nearFar[1]) {
          return vec4(intersection.xyz, 1.0);
        }

        // Fallback: use depth of pos or prev, whichever is closer to the camera
        float minDepth = planeOrigin.z > prev.z ? length(planeOrigin) : length(prev);
        displacedPos *= minDepth / length(displacedPos);
        return vec4(displacedPos.xyz, 1.0);
      }
  `)),(0,d.Nz)(C),t.include(p.F),C.main.add(f.H`
    // Check for special value of uv0.y which is used by the Renderer when graphics
    // are removed before the VBO is recompacted. If this is the case, then we just
    // project outside of clip space.
    if (uv0.y == 0.0) {
      // Project out of clip space
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
    }
    else {
      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(position + previousDelta.xyz * previousDelta.w, 1.0);

      float lineWidth = getLineWidth(${(0,f.If)(x,"pos.xyz")});
      float screenMarkerSize = getScreenMarkerSize(lineWidth);

      clip(pos, prev);

      ${_?f.H`${(0,f.If)(e.hideOnShortSegments,f.H`
                if (areWorldMarkersHidden(pos.xyz, prev.xyz)) {
                  // Project out of clip space
                  gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
                  return;
                }`)}
            pos.xyz = displace(pos.xyz, prev.xyz, getWorldMarkerSize(pos.xyz));
            vec4 displacedPosScreen = projectAndScale(pos);`:f.H`
            vec4 posScreen = projectAndScale(pos);
            vec4 prevScreen = projectAndScale(prev);
            vec4 displacedPosScreen = posScreen;

            displacedPosScreen.xy = displace(posScreen.xy, prevScreen.xy, screenMarkerSize);
            ${(0,f.If)(b,f.H`
                vec2 displacementDirU = perpendicular(normalizedSegment(posScreen.xy, prevScreen.xy));

                // We need three points of the ribbon line in camera space to calculate the plane it lies in
                // Note that we approximate the third point, since we have no information about the join around prev
                vec3 lineRight = inverseProject(posScreen + lineWidth * vec4(displacementDirU.xy, 0.0, 0.0));
                vec3 lineLeft = pos.xyz + (pos.xyz - lineRight);

                pos = toFront(displacedPosScreen, lineLeft, lineRight, prev.xyz, lineWidth);
                displacedPosScreen = projectAndScale(pos);`)}`}
      forwardViewPosDepth(pos.xyz);
      // Convert back into NDC
      displacedPosScreen.xy = (displacedPosScreen.xy / viewport.zw) * displacedPosScreen.w;

      // Convert texture coordinate into [0,1]
      vUV = (uv0 + 1.0) / 2.0;
      ${(0,f.If)(!_,"vUV = noPerspectiveWrite(vUV, displacedPosScreen.w);")}
      ${(0,f.If)(w,"vLineWidth = noPerspectiveWrite(lineWidth, displacedPosScreen.w);")}

      vSize = screenMarkerSize;
      vColor = getColor();

      // Use camera space for slicing
      vpos = pos.xyz;

      gl_Position = displacedPosScreen;
    }`),W.include(a.HQ,e),t.include(P.z,e),W.include(l.a),W.uniforms.add(new u.E("intrinsicColor",e=>{let{color:t}=e;return t}),new S.N("tex",e=>{let{markerTexture:t}=e;return t})).constants.add("texelSize","float",1/r.vO).code.add(f.H`float markerAlpha(vec2 samplePos) {
samplePos += vec2(0.5, -0.5) * texelSize;
float sdf = texture(tex, samplePos).r;
float pixelDistance = sdf * vSize;
pixelDistance -= 0.5;
return clamp(0.5 - pixelDistance, 0.0, 1.0);
}`),w&&(t.include(p.m),W.constants.add("relativeMarkerSize","float",r.Cz/r.vO).constants.add("relativeTipLineWidth","float",r.DZ).code.add(f.H`
    float tipAlpha(vec2 samplePos) {
      // Convert coordinates s.t. they are in pixels and relative to the tip of an arrow marker
      samplePos -= vec2(0.5, 0.5 + 0.5 * relativeMarkerSize);
      samplePos *= vSize;

      float halfMarkerSize = 0.5 * relativeMarkerSize * vSize;
      float halfTipLineWidth = 0.5 * max(1.0, relativeTipLineWidth * noPerspectiveRead(vLineWidth));

      ${(0,f.If)(_,"halfTipLineWidth *= fwidth(samplePos.y);")}

      float distance = max(abs(samplePos.x) - halfMarkerSize, abs(samplePos.y) - halfTipLineWidth);
      return clamp(0.5 - distance, 0.0, 1.0);
    }
  `)),t.include(o.Q,e),t.include(p.m),W.main.add(f.H`
    discardBySlice(vpos);
    discardByTerrainDepth();

    vec4 finalColor = intrinsicColor * vColor;

    // Cancel out perspective correct interpolation if in screen space or draped
    vec2 samplePos = ${(0,f.If)(!_,"noPerspectiveRead(vUV)","vUV")};
    finalColor.a *= ${w?"max(markerAlpha(samplePos), tipAlpha(samplePos))":"markerAlpha(samplePos)"};
    outputColorHighlightOID(finalColor, vpos, finalColor.rgb);`),t}const w=Object.freeze(Object.defineProperty({__proto__:null,build:z},Symbol.toStringTag,{value:"Module"}))},97349:(e,t,i)=>{i.d(t,{i:()=>b});var r=i(20664),a=i(9392),s=i(62984),o=i(34981),n=i(59696),c=i(45463),l=i(93684),p=i(52757),d=i(48549),h=i(16506),v=i(59246),u=i(60322),m=i(96643),f=i(88849),g=i(57162);class S extends v.w{constructor(e,t){super(e,t,new h.$(f.L,()=>i.e(66419).then(i.bind(i,66419))),P(t).locations)}_makePipelineState(e,t){const{output:i,oitPass:r,space:a,hasOccludees:s}=e;return(0,g.Ey)({blending:(0,o.RN)(i)?(0,u.Yf)(r):null,depthTest:0===a?null:{func:(0,u.K_)(r)},depthWrite:(0,u.z5)(e),drawBuffers:(0,v.L)(i,(0,u.m6)(r,i)),colorWrite:g.kn,stencilWrite:s?m.v0:null,stencilTest:s?t?m.a9:m.qh:null,polygonOffset:{factor:0,units:-10}})}initializePipeline(e){return e.occluder?(this._occluderPipelineTransparent=(0,g.Ey)({blending:g.T8,depthTest:m.sf,depthWrite:null,colorWrite:g.kn,stencilWrite:null,stencilTest:m.mK}),this._occluderPipelineOpaque=(0,g.Ey)({blending:g.T8,depthTest:m.sf,depthWrite:null,colorWrite:g.kn,stencilWrite:m.r8,stencilTest:m.I$}),this._occluderPipelineMaskWrite=(0,g.Ey)({blending:null,depthTest:m.m,depthWrite:null,colorWrite:null,stencilWrite:m.v0,stencilTest:m.a9})):this._occluderPipelineTransparent=this._occluderPipelineOpaque=this._occluderPipelineMaskWrite=null,this._occludeePipelineState=this._makePipelineState(e,!0),this._makePipelineState(e,!1)}getPipeline(e,t){return e?this._occludeePipelineState:11===t?this._occluderPipelineTransparent??super.getPipeline():10===t?this._occluderPipelineOpaque??super.getPipeline():this._occluderPipelineMaskWrite??super.getPipeline()}}function P(e){const t=(0,d.BP)().vec3f("position").vec4f16("previousDelta").vec2f16("uv0");return e.hasVVColor?t.f32("colorFeatureAttribute"):t.vec4u8("color",{glNormalized:!0}),e.hasVVOpacity&&t.f32("opacityFeatureAttribute"),e.hasVVSize?t.f32("sizeFeatureAttribute"):t.f16("size"),e.worldSpace&&t.vec3f16("normal"),t.freeze()}var y=i(6326),z=i(6485),w=i(92656);class x extends w.E{constructor(e){super(),this.spherical=e,this.space=1,this.anchor=0,this.occluder=!1,this.writeDepth=!1,this.hideOnShortSegments=!1,this.hasCap=!1,this.hasTip=!1,this.hasVVSize=!1,this.hasVVColor=!1,this.hasVVOpacity=!1,this.hasOccludees=!1,this.terrainDepthTest=!1,this.cullAboveTerrain=!1,this.hasScreenSizePerspective=!1,this.textureCoordinateType=0,this.emissionSource=0,this.discardInvisibleFragments=!0,this.occlusionPass=!1,this.hasVVInstancing=!1,this.hasSliceTranslatedView=!0,this.olidColorInstanced=!1,this.overlayEnabled=!1,this.snowCover=!1}get draped(){return 0===this.space}get worldSpace(){return 2===this.space}}(0,y.Cg)([(0,z.W)({count:3})],x.prototype,"space",void 0),(0,y.Cg)([(0,z.W)({count:2})],x.prototype,"anchor",void 0),(0,y.Cg)([(0,z.W)()],x.prototype,"occluder",void 0),(0,y.Cg)([(0,z.W)()],x.prototype,"writeDepth",void 0),(0,y.Cg)([(0,z.W)()],x.prototype,"hideOnShortSegments",void 0),(0,y.Cg)([(0,z.W)()],x.prototype,"hasCap",void 0),(0,y.Cg)([(0,z.W)()],x.prototype,"hasTip",void 0),(0,y.Cg)([(0,z.W)()],x.prototype,"hasVVSize",void 0),(0,y.Cg)([(0,z.W)()],x.prototype,"hasVVColor",void 0),(0,y.Cg)([(0,z.W)()],x.prototype,"hasVVOpacity",void 0),(0,y.Cg)([(0,z.W)()],x.prototype,"hasOccludees",void 0),(0,y.Cg)([(0,z.W)()],x.prototype,"terrainDepthTest",void 0),(0,y.Cg)([(0,z.W)()],x.prototype,"cullAboveTerrain",void 0),(0,y.Cg)([(0,z.W)()],x.prototype,"hasScreenSizePerspective",void 0);var _=i(75569);class b extends c.i{constructor(e,t){super(e,W),this.produces=new Map([[2,e=>9===e||(0,o.RN)(e)&&8===this.parameters.renderOccluded],[3,e=>(0,o.eh)(e)],[10,e=>(0,o.T2)(e)&&8===this.parameters.renderOccluded],[11,e=>(0,o.T2)(e)&&8===this.parameters.renderOccluded],[4,e=>(0,o.RN)(e)&&this.parameters.writeDepth],[8,e=>(0,o.RN)(e)&&!this.parameters.writeDepth],[18,e=>(0,o.RN)(e)||9===e]]),this.intersectDraped=void 0,this._configuration=new x(t)}getConfiguration(e,t){return super.getConfiguration(e,t,this._configuration),this._configuration.space=18===t.slot?0:this.parameters.worldSpace?2:1,this._configuration.hideOnShortSegments=this.parameters.hideOnShortSegments,this._configuration.hasCap=0!==this.parameters.cap,this._configuration.anchor=this.parameters.anchor,this._configuration.hasTip=this.parameters.hasTip,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasOccludees=t.hasOccludees,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.hasVVSize=this.parameters.hasVVSize,this._configuration.hasVVColor=this.parameters.hasVVColor,this._configuration.hasVVOpacity=this.parameters.hasVVOpacity,this._configuration.occluder=8===this.parameters.renderOccluded,this._configuration.oitPass=t.oitPass,this._configuration.terrainDepthTest=t.terrainDepthTest&&(0,o.RN)(e),this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration.hasScreenSizePerspective=null!=this.parameters.screenSizePerspective,this._configuration}get visible(){return this.parameters.color[3]>=_.Q}intersect(){}createBufferWriter(){return new T(P(this.parameters),this.parameters)}createGLMaterial(e){return new C(e)}}class C extends n.A{dispose(){super.dispose(),this._markerTextures?.release(this._markerPrimitive),this._markerPrimitive=null}beginSlot(e){const t=this._material.parameters.markerPrimitive;return t!==this._markerPrimitive&&(this._material.setParameters({markerTexture:this._markerTextures.swap(t,this._markerPrimitive)}),this._markerPrimitive=t),this.getTechnique(S,e)}}class W extends l.S{constructor(){super(...arguments),this.width=0,this.color=[1,1,1,1],this.markerPrimitive="arrow",this.placement="end",this.cap=0,this.anchor=0,this.hasTip=!1,this.worldSpace=!1,this.hideOnShortSegments=!1,this.writeDepth=!0,this.hasSlicePlane=!1,this.vvFastUpdate=!1,this.stipplePattern=null,this.markerTexture=null}}class T{constructor(e,t){this.layout=e,this._parameters=t}elementCount(){return"begin-end"===this._parameters.placement?12:6}write(e,t,i,a,o,n){const c=i.get("position").data,l=c.length/3;let d=[1,0,0];const h=i.get("normal");this._parameters.worldSpace&&null!=h&&(d=h.data);let v=1,u=0;this._parameters.vvSize?u=i.get("sizeFeatureAttribute").data[0]:i.has("size")&&(v=i.get("size").data[0]);let m=[1,1,1,1],f=0;this._parameters.vvColor?f=i.get("colorFeatureAttribute").data[0]:i.has("color")&&(m=i.get("color").data);let g=0;this._parameters.vvOpacity&&(g=i.get("opacityFeatureAttribute").data[0]);const S=new Float32Array(o.buffer),P=(0,s.Bg)(o.buffer),y=new Uint8Array(o.buffer);let z=n*(this.layout.stride/4);const w=S.BYTES_PER_ELEMENT/P.BYTES_PER_ELEMENT,x=4/w,_=(e,t,i,r)=>{S[z++]=e[0],S[z++]=e[1],S[z++]=e[2],(0,p.Wu)(t,e,P,z*w),z+=x;let a=z*w;if(P[a++]=i[0],P[a++]=i[1],z=Math.ceil(a/w),this._parameters.vvColor)S[z++]=f;else{const e=Math.min(4*r,m.length-4),t=4*z++;y[t]=255*m[e],y[t+1]=255*m[e+1],y[t+2]=255*m[e+2],y[t+3]=255*m[e+3]}this._parameters.vvOpacity&&(S[z++]=g),a=z*w,this._parameters.vvSize?(S[z++]=u,a+=2):P[a++]=v,this._parameters.worldSpace&&(P[a++]=d[0],P[a++]=d[1],P[a++]=d[2]),z=Math.ceil(a/w)},b=(t,i)=>{const a=(0,r.j)(k,c[3*t],c[3*t+1],c[3*t+2]),s=V;let o=t+i;do{(0,r.j)(s,c[3*o],c[3*o+1],c[3*o+2]),o+=i}while((0,r.G)(a,s)&&o>=0&&o<l);e&&((0,r.t)(a,a,e),(0,r.t)(s,s,e)),_(a,s,[-1,-1],t),_(a,s,[1,-1],t),_(a,s,[1,1],t),_(a,s,[-1,-1],t),_(a,s,[1,1],t),_(a,s,[-1,1],t)},C=this._parameters.placement;return"begin"!==C&&"begin-end"!==C||b(0,1),"end"!==C&&"begin-end"!==C||b(l-1,-1),null}}const k=(0,a.vt)(),V=(0,a.vt)()}}]);
//# sourceMappingURL=67060.b06af4da.chunk.js.map