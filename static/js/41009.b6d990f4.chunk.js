"use strict";(self.webpackChunkmmsp_trees=self.webpackChunkmmsp_trees||[]).push([[41009],{60561:(e,t,r)=>{r.d(t,{i:()=>I});var i=r(20664),a=r(9392),n=r(62984),s=r(48549),o=r(34981),c=r(59696),l=r(45463),p=r(77730),d=r(66470),h=r(93684),v=r(52757),u=r(16506),m=r(59246),f=r(60322),S=r(96643),T=r(88849),P=r(50125),g=r(57162);class O extends m.w{constructor(e,t){super(e,t,new u.$(T.L,()=>r.e(66419).then(r.bind(r,66419))),E)}_makePipelineState(e,t){const{output:r,oitPass:i,space:a,hasOccludees:n}=e;return(0,g.Ey)({blending:(0,o.RN)(r)?(0,f.Yf)(i):null,depthTest:a===P.lM.Draped?null:{func:(0,f.K_)(i)},depthWrite:(0,f.z5)(e),drawBuffers:(0,m.L)(r,(0,f.m6)(i,r)),colorWrite:g.kn,stencilWrite:n?S.v0:null,stencilTest:n?t?S.a9:S.qh:null,polygonOffset:{factor:0,units:-10}})}initializePipeline(e){return e.occluder?(this._occluderPipelineTransparent=(0,g.Ey)({blending:g.T8,depthTest:S.sf,depthWrite:null,colorWrite:g.kn,stencilWrite:null,stencilTest:S.mK}),this._occluderPipelineOpaque=(0,g.Ey)({blending:g.T8,depthTest:S.sf,depthWrite:null,colorWrite:g.kn,stencilWrite:S.r8,stencilTest:S.I$}),this._occluderPipelineMaskWrite=(0,g.Ey)({blending:null,depthTest:S.m,depthWrite:null,colorWrite:null,stencilWrite:S.v0,stencilTest:S.a9})):this._occluderPipelineTransparent=this._occluderPipelineOpaque=this._occluderPipelineMaskWrite=null,this._occludeePipelineState=this._makePipelineState(e,!0),this._makePipelineState(e,!1)}getPipeline(e,t){return e?this._occludeePipelineState:t===p.N.TRANSPARENT_OCCLUDER_MATERIAL?this._occluderPipelineTransparent??super.getPipeline():t===p.N.OCCLUDER_MATERIAL?this._occluderPipelineOpaque??super.getPipeline():this._occluderPipelineMaskWrite??super.getPipeline()}}const E=new Map([[d.r.POSITION,0],[d.r.PREVIOUSDELTA,1],[d.r.UV0,2],[d.r.COLOR,3],[d.r.COLORFEATUREATTRIBUTE,3],[d.r.OPACITYFEATUREATTRIBUTE,4],[d.r.SIZE,5],[d.r.SIZEFEATUREATTRIBUTE,5],[d.r.NORMAL,6]]);var _=r(46259),A=r(75569);class I extends l.im{constructor(e){super(e,R),this._configuration=new P.Dt,this.vertexAttributeLocations=E,this.produces=new Map([[p.N.OPAQUE_MATERIAL,e=>e===o.V.Highlight||(0,o._o)(e)&&this.parameters.renderOccluded===l.m$.OccludeAndTransparentStencil],[p.N.OPAQUE_MATERIAL_WITHOUT_NORMALS,e=>(0,o.eh)(e)],[p.N.OCCLUDER_MATERIAL,e=>(0,o.aD)(e)&&this.parameters.renderOccluded===l.m$.OccludeAndTransparentStencil],[p.N.TRANSPARENT_OCCLUDER_MATERIAL,e=>(0,o.aD)(e)&&this.parameters.renderOccluded===l.m$.OccludeAndTransparentStencil],[p.N.TRANSPARENT_MATERIAL,e=>(0,o._o)(e)&&this.parameters.writeDepth],[p.N.TRANSPARENT_MATERIAL_WITHOUT_DEPTH,e=>(0,o._o)(e)&&!this.parameters.writeDepth],[p.N.DRAPED_MATERIAL,e=>(0,o.RN)(e)||e===o.V.Highlight]]),this.intersectDraped=void 0,this._layout=this.createLayout()}getConfiguration(e,t){return super.getConfiguration(e,t,this._configuration),this._configuration.space=t.slot===p.N.DRAPED_MATERIAL?P.lM.Draped:this.parameters.worldSpace?P.lM.World:P.lM.Screen,this._configuration.hideOnShortSegments=this.parameters.hideOnShortSegments,this._configuration.hasCap=this.parameters.cap!==_.x.BUTT,this._configuration.anchor=this.parameters.anchor,this._configuration.hasTip=this.parameters.hasTip,this._configuration.hasSlicePlane=this.parameters.hasSlicePlane,this._configuration.hasOccludees=t.hasOccludees,this._configuration.writeDepth=this.parameters.writeDepth,this._configuration.vvSize=!!this.parameters.vvSize,this._configuration.vvColor=!!this.parameters.vvColor,this._configuration.vvOpacity=!!this.parameters.vvOpacity,this._configuration.occluder=this.parameters.renderOccluded===l.m$.OccludeAndTransparentStencil,this._configuration.oitPass=t.oitPass,this._configuration.terrainDepthTest=t.terrainDepthTest&&(0,o.RN)(e),this._configuration.cullAboveTerrain=t.cullAboveTerrain,this._configuration}get visible(){return this.parameters.color[3]>=A.Q}intersect(){}createLayout(){const e=(0,s.BP)().vec3f(d.r.POSITION).vec4f16(d.r.PREVIOUSDELTA).vec2f16(d.r.UV0);return this.parameters.vvColor?e.f32(d.r.COLORFEATUREATTRIBUTE):e.vec4u8(d.r.COLOR,{glNormalized:!0}),this.parameters.vvOpacity&&e.f32(d.r.OPACITYFEATUREATTRIBUTE),this.parameters.vvSize?e.f32(d.r.SIZEFEATUREATTRIBUTE):e.f16(d.r.SIZE),this.parameters.worldSpace&&e.vec3f16(d.r.NORMAL),e}createBufferWriter(){return new y(this._layout,this.parameters)}createGLMaterial(e){return new w(e)}}class w extends c.A{dispose(){super.dispose(),this._markerTextures.release(this._markerPrimitive),this._markerPrimitive=null}beginSlot(e){const t=this._material.parameters.markerPrimitive;return t!==this._markerPrimitive&&(this._material.setParameters({markerTexture:this._markerTextures.swap(t,this._markerPrimitive)}),this._markerPrimitive=t),this.getTechnique(O,e)}}class R extends h.S{constructor(){super(...arguments),this.width=0,this.color=[1,1,1,1],this.markerPrimitive="arrow",this.placement="end",this.cap=_.x.BUTT,this.anchor=P.kJ.Center,this.hasTip=!1,this.worldSpace=!1,this.hideOnShortSegments=!1,this.writeDepth=!0,this.hasSlicePlane=!1,this.vvFastUpdate=!1,this.markerTexture=null}}class y{constructor(e,t){this.vertexBufferLayout=e,this._parameters=t}elementCount(){return"begin-end"===this._parameters.placement?12:6}write(e,t,r,a,s,o){const c=r.get(d.r.POSITION).data,l=c.length/3;let p=[1,0,0];const h=r.get(d.r.NORMAL);this._parameters.worldSpace&&null!=h&&(p=h.data);let u=1,m=0;this._parameters.vvSize?m=r.get(d.r.SIZEFEATUREATTRIBUTE).data[0]:r.has(d.r.SIZE)&&(u=r.get(d.r.SIZE).data[0]);let f=[1,1,1,1],S=0;this._parameters.vvColor?S=r.get(d.r.COLORFEATUREATTRIBUTE).data[0]:r.has(d.r.COLOR)&&(f=r.get(d.r.COLOR).data);let T=0;this._parameters.vvOpacity&&(T=r.get(d.r.OPACITYFEATUREATTRIBUTE).data[0]);const P=new Float32Array(s.buffer),g=(0,n.Bg)(s.buffer),O=new Uint8Array(s.buffer);let E=o*(this.vertexBufferLayout.stride/4);const _=P.BYTES_PER_ELEMENT/g.BYTES_PER_ELEMENT,A=4/_,I=(e,t,r,i)=>{P[E++]=e[0],P[E++]=e[1],P[E++]=e[2],(0,v.Wu)(t,e,g,E*_),E+=A;let a=E*_;if(g[a++]=r[0],g[a++]=r[1],E=Math.ceil(a/_),this._parameters.vvColor)P[E++]=S;else{const e=Math.min(4*i,f.length-4),t=4*E++;O[t]=255*f[e],O[t+1]=255*f[e+1],O[t+2]=255*f[e+2],O[t+3]=255*f[e+3]}this._parameters.vvOpacity&&(P[E++]=T),a=E*_,this._parameters.vvSize?(P[E++]=m,a+=2):g[a++]=u,this._parameters.worldSpace&&(g[a++]=p[0],g[a++]=p[1],g[a++]=p[2]),E=Math.ceil(a/_)};let w;var R;(R=w||(w={}))[R.ASCENDING=1]="ASCENDING",R[R.DESCENDING=-1]="DESCENDING";const y=(t,r)=>{const a=(0,i.i)(L,c[3*t],c[3*t+1],c[3*t+2]),n=N;let s=t+r;do{(0,i.i)(n,c[3*s],c[3*s+1],c[3*s+2]),s+=r}while((0,i.G)(a,n)&&s>=0&&s<l);e&&((0,i.t)(a,a,e),(0,i.t)(n,n,e)),I(a,n,[-1,-1],t),I(a,n,[1,-1],t),I(a,n,[1,1],t),I(a,n,[-1,-1],t),I(a,n,[1,1],t),I(a,n,[-1,1],t)},x=this._parameters.placement;return"begin"!==x&&"begin-end"!==x||y(0,w.ASCENDING),"end"!==x&&"begin-end"!==x||y(l-1,w.DESCENDING),null}}const L=(0,a.vt)(),N=(0,a.vt)()},86401:(e,t,r)=>{r.d(t,{Ci:()=>n,KL:()=>c,dB:()=>o,l5:()=>s,wB:()=>l});var i=r(48549),a=r(66470);const n=(0,i.BP)().vec3f(a.r.POSITION),s=(0,i.BP)().vec3f(a.r.POSITION).vec2f16(a.r.UV0),o=(0,i.BP)().vec3f(a.r.POSITION).vec4u8(a.r.COLOR),c=((0,i.BP)().vec3f(a.r.POSITION).vec2f16(a.r.UV0).vec4u8(a.r.OLIDCOLOR),(0,i.BP)().vec3f(a.r.POSITION).vec2f(a.r.UV0)),l=(0,i.BP)().vec3f(a.r.POSITION).vec2f(a.r.UV0).vec4u8(a.r.OLIDCOLOR)},88849:(e,t,r)=>{r.d(t,{L:()=>A,b:()=>_});var i=r(99443),a=r(26917),n=r(3838),s=r(87236),o=r(17698),c=r(94192),l=r(80883),p=r(81449),d=r(3799),h=r(28450),v=r(51596),u=r(58350),m=r(23148),f=r(86955),S=r(23687),T=r(70367),P=r(66470),g=r(50125),O=r(91911),E=r(2687);function _(e){const t=new E.N5,{space:r,anchor:_,hasTip:A}=e,I=r===g.lM.World;t.include(n.s,e),t.include(o.r,e),t.include(c.Z,e);const{vertex:w,fragment:R,varyings:y}=t;R.include(p.W),(0,d.NB)(w,e),t.attributes.add(P.r.POSITION,"vec3"),t.attributes.add(P.r.PREVIOUSDELTA,"vec4"),t.attributes.add(P.r.UV0,"vec2"),y.add("vColor","vec4"),y.add("vpos","vec3",{invariant:!0}),y.add("vUV","vec2"),y.add("vSize","float"),A&&y.add("vLineWidth","float"),w.uniforms.add(new h.E("nearFar",e=>{let{camera:t}=e;return t.nearFar}),new v.I("viewport",e=>{let{camera:t}=e;return t.fullViewport})).code.add(f.H`vec4 projectAndScale(vec4 pos) {
vec4 posNdc = proj * pos;
posNdc.xy *= viewport.zw / posNdc.w;
return posNdc;
}`),w.code.add(f.H`void clip(vec4 pos, inout vec4 prev) {
float vnp = nearFar[0] * 0.99;
if (prev.z > -nearFar[0]) {
float interpolation = (-vnp - pos.z) / (prev.z - pos.z);
prev = mix(pos, prev, interpolation);
}
}`),I?(t.attributes.add(P.r.NORMAL,"vec3"),(0,d.S7)(w),w.constants.add("tiltThreshold","float",.7),w.code.add(f.H`vec3 perpendicular(vec3 v) {
vec3 n = (viewNormal * vec4(normal.xyz, 1.0)).xyz;
vec3 n2 = cross(v, n);
vec3 forward = vec3(0.0, 0.0, 1.0);
float tiltDot = dot(forward, n);
return abs(tiltDot) < tiltThreshold ? n : n2;
}`)):w.code.add(f.H`vec2 perpendicular(vec2 v) {
return vec2(v.y, -v.x);
}`);const L=I?"vec3":"vec2";return w.code.add(f.H`
      ${L} normalizedSegment(${L} pos, ${L} prev) {
        ${L} segment = pos - prev;
        float segmentLen = length(segment);

        // normalize or zero if too short
        return (segmentLen > 0.001) ? segment / segmentLen : ${I?"vec3(0.0, 0.0, 0.0)":"vec2(0.0, 0.0)"};
      }

      ${L} displace(${L} pos, ${L} prev, float displacementLen) {
        ${L} segment = normalizedSegment(pos, prev);

        ${L} displacementDirU = perpendicular(segment);
        ${L} displacementDirV = segment;

        ${_===g.kJ.Tip?"pos -= 0.5 * displacementLen * displacementDirV;":""}

        return pos + displacementLen * (uv0.x * displacementDirU + uv0.y * displacementDirV);
      }
    `),r===g.lM.Screen&&(w.uniforms.add(new S.F("inverseProjectionMatrix",e=>{let{camera:t}=e;return t.inverseProjectionMatrix})),w.code.add(f.H`vec3 inverseProject(vec4 posScreen) {
posScreen.xy = (posScreen.xy / viewport.zw) * posScreen.w;
return (inverseProjectionMatrix * posScreen).xyz;
}`),w.code.add(f.H`bool rayIntersectPlane(vec3 rayDir, vec3 planeOrigin, vec3 planeNormal, out vec3 intersection) {
float cos = dot(rayDir, planeNormal);
float t = dot(planeOrigin, planeNormal) / cos;
intersection = t * rayDir;
return abs(cos) > 0.001 && t > 0.0;
}`),w.uniforms.add(new m.U("perScreenPixelRatio",e=>{let{camera:t}=e;return t.perScreenPixelRatio})),w.code.add(f.H`
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
  `)),(0,d.Nz)(w),w.main.add(f.H`
    // Check for special value of uv0.y which is used by the Renderer when graphics
    // are removed before the VBO is recompacted. If this is the case, then we just
    // project outside of clip space.
    if (uv0.y == 0.0) {
      // Project out of clip space
      gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
    }
    else {
      float lineWidth = getLineWidth();
      float screenMarkerSize = getScreenMarkerSize();

      vec4 pos  = view * vec4(position, 1.0);
      vec4 prev = view * vec4(position + previousDelta.xyz * previousDelta.w, 1.0);
      clip(pos, prev);

      ${I?f.H`${(0,f.If)(e.hideOnShortSegments,f.H`
                if (areWorldMarkersHidden(pos, prev)) {
                  // Project out of clip space
                  gl_Position = vec4(1e038, 1e038, 1e038, 1.0);
                  return;
                }`)}
            pos.xyz = displace(pos.xyz, prev.xyz, getWorldMarkerSize(pos));
            vec4 displacedPosScreen = projectAndScale(pos);`:f.H`
            vec4 posScreen = projectAndScale(pos);
            vec4 prevScreen = projectAndScale(prev);
            vec4 displacedPosScreen = posScreen;

            displacedPosScreen.xy = displace(posScreen.xy, prevScreen.xy, screenMarkerSize);
            ${(0,f.If)(r===g.lM.Screen,f.H`
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
      ${(0,f.If)(!I,"vUV *= displacedPosScreen.w;")}
      ${(0,f.If)(A,"vLineWidth = lineWidth;")}

      vSize = screenMarkerSize;
      vColor = getColor();

      // Use camera space for slicing
      vpos = pos.xyz;

      gl_Position = displacedPosScreen;
    }`),R.include(a.HQ,e),t.include(O.z,e),R.include(l.a),R.uniforms.add(new u.E("intrinsicColor",e=>{let{color:t}=e;return t}),new T.N("tex",e=>{let{markerTexture:t}=e;return t})).constants.add("texelSize","float",1/i.vO).code.add(f.H`float markerAlpha(vec2 samplePos) {
samplePos += vec2(0.5, -0.5) * texelSize;
float sdf = rgbaTofloat(texture(tex, samplePos)) - 0.5;
float distance = sdf * vSize;
distance -= 0.5;
return clamp(0.5 - distance, 0.0, 1.0);
}`),A&&R.constants.add("relativeMarkerSize","float",i.Cz/i.vO).constants.add("relativeTipLineWidth","float",i.DZ).code.add(f.H`
    float tipAlpha(vec2 samplePos) {
      // Convert coordinates s.t. they are in pixels and relative to the tip of an arrow marker
      samplePos -= vec2(0.5, 0.5 + 0.5 * relativeMarkerSize);
      samplePos *= vSize;

      float halfMarkerSize = 0.5 * relativeMarkerSize * vSize;
      float halfTipLineWidth = 0.5 * max(1.0, relativeTipLineWidth * vLineWidth);

      ${(0,f.If)(I,"halfTipLineWidth *= fwidth(samplePos.y);")}

      float distance = max(abs(samplePos.x) - halfMarkerSize, abs(samplePos.y) - halfTipLineWidth);
      return clamp(0.5 - distance, 0.0, 1.0);
    }
  `),t.include(s.Q,e),R.main.add(f.H`
    discardBySlice(vpos);
    discardByTerrainDepth();

    vec4 finalColor = intrinsicColor * vColor;

    // Cancel out perspective correct interpolation if in screen space or draped
    vec2 samplePos = vUV ${(0,f.If)(!I,"* gl_FragCoord.w")};
    finalColor.a *= ${A?"max(markerAlpha(samplePos), tipAlpha(samplePos))":"markerAlpha(samplePos)"};
    outputColorHighlightOID(finalColor, vpos, finalColor.rgb);`),t}const A=Object.freeze(Object.defineProperty({__proto__:null,build:_},Symbol.toStringTag,{value:"Module"}))}}]);
//# sourceMappingURL=41009.b6d990f4.chunk.js.map