var of=0,Eh=1,cf=2;var Es=1,lf=2,Sr=3,ri=0,gn=1,Un=2,Fi=0,Mr=1,wh=2,Ah=3,Rh=4,hf=5;var ws=100,uf=101,df=102,ff=103,pf=104,mf=200,gf=201,bf=202,xf=203,Ch=204,Ph=205,_f=206,vf=207,yf=208,Sf=209,Mf=210,Tf=211,Ef=212,wf=213,Af=214,Jo=0,Yo=1,Zo=2,sr=3,$o=4,Qo=5,ec=6,tc=7,Ih=0,Rf=1,Cf=2,ai=0,ka=1,Ba=2,za=3,Ga=4,Ha=5,Va=6,Wa=7,lh="attached",Pf="detached",Lh=300,As=301,Tr=302,Tc=303,Ec=304,Mi=1e3,vn=1001,rr=1002,Dt=1003,wc=1004;var Rs=1005;var Ot=1006,Er=1007;var On=1008;var Mn=1009,Dh=1010,Nh=1011,wr=1012,Ac=1013,Cn=1014,Pn=1015,bn=1016,Rc=1017,Cc=1018,Cs=1020,Fh=35902,Uh=35899,Oh=1021,kh=1022,Tn=1023,Ti=1026,Ui=1027,Pc=1028,Ic=1029,ts=1030,Lc=1031;var Dc=1033,qa=33776,Xa=33777,Ka=33778,ja=33779,Nc=35840,Fc=35841,Uc=35842,Oc=35843,kc=36196,Bc=37492,zc=37496,Gc=37488,Hc=37489,Ja=37490,Vc=37491,Wc=37808,qc=37809,Xc=37810,Kc=37811,jc=37812,Jc=37813,Yc=37814,Zc=37815,$c=37816,Qc=37817,el=37818,tl=37819,nl=37820,il=37821,sl=36492,rl=36494,al=36495,ol=36283,cl=36284,Ya=36285,ll=36286;var us=2300,ds=2301,Ko=2302,hh=2303,uh=2400,dh=2401,fh=2402,If=2500;var Bh=0,Za=1,Ar=2,Lf=3200;var $a=0,Df=1,Oi="",yt="srgb",pn="srgb-linear",na="linear",xt="srgb";var jo=7680;var Nf=519,Ff=512,Uf=513,Of=514,zh=515,kf=516,Bf=517,Gh=518,Hh=519,Vh=35044;var Wh="300 es",Fn=2e3,ar=2001;function Am(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Rm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function or(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function zf(){let i=or("canvas");return i.style.display="block",i}var hd={},cr=null;function ia(...i){let e="THREE."+i.shift();cr?cr("log",e,...i):console.log(e,...i)}function Gf(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ke(...i){i=Gf(i);let e="THREE."+i.shift();if(cr)cr("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function et(...i){i=Gf(i);let e="THREE."+i.shift();if(cr)cr("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function hs(...i){let e=i.join(" ");e in hd||(hd[e]=!0,Ke(...i))}function Hf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Vf={[Jo]:Jo,[Zo]:ec,[$o]:$o,[sr]:Qo,[Yo]:Yo,[ec]:Zo,[tc]:tc,[Qo]:sr},Qn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},rn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ud=1234567,$r=Math.PI/180,fs=180/Math.PI;function jn(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(rn[i&255]+rn[i>>8&255]+rn[i>>16&255]+rn[i>>24&255]+"-"+rn[e&255]+rn[e>>8&255]+"-"+rn[e>>16&15|64]+rn[e>>24&255]+"-"+rn[t&63|128]+rn[t>>8&255]+"-"+rn[t>>16&255]+rn[t>>24&255]+rn[n&255]+rn[n>>8&255]+rn[n>>16&255]+rn[n>>24&255]).toLowerCase()}function lt(i,e,t){return Math.max(e,Math.min(t,i))}function qh(i,e){return(i%e+e)%e}function Cm(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Pm(i,e,t){return i!==e?(t-i)/(e-i):0}function Qr(i,e,t){return(1-t)*i+t*e}function Im(i,e,t,n){return Qr(i,e,1-Math.exp(-t*n))}function Lm(i,e=1){return e-Math.abs(qh(i,e*2)-e)}function Dm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Nm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Fm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Um(i,e){return i+Math.random()*(e-i)}function Om(i){return i*(.5-Math.random())}function km(i){i!==void 0&&(ud=i);let e=ud+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Bm(i){return i*$r}function zm(i){return i*fs}function Gm(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Hm(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Xh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Vm(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*h,c*u,c*d,o*l);break;case"YZY":i.set(c*d,o*h,c*u,o*l);break;case"ZXZ":i.set(c*u,c*d,o*h,o*l);break;case"XZX":i.set(o*h,c*g,c*f,o*l);break;case"YXY":i.set(c*f,o*h,c*g,o*l);break;case"ZYZ":i.set(c*g,c*f,o*h,o*l);break;default:Ke("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function hl(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Kh(i,e){if(e.constructor===Float32Array)return i;let t=hl(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function jh(i,e){if(e.constructor===Float32Array)return i;let t=hl(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}var qt={DEG2RAD:$r,RAD2DEG:fs,generateUUID:jn,clamp:lt,euclideanModulo:qh,mapLinear:Cm,inverseLerp:Pm,lerp:Qr,damp:Im,pingpong:Lm,smoothstep:Dm,smootherstep:Nm,randInt:Fm,randFloat:Um,randFloatSpread:Om,seededRandom:km,degToRad:Bm,radToDeg:zm,isPowerOfTwo:Gm,ceilPowerOfTwo:Hm,floorPowerOfTwo:Xh,setQuaternionFromProperEuler:Vm,normalize:jh,denormalize:Kh},eu=class eu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};eu.prototype.isVector2=!0;var se=eu,on=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(u!==_||c!==d||l!==f||h!==g){let p=c*d+l*f+h*g+u*_;p<0&&(d=-d,f=-f,g=-g,_=-_,p=-p);let m=1-o;if(p<.9995){let b=Math.acos(p),y=Math.sin(b);m=Math.sin(m*b)/y,o=Math.sin(o*b)/y,c=c*m+d*o,l=l*m+f*o,h=h*m+g*o,u=u*m+_*o}else{c=c*m+d*o,l=l*m+f*o,h=h*m+g*o,u=u*m+_*o;let b=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=b,l*=b,h*=b,u*=b}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*u+c*f-l*d,e[t+1]=c*g+h*d+l*u-o*f,e[t+2]=l*g+h*f+o*d-c*u,e[t+3]=h*g-o*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),u=o(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:Ke("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>u){let f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>u){let f=2*Math.sqrt(1+o-n-u);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(lt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-t;if(o<.9995){let l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},tu=class tu{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(dd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(dd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),h=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Fl.copy(this).projectOnVector(e),this.sub(Fl)}reflect(e){return this.sub(Fl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};tu.prototype.isVector3=!0;var P=tu,Fl=new P,dd=new on,nu=class nu{constructor(e,t,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=s[0],p=s[3],m=s[6],b=s[1],y=s[4],v=s[7],E=s[2],w=s[5],x=s[8];return r[0]=a*_+o*b+c*E,r[3]=a*p+o*y+c*w,r[6]=a*m+o*v+c*x,r[1]=l*_+h*b+u*E,r[4]=l*p+h*y+u*w,r[7]=l*m+h*v+u*x,r[2]=d*_+f*b+g*E,r[5]=d*p+f*y+g*w,r[8]=d*m+f*v+g*x,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*r,f=l*r-a*c,g=t*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return e[0]=u*_,e[1]=(s*l-h*n)*_,e[2]=(o*n-s*a)*_,e[3]=d*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return hs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ul.makeScale(e,t)),this}rotate(e){return hs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ul.makeRotation(-e)),this}translate(e,t){return hs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ul.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};nu.prototype.isMatrix3=!0;var it=nu,Ul=new it,fd=new it().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pd=new it().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Wm(){let i={enabled:!0,workingColorSpace:pn,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===xt&&(s.r=Si(s.r),s.g=Si(s.g),s.b=Si(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===xt&&(s.r=ir(s.r),s.g=ir(s.g),s.b=ir(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Oi?na:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[pn]:{primaries:e,whitePoint:n,transfer:na,toXYZ:fd,fromXYZ:pd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:yt},outputColorSpaceConfig:{drawingBufferColorSpace:yt}},[yt]:{primaries:e,whitePoint:n,transfer:xt,toXYZ:fd,fromXYZ:pd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:yt}}}),i}var ot=Wm();function Si(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ir(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Bs,nc=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Bs===void 0&&(Bs=or("canvas")),Bs.width=e.width,Bs.height=e.height;let s=Bs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Bs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=or("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Si(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Si(t[n]/255)*255):t[n]=Si(t[n]);return{data:t,width:e.width,height:e.height}}else return Ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},qm=0,lr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:qm++}),this.uuid=jn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ol(s[a].image)):r.push(Ol(s[a]))}else r=Ol(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Ol(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?nc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ke("Texture: Unable to serialize Texture."),{})}var Xm=0,kl=new P,Gt=class i extends Qn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=vn,s=vn,r=Ot,a=On,o=Tn,c=Mn,l=i.DEFAULT_ANISOTROPY,h=Oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xm++}),this.uuid=jn(),this.name="",this.source=new lr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new se(0,0),this.repeat=new se(1,1),this.center=new se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new it,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(kl).x}get height(){return this.source.getSize(kl).y}get depth(){return this.source.getSize(kl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ke(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Lh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Mi:e.x=e.x-Math.floor(e.x);break;case vn:e.x=e.x<0?0:1;break;case rr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Mi:e.y=e.y-Math.floor(e.y);break;case vn:e.y=e.y<0?0:1;break;case rr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=Lh;Gt.DEFAULT_ANISOTROPY=1;var iu=class iu{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],_=c[2],p=c[6],m=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(l+1)/2,v=(f+1)/2,E=(m+1)/2,w=(h+d)/4,x=(u+_)/4,M=(g+p)/4;return y>v&&y>E?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=w/n,r=x/n):v>E?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=w/s,r=M/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=x/r,s=M/r),this.set(n,s,r,t),this}let b=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(p-g)/b,this.y=(u-_)/b,this.z=(d-h)/b,this.w=Math.acos((l+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=lt(this.x,e.x,t.x),this.y=lt(this.y,e.y,t.y),this.z=lt(this.z,e.z,t.z),this.w=lt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=lt(this.x,e,t),this.y=lt(this.y,e,t),this.z=lt(this.z,e,t),this.w=lt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(lt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};iu.prototype.isVector4=!0;var St=iu,ic=class extends Qn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ot,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new Gt({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Ot,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new lr(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Qt=class extends ic{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},sa=class extends Gt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var sc=class extends Gt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Mc=class Mc{constructor(e,t,n,s,r,a,o,c,l,h,u,d,f,g,_,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,h,u,d,f,g,_,p)}set(e,t,n,s,r,a,o,c,l,h,u,d,f,g,_,p){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Mc().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/zs.setFromMatrixColumn(e,0).length(),r=1/zs.setFromMatrixColumn(e,1).length(),a=1/zs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=a*h,f=a*u,g=o*h,_=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+g*l,t[5]=d-_*l,t[9]=-o*c,t[2]=_-d*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){let d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){let d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d-_*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){let d=a*h,f=a*u,g=o*h,_=o*u;t[0]=c*h,t[4]=g*l-f,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){let d=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){let d=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Km,e,jm)}lookAt(e,t,n){let s=this.elements;return wn.subVectors(e,t),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),Hi.crossVectors(n,wn),Hi.lengthSq()===0&&(Math.abs(n.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),Hi.crossVectors(n,wn)),Hi.normalize(),bo.crossVectors(wn,Hi),s[0]=Hi.x,s[4]=bo.x,s[8]=wn.x,s[1]=Hi.y,s[5]=bo.y,s[9]=wn.y,s[2]=Hi.z,s[6]=bo.z,s[10]=wn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],p=n[10],m=n[14],b=n[3],y=n[7],v=n[11],E=n[15],w=s[0],x=s[4],M=s[8],I=s[12],R=s[1],D=s[5],U=s[9],V=s[13],L=s[2],H=s[6],X=s[10],G=s[14],ne=s[3],K=s[7],ee=s[11],O=s[15];return r[0]=a*w+o*R+c*L+l*ne,r[4]=a*x+o*D+c*H+l*K,r[8]=a*M+o*U+c*X+l*ee,r[12]=a*I+o*V+c*G+l*O,r[1]=h*w+u*R+d*L+f*ne,r[5]=h*x+u*D+d*H+f*K,r[9]=h*M+u*U+d*X+f*ee,r[13]=h*I+u*V+d*G+f*O,r[2]=g*w+_*R+p*L+m*ne,r[6]=g*x+_*D+p*H+m*K,r[10]=g*M+_*U+p*X+m*ee,r[14]=g*I+_*V+p*G+m*O,r[3]=b*w+y*R+v*L+E*ne,r[7]=b*x+y*D+v*H+E*K,r[11]=b*M+y*U+v*X+E*ee,r[15]=b*I+y*V+v*G+E*O,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],p=e[11],m=e[15],b=c*f-l*d,y=o*f-l*u,v=o*d-c*u,E=a*f-l*h,w=a*d-c*h,x=a*u-o*h;return t*(_*b-p*y+m*v)-n*(g*b-p*E+m*w)+s*(g*y-_*E+m*x)-r*(g*v-_*w+p*x)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(r*h-o*c)+s*(r*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],p=e[14],m=e[15],b=t*o-n*a,y=t*c-s*a,v=t*l-r*a,E=n*c-s*o,w=n*l-r*o,x=s*l-r*c,M=h*_-u*g,I=h*p-d*g,R=h*m-f*g,D=u*p-d*_,U=u*m-f*_,V=d*m-f*p,L=b*V-y*U+v*D+E*R-w*I+x*M;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let H=1/L;return e[0]=(o*V-c*U+l*D)*H,e[1]=(s*U-n*V-r*D)*H,e[2]=(_*x-p*w+m*E)*H,e[3]=(d*w-u*x-f*E)*H,e[4]=(c*R-a*V-l*I)*H,e[5]=(t*V-s*R+r*I)*H,e[6]=(p*v-g*x-m*y)*H,e[7]=(h*x-d*v+f*y)*H,e[8]=(a*U-o*R+l*M)*H,e[9]=(n*R-t*U-r*M)*H,e[10]=(g*w-_*v+m*b)*H,e[11]=(u*v-h*w-f*b)*H,e[12]=(o*I-a*D-c*M)*H,e[13]=(t*D-n*I+s*M)*H,e[14]=(_*y-g*E-p*b)*H,e[15]=(h*E-u*y+d*b)*H,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,d=r*l,f=r*h,g=r*u,_=a*h,p=a*u,m=o*u,b=c*l,y=c*h,v=c*u,E=n.x,w=n.y,x=n.z;return s[0]=(1-(_+m))*E,s[1]=(f+v)*E,s[2]=(g-y)*E,s[3]=0,s[4]=(f-v)*w,s[5]=(1-(d+m))*w,s[6]=(p+b)*w,s[7]=0,s[8]=(g+y)*x,s[9]=(p-b)*x,s[10]=(1-(d+_))*x,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=zs.set(s[0],s[1],s[2]).length(),o=zs.set(s[4],s[5],s[6]).length(),c=zs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Vn.copy(this);let l=1/a,h=1/o,u=1/c;return Vn.elements[0]*=l,Vn.elements[1]*=l,Vn.elements[2]*=l,Vn.elements[4]*=h,Vn.elements[5]*=h,Vn.elements[6]*=h,Vn.elements[8]*=u,Vn.elements[9]*=u,Vn.elements[10]*=u,t.setFromRotationMatrix(Vn),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,s,r,a,o=Fn,c=!1){let l=this.elements,h=2*r/(t-e),u=2*r/(n-s),d=(t+e)/(t-e),f=(n+s)/(n-s),g,_;if(c)g=r/(a-r),_=a*r/(a-r);else if(o===Fn)g=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===ar)g=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Fn,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-s),d=-(t+e)/(t-e),f=-(n+s)/(n-s),g,_;if(c)g=1/(a-r),_=a/(a-r);else if(o===Fn)g=-2/(a-r),_=-(a+r)/(a-r);else if(o===ar)g=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Mc.prototype.isMatrix4=!0;var nt=Mc,zs=new P,Vn=new nt,Km=new P(0,0,0),jm=new P(1,1,1),Hi=new P,bo=new P,wn=new P,md=new nt,gd=new on,Ei=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(lt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-lt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(lt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return md.makeRotationFromQuaternion(e),this.setFromRotationMatrix(md,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return gd.setFromEuler(this),this.setFromQuaternion(gd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ei.DEFAULT_ORDER="XYZ";var hr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Jm=0,bd=new P,Gs=new on,mi=new nt,xo=new P,Br=new P,Ym=new P,Zm=new on,xd=new P(1,0,0),_d=new P(0,1,0),vd=new P(0,0,1),yd={type:"added"},$m={type:"removed"},Hs={type:"childadded",child:null},Bl={type:"childremoved",child:null},Rt=class i extends Qn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jm++}),this.uuid=jn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new P,t=new Ei,n=new on,s=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new nt},normalMatrix:{value:new it}}),this.matrix=new nt,this.matrixWorld=new nt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new hr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Gs.setFromAxisAngle(e,t),this.quaternion.multiply(Gs),this}rotateOnWorldAxis(e,t){return Gs.setFromAxisAngle(e,t),this.quaternion.premultiply(Gs),this}rotateX(e){return this.rotateOnAxis(xd,e)}rotateY(e){return this.rotateOnAxis(_d,e)}rotateZ(e){return this.rotateOnAxis(vd,e)}translateOnAxis(e,t){return bd.copy(e).applyQuaternion(this.quaternion),this.position.add(bd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xd,e)}translateY(e){return this.translateOnAxis(_d,e)}translateZ(e){return this.translateOnAxis(vd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?xo.copy(e):xo.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Br.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mi.lookAt(Br,xo,this.up):mi.lookAt(xo,Br,this.up),this.quaternion.setFromRotationMatrix(mi),s&&(mi.extractRotation(s.matrixWorld),Gs.setFromRotationMatrix(mi),this.quaternion.premultiply(Gs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(et("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yd),Hs.child=e,this.dispatchEvent(Hs),Hs.child=null):et("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent($m),Bl.child=e,this.dispatchEvent(Bl),Bl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mi.multiply(e.parent.matrixWorld)),e.applyMatrix4(mi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yd),Hs.child=e,this.dispatchEvent(Hs),Hs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Br,e,Ym),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Br,Zm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){let o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let c=[];for(let l in o){let h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Rt.DEFAULT_UP=new P(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ut=class extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Qm={type:"move"},ur=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ut,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ut,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ut,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(let _ of e.hand.values()){let p=t.getJointPose(_,n),m=this._getHandJoint(l,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Qm)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ut;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Wf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vi={h:0,s:0,l:0},_o={h:0,s:0,l:0};function zl(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var De=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ot.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ot.workingColorSpace){return this.r=e,this.g=t,this.b=n,ot.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ot.workingColorSpace){if(e=qh(e,1),t=lt(t,0,1),n=lt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=zl(a,r,e+1/3),this.g=zl(a,r,e),this.b=zl(a,r,e-1/3)}return ot.colorSpaceToWorking(this,s),this}setStyle(e,t=yt){function n(r){r!==void 0&&parseFloat(r)<1&&Ke("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ke("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){let n=Wf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Si(e.r),this.g=Si(e.g),this.b=Si(e.b),this}copyLinearToSRGB(e){return this.r=ir(e.r),this.g=ir(e.g),this.b=ir(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return ot.workingToColorSpace(an.copy(this),e),Math.round(lt(an.r*255,0,255))*65536+Math.round(lt(an.g*255,0,255))*256+Math.round(lt(an.b*255,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ot.workingColorSpace){ot.workingToColorSpace(an.copy(this),t);let n=an.r,s=an.g,r=an.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,h=(o+a)/2;if(o===a)c=0,l=0;else{let u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=ot.workingColorSpace){return ot.workingToColorSpace(an.copy(this),t),e.r=an.r,e.g=an.g,e.b=an.b,e}getStyle(e=yt){ot.workingToColorSpace(an.copy(this),e);let t=an.r,n=an.g,s=an.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Vi),this.setHSL(Vi.h+e,Vi.s+t,Vi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Vi),e.getHSL(_o);let n=Qr(Vi.h,_o.h,t),s=Qr(Vi.s,_o.s,t),r=Qr(Vi.l,_o.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},an=new De;De.NAMES=Wf;var ra=class extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ei,this.environmentIntensity=1,this.environmentRotation=new Ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Wn=new P,gi=new P,Gl=new P,bi=new P,Vs=new P,Ws=new P,Sd=new P,Hl=new P,Vl=new P,Wl=new P,ql=new St,Xl=new St,Kl=new St,yi=class i{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Wn.subVectors(e,t),s.cross(Wn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Wn.subVectors(s,t),gi.subVectors(n,t),Gl.subVectors(e,t);let a=Wn.dot(Wn),o=Wn.dot(gi),c=Wn.dot(Gl),l=gi.dot(gi),h=gi.dot(Gl),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(l*c-o*h)*d,g=(a*h-o*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,bi)===null?!1:bi.x>=0&&bi.y>=0&&bi.x+bi.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,bi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,bi.x),c.addScaledVector(a,bi.y),c.addScaledVector(o,bi.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return ql.setScalar(0),Xl.setScalar(0),Kl.setScalar(0),ql.fromBufferAttribute(e,t),Xl.fromBufferAttribute(e,n),Kl.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(ql,r.x),a.addScaledVector(Xl,r.y),a.addScaledVector(Kl,r.z),a}static isFrontFacing(e,t,n,s){return Wn.subVectors(n,t),gi.subVectors(e,t),Wn.cross(gi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wn.subVectors(this.c,this.b),gi.subVectors(this.a,this.b),Wn.cross(gi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Vs.subVectors(s,n),Ws.subVectors(r,n),Hl.subVectors(e,n);let c=Vs.dot(Hl),l=Ws.dot(Hl);if(c<=0&&l<=0)return t.copy(n);Vl.subVectors(e,s);let h=Vs.dot(Vl),u=Ws.dot(Vl);if(h>=0&&u<=h)return t.copy(s);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0&&c-h>0)return a=c/(c-h),t.copy(n).addScaledVector(Vs,a);Wl.subVectors(e,r);let f=Vs.dot(Wl),g=Ws.dot(Wl);if(g>=0&&f<=g)return t.copy(r);let _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(Ws,o);let p=h*g-f*u;if(p<=0&&u-h>=0&&f-g>=0)return Sd.subVectors(r,s),o=(u-h)/(u-h+(f-g)),t.copy(s).addScaledVector(Sd,o);let m=1/(p+_+d);return a=_*m,o=d*m,t.copy(n).addScaledVector(Vs,a).addScaledVector(Ws,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},cn=class{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(qn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(qn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=qn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,qn):qn.fromBufferAttribute(r,a),qn.applyMatrix4(e.matrixWorld),this.expandByPoint(qn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),vo.copy(n.boundingBox)),vo.applyMatrix4(e.matrixWorld),this.union(vo)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,qn),qn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zr),yo.subVectors(this.max,zr),qs.subVectors(e.a,zr),Xs.subVectors(e.b,zr),Ks.subVectors(e.c,zr),Wi.subVectors(Xs,qs),qi.subVectors(Ks,Xs),rs.subVectors(qs,Ks);let t=[0,-Wi.z,Wi.y,0,-qi.z,qi.y,0,-rs.z,rs.y,Wi.z,0,-Wi.x,qi.z,0,-qi.x,rs.z,0,-rs.x,-Wi.y,Wi.x,0,-qi.y,qi.x,0,-rs.y,rs.x,0];return!jl(t,qs,Xs,Ks,yo)||(t=[1,0,0,0,1,0,0,0,1],!jl(t,qs,Xs,Ks,yo))?!1:(So.crossVectors(Wi,qi),t=[So.x,So.y,So.z],jl(t,qs,Xs,Ks,yo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,qn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(qn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},xi=[new P,new P,new P,new P,new P,new P,new P,new P],qn=new P,vo=new cn,qs=new P,Xs=new P,Ks=new P,Wi=new P,qi=new P,rs=new P,zr=new P,yo=new P,So=new P,as=new P;function jl(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){as.fromArray(i,r);let o=s.x*Math.abs(as.x)+s.y*Math.abs(as.y)+s.z*Math.abs(as.z),c=e.dot(as),l=t.dot(as),h=n.dot(as);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}var zt=new P,Mo=new se,eg=0,$t=class extends Qn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:eg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Vh,this.updateRanges=[],this.gpuType=Pn,this.version=0,this._normalizationScale=e!==void 0?hl(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Mo.fromBufferAttribute(this,t),Mo.applyMatrix3(e),this.setXY(t,Mo.x,Mo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix3(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix4(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyNormalMatrix(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.transformDirection(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Kh(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):jh(e,this.array)}};var aa=class extends $t{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var oa=class extends $t{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var dt=class extends $t{constructor(e,t,n){super(new Float32Array(e),t,n)}},tg=new cn,Gr=new P,Jl=new P,yn=class{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):tg.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Gr.subVectors(e,this.center);let t=Gr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Gr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Jl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Gr.copy(e.center).add(Jl)),this.expandByPoint(Gr.copy(e.center).sub(Jl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ng=0,Nn=new nt,Yl=new Rt,js=new P,An=new cn,Hr=new cn,Jt=new P,Ct=class i extends Qn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ng++}),this.uuid=jn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Am(e)?oa:aa)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new it().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Nn.makeRotationFromQuaternion(e),this.applyMatrix4(Nn),this}rotateX(e){return Nn.makeRotationX(e),this.applyMatrix4(Nn),this}rotateY(e){return Nn.makeRotationY(e),this.applyMatrix4(Nn),this}rotateZ(e){return Nn.makeRotationZ(e),this.applyMatrix4(Nn),this}translate(e,t,n){return Nn.makeTranslation(e,t,n),this.applyMatrix4(Nn),this}scale(e,t,n){return Nn.makeScale(e,t,n),this.applyMatrix4(Nn),this}lookAt(e){return Yl.lookAt(e),Yl.updateMatrix(),this.applyMatrix4(Yl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(js).negate(),this.translate(js.x,js.y,js.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new dt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new cn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];An.setFromBufferAttribute(r),this.morphTargetsRelative?(Jt.addVectors(this.boundingBox.min,An.min),this.boundingBox.expandByPoint(Jt),Jt.addVectors(this.boundingBox.max,An.max),this.boundingBox.expandByPoint(Jt)):(this.boundingBox.expandByPoint(An.min),this.boundingBox.expandByPoint(An.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&et('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){let n=this.boundingSphere.center;if(An.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Hr.setFromBufferAttribute(o),this.morphTargetsRelative?(Jt.addVectors(An.min,Hr.min),An.expandByPoint(Jt),Jt.addVectors(An.max,Hr.max),An.expandByPoint(Jt)):(An.expandByPoint(Hr.min),An.expandByPoint(Hr.max))}An.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Jt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Jt));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Jt.fromBufferAttribute(o,l),c&&(js.fromBufferAttribute(e,l),Jt.add(js)),s=Math.max(s,n.distanceToSquared(Jt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&et('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){et("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new $t(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],c=[],l=new Uint8Array(n.count);for(let I=0;I<n.count;I++)o[I]=new P,c[I]=new P;let h=new P,u=new P,d=new P,f=new se,g=new se,_=new se,p=new P,m=new P;function b(I,R,D){l[I]=l[R]=l[D]=1,h.fromBufferAttribute(n,I),u.fromBufferAttribute(n,R),d.fromBufferAttribute(n,D),f.fromBufferAttribute(r,I),g.fromBufferAttribute(r,R),_.fromBufferAttribute(r,D),u.sub(h),d.sub(h),g.sub(f),_.sub(f);let U=1/(g.x*_.y-_.x*g.y);isFinite(U)&&(p.copy(u).multiplyScalar(_.y).addScaledVector(d,-g.y).multiplyScalar(U),m.copy(d).multiplyScalar(g.x).addScaledVector(u,-_.x).multiplyScalar(U),o[I].add(p),o[R].add(p),o[D].add(p),c[I].add(m),c[R].add(m),c[D].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let I=0,R=y.length;I<R;++I){let D=y[I],U=D.start,V=D.count;for(let L=U,H=U+V;L<H;L+=3)b(e.getX(L+0),e.getX(L+1),e.getX(L+2))}let v=new P,E=new P,w=new P,x=new P;function M(I){w.fromBufferAttribute(s,I),x.copy(w);let R=o[I];v.copy(R),v.sub(w.multiplyScalar(w.dot(R))).normalize(),E.crossVectors(x,R);let U=E.dot(c[I])<0?-1:1;a.setXYZW(I,v.x,v.y,v.z,U)}for(let I=0,R=n.count;I<R;++I)l[I]&&M(I);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new $t(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new P,r=new P,a=new P,o=new P,c=new P,l=new P,h=new P,u=new P;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),_=e.getX(d+1),p=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,p),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Jt.fromBufferAttribute(e,t),Jt.normalize(),e.setXYZ(t,Jt.x,Jt.y,Jt.z)}toNonIndexed(){function e(o,c){let l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h),f=0,g=0;for(let _=0,p=c.length;_<p;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*h;for(let m=0;m<h;m++)d[g++]=l[f++]}return new $t(d,h,u)}if(this.index===null)return Ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=e(c,n);t.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let l=0,h=a.length;l<h;l++){let u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},ps=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Vh,this.updateRanges=[],this.version=0,this.uuid=jn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Md(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Md(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};function Md(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=jn()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}var fn=new P,ji=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s,this._normalizationScale=e!==void 0?hl(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)fn.fromBufferAttribute(this,t),fn.applyMatrix4(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)fn.fromBufferAttribute(this,t),fn.applyNormalMatrix(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)fn.fromBufferAttribute(this,t),fn.transformDirection(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){ia("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new $t(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ia("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Kh(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):jh(e,this.data.array)}},Zl=new P,ig=new P,sg=new it,Xn=class{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Zl.subVectors(n,t).cross(ig.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Zl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||sg.getNormalMatrix(e),s=this.coplanarPoint(Zl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},rg=0,ln=class extends Qn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rg++}),this.uuid=jn(),this.name="",this.type="Material",this.blending=Mr,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ch,this.blendDst=Ph,this.blendEquation=ws,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new De(0,0,0),this.blendAlpha=0,this.depthFunc=sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=jo,this.stencilZFail=jo,this.stencilZPass=jo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ke(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new De().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Xn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new se().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new se().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ji=class extends ln{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Js,Vr=new P,Ys=new P,Zs=new P,$s=new se,Wr=new se,qf=new nt,To=new P,qr=new P,Eo=new P,Td=new se,$l=new se,Ed=new se,ca=class extends Rt{constructor(e=new Ji){if(super(),this.isSprite=!0,this.type="Sprite",Js===void 0){Js=new Ct;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ps(t,5);Js.setIndex([0,1,2,0,2,3]),Js.setAttribute("position",new ji(n,3,0,!1)),Js.setAttribute("uv",new ji(n,2,3,!1))}this.geometry=Js,this.material=e,this.center=new se(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&et('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ys.setFromMatrixScale(this.matrixWorld),qf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Zs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ys.multiplyScalar(-Zs.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let a=this.center;wo(To.set(-.5,-.5,0),Zs,a,Ys,s,r),wo(qr.set(.5,-.5,0),Zs,a,Ys,s,r),wo(Eo.set(.5,.5,0),Zs,a,Ys,s,r),Td.set(0,0),$l.set(1,0),Ed.set(1,1);let o=e.ray.intersectTriangle(To,qr,Eo,!1,Vr);if(o===null&&(wo(qr.set(-.5,.5,0),Zs,a,Ys,s,r),$l.set(0,1),o=e.ray.intersectTriangle(To,Eo,qr,!1,Vr),o===null))return;let c=e.ray.origin.distanceTo(Vr);c<e.near||c>e.far||t.push({distance:c,point:Vr.clone(),uv:yi.getInterpolation(Vr,To,qr,Eo,Td,$l,Ed,new se),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){let t=super.toJSON(e);return t.object.center=this.center.toArray(),t}};function wo(i,e,t,n,s,r){$s.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Wr.x=r*$s.x-s*$s.y,Wr.y=s*$s.x+r*$s.y):Wr.copy($s),i.copy(e),i.x+=Wr.x,i.y+=Wr.y,i.applyMatrix4(qf)}var _i=new P,Ql=new P,Ao=new P,Ro=new P,Yi=class{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_i)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=_i.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_i.copy(this.origin).addScaledVector(this.direction,t),_i.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ql.copy(e).add(t).multiplyScalar(.5),Ao.copy(t).sub(e).normalize(),Ro.copy(this.origin).sub(Ql);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Ao),o=Ro.dot(this.direction),c=-Ro.dot(Ao),l=Ro.lengthSq(),h=Math.abs(1-a*a),u,d,f,g;if(h>0)if(u=a*c-o,d=a*o-c,g=r*h,u>=0)if(d>=-g)if(d<=g){let _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ql).addScaledVector(Ao,d),f}intersectSphere(e,t){if(e.radius<0)return null;_i.subVectors(e.center,this.origin);let n=_i.dot(this.direction),s=_i.dot(_i)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,_i)!==null}intersectTriangle(e,t,n,s,r){let a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,g=t.x-a.x,_=t.y-a.y,p=t.z-a.z,m=n.x-a.x,b=n.y-a.y,y=n.z-a.z,v=Math.abs(c),E=Math.abs(l),w=Math.abs(h),x,M,I,R,D,U,V,L,H,X,G,ne;if(v>=E&&v>=w?(I=c,U=u,H=g,ne=m,c>=0?(x=l,M=h,R=d,D=f,V=_,L=p,X=b,G=y):(x=h,M=l,R=f,D=d,V=p,L=_,X=y,G=b)):E>=w?(I=l,U=d,H=_,ne=b,l>=0?(x=h,M=c,R=f,D=u,V=p,L=g,X=y,G=m):(x=c,M=h,R=u,D=f,V=g,L=p,X=m,G=y)):(I=h,U=f,H=p,ne=y,h>=0?(x=c,M=l,R=u,D=d,V=g,L=_,X=m,G=b):(x=l,M=c,R=d,D=u,V=_,L=g,X=b,G=m)),I===0)return null;let K=x/I,ee=M/I,O=1/I,Fe=R-K*U,qe=D-ee*U,J=V-K*H,ye=L-ee*H,Ne=X-K*ne,Oe=G-ee*ne,Se=Ne*ye-Oe*J,We=Fe*Oe-qe*Ne,Ae=J*qe-ye*Fe;if(s){if(Se<0||We<0||Ae<0)return null}else if((Se<0||We<0||Ae<0)&&(Se>0||We>0||Ae>0))return null;let te=Se+We+Ae;if(te===0)return null;let Me=O*(Se*U+We*H+Ae*ne);return(te>0?Me<0:Me>0)?null:this.at(Me/te,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Yt=class extends ln{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new De(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=Ih,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},wd=new nt,os=new Yi,Co=new yn,Ad=new P,Po=new P,Io=new P,Lo=new P,eh=new P,Do=new P,Rd=new P,No=new P,Pt=class extends Rt{constructor(e=new Ct,t=new Yt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Do.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=o[c],u=r[c];h!==0&&(eh.fromBufferAttribute(u,e),a?Do.addScaledVector(eh,h):Do.addScaledVector(eh.sub(t),h))}t.add(Do)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Co.copy(n.boundingSphere),Co.applyMatrix4(r),os.copy(e.ray).recast(e.near),!(Co.containsPoint(os.origin)===!1&&(os.intersectSphere(Co,Ad)===null||os.origin.distanceToSquared(Ad)>(e.far-e.near)**2))&&(wd.copy(r).invert(),os.copy(e.ray).applyMatrix4(wd),!(n.boundingBox!==null&&os.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,os)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){let p=d[g],m=a[p.materialIndex],b=Math.max(p.start,f.start),y=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let v=b,E=y;v<E;v+=3){let w=o.getX(v),x=o.getX(v+1),M=o.getX(v+2);s=Fo(this,m,e,n,l,h,u,w,x,M),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){let b=o.getX(p),y=o.getX(p+1),v=o.getX(p+2);s=Fo(this,a,e,n,l,h,u,b,y,v),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){let p=d[g],m=a[p.materialIndex],b=Math.max(p.start,f.start),y=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let v=b,E=y;v<E;v+=3){let w=v,x=v+1,M=v+2;s=Fo(this,m,e,n,l,h,u,w,x,M),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){let b=p,y=p+1,v=p+2;s=Fo(this,a,e,n,l,h,u,b,y,v),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}};function ag(i,e,t,n,s,r,a,o){let c;if(e.side===gn?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===ri,o),c===null)return null;No.copy(o),No.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(No);return l<t.near||l>t.far?null:{distance:l,point:No.clone(),object:i}}function Fo(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,Po),i.getVertexPosition(c,Io),i.getVertexPosition(l,Lo);let h=ag(i,e,t,n,Po,Io,Lo,Rd);if(h){let u=new P;yi.getBarycoord(Rd,Po,Io,Lo,u),s&&(h.uv=yi.getInterpolatedAttribute(s,o,c,l,u,new se)),r&&(h.uv1=yi.getInterpolatedAttribute(r,o,c,l,u,new se)),a&&(h.normal=yi.getInterpolatedAttribute(a,o,c,l,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:c,c:l,normal:new P,materialIndex:0};yi.getNormal(Po,Io,Lo,d.normal),h.face=d,h.barycoord=u}return h}var Xr=new St,Cd=new St,Pd=new St,og=new St,Id=new nt,Uo=new P,th=new yn,Ld=new nt,nh=new Yi,la=class extends Pt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=lh,this.bindMatrix=new nt,this.bindMatrixInverse=new nt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new cn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Uo),this.boundingBox.expandByPoint(Uo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new yn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Uo),this.boundingSphere.expandByPoint(Uo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),th.copy(this.boundingSphere),th.applyMatrix4(s),e.ray.intersectsSphere(th)!==!1&&(Ld.copy(s).invert(),nh.copy(e.ray).applyMatrix4(Ld),!(this.boundingBox!==null&&nh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,nh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new St,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===lh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Pf?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ke("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Cd.fromBufferAttribute(s.attributes.skinIndex,e),Pd.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(Xr.copy(t),t.set(0,0,0,0)):(Xr.set(t.x,t.y,t.z,1),t.set(0,0,0)),Xr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=Pd.getComponent(r);if(a!==0){let o=Cd.getComponent(r);Id.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(og.copy(Xr).applyMatrix4(Id),a)}}return t.isVector4&&(t.w=Xr.w),t.applyMatrix4(this.bindMatrixInverse)}},dr=class extends Rt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Zi=class extends Gt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Dt,h=Dt,u,d){super(null,a,o,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Dd=new nt,cg=new nt,ha=class i{constructor(e=[],t=[]){this.uuid=jn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ke("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new nt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new nt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:cg;Dd.multiplyMatrices(o,t[r]),Dd.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Zi(t,e,e,Tn,Pn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(Ke("Skeleton: No bone found with UUID:",r),a=new dr),this.bones.push(a),this.boneInverses.push(new nt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},wi=class extends $t{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Qs=new nt,Nd=new nt,Oo=[],Fd=new cn,lg=new nt,Kr=new Pt,jr=new yn,ua=class extends Pt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new wi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,lg)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new cn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Qs),Fd.copy(e.boundingBox).applyMatrix4(Qs),this.boundingBox.union(Fd)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new yn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Qs),jr.copy(e.boundingSphere).applyMatrix4(Qs),this.boundingSphere.union(jr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Kr.geometry=this.geometry,Kr.material=this.material,Kr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),jr.copy(this.boundingSphere),jr.applyMatrix4(n),e.ray.intersectsSphere(jr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Qs),Nd.multiplyMatrices(n,Qs),Kr.matrixWorld=Nd,Kr.raycast(e,Oo);for(let a=0,o=Oo.length;a<o;a++){let c=Oo[a];c.instanceId=r,c.object=this,t.push(c)}Oo.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new wi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Zi(new Float32Array(s*this.count),s,this.count,Pc,Pn));let r=this.morphTexture.source.data.data,a=0;for(let l=0;l<n.length;l++)a+=n[l];let o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},cs=new yn,hg=new se(.5,.5),ko=new P,$i=class{constructor(e=new Xn,t=new Xn,n=new Xn,s=new Xn,r=new Xn,a=new Xn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Fn,n=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],f=r[7],g=r[8],_=r[9],p=r[10],m=r[11],b=r[12],y=r[13],v=r[14],E=r[15];if(s[0].setComponents(l-a,f-h,m-g,E-b).normalize(),s[1].setComponents(l+a,f+h,m+g,E+b).normalize(),s[2].setComponents(l+o,f+u,m+_,E+y).normalize(),s[3].setComponents(l-o,f-u,m-_,E-y).normalize(),n)s[4].setComponents(c,d,p,v).normalize(),s[5].setComponents(l-c,f-d,m-p,E-v).normalize();else if(s[4].setComponents(l-c,f-d,m-p,E-v).normalize(),t===Fn)s[5].setComponents(l+c,f+d,m+p,E+v).normalize();else if(t===ar)s[5].setComponents(c,d,p,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),cs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),cs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(cs)}intersectsSprite(e){cs.center.set(0,0,0);let t=hg.distanceTo(e.center);return cs.radius=.7071067811865476+t,cs.applyMatrix4(e.matrixWorld),this.intersectsSphere(cs)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(ko.x=s.normal.x>0?e.max.x:e.min.x,ko.y=s.normal.y>0?e.max.y:e.min.y,ko.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ko)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Ud=new nt,rc=class i{constructor(){this.coordinateSystem=Fn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];Ud.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new $i),n[s].setFromProjectionMatrix(Ud,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new $i),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new i().copy(this)}};var fr=class extends ln{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new De(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},ac=new P,oc=new P,Od=new nt,Jr=new Yi,Bo=new yn,ih=new P,kd=new P,ms=class extends Rt{constructor(e=new Ct,t=new fr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)ac.fromBufferAttribute(t,s-1),oc.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=ac.distanceTo(oc);e.setAttribute("lineDistance",new dt(n,1))}else Ke("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Bo.copy(n.boundingSphere),Bo.applyMatrix4(s),Bo.radius+=r,e.ray.intersectsSphere(Bo)===!1)return;Od.copy(s).invert(),Jr.copy(e.ray).applyMatrix4(Od);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=f,p=g-1;_<p;_+=l){let m=h.getX(_),b=h.getX(_+1),y=zo(this,e,Jr,c,m,b,_);y&&t.push(y)}if(this.isLineLoop){let _=h.getX(g-1),p=h.getX(f),m=zo(this,e,Jr,c,_,p,g-1);m&&t.push(m)}}else{let f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,p=g-1;_<p;_+=l){let m=zo(this,e,Jr,c,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){let _=zo(this,e,Jr,c,g-1,f,g-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function zo(i,e,t,n,s,r,a){let o=i.geometry.attributes.position;if(ac.fromBufferAttribute(o,s),oc.fromBufferAttribute(o,r),t.distanceSqToSegment(ac,oc,ih,kd)>n)return;ih.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(ih);if(!(l<e.near||l>e.far))return{distance:l,point:kd.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}var Bd=new P,zd=new P,da=class extends ms{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Bd.fromBufferAttribute(t,s),zd.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Bd.distanceTo(zd);e.setAttribute("lineDistance",new dt(n,1))}else Ke("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},fa=class extends ms{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},pr=class extends ln{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new De(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Gd=new nt,ph=new Yi,Go=new yn,Ho=new P,pa=class extends Rt{constructor(e=new Ct,t=new pr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Go.copy(n.boundingSphere),Go.applyMatrix4(s),Go.radius+=r,e.ray.intersectsSphere(Go)===!1)return;Gd.copy(s).invert(),ph.copy(e.ray).applyMatrix4(Gd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){let d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=d,_=f;g<_;g++){let p=l.getX(g);Ho.fromBufferAttribute(u,p),Hd(Ho,p,c,s,e,t,this)}}else{let d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,_=f;g<_;g++)Ho.fromBufferAttribute(u,g),Hd(Ho,g,c,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Hd(i,e,t,n,s,r,a){let o=ph.distanceSqToPoint(i);if(o<t){let c=new P;ph.closestPointToPoint(i,c),c.applyMatrix4(n);let l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var ma=class extends Gt{constructor(e,t,n,s,r=Ot,a=Ot,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;let h=this;function u(){h.needsUpdate=!0,h._requestVideoFrameCallbackId=e.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in e&&(this._requestVideoFrameCallbackId=e.requestVideoFrameCallback(u))}clone(){return new this.constructor(this.image).copy(this)}update(){let e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){this._requestVideoFrameCallbackId!==0&&(this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),this._requestVideoFrameCallbackId=0),super.dispose()}};var ga=class extends Gt{constructor(e=[],t=As,n,s,r,a,o,c,l,h){super(e,t,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ei=class extends Gt{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Kn=class extends Gt{constructor(e,t,n=Cn,s,r,a,o=Dt,c=Dt,l,h=Ti,u=1){if(h!==Ti&&h!==Ui)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new lr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},ba=class extends Kn{constructor(e,t=Cn,n=As,s,r,a=Dt,o=Dt,c,l=Ti){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,a,o,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},xa=class extends Gt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},mr=class i extends Ct{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new dt(l,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(u,2));function g(_,p,m,b,y,v,E,w,x,M,I){let R=v/x,D=E/M,U=v/2,V=E/2,L=w/2,H=x+1,X=M+1,G=0,ne=0,K=new P;for(let ee=0;ee<X;ee++){let O=ee*D-V;for(let Fe=0;Fe<H;Fe++){let qe=Fe*R-U;K[_]=qe*b,K[p]=O*y,K[m]=L,l.push(K.x,K.y,K.z),K[_]=0,K[p]=0,K[m]=w>0?1:-1,h.push(K.x,K.y,K.z),u.push(Fe/x),u.push(1-ee/M),G+=1}}for(let ee=0;ee<M;ee++)for(let O=0;O<x;O++){let Fe=d+O+H*ee,qe=d+O+H*(ee+1),J=d+(O+1)+H*(ee+1),ye=d+(O+1)+H*ee;c.push(Fe,qe,ye),c.push(qe,J,ye),ne+=6}o.addGroup(f,ne,I),f+=ne,d+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},_a=class i extends Ct{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let a=[],o=[],c=[],l=[],h=t/2,u=Math.PI/2*e,d=t,f=2*u+d,g=n*2+r,_=s+1,p=new P,m=new P;for(let b=0;b<=g;b++){let y=0,v=0,E=0,w=0;if(b<=n){let I=b/n,R=I*Math.PI/2;v=-h-e*Math.cos(R),E=e*Math.sin(R),w=-e*Math.cos(R),y=I*u}else if(b<=n+r){let I=(b-n)/r;v=-h+I*t,E=e,w=0,y=u+I*d}else{let I=(b-n-r)/n,R=I*Math.PI/2;v=h+e*Math.sin(R),E=e*Math.cos(R),w=e*Math.sin(R),y=u+d+I*u}let x=Math.max(0,Math.min(1,y/f)),M=0;b===0?M=.5/s:b===g&&(M=-.5/s);for(let I=0;I<=s;I++){let R=I/s,D=R*Math.PI*2,U=Math.sin(D),V=Math.cos(D);m.x=-E*V,m.y=v,m.z=E*U,o.push(m.x,m.y,m.z),p.set(-E*V,w,E*U),p.normalize(),c.push(p.x,p.y,p.z),l.push(R+M,x)}if(b>0){let I=(b-1)*_;for(let R=0;R<s;R++){let D=I+R,U=I+R+1,V=b*_+R,L=b*_+R+1;a.push(D,U,V),a.push(U,L,V)}}}this.setIndex(a),this.setAttribute("position",new dt(o,3)),this.setAttribute("normal",new dt(c,3)),this.setAttribute("uv",new dt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}};var gs=class i extends Ct{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],g=0,_=[],p=n/2,m=0;b(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new dt(u,3)),this.setAttribute("normal",new dt(d,3)),this.setAttribute("uv",new dt(f,2));function b(){let v=new P,E=new P,w=0,x=(t-e)/n;for(let M=0;M<=r;M++){let I=[],R=M/r,D=R*(t-e)+e;for(let U=0;U<=s;U++){let V=U/s,L=V*c+o,H=Math.sin(L),X=Math.cos(L);E.x=D*H,E.y=-R*n+p,E.z=D*X,u.push(E.x,E.y,E.z),v.set(H,x,X).normalize(),d.push(v.x,v.y,v.z),f.push(V,1-R),I.push(g++)}_.push(I)}for(let M=0;M<s;M++)for(let I=0;I<r;I++){let R=_[I][M],D=_[I+1][M],U=_[I+1][M+1],V=_[I][M+1];(e>0||I!==0)&&(h.push(R,D,V),w+=3),(t>0||I!==r-1)&&(h.push(D,U,V),w+=3)}l.addGroup(m,w,0),m+=w}function y(v){let E=g,w=new se,x=new P,M=0,I=v===!0?e:t,R=v===!0?1:-1;for(let U=1;U<=s;U++)u.push(0,p*R,0),d.push(0,R,0),f.push(.5,.5),g++;let D=g;for(let U=0;U<=s;U++){let L=U/s*c+o,H=Math.cos(L),X=Math.sin(L);x.x=I*X,x.y=p*R,x.z=I*H,u.push(x.x,x.y,x.z),d.push(0,R,0),w.x=H*.5+.5,w.y=X*.5*R+.5,f.push(w.x,w.y),g++}for(let U=0;U<s;U++){let V=E+U,L=D+U;v===!0?h.push(L,L+1,V):h.push(L+1,L,V),M+=3}l.addGroup(m,M,v===!0?1:2),m+=M}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var Rn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ke("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);let h=n[s],d=n[s+1]-h,f=(a-h)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new se:new P);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new P,s=[],r=[],a=[],o=new P,c=new nt;for(let f=0;f<=e;f++){let g=f/e;s[f]=this.getTangentAt(g,new P)}r[0]=new P,a[0]=new P;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(lt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(lt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}},gr=class extends Rn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new se){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},cc=class extends gr{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Jh(){let i=0,e=0,t=0,n=0;function s(r,a,o,c){i=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,u){let d=(a-r)/l-(o-r)/(l+h)+(o-a)/h,f=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,f*=h,s(a,o,d,f)},calc:function(r){let a=r*r,o=a*r;return i+e*r+t*a+n*o}}}var Vd=new P,Wd=new P,sh=new Jh,rh=new Jh,ah=new Jh,Ai=class extends Rn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new P){let n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(Wd.subVectors(s[0],s[1]).add(s[0]),l=Wd);let u=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Vd.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Vd),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),sh.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,_,p),rh.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,_,p),ah.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,_,p)}else this.curveType==="catmullrom"&&(sh.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),rh.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),ah.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(sh.calc(c),rh.calc(c),ah.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new P().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function qd(i,e,t,n,s){let r=(n-e)*.5,a=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*i+t}function ug(i,e){let t=1-i;return t*t*e}function dg(i,e){return 2*(1-i)*i*e}function fg(i,e){return i*i*e}function ea(i,e,t,n){return ug(i,e)+dg(i,t)+fg(i,n)}function pg(i,e){let t=1-i;return t*t*t*e}function mg(i,e){let t=1-i;return 3*t*t*i*e}function gg(i,e){return 3*(1-i)*i*i*e}function bg(i,e){return i*i*i*e}function ta(i,e,t,n,s){return pg(i,e)+mg(i,t)+gg(i,n)+bg(i,s)}var va=class extends Rn{constructor(e=new se,t=new se,n=new se,s=new se){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new se){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ta(e,s.x,r.x,a.x,o.x),ta(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},lc=class extends Rn{constructor(e=new P,t=new P,n=new P,s=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new P){let n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(ta(e,s.x,r.x,a.x,o.x),ta(e,s.y,r.y,a.y,o.y),ta(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ya=class extends Rn{constructor(e=new se,t=new se){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new se){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new se){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},hc=class extends Rn{constructor(e=new P,t=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new P){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new P){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Sa=class extends Rn{constructor(e=new se,t=new se,n=new se){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new se){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ea(e,s.x,r.x,a.x),ea(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ma=class extends Rn{constructor(e=new P,t=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new P){let n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ea(e,s.x,r.x,a.x),ea(e,s.y,r.y,a.y),ea(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ta=class extends Rn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new se){let n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(qd(o,c.x,l.x,h.x,u.x),qd(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new se().fromArray(s))}return this}},uc=Object.freeze({__proto__:null,ArcCurve:cc,CatmullRomCurve3:Ai,CubicBezierCurve:va,CubicBezierCurve3:lc,EllipseCurve:gr,LineCurve:ya,LineCurve3:hc,QuadraticBezierCurve:Sa,QuadraticBezierCurve3:Ma,SplineCurve:Ta}),dc=class extends Rn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new uc[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this.cacheLengths=null,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new uc[s.type]().fromJSON(s))}return this.cacheLengths=null,this}},Ea=class extends dc{constructor(e){super(),this.type="Path",this.currentPoint=new se,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ya(this.currentPoint.clone(),new se(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new Sa(this.currentPoint.clone(),new se(e,t),new se(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){let o=new va(this.currentPoint.clone(),new se(e,t),new se(n,s),new se(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Ta(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,a,o,c),this}absellipse(e,t,n,s,r,a,o,c){let l=new gr(e,t,n,s,r,a,o,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},bs=class extends Ea{constructor(e){super(e),this.uuid=jn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new Ea().fromJSON(s))}return this}};function xg(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Xf(i,0,s,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l;if(n&&(r=Mg(i,e,r,t)),i.length>80*t){o=i[0],c=i[1];let h=o,u=c;for(let d=t;d<s;d+=t){let f=i[d],g=i[d+1];f<o&&(o=f),g<c&&(c=g),f>h&&(h=f),g>u&&(u=g)}l=Math.max(h-o,u-c),l=l!==0?32767/l:0}return wa(r,a,t,o,c,l,0),a}function Xf(i,e,t,n,s){let r;if(s===Ng(i,e,t,n)>0)for(let a=e;a<t;a+=n)r=Xd(a/n|0,i[a],i[a+1],r);else for(let a=t-n;a>=e;a-=n)r=Xd(a/n|0,i[a],i[a+1],r);return r&&br(r,r.next)&&(Ra(r),r=r.next),r}function xs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(br(t,t.next)||Lt(t.prev,t,t.next)===0)){if(Ra(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function wa(i,e,t,n,s,r,a){if(!i)return;!a&&r&&Rg(i,n,s,r);let o=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?vg(i,n,s,r):_g(i)){e.push(c.i,i.i,l.i),Ra(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=yg(xs(i),e),wa(i,e,t,n,s,r,2)):a===2&&Sg(i,e,t,n,s,r):wa(xs(i),e,t,n,s,r,1);break}}}function _g(i){let e=i.prev,t=i,n=i.next;if(Lt(e,t,n)>=0)return!1;let s=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=Math.min(s,r,a),u=Math.min(o,c,l),d=Math.max(s,r,a),f=Math.max(o,c,l),g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&Yr(s,o,r,c,a,l,g.x,g.y)&&Lt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function vg(i,e,t,n){let s=i.prev,r=i,a=i.next;if(Lt(s,r,a)>=0)return!1;let o=s.x,c=r.x,l=a.x,h=s.y,u=r.y,d=a.y,f=Math.min(o,c,l),g=Math.min(h,u,d),_=Math.max(o,c,l),p=Math.max(h,u,d),m=mh(f,g,e,t,n),b=mh(_,p,e,t,n),y=i.prevZ,v=i.nextZ;for(;y&&y.z>=m&&v&&v.z<=b;){if(y.x>=f&&y.x<=_&&y.y>=g&&y.y<=p&&y!==s&&y!==a&&Yr(o,h,c,u,l,d,y.x,y.y)&&Lt(y.prev,y,y.next)>=0||(y=y.prevZ,v.x>=f&&v.x<=_&&v.y>=g&&v.y<=p&&v!==s&&v!==a&&Yr(o,h,c,u,l,d,v.x,v.y)&&Lt(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;y&&y.z>=m;){if(y.x>=f&&y.x<=_&&y.y>=g&&y.y<=p&&y!==s&&y!==a&&Yr(o,h,c,u,l,d,y.x,y.y)&&Lt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;v&&v.z<=b;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=p&&v!==s&&v!==a&&Yr(o,h,c,u,l,d,v.x,v.y)&&Lt(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function yg(i,e){let t=i;do{let n=t.prev,s=t.next.next;!br(n,s)&&jf(n,t,t.next,s)&&Aa(n,s)&&Aa(s,n)&&(e.push(n.i,t.i,s.i),Ra(t),Ra(t.next),t=i=s),t=t.next}while(t!==i);return xs(t)}function Sg(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Ig(a,o)){let c=Jf(a,o);a=xs(a,a.next),c=xs(c,c.next),wa(a,e,t,n,s,r,0),wa(c,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Mg(i,e,t,n){let s=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,c=r<a-1?e[r+1]*n:i.length,l=Xf(i,o,c,n,!1);l===l.next&&(l.steiner=!0),s.push(Pg(l))}s.sort(Tg);for(let r=0;r<s.length;r++)t=Eg(s[r],t);return t}function Tg(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function Eg(i,e){let t=wg(i,e);if(!t)return e;let n=Jf(t,i);return xs(n,n.next),xs(t,t.next)}function wg(i,e){let t=e,n=i.x,s=i.y,r=-1/0,a;if(br(i,t))return t;do{if(br(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,a=t.x<t.next.x?t:t.next,u===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,c=a.x,l=a.y,h=1/0;t=a;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Kf(s<l?n:r,s,c,l,s<l?r:n,s,t.x,t.y)){let u=Math.abs(s-t.y)/(n-t.x);Aa(t,i)&&(u<h||u===h&&(t.x>a.x||t.x===a.x&&Ag(a,t)))&&(a=t,h=u)}t=t.next}while(t!==o);return a}function Ag(i,e){return Lt(i.prev,i,e.prev)<0&&Lt(e.next,i,i.next)<0}function Rg(i,e,t,n){let s=i;do s.z===0&&(s.z=mh(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Cg(s)}function Cg(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let l=0;l<t&&(o++,a=a.nextZ,!!a);l++);let c=t;for(;o>0||c>0&&a;)o!==0&&(c===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,t*=2}while(e>1);return i}function mh(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Pg(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Kf(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function Yr(i,e,t,n,s,r,a,o){return!(i===a&&e===o)&&Kf(i,e,t,n,s,r,a,o)}function Ig(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Lg(i,e)&&(Aa(i,e)&&Aa(e,i)&&Dg(i,e)&&(Lt(i.prev,i,e.prev)||Lt(i,e.prev,e))||br(i,e)&&Lt(i.prev,i,i.next)>0&&Lt(e.prev,e,e.next)>0)}function Lt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function br(i,e){return i.x===e.x&&i.y===e.y}function jf(i,e,t,n){let s=Wo(Lt(i,e,t)),r=Wo(Lt(i,e,n)),a=Wo(Lt(t,n,i)),o=Wo(Lt(t,n,e));return!!(s!==r&&a!==o||s===0&&Vo(i,t,e)||r===0&&Vo(i,n,e)||a===0&&Vo(t,i,n)||o===0&&Vo(t,e,n))}function Vo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Wo(i){return i>0?1:i<0?-1:0}function Lg(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&jf(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Aa(i,e){return Lt(i.prev,i,i.next)<0?Lt(i,e,i.next)>=0&&Lt(i,i.prev,e)>=0:Lt(i,e,i.prev)<0||Lt(i,i.next,e)<0}function Dg(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Jf(i,e){let t=gh(i.i,i.x,i.y),n=gh(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Xd(i,e,t,n){let s=gh(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Ra(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function gh(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Ng(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var bh=class{static triangulate(e,t,n=2){return xg(e,t,n)}},ls=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];Kd(e),jd(n,e);let a=e.length;t.forEach(Kd);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,jd(n,t[c]);let o=bh.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function Kd(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function jd(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}var Ca=class i extends Ct{constructor(e=new bs([new se(.5,.5),new se(-.5,.5),new se(-.5,-.5),new se(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let o=0,c=e.length;o<c;o++){let l=e[o];a(l)}this.setAttribute("position",new dt(s,3)),this.setAttribute("uv",new dt(r,2)),this.computeVertexNormals();function a(o){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,b=t.UVGenerator!==void 0?t.UVGenerator:Fg,y,v=!1,E,w,x,M;if(m){y=m.getSpacedPoints(h),v=!0,d=!1;let W=m.isCatmullRomCurve3?m.closed:!1;E=m.computeFrenetFrames(h,W),w=new P,x=new P,M=new P}d||(p=0,f=0,g=0,_=0);let I=o.extractPoints(l),R=I.shape,D=I.holes;if(!ls.isClockWise(R)){R=R.reverse();for(let W=0,ie=D.length;W<ie;W++){let re=D[W];ls.isClockWise(re)&&(D[W]=re.reverse())}}function V(W){let re=10000000000000001e-36,Ee=W[0];for(let ce=1;ce<=W.length;ce++){let ke=ce%W.length,_e=W[ke],je=_e.x-Ee.x,Ge=_e.y-Ee.y,Qe=je*je+Ge*Ge,F=Math.max(Math.abs(_e.x),Math.abs(_e.y),Math.abs(Ee.x),Math.abs(Ee.y)),At=re*F*F;if(Qe<=At){W.splice(ke,1),ce--;continue}Ee=_e}}V(R),D.forEach(V);let L=D.length,H=R;for(let W=0;W<L;W++){let ie=D[W];R=R.concat(ie)}function X(W,ie,re){return ie||et("ExtrudeGeometry: vec does not exist"),W.clone().addScaledVector(ie,re)}let G=R.length;function ne(W,ie,re){let Ee,ce,ke,_e=W.x-ie.x,je=W.y-ie.y,Ge=re.x-W.x,Qe=re.y-W.y,F=_e*_e+je*je,At=_e*Qe-je*Ge;if(Math.abs(At)>Number.EPSILON){let Ie=Math.sqrt(F),pt=Math.sqrt(Ge*Ge+Qe*Qe),me=ie.x-je/Ie,tt=ie.y+_e/Ie,Ye=re.x-Qe/pt,$e=re.y+Ge/pt,A=((Ye-me)*Qe-($e-tt)*Ge)/(_e*Qe-je*Ge);Ee=me+_e*A-W.x,ce=tt+je*A-W.y;let S=Ee*Ee+ce*ce;if(S<=2)return new se(Ee,ce);ke=Math.sqrt(S/2)}else{let Ie=!1;_e>Number.EPSILON?Ge>Number.EPSILON&&(Ie=!0):_e<-Number.EPSILON?Ge<-Number.EPSILON&&(Ie=!0):Math.sign(je)===Math.sign(Qe)&&(Ie=!0),Ie?(Ee=-je,ce=_e,ke=Math.sqrt(F)):(Ee=_e,ce=je,ke=Math.sqrt(F/2))}return new se(Ee/ke,ce/ke)}let K=[];for(let W=0,ie=H.length,re=ie-1,Ee=W+1;W<ie;W++,re++,Ee++)re===ie&&(re=0),Ee===ie&&(Ee=0),K[W]=ne(H[W],H[re],H[Ee]);let ee=[],O,Fe=K.concat();for(let W=0,ie=L;W<ie;W++){let re=D[W];O=[];for(let Ee=0,ce=re.length,ke=ce-1,_e=Ee+1;Ee<ce;Ee++,ke++,_e++)ke===ce&&(ke=0),_e===ce&&(_e=0),O[Ee]=ne(re[Ee],re[ke],re[_e]);ee.push(O),Fe=Fe.concat(O)}let qe;if(p===0)qe=ls.triangulateShape(H,D);else{let W=[],ie=[];for(let re=0;re<p;re++){let Ee=re/p,ce=f*Math.cos(Ee*Math.PI/2),ke=g*Math.sin(Ee*Math.PI/2)+_;for(let _e=0,je=H.length;_e<je;_e++){let Ge=X(H[_e],K[_e],ke);We(Ge.x,Ge.y,-ce),Ee===0&&W.push(Ge)}for(let _e=0,je=L;_e<je;_e++){let Ge=D[_e];O=ee[_e];let Qe=[];for(let F=0,At=Ge.length;F<At;F++){let Ie=X(Ge[F],O[F],ke);We(Ie.x,Ie.y,-ce),Ee===0&&Qe.push(Ie)}Ee===0&&ie.push(Qe)}}qe=ls.triangulateShape(W,ie)}let J=qe.length,ye=g+_;for(let W=0;W<G;W++){let ie=d?X(R[W],Fe[W],ye):R[W];v?(x.copy(E.normals[0]).multiplyScalar(ie.x),w.copy(E.binormals[0]).multiplyScalar(ie.y),M.copy(y[0]).add(x).add(w),We(M.x,M.y,M.z)):We(ie.x,ie.y,0)}for(let W=1;W<=h;W++)for(let ie=0;ie<G;ie++){let re=d?X(R[ie],Fe[ie],ye):R[ie];v?(x.copy(E.normals[W]).multiplyScalar(re.x),w.copy(E.binormals[W]).multiplyScalar(re.y),M.copy(y[W]).add(x).add(w),We(M.x,M.y,M.z)):We(re.x,re.y,u/h*W)}for(let W=p-1;W>=0;W--){let ie=W/p,re=f*Math.cos(ie*Math.PI/2),Ee=g*Math.sin(ie*Math.PI/2)+_;for(let ce=0,ke=H.length;ce<ke;ce++){let _e=X(H[ce],K[ce],Ee);We(_e.x,_e.y,u+re)}for(let ce=0,ke=D.length;ce<ke;ce++){let _e=D[ce];O=ee[ce];for(let je=0,Ge=_e.length;je<Ge;je++){let Qe=X(_e[je],O[je],Ee);v?We(Qe.x,Qe.y+y[h-1].y,y[h-1].x+re):We(Qe.x,Qe.y,u+re)}}}Ne(),Oe();function Ne(){let W=s.length/3;if(d){let ie=0,re=G*ie;for(let Ee=0;Ee<J;Ee++){let ce=qe[Ee];Ae(ce[2]+re,ce[1]+re,ce[0]+re)}ie=h+p*2,re=G*ie;for(let Ee=0;Ee<J;Ee++){let ce=qe[Ee];Ae(ce[0]+re,ce[1]+re,ce[2]+re)}}else{for(let ie=0;ie<J;ie++){let re=qe[ie];Ae(re[2],re[1],re[0])}for(let ie=0;ie<J;ie++){let re=qe[ie];Ae(re[0]+G*h,re[1]+G*h,re[2]+G*h)}}n.addGroup(W,s.length/3-W,0)}function Oe(){let W=s.length/3,ie=0;Se(H,ie),ie+=H.length;for(let re=0,Ee=D.length;re<Ee;re++){let ce=D[re];Se(ce,ie),ie+=ce.length}n.addGroup(W,s.length/3-W,1)}function Se(W,ie){let re=W.length;for(;--re>=0;){let Ee=re,ce=re-1;ce<0&&(ce=W.length-1);for(let ke=0,_e=h+p*2;ke<_e;ke++){let je=G*ke,Ge=G*(ke+1),Qe=ie+Ee+je,F=ie+ce+je,At=ie+ce+Ge,Ie=ie+Ee+Ge;te(Qe,F,At,Ie)}}}function We(W,ie,re){c.push(W),c.push(ie),c.push(re)}function Ae(W,ie,re){Me(W),Me(ie),Me(re);let Ee=s.length/3,ce=b.generateTopUV(n,s,Ee-3,Ee-2,Ee-1);Te(ce[0]),Te(ce[1]),Te(ce[2])}function te(W,ie,re,Ee){Me(W),Me(ie),Me(Ee),Me(ie),Me(re),Me(Ee);let ce=s.length/3,ke=b.generateSideWallUV(n,s,ce-6,ce-3,ce-2,ce-1);Te(ke[0]),Te(ke[1]),Te(ke[3]),Te(ke[1]),Te(ke[2]),Te(ke[3])}function Me(W){s.push(c[W*3+0]),s.push(c[W*3+1]),s.push(c[W*3+2])}function Te(W){r.push(W.x),r.push(W.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Ug(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new uc[s.type]().fromJSON(s)),new i(n,e.options)}},Fg={generateTopUV:function(i,e,t,n,s){let r=e[t*3],a=e[t*3+1],o=e[n*3],c=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new se(r,a),new se(o,c),new se(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){let a=e[t*3],o=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[s*3],f=e[s*3+1],g=e[s*3+2],_=e[r*3],p=e[r*3+1],m=e[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new se(a,1-c),new se(l,1-u),new se(d,1-g),new se(_,1-m)]:[new se(o,1-c),new se(h,1-u),new se(f,1-g),new se(p,1-m)]}};function Ug(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var _s=class i extends Ct{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,u=e/o,d=t/c,f=[],g=[],_=[],p=[];for(let m=0;m<h;m++){let b=m*d-a;for(let y=0;y<l;y++){let v=y*u-r;g.push(v,-b,0),_.push(0,0,1),p.push(y/o),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let b=0;b<o;b++){let y=b+l*m,v=b+l*(m+1),E=b+1+l*(m+1),w=b+1+l*m;f.push(y,v,w),f.push(v,E,w)}this.setIndex(f),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(_,3)),this.setAttribute("uv",new dt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}};var ti=class i extends Ct{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,h=[],u=new P,d=new P,f=[],g=[],_=[],p=[];for(let m=0;m<=n;m++){let b=[],y=m/n,v=a+y*o,E=e*Math.cos(v),w=Math.sqrt(e*e-E*E),x=0;m===0&&a===0?x=.5/t:m===n&&c===Math.PI&&(x=-.5/t);for(let M=0;M<=t;M++){let I=M/t,R=s+I*r;u.x=-w*Math.cos(R),u.y=E,u.z=w*Math.sin(R),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),p.push(I+x,1-y),b.push(l++)}h.push(b)}for(let m=0;m<n;m++)for(let b=0;b<t;b++){let y=h[m][b+1],v=h[m][b],E=h[m+1][b],w=h[m+1][b+1];(m!==0||a>0)&&f.push(y,v,w),(m!==n-1||c<Math.PI)&&f.push(v,E,w)}this.setIndex(f),this.setAttribute("position",new dt(g,3)),this.setAttribute("normal",new dt(_,3)),this.setAttribute("uv",new dt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var Pa=class i extends Ct{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);let c=[],l=[],h=[],u=[],d=new P,f=new P,g=new P;for(let _=0;_<=n;_++){let p=a+_/n*o;for(let m=0;m<=s;m++){let b=m/s*r;f.x=(e+t*Math.cos(p))*Math.cos(b),f.y=(e+t*Math.cos(p))*Math.sin(b),f.z=t*Math.sin(p),l.push(f.x,f.y,f.z),d.x=e*Math.cos(b),d.y=e*Math.sin(b),g.subVectors(f,d).normalize(),h.push(g.x,g.y,g.z),u.push(m/s),u.push(_/n)}}for(let _=1;_<=n;_++)for(let p=1;p<=s;p++){let m=(s+1)*_+p-1,b=(s+1)*(_-1)+p-1,y=(s+1)*(_-1)+p,v=(s+1)*_+p;c.push(m,b,v),c.push(b,y,v)}this.setIndex(c),this.setAttribute("position",new dt(l,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}};var Qi=class i extends Ct{constructor(e=new Ma(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new P,c=new P,l=new se,h=new P,u=[],d=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new dt(u,3)),this.setAttribute("normal",new dt(d,3)),this.setAttribute("uv",new dt(f,2));function _(){for(let y=0;y<t;y++)p(y);p(r===!1?t:0),b(),m()}function p(y){h=e.getPointAt(y/t,h);let v=a.normals[y],E=a.binormals[y];for(let w=0;w<=s;w++){let x=w/s*Math.PI*2,M=Math.sin(x),I=-Math.cos(x);c.x=I*v.x+M*E.x,c.y=I*v.y+M*E.y,c.z=I*v.z+M*E.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}function m(){for(let y=1;y<=t;y++)for(let v=1;v<=s;v++){let E=(s+1)*(y-1)+(v-1),w=(s+1)*y+(v-1),x=(s+1)*y+v,M=(s+1)*(y-1)+v;g.push(E,w,M),g.push(w,x,M)}}function b(){for(let y=0;y<=t;y++)for(let v=0;v<=s;v++)l.x=y/t,l.y=v/s,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new uc[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};function Ps(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Jd(s))s.isRenderTargetTexture?(Ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Jd(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function hn(i){let e={};for(let t=0;t<i.length;t++){let n=Ps(i[t]);for(let s in n)e[s]=n[s]}return e}function Jd(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Og(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Yh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ot.workingColorSpace}var Rr={clone:Ps,merge:hn},kg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Wt=class extends ln{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=kg,this.fragmentShader=Bg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ps(e.uniforms),this.uniformsGroups=Og(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new De().setHex(s.value);break;case"v2":this.uniforms[n].value=new se().fromArray(s.value);break;case"v3":this.uniforms[n].value=new P().fromArray(s.value);break;case"v4":this.uniforms[n].value=new St().fromArray(s.value);break;case"m3":this.uniforms[n].value=new it().fromArray(s.value);break;case"m4":this.uniforms[n].value=new nt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},xr=class extends Wt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},vs=class extends ln{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new De(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$a,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},mn=class extends vs{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new se(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return lt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new De(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new De(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new De(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return hs('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){hs('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var ni=class extends ln{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new De(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new De(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$a,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var fc=class extends ln{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Lf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},pc=class extends ln{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ki(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Zr(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function zg(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Yd(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=i[o+c]}return s}function Gg(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var ii=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},mc=class extends ii{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:uh,endingEnd:uh}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case dh:r=e,o=2*t-n;break;case fh:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case dh:a=e,c=2*n-t;break;case fh:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),_=g*g,p=_*g,m=-d*p+2*d*_-d*g,b=(1+d)*p+(-1.5-2*d)*_+(-.5+d)*g+1,y=(-1-f)*p+(1.5+f)*_+.5*g,v=f*p-f*_;for(let E=0;E!==o;++E)r[E]=m*a[h+E]+b*a[l+E]+y*a[c+E]+v*a[u+E];return r}},gc=class extends ii{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[l+d]*u+a[c+d]*h;return r}},bc=class extends ii{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},xc=class extends ii{interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,u=this.outTangents;if(!h||!u){let g=(n-t)/(s-t),_=1-g;for(let p=0;p!==o;++p)r[p]=a[l+p]*_+a[c+p]*g;return r}let d=o*2,f=e-1;for(let g=0;g!==o;++g){let _=a[l+g],p=a[c+g],m=f*d+g*2,b=u[m],y=u[m+1],v=e*d+g*2,E=h[v],w=h[v+1],x=Vg(n,t,b,E,s);r[g]=Yf(x,_,y,w,p)}return r}};function Yf(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Hg(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Vg(i,e,t,n,s){let r=(i-e)/(s-e);for(let a=0;a<8;a++){let o=Yf(r,e,t,n,s)-i;if(Math.abs(o)<1e-10)break;let c=Hg(r,e,t,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-o/c))}return r}var Sn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ki(t,this.TimeBufferType),this.values=Ki(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ki(e.times,Array),values:Ki(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Zr(e.settings)&&(n.settings={inTangents:Ki(e.settings.inTangents,Array),outTangents:Ki(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new bc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new gc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new mc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new xc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case us:t=this.InterpolantFactoryMethodDiscrete;break;case ds:t=this.InterpolantFactoryMethodLinear;break;case Ko:t=this.InterpolantFactoryMethodSmooth;break;case hh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ke("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return us;case this.InterpolantFactoryMethodLinear:return ds;case this.InterpolantFactoryMethodSmooth:return Ko;case this.InterpolantFactoryMethodBezier:return hh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e;Zr(this.settings)&&(Zd(this.settings.inTangents,e),Zd(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Zr(this.settings)&&($d(this.settings.inTangents,e),$d(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(et("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(et("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){et("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){et("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&Rm(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){et("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Ko,r=e.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(s)c=!0;else{let u=o*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){let _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];let u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Zr(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Zd(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]+=e}function $d(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}Sn.prototype.ValueTypeName="";Sn.prototype.TimeBufferType=Float32Array;Sn.prototype.ValueBufferType=Float32Array;Sn.prototype.DefaultInterpolation=ds;var Ri=class extends Sn{constructor(e,t,n){super(e,t,n)}};Ri.prototype.ValueTypeName="bool";Ri.prototype.ValueBufferType=Array;Ri.prototype.DefaultInterpolation=us;Ri.prototype.InterpolantFactoryMethodLinear=void 0;Ri.prototype.InterpolantFactoryMethodSmooth=void 0;var Ia=class extends Sn{constructor(e,t,n,s){super(e,t,n,s)}};Ia.prototype.ValueTypeName="color";var Ci=class extends Sn{constructor(e,t,n,s){super(e,t,n,s)}};Ci.prototype.ValueTypeName="number";var _c=class extends ii{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t),l=e*o;for(let h=l+o;l!==h;l+=4)on.slerpFlat(r,0,a,l-o,a,l,c);return r}},Pi=class extends Sn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new _c(this.times,this.values,this.getValueSize(),e)}};Pi.prototype.ValueTypeName="quaternion";Pi.prototype.InterpolantFactoryMethodSmooth=void 0;var Ii=class extends Sn{constructor(e,t,n){super(e,t,n)}};Ii.prototype.ValueTypeName="string";Ii.prototype.ValueBufferType=Array;Ii.prototype.DefaultInterpolation=us;Ii.prototype.InterpolantFactoryMethodLinear=void 0;Ii.prototype.InterpolantFactoryMethodSmooth=void 0;var es=class extends Sn{constructor(e,t,n,s){super(e,t,n,s)}};es.prototype.ValueTypeName="vector";var La=class{constructor(e="",t=-1,n=[],s=If){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=jn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(qg(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(Sn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);let h=zg(c);c=Yd(c,1,h),l=Yd(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Ci(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){let l=e[o],h=l.name.match(r);if(h&&h.length>1){let u=h[1],d=s[u];d||(s[u]=d=[]),d.push(l)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Wg(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ci;case"vector":case"vector2":case"vector3":case"vector4":return es;case"color":return Ia;case"quaternion":return Pi;case"bool":case"boolean":return Ri;case"string":return Ii}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function qg(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Wg(i.type);if(i.times===void 0){let n=[],s=[];Gg(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),Zr(i.settings)&&(t.settings={inTangents:Ki(i.settings.inTangents,Float32Array),outTangents:Ki(i.settings.outTangents,Float32Array)}),t}var $n={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Qd(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Qd(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Qd(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var vc=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Zf=new vc,si=class{constructor(e){this.manager=e!==void 0?e:Zf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};si.DEFAULT_MATERIAL_NAME="__DEFAULT";var vi={},xh=class extends Error{constructor(e,t){super(e),this.response=t}},_r=class extends si{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=$n.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(vi[e]!==void 0){vi[e].push({onLoad:t,onProgress:n,onError:s});return}vi[e]=[],vi[e].push({onLoad:t,onProgress:n,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",priority:this.priority,cache:this.cache,signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ke("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=vi[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0,_=0,p=new ReadableStream({start(m){b();function b(){u.read().then(({done:y,value:v})=>{if(y)m.close();else{_+=v.byteLength;let E=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let w=0,x=h.length;w<x;w++){let M=h[w];M.onProgress&&M.onProgress(E)}m.enqueue(v),b()}},y=>{m.error(y)})}}});return new Response(p)}else throw new xh(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{$n.add(`file:${e}`,l);let h=vi[e];delete vi[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{let h=vi[e];if(h===void 0)throw this.manager.itemError(e),l;delete vi[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var er=new WeakMap,yc=class extends si{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=$n.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let u=er.get(a);u===void 0&&(u=[],er.set(a,u)),u.push({onLoad:t,onError:s})}return a}let o=or("img");function c(){h(),t&&t(this);let u=er.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}er.delete(this),r.manager.itemEnd(e)}function l(u){h(),s&&s(u),$n.remove(`image:${e}`);let d=er.get(this)||[];for(let f=0;f<d.length;f++){let g=d[f];g.onError&&g.onError(u)}er.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),$n.add(`image:${e}`,o),r.manager.itemStart(e),o.fetchPriority=this.priority,o.src=e,o}};var ys=class extends si{constructor(e){super(e)}load(e,t,n,s){let r=new Gt,a=new yc(this.manager);return a.setPriority(this.priority),a.setCache(this.cache),a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},Ss=class extends Rt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new De(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Da=class extends Ss{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new De(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},oh=new nt,ef=new P,tf=new P,vr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new se(512,512),this.mapType=Mn,this.map=null,this.mapPass=null,this.matrix=new nt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $i,this._frameExtents=new se(1,1),this._viewportCount=1,this._viewports=[new St(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;ef.setFromMatrixPosition(e.matrixWorld),t.position.copy(ef),tf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(tf),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){oh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(oh,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===ar||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(oh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},qo=new P,Xo=new on,Zn=new P,Na=class extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nt,this.projectionMatrix=new nt,this.projectionMatrixInverse=new nt,this.coordinateSystem=Fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(qo,Xo,Zn),Zn.x===1&&Zn.y===1&&Zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qo,Xo,Zn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(qo,Xo,Zn),Zn.x===1&&Zn.y===1&&Zn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qo,Xo,Zn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Xi=new P,nf=new se,sf=new se,Vt=class extends Na{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=fs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan($r*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return fs*2*Math.atan(Math.tan($r*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z),Xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z)}getViewSize(e,t){return this.getViewBounds(e,nf,sf),t.subVectors(sf,nf)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan($r*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},_h=class extends vr{constructor(){super(new Vt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=fs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Fa=class extends Ss{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new _h}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},vh=class extends vr{constructor(){super(new Vt(90,1,.5,500)),this.isPointLightShadow=!0}},Li=class extends Ss{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new vh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Di=class extends Na{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},yh=class extends vr{constructor(){super(new Di(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ms=class extends Ss{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.shadow=new yh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var Ni=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var ch=new WeakMap,Ua=class extends si{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ke("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ke("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=$n.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{ch.has(a)===!0?(s&&s(ch.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.withCredentials||this.crossOrigin!=="anonymous"?"include":"same-origin",o.headers=this.requestHeader,o.priority=this.priority,o.cache=this.cache,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return $n.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),ch.set(c,l),$n.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});$n.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}};var tr=-90,nr=1,yr=class extends Rt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Vt(tr,nr,e,t);s.layers=this.layers,this.add(s);let r=new Vt(tr,nr,e,t);r.layers=this.layers,this.add(r);let a=new Vt(tr,nr,e,t);a.layers=this.layers,this.add(a);let o=new Vt(tr,nr,e,t);o.layers=this.layers,this.add(o);let c=new Vt(tr,nr,e,t);c.layers=this.layers,this.add(c);let l=new Vt(tr,nr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(let l of t)this.remove(l);if(e===Fn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ar)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.mipmapsAutoUpdate=_,e.setRenderTarget(n,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Sc=class extends Vt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},Ts=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Xg.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Xg(){this._document.hidden===!1&&this.reset()}var Zh="\\[\\]\\.:\\/",Kg=new RegExp("["+Zh+"]","g"),$h="[^"+Zh+"]",jg="[^"+Zh.replace("\\.","")+"]",Jg=/((?:WC+[\/:])*)/.source.replace("WC",$h),Yg=/(WCOD+)?/.source.replace("WCOD",jg),Zg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",$h),$g=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",$h),Qg=new RegExp("^"+Jg+Yg+Zg+$g+"$"),e0=["material","materials","bones","map"],Sh=class{constructor(e,t,n){let s=n||Tt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Tt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Kg,"")}static parseTrackName(e){let t=Qg.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);e0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ke("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){et("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){et("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){et("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){et("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){et("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){et("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){et("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let a=e[s];if(a===void 0){let l=t.nodeName;et("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){et("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){et("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Tt.Composite=Sh;Tt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Tt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Tt.prototype.GetterByBindingType=[Tt.prototype._getValue_direct,Tt.prototype._getValue_array,Tt.prototype._getValue_arrayElement,Tt.prototype._getValue_toArray];Tt.prototype.SetterByBindingTypeAndVersioning=[[Tt.prototype._setValue_direct,Tt.prototype._setValue_direct_setNeedsUpdate,Tt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_array,Tt.prototype._setValue_array_setNeedsUpdate,Tt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_arrayElement,Tt.prototype._setValue_arrayElement_setNeedsUpdate,Tt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_fromArray,Tt.prototype._setValue_fromArray_setNeedsUpdate,Tt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ty=new Float32Array(1);var rf=new nt,Oa=class{constructor(e,t,n=0,s=1/0){this.ray=new Yi(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new hr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):et("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return rf.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(rf),this}intersectObject(e,t=!0,n=[]){return Mh(e,this,n,t),n.sort(af),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Mh(e[s],this,n,t);return n.sort(af),n}};function af(i,e){return i.distance-e.distance}function Mh(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)Mh(r[a],e,t,!0)}}var su=class su{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};su.prototype.isMatrix2=!0;var Th=su;function Qh(i,e,t,n){let s=t0(n);switch(t){case Oh:return i*e;case Pc:return i*e/s.components*s.byteLength;case Ic:return i*e/s.components*s.byteLength;case ts:return i*e*2/s.components*s.byteLength;case Lc:return i*e*2/s.components*s.byteLength;case kh:return i*e*3/s.components*s.byteLength;case Tn:return i*e*4/s.components*s.byteLength;case Dc:return i*e*4/s.components*s.byteLength;case qa:case Xa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ka:case ja:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Fc:case Oc:return Math.max(i,16)*Math.max(e,8)/4;case Nc:case Uc:return Math.max(i,8)*Math.max(e,8)/2;case kc:case Bc:case Gc:case Hc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case zc:case Ja:case Vc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Wc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case qc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Xc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Kc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case jc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Jc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Yc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Zc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case $c:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Qc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case el:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case tl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case nl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case il:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case sl:case rl:case al:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ol:case cl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ya:case ll:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function t0(i){switch(i){case Mn:case Dh:return{byteLength:1,components:1};case wr:case Nh:case bn:return{byteLength:2,components:1};case Rc:case Cc:return{byteLength:2,components:4};case Cn:case Ac:case Pn:return{byteLength:4,components:1};case Fh:case Uh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function _p(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function i0(i){let e=new WeakMap;function t(o,c){let l=o.array,h=o.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){let h=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let _=u[f];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var s0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,r0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,a0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,o0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,c0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,l0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,h0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,u0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,d0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,f0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,p0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,m0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,g0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,b0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,x0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,_0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,v0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,y0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,S0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,M0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,T0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,E0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,w0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,A0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,R0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,C0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,P0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,I0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,L0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,D0="gl_FragColor = linearToOutputTexel( gl_FragColor );",N0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,F0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,U0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,O0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,k0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,B0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,z0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,G0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,H0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,V0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,W0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,q0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,X0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,K0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,j0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,J0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Y0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Z0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Q0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,eb=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,tb=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,nb=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ib=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,sb=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rb=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,ab=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ob=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lb=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hb=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ub=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,db=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,fb=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pb=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mb=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gb=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bb=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xb=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_b=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,vb=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yb=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Sb=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Mb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tb=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Eb=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,wb=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ab=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Rb=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Cb=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Pb=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ib=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Lb=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Db=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Nb=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Fb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ub=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ob=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,kb=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bb=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,zb=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Gb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Hb=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Vb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Wb=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,qb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xb=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Kb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Jb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Yb=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zb=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,$b=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Qb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ex=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,nx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,ix=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ax=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ox=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,hx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ux=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,dx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,fx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,px=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,xx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_x=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Sx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Tx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ex=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ax=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Rx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Px=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ix=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Lx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Dx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Fx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ux=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ct={alphahash_fragment:s0,alphahash_pars_fragment:r0,alphamap_fragment:a0,alphamap_pars_fragment:o0,alphatest_fragment:c0,alphatest_pars_fragment:l0,aomap_fragment:h0,aomap_pars_fragment:u0,batching_pars_vertex:d0,batching_vertex:f0,begin_vertex:p0,beginnormal_vertex:m0,bsdfs:g0,iridescence_fragment:b0,bumpmap_pars_fragment:x0,clipping_planes_fragment:_0,clipping_planes_pars_fragment:v0,clipping_planes_pars_vertex:y0,clipping_planes_vertex:S0,color_fragment:M0,color_pars_fragment:T0,color_pars_vertex:E0,color_vertex:w0,common:A0,defaultnormal_vertex:R0,displacementmap_pars_vertex:C0,displacementmap_vertex:P0,emissivemap_fragment:I0,emissivemap_pars_fragment:L0,colorspace_fragment:D0,colorspace_pars_fragment:N0,envmap_fragment:F0,envmap_common_pars_fragment:U0,envmap_pars_fragment:O0,envmap_pars_vertex:k0,envmap_physical_pars_fragment:J0,envmap_vertex:B0,fog_vertex:z0,fog_pars_vertex:G0,fog_fragment:H0,fog_pars_fragment:V0,gradientmap_pars_fragment:W0,lightmap_pars_fragment:q0,lights_lambert_fragment:X0,lights_lambert_pars_fragment:K0,lights_pars_begin:j0,lights_toon_fragment:Y0,lights_toon_pars_fragment:Z0,lights_phong_fragment:$0,lights_phong_pars_fragment:Q0,lights_physical_fragment:eb,lights_physical_pars_fragment:tb,lights_fragment_begin:nb,lights_fragment_maps:ib,lights_fragment_end:sb,lightprobes_pars_fragment:rb,logdepthbuf_fragment:ab,logdepthbuf_pars_fragment:ob,logdepthbuf_pars_vertex:cb,logdepthbuf_vertex:lb,map_fragment:hb,map_pars_fragment:ub,map_particle_fragment:db,map_particle_pars_fragment:fb,metalnessmap_fragment:pb,metalnessmap_pars_fragment:mb,morphinstance_vertex:gb,morphcolor_vertex:bb,morphnormal_vertex:xb,morphtarget_pars_vertex:_b,morphtarget_vertex:vb,normal_fragment_begin:yb,normal_fragment_maps:Sb,normal_pars_fragment:Mb,normal_pars_vertex:Tb,normal_vertex:Eb,normalmap_pars_fragment:wb,clearcoat_normal_fragment_begin:Ab,clearcoat_normal_fragment_maps:Rb,clearcoat_pars_fragment:Cb,iridescence_pars_fragment:Pb,opaque_fragment:Ib,packing:Lb,premultiplied_alpha_fragment:Db,project_vertex:Nb,dithering_fragment:Fb,dithering_pars_fragment:Ub,roughnessmap_fragment:Ob,roughnessmap_pars_fragment:kb,shadowmap_pars_fragment:Bb,shadowmap_pars_vertex:zb,shadowmap_vertex:Gb,shadowmask_pars_fragment:Hb,skinbase_vertex:Vb,skinning_pars_vertex:Wb,skinning_vertex:qb,skinnormal_vertex:Xb,specularmap_fragment:Kb,specularmap_pars_fragment:jb,tonemapping_fragment:Jb,tonemapping_pars_fragment:Yb,transmission_fragment:Zb,transmission_pars_fragment:$b,uv_pars_fragment:Qb,uv_pars_vertex:ex,uv_vertex:tx,worldpos_vertex:nx,background_vert:ix,background_frag:sx,backgroundCube_vert:rx,backgroundCube_frag:ax,cube_vert:ox,cube_frag:cx,depth_vert:lx,depth_frag:hx,distance_vert:ux,distance_frag:dx,equirect_vert:fx,equirect_frag:px,linedashed_vert:mx,linedashed_frag:gx,meshbasic_vert:bx,meshbasic_frag:xx,meshlambert_vert:_x,meshlambert_frag:vx,meshmatcap_vert:yx,meshmatcap_frag:Sx,meshnormal_vert:Mx,meshnormal_frag:Tx,meshphong_vert:Ex,meshphong_frag:wx,meshphysical_vert:Ax,meshphysical_frag:Rx,meshtoon_vert:Cx,meshtoon_frag:Px,points_vert:Ix,points_frag:Lx,shadow_vert:Dx,shadow_frag:Nx,sprite_vert:Fx,sprite_frag:Ux},Pe={common:{diffuse:{value:new De(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new it}},envmap:{envMap:{value:null},envMapRotation:{value:new it},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new it}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new it}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new it},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new it},normalScale:{value:new se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new it},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new it}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new it}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new it}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new De(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new De(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0},uvTransform:{value:new it}},sprite:{diffuse:{value:new De(16777215)},opacity:{value:1},center:{value:new se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new it},alphaMap:{value:null},alphaMapTransform:{value:new it},alphaTest:{value:0}}},ci={basic:{uniforms:hn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:ct.meshbasic_vert,fragmentShader:ct.meshbasic_frag},lambert:{uniforms:hn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new De(0)},envMapIntensity:{value:1}}]),vertexShader:ct.meshlambert_vert,fragmentShader:ct.meshlambert_frag},phong:{uniforms:hn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new De(0)},specular:{value:new De(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ct.meshphong_vert,fragmentShader:ct.meshphong_frag},standard:{uniforms:hn([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new De(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag},toon:{uniforms:hn([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new De(0)}}]),vertexShader:ct.meshtoon_vert,fragmentShader:ct.meshtoon_frag},matcap:{uniforms:hn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:ct.meshmatcap_vert,fragmentShader:ct.meshmatcap_frag},points:{uniforms:hn([Pe.points,Pe.fog]),vertexShader:ct.points_vert,fragmentShader:ct.points_frag},dashed:{uniforms:hn([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ct.linedashed_vert,fragmentShader:ct.linedashed_frag},depth:{uniforms:hn([Pe.common,Pe.displacementmap]),vertexShader:ct.depth_vert,fragmentShader:ct.depth_frag},normal:{uniforms:hn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:ct.meshnormal_vert,fragmentShader:ct.meshnormal_frag},sprite:{uniforms:hn([Pe.sprite,Pe.fog]),vertexShader:ct.sprite_vert,fragmentShader:ct.sprite_frag},background:{uniforms:{uvTransform:{value:new it},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ct.background_vert,fragmentShader:ct.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new it}},vertexShader:ct.backgroundCube_vert,fragmentShader:ct.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ct.cube_vert,fragmentShader:ct.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ct.equirect_vert,fragmentShader:ct.equirect_frag},distance:{uniforms:hn([Pe.common,Pe.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ct.distance_vert,fragmentShader:ct.distance_frag},shadow:{uniforms:hn([Pe.lights,Pe.fog,{color:{value:new De(0)},opacity:{value:1}}]),vertexShader:ct.shadow_vert,fragmentShader:ct.shadow_frag}};ci.physical={uniforms:hn([ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new it},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new it},clearcoatNormalScale:{value:new se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new it},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new it},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new it},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new it},sheen:{value:0},sheenColor:{value:new De(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new it},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new it},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new it},transmissionSamplerSize:{value:new se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new it},attenuationDistance:{value:0},attenuationColor:{value:new De(0)},specularColor:{value:new De(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new it},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new it},anisotropyVector:{value:new se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new it}}]),vertexShader:ct.meshphysical_vert,fragmentShader:ct.meshphysical_frag};var ul={r:0,b:0,g:0},Ox=new nt,vp=new it;vp.set(-1,0,0,0,1,0,0,0,1);function kx(i,e,t,n,s,r){let a=new De(0),o=s===!0?0:1,c,l,h=null,u=0,d=null;function f(b){let y=b.isScene===!0?b.background:null;if(y&&y.isTexture){let v=b.backgroundBlurriness>0;y=e.get(y,v)}return y}function g(b){let y=!1,v=f(b);v===null?p(a,o):v&&v.isColor&&(p(v,1),y=!0);let E=i.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||y)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(b,y){let v=f(y);v&&v.isCubeTexture?(l===void 0&&(l=new Pt(new mr(1,1,1),new Wt({name:"BackgroundCubeMaterial",uniforms:Ps(ci.backgroundCube.uniforms),vertexShader:ci.backgroundCube.vertexShader,fragmentShader:ci.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,w,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=v,l.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Ox.makeRotationFromEuler(y.backgroundRotation)).transpose(),v.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(vp),l.material.toneMapped=ot.getTransfer(v.colorSpace)!==xt,(h!==v||u!==v.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,u=v.version,d=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Pt(new _s(2,2),new Wt({name:"BackgroundMaterial",uniforms:Ps(ci.background.uniforms),vertexShader:ci.background.vertexShader,fragmentShader:ci.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=ot.getTransfer(v.colorSpace)!==xt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||u!==v.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,u=v.version,d=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,y){b.getRGB(ul,Yh(i)),t.buffers.color.setClear(ul.r,ul.g,ul.b,y,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,y=1){a.set(b),o=y,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(b){o=b,p(a,o)},render:g,addToRenderList:_,dispose:m}}function Bx(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,a=!1;function o(D,U,V,L,H){let X=!1,G=u(D,L,V,U);r!==G&&(r=G,l(r.object)),X=f(D,L,V,H),X&&g(D,L,V,H),H!==null&&e.update(H,i.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,v(D,U,V,L),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function c(){return i.createVertexArray()}function l(D){return i.bindVertexArray(D)}function h(D){return i.deleteVertexArray(D)}function u(D,U,V,L){let H=L.wireframe===!0,X=n[U.id];X===void 0&&(X={},n[U.id]=X);let G=D.isInstancedMesh===!0?D.id:0,ne=X[G];ne===void 0&&(ne={},X[G]=ne);let K=ne[V.id];K===void 0&&(K={},ne[V.id]=K);let ee=K[H];return ee===void 0&&(ee=d(c()),K[H]=ee),ee}function d(D){let U=[],V=[],L=[];for(let H=0;H<t;H++)U[H]=0,V[H]=0,L[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:V,attributeDivisors:L,object:D,attributes:{},index:null}}function f(D,U,V,L){let H=r.attributes,X=U.attributes,G=0,ne=V.getAttributes();for(let K in ne)if(ne[K].location>=0){let O=H[K],Fe=X[K];if(Fe===void 0&&(K==="instanceMatrix"&&D.instanceMatrix&&(Fe=D.instanceMatrix),K==="instanceColor"&&D.instanceColor&&(Fe=D.instanceColor)),O===void 0||O.attribute!==Fe||Fe&&O.data!==Fe.data)return!0;G++}return r.attributesNum!==G||r.index!==L}function g(D,U,V,L){let H={},X=U.attributes,G=0,ne=V.getAttributes();for(let K in ne)if(ne[K].location>=0){let O=X[K];O===void 0&&(K==="instanceMatrix"&&D.instanceMatrix&&(O=D.instanceMatrix),K==="instanceColor"&&D.instanceColor&&(O=D.instanceColor));let Fe={};Fe.attribute=O,O&&O.data&&(Fe.data=O.data),H[K]=Fe,G++}r.attributes=H,r.attributesNum=G,r.index=L}function _(){let D=r.newAttributes;for(let U=0,V=D.length;U<V;U++)D[U]=0}function p(D){m(D,0)}function m(D,U){let V=r.newAttributes,L=r.enabledAttributes,H=r.attributeDivisors;V[D]=1,L[D]===0&&(i.enableVertexAttribArray(D),L[D]=1),H[D]!==U&&(i.vertexAttribDivisor(D,U),H[D]=U)}function b(){let D=r.newAttributes,U=r.enabledAttributes;for(let V=0,L=U.length;V<L;V++)U[V]!==D[V]&&(i.disableVertexAttribArray(V),U[V]=0)}function y(D,U,V,L,H,X,G){G===!0?i.vertexAttribIPointer(D,U,V,H,X):i.vertexAttribPointer(D,U,V,L,H,X)}function v(D,U,V,L){_();let H=L.attributes,X=V.getAttributes(),G=U.defaultAttributeValues;for(let ne in X){let K=X[ne];if(K.location>=0){let ee=H[ne];if(ee===void 0&&(ne==="instanceMatrix"&&D.instanceMatrix&&(ee=D.instanceMatrix),ne==="instanceColor"&&D.instanceColor&&(ee=D.instanceColor)),ee!==void 0){let O=ee.normalized,Fe=ee.itemSize,qe=e.get(ee);if(qe===void 0)continue;let J=qe.buffer,ye=qe.type,Ne=qe.bytesPerElement,Oe=ye===i.INT||ye===i.UNSIGNED_INT||ee.gpuType===Ac;if(ee.isInterleavedBufferAttribute){let Se=ee.data,We=Se.isInterleavedBuffer===!0?Se.stride:Se.itemSize,Ae=ee.offset;if(Se.isInstancedInterleavedBuffer||Se.isInstancedBufferAttribute){for(let te=0;te<K.locationSize;te++)m(K.location+te,Se.meshPerAttribute);D.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Se.meshPerAttribute*Se.count)}else for(let te=0;te<K.locationSize;te++)p(K.location+te);i.bindBuffer(i.ARRAY_BUFFER,J);for(let te=0;te<K.locationSize;te++)y(K.location+te,Fe/K.locationSize,ye,O,We*Ne,(Ae+Fe/K.locationSize*te)*Ne,Oe)}else{if(ee.isInstancedBufferAttribute){for(let Se=0;Se<K.locationSize;Se++)m(K.location+Se,ee.meshPerAttribute);D.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let Se=0;Se<K.locationSize;Se++)p(K.location+Se);i.bindBuffer(i.ARRAY_BUFFER,J);for(let Se=0;Se<K.locationSize;Se++)y(K.location+Se,Fe/K.locationSize,ye,O,Fe*Ne,Fe/K.locationSize*Se*Ne,Oe)}}else if(G!==void 0){let O=G[ne];if(O!==void 0)switch(O.length){case 2:i.vertexAttrib2fv(K.location,O);break;case 3:i.vertexAttrib3fv(K.location,O);break;case 4:i.vertexAttrib4fv(K.location,O);break;default:i.vertexAttrib1fv(K.location,O)}}}}b()}function E(){I();for(let D in n){let U=n[D];for(let V in U){let L=U[V];for(let H in L){let X=L[H];for(let G in X)h(X[G].object),delete X[G];delete L[H]}}delete n[D]}}function w(D){if(n[D.id]===void 0)return;let U=n[D.id];for(let V in U){let L=U[V];for(let H in L){let X=L[H];for(let G in X)h(X[G].object),delete X[G];delete L[H]}}delete n[D.id]}function x(D){for(let U in n){let V=n[U];for(let L in V){let H=V[L];if(H[D.id]===void 0)continue;let X=H[D.id];for(let G in X)h(X[G].object),delete X[G];delete H[D.id]}}}function M(D){for(let U in n){let V=n[U],L=D.isInstancedMesh===!0?D.id:0,H=V[L];if(H!==void 0){for(let X in H){let G=H[X];for(let ne in G)h(G[ne].object),delete G[ne];delete H[X]}delete V[L],Object.keys(V).length===0&&delete n[U]}}}function I(){R(),a=!0,r!==s&&(r=s,l(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:I,resetDefaultState:R,dispose:E,releaseStatesOfGeometry:w,releaseStatesOfObject:M,releaseStatesOfProgram:x,initAttributes:_,enableAttribute:p,disableUnusedAttributes:b}}function zx(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let d=0;for(let f=0;f<h;f++)d+=l[f];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Gx(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let x=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(x){return!(x!==Tn&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(x){let M=x===bn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(x!==Mn&&x!==Pn&&!M&&n.convert(x)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(x){if(x==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(Ke("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=t.logarithmicDepthBuffer===!0&&u===!1;t.reversedDepthBuffer===!0&&u===!1&&Ke("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&u===!0&&Ke("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:b,maxVaryings:y,maxFragmentUniforms:v,maxSamples:E,samples:w}}function Hx(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Xn,o=new it,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,m=i.get(u);if(!s||g===null||g.length===0||r&&!p)r?h(null):l();else{let b=r?0:n,y=b*4,v=m.clippingState||null;c.value=v,v=h(g,d,y,f);for(let E=0;E!==y;++E)v[E]=t[E];m.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){let _=u!==null?u.length:0,p=null;if(_!==0){if(p=c.value,g!==!0||p===null){let m=f+_*4,b=d.matrixWorldInverse;o.getNormalMatrix(b),(p===null||p.length<m)&&(p=new Float32Array(m));for(let y=0,v=f;y!==_;++y,v+=4)a.copy(u[y]).applyMatrix4(b,o),a.normal.toArray(p,v),p[v+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}var to=class extends Qt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new ga(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new mr(5,5,5),r=new Wt({name:"CubemapFromEquirect",uniforms:Ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:gn,blending:Fi});r.uniforms.tEquirect.value=t;let a=new Pt(s,r),o=t.minFilter;return t.minFilter===On&&(t.minFilter=Ot),new yr(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}},$f=256,Vx=3,Wx=20,yp=256,Sp=16,qx=3,Xx=new P,Kx=new De,fl=class i{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new yr(1,10,null),this._boxMesh=new Pt(new mr(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:a=256,position:o=Xx}=r,c=this._renderer;this._setSize(a);let l=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);let u=c.autoClear,d=c.autoClearColor,f=c.autoClearDepth,g=c.autoClearStencil,_=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,_===null&&(e.background=c.getClearColor(Kx));let p=new yr(n,s,h);return p.position.copy(o),p.update(c,e),c.autoClear=u,c.autoClearColor=d,c.autoClearDepth=f,c.autoClearStencil=g,e.background=_,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ep(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max($f,Xh(e))}_fromTexture(e,t){e.mapping===As||e.mapping===Tr?this._setSize(e.image.length===0?$f:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=Qf(e,!1,!1),n=Math.log2(e)-Vx;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Qf(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===As||e.mapping===Tr?(this._cubemapMaterial===null&&(this._cubemapMaterial=tp()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=ep()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=jx(),this._integrationMaterial=Jx());let t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/Sp);for(let a=0;a<=n;a++){let o=i.lodToRoughness(a,n);if(a>n-qx)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{let c=o>0?Math.log2(t)+.5*Math.log2(6/(yp*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=c,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=Yx());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}};function Qf(i,e,t){return new to(i,{minFilter:On,generateMipmaps:e,type:bn,colorSpace:pn,depthBuffer:t})}function no(i,e,t){return new Wt({name:i,uniforms:e,vertexShader:ct.cube_vert,fragmentShader:t,side:gn,blending:Fi,depthTest:!1,depthWrite:!1})}function jx(){return no("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${yp}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Jx(){return no("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Sp}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Yx(){return no("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Wx}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function ep(){return no("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function tp(){return no("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Zx(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===Tc||f===Ec)if(e.has(d)){let g=e.get(d).texture;return o(g,d.mapping)}else{let g=d.image;if(g&&g.height>0){let _=new to(g.height);return _.fromEquirectangularTexture(i,d),e.set(d,_),d.addEventListener("dispose",l),o(_.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let f=d.mapping,g=f===Tc||f===Ec,_=f===As||f===Tr;if(g||_){let p=t.get(d),m=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return n===null&&(n=new fl(i)),p=g?n.fromEquirectangular(d,p):n.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),p.texture;if(p!==void 0)return p.texture;{let b=d.image;return g&&b&&b.height>0||_&&b&&c(b)?(n===null&&(n=new fl(i)),p=g?n.fromEquirectangular(d):n.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),d.addEventListener("dispose",h),p.texture):null}}}return d}function o(d,f){return f===Tc?d.mapping=As:f===Ec&&(d.mapping=Tr),d}function c(d){let f=0,g=6;for(let _=0;_<g;_++)d[_]!==void 0&&f++;return f===g}function l(d){let f=d.target;f.removeEventListener("dispose",l);let g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function $x(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&hs("WebGLRenderer: "+n+" extension not supported."),s}}}function Qx(i,e,t,n){let s={},r=new WeakMap,a=new FinalizationRegistry(g=>delete s[g]);function o(g){c(g.target)}function c(g){g.index!==null&&e.remove(g.index);for(let p in g.attributes)e.remove(g.attributes[p]);g.removeEventListener("dispose",o),delete s[g.id],a.unregister(g);let _=r.get(g);_&&(e.remove(_),r.delete(g)),n.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function l(g,_){return s[_.id]!==void 0||(_.addEventListener("dispose",o),s[_.id]=new WeakRef(_),a.register(_,_.id,_),t.memory.geometries++),_}function h(g){let _=g.attributes;for(let p in _)e.update(_[p],i.ARRAY_BUFFER)}function u(g){let _=g.index,p=g.attributes.position,m=0;if(p===void 0)return;let b=_!==null?_.array.length:p.array.length/3-1,y=p.count>=65535?oa:aa,v=new y(Math.ceil(b/3)*6,1),E=v.array;if(_!==null){let x=_.array;m=_.version;for(let M=0,I=0;M<b;M+=3){let R=x[M+0],D=x[M+1],U=x[M+2];E[I++]=R,E[I++]=D,E[I++]=D,E[I++]=U,E[I++]=U,E[I++]=R}}else{m=p.version;for(let x=0,M=0;x<b;x+=3){let I=x+0,R=x+1,D=x+2;E[M++]=I,E[M++]=R,E[M++]=R,E[M++]=D,E[M++]=D,E[M++]=I}}v.version=m;let w=r.get(g);w&&e.remove(w),r.set(g,v)}function d(g){let _=r.get(g);if(_){let p=g.index;p!==null&&_.version<p.version&&u(g)}else u(g);return r.get(g)}function f(){for(let g in s){let _=s[g].deref();_!==void 0&&c(_)}}return{get:l,update:h,getWireframeAttribute:d,dispose:f}}function e_(i,e,t){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,d){i.drawElements(n,d,r,u*a),t.update(d,n,1)}function l(u,d,f){f!==0&&(i.drawElementsInstanced(n,d,r,u*a,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let _=0;for(let p=0;p<f;p++)_+=d[p];t.update(_,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function t_(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:et("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function n_(i,e,t){let n=new WeakMap,s=new St;function r(a,o,c){let l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==u){let I=function(){x.dispose(),n.delete(o),o.removeEventListener("dispose",I)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],b=o.morphAttributes.color||[],y=0;f===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let v=o.attributes.position.count*y,E=1;v>e.maxTextureSize&&(E=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let w=new Float32Array(v*E*4*u),x=new sa(w,v,E,u);x.type=Pn,x.needsUpdate=!0;let M=y*4;for(let R=0;R<u;R++){let D=p[R],U=m[R],V=b[R],L=v*E*4*R;for(let H=0;H<D.count;H++){let X=H*M;f===!0&&(s.fromBufferAttribute(D,H),w[L+X+0]=s.x,w[L+X+1]=s.y,w[L+X+2]=s.z,w[L+X+3]=0),g===!0&&(s.fromBufferAttribute(U,H),w[L+X+4]=s.x,w[L+X+5]=s.y,w[L+X+6]=s.z,w[L+X+7]=0),_===!0&&(s.fromBufferAttribute(V,H),w[L+X+8]=s.x,w[L+X+9]=s.y,w[L+X+10]=s.z,w[L+X+11]=V.itemSize===4?s.w:1)}}d={count:u,texture:x,size:new se(v,E)},n.set(o,d),o.addEventListener("dispose",I)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];let g=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function i_(i,e,t,n,s){let r=new WeakMap;function a(l){let h=s.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){let f=l.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function o(){r=new WeakMap}function c(l){let h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var s_={[ka]:"LINEAR_TONE_MAPPING",[Ba]:"REINHARD_TONE_MAPPING",[za]:"CINEON_TONE_MAPPING",[Ga]:"ACES_FILMIC_TONE_MAPPING",[Va]:"AGX_TONE_MAPPING",[Wa]:"NEUTRAL_TONE_MAPPING",[Ha]:"CUSTOM_TONE_MAPPING"};function r_(i,e,t,n,s,r){let a=new Qt(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,c=null,l=null,h=new Ct;h.setAttribute("position",new dt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new dt([0,2,0,0,2,0],2));let u=new xr({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Pt(h,u),f=new Di(-1,1,1,-1,0,1),g=null,_=null,p=!1,m,b=null,y=[],v=!1;this.setSize=function(E,w){a.setSize(E,w),o!==null&&o.setSize(E,w),c!==null&&c.setSize(E,w);for(let x=0;x<y.length;x++){let M=y[x];M.setSize&&M.setSize(E,w)}},this.setEffects=function(E){y=E,v=y.length>0&&y[0].isRenderPass===!0;let w=a.width,x=a.height;y.length>0&&o===null&&(o=new Qt(w,x,{type:bn,depthBuffer:!1,stencilBuffer:!1}),c=new Qt(w,x,{type:bn,depthBuffer:!1,stencilBuffer:!1}));let M=s===!0&&y.some(I=>I.needsDepthTexture===!0);M!==(a.depthTexture!==null)&&(M===!0&&l===null&&(l=new Kn(w,x),r===!0&&(l.format=Ui,l.type=Cs)),a.dispose(),a.depthTexture=M?l:null,a.resolveDepthBuffer=M,a.storeMultisampledDepthBuffer=M);for(let I=0;I<y.length;I++){let R=y[I];R.setSize&&R.setSize(w,x),M&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(l)}},this.begin=function(E,w){if(p||E.toneMapping===ai&&y.length===0)return!1;if(b=w,w!==null){let x=w.width,M=w.height;(a.width!==x||a.height!==M)&&this.setSize(x,M)}return v===!1&&E.setRenderTarget(a),m=E.toneMapping,E.toneMapping=ai,!0},this.hasRenderPass=function(){return v},this.end=function(E,w){E.toneMapping=m,p=!0;let x=a,M=o;for(let I=0;I<y.length;I++){let R=y[I];R.enabled!==!1&&(R.render(E,M,x,w),R.needsSwap!==!1&&(x=M,M=M===o?c:o))}if(g!==E.outputColorSpace||_!==E.toneMapping){g=E.outputColorSpace,_=E.toneMapping,u.defines={},ot.getTransfer(g)===xt&&(u.defines.SRGB_TRANSFER="");let I=s_[_];I&&(u.defines[I]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=x.texture,E.setRenderTarget(b),E.render(d,f),b=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),h.dispose(),u.dispose()}}var Mp=new Gt,Tp=new Kn(1,1),Ep=new ba(1),wp=new sa,Ap=new sc,Rp=new ga,np=[],ip=[],sp=new Float32Array(16),rp=new Float32Array(9),ap=new Float32Array(4);function Pr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=np[s];if(r===void 0&&(r=new Float32Array(s),np[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Xt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Kt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ml(i,e){let t=ip[e];t===void 0&&(t=new Int32Array(e),ip[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function a_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function o_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;i.uniform2fv(this.addr,e),Kt(t,e)}}function c_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Xt(t,e))return;i.uniform3fv(this.addr,e),Kt(t,e)}}function l_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;i.uniform4fv(this.addr,e),Kt(t,e)}}function h_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Kt(t,e)}else{if(Xt(t,n))return;ap.set(n),i.uniformMatrix2fv(this.addr,!1,ap),Kt(t,n)}}function u_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Kt(t,e)}else{if(Xt(t,n))return;rp.set(n),i.uniformMatrix3fv(this.addr,!1,rp),Kt(t,n)}}function d_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Xt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Kt(t,e)}else{if(Xt(t,n))return;sp.set(n),i.uniformMatrix4fv(this.addr,!1,sp),Kt(t,n)}}function f_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function p_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;i.uniform2iv(this.addr,e),Kt(t,e)}}function m_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;i.uniform3iv(this.addr,e),Kt(t,e)}}function g_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;i.uniform4iv(this.addr,e),Kt(t,e)}}function b_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function x_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;i.uniform2uiv(this.addr,e),Kt(t,e)}}function __(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;i.uniform3uiv(this.addr,e),Kt(t,e)}}function v_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;i.uniform4uiv(this.addr,e),Kt(t,e)}}function gl(i){return i.version===0&&(i.compareFunction=Hh,i.needsUpdate=!0),i}function y_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=gl(Tp):r=Mp,t.setTexture2D(e||r,s)}function S_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Ap,s)}function M_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=gl(Ep):r=Rp,t.setTextureCube(e||r,s)}function T_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||wp,s)}function E_(i){switch(i){case 5126:return a_;case 35664:return o_;case 35665:return c_;case 35666:return l_;case 35674:return h_;case 35675:return u_;case 35676:return d_;case 5124:case 35670:return f_;case 35667:case 35671:return p_;case 35668:case 35672:return m_;case 35669:case 35673:return g_;case 5125:return b_;case 36294:return x_;case 36295:return __;case 36296:return v_;case 35678:case 36198:case 36298:case 36306:case 35682:return y_;case 35679:case 36299:case 36307:return S_;case 35680:case 36300:case 36308:case 36293:return M_;case 36289:case 36303:case 36311:case 36292:return T_}}function w_(i,e){i.uniform1fv(this.addr,e)}function A_(i,e){let t=Pr(e,this.size,2);i.uniform2fv(this.addr,t)}function R_(i,e){let t=Pr(e,this.size,3);i.uniform3fv(this.addr,t)}function C_(i,e){let t=Pr(e,this.size,4);i.uniform4fv(this.addr,t)}function P_(i,e){let t=Pr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function I_(i,e){let t=Pr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function L_(i,e){let t=Pr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function D_(i,e){i.uniform1iv(this.addr,e)}function N_(i,e){i.uniform2iv(this.addr,e)}function F_(i,e){i.uniform3iv(this.addr,e)}function U_(i,e){i.uniform4iv(this.addr,e)}function O_(i,e){i.uniform1uiv(this.addr,e)}function k_(i,e){i.uniform2uiv(this.addr,e)}function B_(i,e){i.uniform3uiv(this.addr,e)}function z_(i,e){i.uniform4uiv(this.addr,e)}function G_(i,e,t){let n=this.cache,s=e.length,r=ml(t,s);Xt(n,r)||(i.uniform1iv(this.addr,r),Kt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=gl(Tp):a=Mp;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function H_(i,e,t){let n=this.cache,s=e.length,r=ml(t,s);Xt(n,r)||(i.uniform1iv(this.addr,r),Kt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Ap,r[a])}function V_(i,e,t){let n=this.cache,s=e.length,r=ml(t,s);Xt(n,r)||(i.uniform1iv(this.addr,r),Kt(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=gl(Ep):a=Rp;for(let o=0;o!==s;++o)t.setTextureCube(e[o]||a,r[o])}function W_(i,e,t){let n=this.cache,s=e.length,r=ml(t,s);Xt(n,r)||(i.uniform1iv(this.addr,r),Kt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||wp,r[a])}function q_(i){switch(i){case 5126:return w_;case 35664:return A_;case 35665:return R_;case 35666:return C_;case 35674:return P_;case 35675:return I_;case 35676:return L_;case 5124:case 35670:return D_;case 35667:case 35671:return N_;case 35668:case 35672:return F_;case 35669:case 35673:return U_;case 5125:return O_;case 36294:return k_;case 36295:return B_;case 36296:return z_;case 35678:case 36198:case 36298:case 36306:case 35682:return G_;case 35679:case 36299:case 36307:return H_;case 35680:case 36300:case 36308:case 36293:return V_;case 36289:case 36303:case 36311:case 36292:return W_}}var ou=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=E_(t.type)}},cu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=q_(t.type)}},lu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},ru=/(\w+)(\])?(\[|\.)?/g;function op(i,e){i.seq.push(e),i.map[e.id]=e}function X_(i,e,t){let n=i.name,s=n.length;for(ru.lastIndex=0;;){let r=ru.exec(n),a=ru.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){op(t,l===void 0?new ou(o,i,e):new cu(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new lu(o),op(t,u)),t=u}}}var Cr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);X_(o,c,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function cp(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var K_=37297,j_=0;function J_(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var lp=new it;function Y_(i){ot._getMatrix(lp,ot.workingColorSpace,i);let e=`mat3( ${lp.elements.map(t=>t.toFixed(4))} )`;switch(ot.getTransfer(i)){case na:return[e,"LinearTransferOETF"];case xt:return[e,"sRGBTransferOETF"];default:return Ke("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function hp(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+J_(i.getShaderSource(e),o)}else return r}function Z_(i,e){let t=Y_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var $_={[ka]:"Linear",[Ba]:"Reinhard",[za]:"Cineon",[Ga]:"ACESFilmic",[Va]:"AgX",[Wa]:"Neutral",[Ha]:"Custom"};function Q_(i,e){let t=$_[e];return t===void 0?(Ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var dl=new P;function ev(){ot.getLuminanceCoefficients(dl);let i=dl.x.toFixed(4),e=dl.y.toFixed(4),t=dl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function tv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(eo).join(`
`)}function nv(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function iv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function eo(i){return i!==""}function up(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function dp(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var sv=/^[ \t]*#include +<([\w\d./]+)>/gm;function hu(i){return i.replace(sv,rv)}function rv(i,e){let t=ct[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return hu(t)}var av=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fp(i){return i.replace(av,ov)}function ov(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function pp(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var cv={[Es]:"SHADOWMAP_TYPE_PCF",[Sr]:"SHADOWMAP_TYPE_VSM"};function lv(i){return cv[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var hv={[Tr]:"ENVMAP_MODE_REFRACTION"};function uv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":hv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var dv={[Ih]:"ENVMAP_BLENDING_MULTIPLY",[Rf]:"ENVMAP_BLENDING_MIX",[Cf]:"ENVMAP_BLENDING_ADD"};function fv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":dv[i.combine]||"ENVMAP_BLENDING_NONE"}function pv(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,c=lv(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=uv(t),u=fv(t),d=tv(t),f=nv(r),g=s.createProgram(),_,p,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(eo).join(`
`),_.length>0&&(_+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(eo).join(`
`),p.length>0&&(p+=`
`)):(_=[pp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(eo).join(`
`),p=[pp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ai?"#define TONE_MAPPING":"",t.toneMapping!==ai?ct.tonemapping_pars_fragment:"",t.toneMapping!==ai?Q_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ct.colorspace_pars_fragment,Z_("linearToOutputTexel",t.outputColorSpace),ev(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(eo).join(`
`)),a=hu(a),a=up(a,t),a=dp(a,t),o=hu(o),o=up(o,t),o=dp(o,t),a=fp(a),o=fp(o),t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,_=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,p=["#define varying in",t.glslVersion===Wh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Wh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let b=m+_+a,y=m+p+o,v=cp(s,s.VERTEX_SHADER,b),E=cp(s,s.FRAGMENT_SHADER,y);s.attachShader(g,v),s.attachShader(g,E),t.index0AttributeName!==void 0?s.bindAttribLocation(g,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function w(R){if(i.debug.checkShaderErrors){let D=s.getProgramInfoLog(g)||"",U=s.getShaderInfoLog(v)||"",V=s.getShaderInfoLog(E)||"",L=D.trim(),H=U.trim(),X=V.trim(),G=!0,ne=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,v,E);else{let K=hp(s,v,"vertex"),ee=hp(s,E,"fragment");et("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+L+`
`+K+`
`+ee)}else L!==""?Ke("WebGLProgram: Program Info Log:",L):(H===""||X==="")&&(ne=!1);ne&&(R.diagnostics={runnable:G,programLog:L,vertexShader:{log:H,prefix:_},fragmentShader:{log:X,prefix:p}})}s.deleteShader(v),s.deleteShader(E),x=new Cr(s,g),M=iv(s,g)}let x;this.getUniforms=function(){return x===void 0&&w(this),x};let M;this.getAttributes=function(){return M===void 0&&w(this),M};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(g,K_)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=j_++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=v,this.fragmentShader=E,this}var mv=0,uu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new du(e),t.set(e,n)),n}},du=class{constructor(e){this.id=mv++,this.code=e,this.usedTimes=0}};function gv(i){return i===ts||i===Ja||i===Ya}function bv(i,e,t,n,s,r){let a=new hr,o=new uu,c=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(x){return c.add(x),x===0?"uv":`uv${x}`}function g(x,M,I,R,D,U){let V=R.fog,L=D.geometry,H=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?R.environment:null,X=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,G=e.get(x.envMap||H,X),ne=d[x.type],K=n.precision;x.precision!==null&&(K=n.getMaxPrecision(x.precision),K!==x.precision&&Ke("WebGLProgram.getParameters:",x.precision,"not supported, using",K,"instead."));let ee=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,O=ee!==void 0?ee.length:0,Fe=0;L.morphAttributes.position!==void 0&&(Fe=1),L.morphAttributes.normal!==void 0&&(Fe=2),L.morphAttributes.color!==void 0&&(Fe=3);let qe,J,ye,Ne;if(ne){let Re=ci[ne];qe=Re.vertexShader,J=Re.fragmentShader}else{qe=x.vertexShader,J=x.fragmentShader;let Re=o.getVertexShaderStage(x),mt=o.getFragmentShaderStage(x);o.update(x,Re,mt),ye=Re.id,Ne=mt.id}let Oe=i.getRenderTarget(),Se=i.state.buffers.depth.getReversed(),We=D.isInstancedMesh===!0,Ae=D.isBatchedMesh===!0,te=!!x.map,Me=!!x.matcap,Te=!!G,W=Te&&G.isPMREMTexture===!0,ie=!!x.aoMap,re=!!x.lightMap,Ee=!!x.bumpMap&&x.wireframe===!1,ce=!!x.normalMap,ke=!!x.displacementMap,_e=!!x.emissiveMap,je=!!x.metalnessMap,Ge=!!x.roughnessMap,Qe=x.anisotropy>0,F=x.clearcoat>0,At=x.diffuseRoughness>0,Ie=x.dispersion>0,pt=x.retroreflectivity>0,me=x.iridescence>0,tt=x.sheen>0,Ye=x.transmission>0,$e=Qe&&!!x.anisotropyMap,A=F&&!!x.clearcoatMap,S=F&&!!x.clearcoatNormalMap,B=F&&!!x.clearcoatRoughnessMap,ae=At&&!!x.diffuseRoughnessMap,Q=me&&!!x.iridescenceMap,pe=me&&!!x.iridescenceThicknessMap,ve=tt&&!!x.sheenColorMap,Y=tt&&!!x.sheenRoughnessMap,Z=!!x.specularMap,ue=!!x.specularColorMap,C=!!x.specularIntensityMap,$=Ye&&!!x.transmissionMap,j=Ye&&!!x.thicknessMap,be=!!x.gradientMap,fe=!!x.alphaMap,de=x.alphaTest>0,Ve=!!x.alphaHash,st=!!x.extensions,le=ai;x.toneMapped&&(Oe===null||Oe.isXRRenderTarget===!0)&&(le=i.toneMapping);let Je=W?G.isCompressedCubeTexture?G.image[0].mipmaps:G.mipmaps:null,rt={shaderID:ne,shaderType:x.type,shaderName:x.name,vertexShader:qe,fragmentShader:J,defines:x.defines,customVertexShaderID:ye,customFragmentShaderID:Ne,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:K,batching:Ae,batchingColor:Ae&&D._colorsTexture!==null,instancing:We,instancingColor:We&&D.instanceColor!==null,instancingMorph:We&&D.morphTexture!==null,outputColorSpace:Oe===null?i.outputColorSpace:Oe.isXRRenderTarget===!0?Oe.texture.colorSpace:ot.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:te,matcap:Me,envMap:Te,envMapMode:Te&&G.mapping,envMapPMREM:W,envMapMaxLod:W?Je.length-1:null,envMapSize:W?Je[0].width:null,aoMap:ie,lightMap:re,bumpMap:Ee,normalMap:ce,displacementMap:ke,emissiveMap:_e,normalMapObjectSpace:ce&&x.normalMapType===Df,normalMapTangentSpace:ce&&x.normalMapType===$a,packedNormalMap:ce&&x.normalMapType===$a&&gv(x.normalMap.format),metalnessMap:je,roughnessMap:Ge,anisotropy:Qe,anisotropyMap:$e,clearcoat:F,clearcoatMap:A,clearcoatNormalMap:S,clearcoatRoughnessMap:B,diffuseRoughness:At,diffuseRoughnessMap:ae,dispersion:Ie,retroreflection:pt,iridescence:me,iridescenceMap:Q,iridescenceThicknessMap:pe,sheen:tt,sheenColorMap:ve,sheenRoughnessMap:Y,specularMap:Z,specularColorMap:ue,specularIntensityMap:C,transmission:Ye,transmissionMap:$,thicknessMap:j,gradientMap:be,opaque:x.transparent===!1&&x.blending===Mr&&x.alphaToCoverage===!1,alphaMap:fe,alphaTest:de,alphaHash:Ve,combine:x.combine,mapUv:te&&f(x.map.channel),aoMapUv:ie&&f(x.aoMap.channel),lightMapUv:re&&f(x.lightMap.channel),bumpMapUv:Ee&&f(x.bumpMap.channel),normalMapUv:ce&&f(x.normalMap.channel),displacementMapUv:ke&&f(x.displacementMap.channel),emissiveMapUv:_e&&f(x.emissiveMap.channel),metalnessMapUv:je&&f(x.metalnessMap.channel),roughnessMapUv:Ge&&f(x.roughnessMap.channel),anisotropyMapUv:$e&&f(x.anisotropyMap.channel),clearcoatMapUv:A&&f(x.clearcoatMap.channel),clearcoatNormalMapUv:S&&f(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:B&&f(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ae&&f(x.diffuseRoughnessMap.channel),iridescenceMapUv:Q&&f(x.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&f(x.iridescenceThicknessMap.channel),sheenColorMapUv:ve&&f(x.sheenColorMap.channel),sheenRoughnessMapUv:Y&&f(x.sheenRoughnessMap.channel),specularMapUv:Z&&f(x.specularMap.channel),specularColorMapUv:ue&&f(x.specularColorMap.channel),specularIntensityMapUv:C&&f(x.specularIntensityMap.channel),transmissionMapUv:$&&f(x.transmissionMap.channel),thicknessMapUv:j&&f(x.thicknessMap.channel),alphaMapUv:fe&&f(x.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(ce||Qe),vertexNormals:!!L.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!L.attributes.uv&&(te||fe),fog:!!V,useFog:x.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||L.attributes.normal===void 0&&ce===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Se,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:L.attributes.position!==void 0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:O,morphTextureStride:Fe,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:U.filter(Re=>Re.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:le,decodeVideoTexture:te&&x.map.isVideoTexture===!0&&ot.getTransfer(x.map.colorSpace)===xt,decodeVideoTextureEmissive:_e&&x.emissiveMap.isVideoTexture===!0&&ot.getTransfer(x.emissiveMap.colorSpace)===xt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Un,flipSided:x.side===gn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:st&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(st&&x.extensions.multiDraw===!0||Ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return rt.vertexUv1s=c.has(1),rt.vertexUv2s=c.has(2),rt.vertexUv3s=c.has(3),c.clear(),rt}function _(x){let M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(let I in x.defines)M.push(I),M.push(x.defines[I]);return x.isRawShaderMaterial===!1&&(p(M,x),m(M,x),M.push(i.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function p(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapPMREM),x.push(M.envMapMaxLod),x.push(M.envMapSize),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.diffuseRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.numSunLights),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numSunLightShadows),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.numLightProbeGrids),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function m(x,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.retroreflection&&a.enable(24),M.diffuseRoughness&&a.enable(25),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),M.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function b(x){let M=d[x.type],I;if(M){let R=ci[M];I=Rr.clone(R.uniforms)}else I=x.uniforms;return I}function y(x,M){let I=h.get(M);return I!==void 0?++I.usedTimes:(I=new pv(i,M,x,s),l.push(I),h.set(M,I)),I}function v(x){if(--x.usedTimes===0){let M=l.indexOf(x);l[M]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function E(x){o.remove(x)}function w(){o.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:b,acquireProgram:y,releaseProgram:v,releaseShaderCache:E,programs:l,dispose:w}}function xv(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function _v(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function mp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function gp(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,g,_,p,m){let b=i[e];return b===void 0?(b={id:d.id,object:d,geometry:f,material:g,materialVariant:a(d),groupOrder:_,renderOrder:d.renderOrder,z:p,group:m},i[e]=b):(b.id=d.id,b.object=d,b.geometry=f,b.material=g,b.materialVariant=a(d),b.groupOrder=_,b.renderOrder=d.renderOrder,b.z=p,b.group=m),e++,b}function c(d,f,g,_,p,m,b){b.reversedDepth===!0&&(p=-p);let y=o(d,f,g,_,p,m);g.transmission>0?n.push(y):g.transparent===!0?s.push(y):t.push(y)}function l(d,f,g,_,p,m){let b=o(d,f,g,_,p,m);g.transmission>0?n.unshift(b):g.transparent===!0?s.unshift(b):t.unshift(b)}function h(d,f){t.length>1&&t.sort(d||_v),n.length>1&&n.sort(f||mp),s.length>1&&s.sort(f||mp)}function u(){for(let d=e,f=i.length;d<f;d++){let g=i[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:u,sort:h}}function vv(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new gp,i.set(n,[a])):s>=r.length?(a=new gp,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function yv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new P,color:new De};break;case"SpotLight":t={position:new P,direction:new P,color:new De,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new De,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new De,groundColor:new De};break;case"RectAreaLight":t={color:new De,position:new P,halfWidth:new P,halfHeight:new P};break}return i[e.id]=t,t}}}function Sv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var Mv=0;function Tv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Ev(i){let e=new yv,t=Sv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);let s=new P,r=new nt,a=new nt;function o(l){let h=0,u=0,d=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let f=0,g=0,_=0,p=0,m=0,b=0,y=0,v=0,E=0,w=0,x=0,M=0,I=0,R=0;l.sort(Tv);for(let U=0,V=l.length;U<V;U++){let L=l[U],H=L.color,X=L.intensity,G=L.distance,ne=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===ts?ne=L.shadow.map.texture:ne=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=H.r*X,u+=H.g*X,d+=H.b*X;else if(L.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(L.sh.coefficients[K],X);R++}else if(L.isSunLight){let K=e.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let ee=L.shadow,O=t.get(L);O.shadowIntensity=ee.intensity,O.shadowBias=ee.bias,O.shadowNormalBias=ee.normalBias,O.shadowRadius=ee.radius,O.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),n.sunShadow[g]=O,n.sunShadowMap[g]=ne;let Fe=ee.getViewportCount();for(let qe=0;qe<Fe;qe++)n.sunShadowMatrix[_+qe]=ee.getMatrix(qe),n.sunShadowCascade[_+qe]=ee._cascadeData[qe];_+=Fe,g++}n.sun[f]=K,f++}else if(L.isDirectionalLight){let K=e.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let ee=L.shadow,O=t.get(L);O.shadowIntensity=ee.intensity,O.shadowBias=ee.bias,O.shadowNormalBias=ee.normalBias,O.shadowRadius=ee.radius,O.shadowMapSize=ee.mapSize,n.directionalShadow[p]=O,n.directionalShadowMap[p]=ne,n.directionalShadowMatrix[p]=L.shadow.matrix,E++}n.directional[p]=K,p++}else if(L.isSpotLight){let K=e.get(L);K.position.setFromMatrixPosition(L.matrixWorld),K.color.copy(H).multiplyScalar(X),K.distance=G,K.coneCos=Math.cos(L.angle),K.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),K.decay=L.decay,n.spot[b]=K;let ee=L.shadow;if(L.map&&(n.spotLightMap[M]=L.map,M++,ee.updateMatrices(L),L.castShadow&&I++),n.spotLightMatrix[b]=ee.matrix,L.castShadow){let O=t.get(L);O.shadowIntensity=ee.intensity,O.shadowBias=ee.bias,O.shadowNormalBias=ee.normalBias,O.shadowRadius=ee.radius,O.shadowMapSize=ee.mapSize,n.spotShadow[b]=O,n.spotShadowMap[b]=ne,x++}b++}else if(L.isRectAreaLight){let K=e.get(L);K.color.copy(H).multiplyScalar(X),K.halfWidth.set(L.width*.5,0,0),K.halfHeight.set(0,L.height*.5,0),n.rectArea[y]=K,y++}else if(L.isPointLight){let K=e.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity),K.distance=L.distance,K.decay=L.decay,L.castShadow){let ee=L.shadow,O=t.get(L);O.shadowIntensity=ee.intensity,O.shadowBias=ee.bias,O.shadowNormalBias=ee.normalBias,O.shadowRadius=ee.radius,O.shadowMapSize=ee.mapSize,O.shadowCameraNear=ee.camera.near,O.shadowCameraFar=ee.camera.far,n.pointShadow[m]=O,n.pointShadowMap[m]=ne,n.pointShadowMatrix[m]=L.shadow.matrix,w++}n.point[m]=K,m++}else if(L.isHemisphereLight){let K=e.get(L);K.skyColor.copy(L.color).multiplyScalar(X),K.groundColor.copy(L.groundColor).multiplyScalar(X),n.hemi[v]=K,v++}}y>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Pe.LTC_FLOAT_1,n.rectAreaLTC2=Pe.LTC_FLOAT_2):(n.rectAreaLTC1=Pe.LTC_HALF_1,n.rectAreaLTC2=Pe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let D=n.hash;(D.sunLength!==f||D.directionalLength!==p||D.pointLength!==m||D.spotLength!==b||D.rectAreaLength!==y||D.hemiLength!==v||D.numSunShadows!==g||D.numDirectionalShadows!==E||D.numPointShadows!==w||D.numSpotShadows!==x||D.numSpotMaps!==M||D.numLightProbes!==R)&&(n.sun.length=f,n.directional.length=p,n.spot.length=b,n.rectArea.length=y,n.point.length=m,n.hemi.length=v,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.directionalShadowMatrix.length=E,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+M-I,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=R,D.sunLength=f,D.directionalLength=p,D.pointLength=m,D.spotLength=b,D.rectAreaLength=y,D.hemiLength=v,D.numSunShadows=g,D.numDirectionalShadows=E,D.numPointShadows=w,D.numSpotShadows=x,D.numSpotMaps=M,D.numLightProbes=R,n.version=Mv++)}function c(l,h){let u=0,d=0,f=0,g=0,_=0,p=0,m=h.matrixWorldInverse;for(let b=0,y=l.length;b<y;b++){let v=l[b];if(v.isSunLight){let E=n.sun[u];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(m),u++}else if(v.isDirectionalLight){let E=n.directional[d];E.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),d++}else if(v.isSpotLight){let E=n.spot[g];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),g++}else if(v.isRectAreaLight){let E=n.rectArea[_];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(m),a.identity(),r.copy(v.matrixWorld),r.premultiply(m),a.extractRotation(r),E.halfWidth.set(v.width*.5,0,0),E.halfHeight.set(0,v.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),_++}else if(v.isPointLight){let E=n.point[f];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(m),f++}else if(v.isHemisphereLight){let E=n.hemi[p];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(m),p++}}}return{setup:o,setupView:c,state:n}}function bp(i){let e=new Ev(i),t=[],n=[],s=[];function r(u){h.camera=u,t.length=0,n.length=0,s.length=0}function a(u){u.isLightProbeGrid?s.push(u):t.push(u)}function o(u){n.push(u)}function c(){e.setup(t),s.sort((u,d)=>u.priority-d.priority||u.id-d.id)}function l(u){e.setupView(t,u)}let h={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function wv(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new bp(i),e.set(s,[o])):r>=a.length?(o=new bp(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var Av=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Rv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Cv=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],Pv=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],xp=new nt,Qa=new P,au=new P;function Iv(i,e,t){let n=new $i,s=new se,r=new se,a=new St,o=new fc,c=new pc,l={},h=t.maxTextureSize,u={[ri]:gn,[gn]:ri,[Un]:Un},d=new Wt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new se},radius:{value:4}},vertexShader:Av,fragmentShader:Rv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Ct;g.setAttribute("position",new $t(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Pt(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Es;let m=this.type;this.render=function(w,x,M){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;this.type===lf&&(Ke("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Es);let I=i.getRenderTarget(),R=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Fi),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let V=m!==this.type;V&&x.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(H=>H.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,H=w.length;L<H;L++){let X=w[L],G=X.shadow;if(G===void 0){Ke("WebGLShadowMap:",X,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);let ne=G.getFrameExtents();s.multiply(ne),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ne.x),s.x=r.x*ne.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ne.y),s.y=r.y*ne.y,G.mapSize.y=r.y));let K=i.state.buffers.depth.getReversed();if(G.camera._reversedDepth=K,G.map===null||V===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Sr){if(X.isPointLight){Ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new Qt(s.x,s.y,{format:ts,type:bn,minFilter:Ot,magFilter:Ot,generateMipmaps:!1}),G.map.texture.name=X.name+".shadowMap",G.map.depthTexture=new Kn(s.x,s.y,Pn),G.map.depthTexture.name=X.name+".shadowMapDepth",G.map.depthTexture.format=Ti,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Dt,G.map.depthTexture.magFilter=Dt}else X.isPointLight?(G.map=new to(s.x),G.map.depthTexture=new ba(s.x,Cn)):(G.map=new Qt(s.x,s.y),G.map.depthTexture=new Kn(s.x,s.y,Cn)),G.map.depthTexture.name=X.name+".shadowMap",G.map.depthTexture.format=Ti,this.type===Es?(G.map.depthTexture.compareFunction=K?Gh:zh,G.map.depthTexture.minFilter=Ot,G.map.depthTexture.magFilter=Ot):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Dt,G.map.depthTexture.magFilter=Dt);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==s.x||G.map.height!==s.y)&&G.map.setSize(s.x,s.y);let ee=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();X.isPointLight!==!0&&G.updateMatrices(X,M);let O=(G.camera.layers.mask&4294967294)!==0?G.camera.layers:M.layers;for(let Fe=0;Fe<ee;Fe++){let qe=G.getCamera(Fe);if(X.isPointLight){let J=G.camera,ye=G.matrix,Ne=X.distance||J.far;Ne!==J.far&&(J.far=Ne,J.updateProjectionMatrix()),Qa.setFromMatrixPosition(X.matrixWorld),J.position.copy(Qa),au.copy(J.position),au.add(Cv[Fe]),J.up.copy(Pv[Fe]),J.lookAt(au),J.updateMatrixWorld(),ye.makeTranslation(-Qa.x,-Qa.y,-Qa.z),xp.multiplyMatrices(J.projectionMatrix,J.matrixWorldInverse),G._frustum.setFromProjectionMatrix(xp,J.coordinateSystem,J.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)i.setRenderTarget(G.map,Fe),i.clear();else{Fe===0&&(i.setRenderTarget(G.map),i.clear());let J=G.getViewport(Fe);a.set(r.x*J.x,r.y*J.y,r.x*J.z,r.y*J.w),U.viewport(a)}n=G.getFrustum(Fe),v(x,M,qe,X,O,this.type)}G.isPointLightShadow!==!0&&this.type===Sr&&b(G,M),G.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(I,R,D)};function b(w,x){let M=e.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null?w.mapPass=new Qt(s.x,s.y,{format:ts,type:bn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),d.uniforms.shadow_pass.value=w.map.depthTexture,d.uniforms.resolution.value.set(w.map.width,w.map.height),d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(x,null,M,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(x,null,M,f,_,null)}function y(w,x,M,I){let R=null,D=M.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(D!==void 0)R=D;else if(R=M.isPointLight===!0?c:o,i.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let U=R.uuid,V=x.uuid,L=l[U];L===void 0&&(L={},l[U]=L);let H=L[V];H===void 0&&(H=R.clone(),L[V]=H,x.addEventListener("dispose",E)),R=H}if(R.visible=x.visible,R.wireframe=x.wireframe,I===Sr?R.side=x.shadowSide!==null?x.shadowSide:x.side:R.side=x.shadowSide!==null?x.shadowSide:u[x.side],R.alphaMap=x.alphaMap,R.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,R.map=x.map,R.clipShadows=x.clipShadows,R.clippingPlanes=x.clippingPlanes,R.clipIntersection=x.clipIntersection,R.displacementMap=x.displacementMap,R.displacementScale=x.displacementScale,R.displacementBias=x.displacementBias,R.wireframeLinewidth=x.wireframeLinewidth,R.linewidth=x.linewidth,M.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let U=i.properties.get(R);U.light=M}return R}function v(w,x,M,I,R,D){if(w.visible===!1)return;if(w.layers.test(R)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&D===Sr)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,w.matrixWorld);let L=e.update(w),H=w.material;if(Array.isArray(H)){let X=L.groups;for(let G=0,ne=X.length;G<ne;G++){let K=X[G],ee=H[K.materialIndex];if(ee&&ee.visible){let O=y(w,ee,I,D);w.onBeforeShadow(i,w,x,M,L,O,K),i.renderBufferDirect(M,null,L,O,w,K),w.onAfterShadow(i,w,x,M,L,O,K)}}}else if(H.visible){let X=y(w,H,I,D);w.onBeforeShadow(i,w,x,M,L,X,null),i.renderBufferDirect(M,null,L,X,w,null),w.onAfterShadow(i,w,x,M,L,X,null)}}let V=w.children;for(let L=0,H=V.length;L<H;L++)v(V[L],x,M,I,R,D)}function E(w){w.target.removeEventListener("dispose",E);for(let M in l){let I=l[M],R=w.target.uuid;R in I&&(I[R].dispose(),delete I[R])}}}function Lv(i,e){function t(){let C=!1,$=new St,j=null,be=new St(0,0,0,0);return{setMask:function(fe){j!==fe&&!C&&(i.colorMask(fe,fe,fe,fe),j=fe)},setLocked:function(fe){C=fe},setClear:function(fe,de,Ve,st,le){le===!0&&(fe*=st,de*=st,Ve*=st),$.set(fe,de,Ve,st),be.equals($)===!1&&(i.clearColor(fe,de,Ve,st),be.copy($))},reset:function(){C=!1,j=null,be.set(-1,0,0,0)}}}function n(){let C=!1,$=!1,j=null,be=null,fe=null;return{setReversed:function(de){if($!==de){let Ve=e.get("EXT_clip_control");de?Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.ZERO_TO_ONE_EXT):Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.NEGATIVE_ONE_TO_ONE_EXT),$=de;let st=fe;fe=null,this.setClear(st)}},getReversed:function(){return $},setTest:function(de){de?Se(i.DEPTH_TEST):We(i.DEPTH_TEST)},setMask:function(de){j!==de&&!C&&(i.depthMask(de),j=de)},setFunc:function(de){if($&&(de=Vf[de]),be!==de){switch(de){case Jo:i.depthFunc(i.NEVER);break;case Yo:i.depthFunc(i.ALWAYS);break;case Zo:i.depthFunc(i.LESS);break;case sr:i.depthFunc(i.LEQUAL);break;case $o:i.depthFunc(i.EQUAL);break;case Qo:i.depthFunc(i.GEQUAL);break;case ec:i.depthFunc(i.GREATER);break;case tc:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}be=de}},setLocked:function(de){C=de},setClear:function(de){fe!==de&&(fe=de,$&&(de=1-de),i.clearDepth(de))},reset:function(){C=!1,j=null,be=null,fe=null,$=!1}}}function s(){let C=!1,$=null,j=null,be=null,fe=null,de=null,Ve=null,st=null,le=null;return{setTest:function(Je){C||(Je?Se(i.STENCIL_TEST):We(i.STENCIL_TEST))},setMask:function(Je){$!==Je&&!C&&(i.stencilMask(Je),$=Je)},setFunc:function(Je,rt,Re){(j!==Je||be!==rt||fe!==Re)&&(i.stencilFunc(Je,rt,Re),j=Je,be=rt,fe=Re)},setOp:function(Je,rt,Re){(de!==Je||Ve!==rt||st!==Re)&&(i.stencilOp(Je,rt,Re),de=Je,Ve=rt,st=Re)},setLocked:function(Je){C=Je},setClear:function(Je){le!==Je&&(i.clearStencil(Je),le=Je)},reset:function(){C=!1,$=null,j=null,be=null,fe=null,de=null,Ve=null,st=null,le=null}}}let r=new t,a=new n,o=new s,c={},l=new WeakMap,h={},u={},d={},f=new WeakMap,g=[],_=null,p=!1,m=null,b=null,y=null,v=null,E=null,w=null,x=null,M=new De(0,0,0),I=0,R=!1,D=null,U=null,V=null,L=null,H=null,X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,ne=0,K=i.getParameter(i.VERSION);K.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(K)[1]),G=ne>=1):K.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),G=ne>=2);let ee=null,O={},Fe=i.getParameter(i.SCISSOR_BOX),qe=i.getParameter(i.VIEWPORT),J=new St().fromArray(Fe),ye=new St().fromArray(qe);function Ne(C,$,j,be){let fe=new Uint8Array(4),de=i.createTexture();i.bindTexture(C,de),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ve=0;Ve<j;Ve++)C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY?i.texImage3D($,0,i.RGBA,1,1,be,0,i.RGBA,i.UNSIGNED_BYTE,fe):i.texImage2D($+Ve,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,fe);return de}let Oe={};Oe[i.TEXTURE_2D]=Ne(i.TEXTURE_2D,i.TEXTURE_2D,1),Oe[i.TEXTURE_CUBE_MAP]=Ne(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Oe[i.TEXTURE_2D_ARRAY]=Ne(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Oe[i.TEXTURE_3D]=Ne(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Se(i.DEPTH_TEST),a.setFunc(sr),Ee(!1),ce(Eh),Se(i.CULL_FACE),ie(Fi);function Se(C){h[C]!==!0&&(i.enable(C),h[C]=!0)}function We(C){h[C]!==!1&&(i.disable(C),h[C]=!1)}function Ae(C,$){return d[C]!==$?(i.bindFramebuffer(C,$),d[C]=$,C===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=$),C===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=$),!0):!1}function te(C,$){let j=g,be=!1;if(C){j=f.get($),j===void 0&&(j=[],f.set($,j));let fe=C.textures;if(j.length!==fe.length||j[0]!==i.COLOR_ATTACHMENT0){for(let de=0,Ve=fe.length;de<Ve;de++)j[de]=i.COLOR_ATTACHMENT0+de;j.length=fe.length,be=!0}}else j[0]!==i.BACK&&(j[0]=i.BACK,be=!0);be&&i.drawBuffers(j)}function Me(C){return _!==C?(i.useProgram(C),_=C,!0):!1}let Te={[ws]:i.FUNC_ADD,[uf]:i.FUNC_SUBTRACT,[df]:i.FUNC_REVERSE_SUBTRACT};Te[ff]=i.MIN,Te[pf]=i.MAX;let W={[mf]:i.ZERO,[gf]:i.ONE,[bf]:i.SRC_COLOR,[Ch]:i.SRC_ALPHA,[Mf]:i.SRC_ALPHA_SATURATE,[yf]:i.DST_COLOR,[_f]:i.DST_ALPHA,[xf]:i.ONE_MINUS_SRC_COLOR,[Ph]:i.ONE_MINUS_SRC_ALPHA,[Sf]:i.ONE_MINUS_DST_COLOR,[vf]:i.ONE_MINUS_DST_ALPHA,[Tf]:i.CONSTANT_COLOR,[Ef]:i.ONE_MINUS_CONSTANT_COLOR,[wf]:i.CONSTANT_ALPHA,[Af]:i.ONE_MINUS_CONSTANT_ALPHA};function ie(C,$,j,be,fe,de,Ve,st,le,Je){if(C===Fi){p===!0&&(We(i.BLEND),p=!1);return}if(p===!1&&(Se(i.BLEND),p=!0),C!==hf){if(C!==m||Je!==R){if((b!==ws||E!==ws)&&(i.blendEquation(i.FUNC_ADD),b=ws,E=ws),Je)switch(C){case Mr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wh:i.blendFunc(i.ONE,i.ONE);break;case Ah:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Rh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:et("WebGLState: Invalid blending: ",C);break}else switch(C){case Mr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ah:et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Rh:et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:et("WebGLState: Invalid blending: ",C);break}y=null,v=null,w=null,x=null,M.set(0,0,0),I=0,m=C,R=Je}return}fe=fe||$,de=de||j,Ve=Ve||be,($!==b||fe!==E)&&(i.blendEquationSeparate(Te[$],Te[fe]),b=$,E=fe),(j!==y||be!==v||de!==w||Ve!==x)&&(i.blendFuncSeparate(W[j],W[be],W[de],W[Ve]),y=j,v=be,w=de,x=Ve),(st.equals(M)===!1||le!==I)&&(i.blendColor(st.r,st.g,st.b,le),M.copy(st),I=le),m=C,R=!1}function re(C,$){C.side===Un?We(i.CULL_FACE):Se(i.CULL_FACE);let j=C.side===gn;$&&(j=!j),Ee(j),C.blending===Mr&&C.transparent===!1?ie(Fi):ie(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),a.setFunc(C.depthFunc),a.setTest(C.depthTest),a.setMask(C.depthWrite),r.setMask(C.colorWrite);let be=C.stencilWrite;o.setTest(be),be&&(o.setMask(C.stencilWriteMask),o.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),o.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),_e(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?Se(i.SAMPLE_ALPHA_TO_COVERAGE):We(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ee(C){D!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),D=C)}function ce(C){C!==of?(Se(i.CULL_FACE),C!==U&&(C===Eh?i.cullFace(i.BACK):C===cf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):We(i.CULL_FACE),U=C}function ke(C){C!==V&&(G&&i.lineWidth(C),V=C)}function _e(C,$,j){C?(Se(i.POLYGON_OFFSET_FILL),(L!==$||H!==j)&&(L=$,H=j,a.getReversed()&&($=-$,j=-j),i.polygonOffset($,j))):We(i.POLYGON_OFFSET_FILL)}function je(C){C?Se(i.SCISSOR_TEST):We(i.SCISSOR_TEST)}function Ge(C){C===void 0&&(C=i.TEXTURE0+X-1),ee!==C&&(i.activeTexture(C),ee=C)}function Qe(C,$,j){j===void 0&&(ee===null?j=i.TEXTURE0+X-1:j=ee);let be=O[j];be===void 0&&(be={type:void 0,texture:void 0},O[j]=be),(be.type!==C||be.texture!==$)&&(ee!==j&&(i.activeTexture(j),ee=j),i.bindTexture(C,$||Oe[C]),be.type=C,be.texture=$)}function F(){let C=O[ee];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function At(){try{i.compressedTexImage2D(...arguments)}catch(C){et("WebGLState:",C)}}function Ie(){try{i.compressedTexImage3D(...arguments)}catch(C){et("WebGLState:",C)}}function pt(){try{i.texSubImage2D(...arguments)}catch(C){et("WebGLState:",C)}}function me(){try{i.texSubImage3D(...arguments)}catch(C){et("WebGLState:",C)}}function tt(){try{i.compressedTexSubImage2D(...arguments)}catch(C){et("WebGLState:",C)}}function Ye(){try{i.compressedTexSubImage3D(...arguments)}catch(C){et("WebGLState:",C)}}function $e(){try{i.texStorage2D(...arguments)}catch(C){et("WebGLState:",C)}}function A(){try{i.texStorage3D(...arguments)}catch(C){et("WebGLState:",C)}}function S(){try{i.texImage2D(...arguments)}catch(C){et("WebGLState:",C)}}function B(){try{i.texImage3D(...arguments)}catch(C){et("WebGLState:",C)}}function ae(C){return u[C]!==void 0?u[C]:i.getParameter(C)}function Q(C,$){u[C]!==$&&(i.pixelStorei(C,$),u[C]=$)}function pe(C){J.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),J.copy(C))}function ve(C){ye.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),ye.copy(C))}function Y(C,$){let j=l.get($);j===void 0&&(j=new WeakMap,l.set($,j));let be=j.get(C);be===void 0&&(be=i.getUniformBlockIndex($,C.name),i.uniformBlockBinding($,be,be),j.set(C,be))}function Z(C,$,j){let fe=l.get($).get(C);c[fe]!==j&&(i.bindBufferBase(i.UNIFORM_BUFFER,fe,j),c[fe]=j)}function ue(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},ee=null,O={},d={},c={},f=new WeakMap,g=[],_=null,p=!1,m=null,b=null,y=null,v=null,E=null,w=null,x=null,M=new De(0,0,0),I=0,R=!1,D=null,U=null,V=null,L=null,H=null,J.set(0,0,i.canvas.width,i.canvas.height),ye.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Se,disable:We,bindFramebuffer:Ae,drawBuffers:te,useProgram:Me,setBlending:ie,setMaterial:re,setFlipSided:Ee,setCullFace:ce,setLineWidth:ke,setPolygonOffset:_e,setScissorTest:je,activeTexture:Ge,bindTexture:Qe,unbindTexture:F,compressedTexImage2D:At,compressedTexImage3D:Ie,texImage2D:S,texImage3D:B,pixelStorei:Q,getParameter:ae,updateUBOMapping:Y,uniformBlockBinding:Z,texStorage2D:$e,texStorage3D:A,texSubImage2D:pt,texSubImage3D:me,compressedTexSubImage2D:tt,compressedTexSubImage3D:Ye,scissor:pe,viewport:ve,reset:ue}}function Dv(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new se,h=new WeakMap,u=new Set,d,f=new WeakMap,g=new Set,_=new FinalizationRegistry(A=>g.delete(A)),p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(A,S){return p?new OffscreenCanvas(A,S):or("canvas")}function b(A,S,B){let ae=1,Q=$e(A);if((Q.width>B||Q.height>B)&&(ae=B/Math.max(Q.width,Q.height)),ae<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){let pe=Math.floor(ae*Q.width),ve=Math.floor(ae*Q.height);d===void 0&&(d=m(pe,ve));let Y=S?m(pe,ve):d;return Y.width=pe,Y.height=ve,Y.getContext("2d").drawImage(A,0,0,pe,ve),Ke("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+pe+"x"+ve+")."),Y}else return"data"in A&&Ke("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),A;return A}function y(A){return A.generateMipmaps}function v(A){i.generateMipmap(A)}function E(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function w(A,S,B,ae,Q,pe=!1){if(A!==null){if(i[A]!==void 0)return i[A];Ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ve;ae&&(ve=e.get("EXT_texture_norm16"),ve||Ke("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=S;if(S===i.RED&&(B===i.FLOAT&&(Y=i.R32F),B===i.HALF_FLOAT&&(Y=i.R16F),B===i.UNSIGNED_BYTE&&(Y=i.R8),B===i.UNSIGNED_SHORT&&ve&&(Y=ve.R16_EXT),B===i.SHORT&&ve&&(Y=ve.R16_SNORM_EXT)),S===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.R8UI),B===i.UNSIGNED_SHORT&&(Y=i.R16UI),B===i.UNSIGNED_INT&&(Y=i.R32UI),B===i.BYTE&&(Y=i.R8I),B===i.SHORT&&(Y=i.R16I),B===i.INT&&(Y=i.R32I)),S===i.RG&&(B===i.FLOAT&&(Y=i.RG32F),B===i.HALF_FLOAT&&(Y=i.RG16F),B===i.UNSIGNED_BYTE&&(Y=i.RG8),B===i.UNSIGNED_SHORT&&ve&&(Y=ve.RG16_EXT),B===i.SHORT&&ve&&(Y=ve.RG16_SNORM_EXT)),S===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RG8UI),B===i.UNSIGNED_SHORT&&(Y=i.RG16UI),B===i.UNSIGNED_INT&&(Y=i.RG32UI),B===i.BYTE&&(Y=i.RG8I),B===i.SHORT&&(Y=i.RG16I),B===i.INT&&(Y=i.RG32I)),S===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),B===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),B===i.UNSIGNED_INT&&(Y=i.RGB32UI),B===i.BYTE&&(Y=i.RGB8I),B===i.SHORT&&(Y=i.RGB16I),B===i.INT&&(Y=i.RGB32I)),S===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),B===i.UNSIGNED_INT&&(Y=i.RGBA32UI),B===i.BYTE&&(Y=i.RGBA8I),B===i.SHORT&&(Y=i.RGBA16I),B===i.INT&&(Y=i.RGBA32I)),S===i.RGB&&(B===i.UNSIGNED_SHORT&&ve&&(Y=ve.RGB16_EXT),B===i.SHORT&&ve&&(Y=ve.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),S===i.RGBA){let Z=pe?na:ot.getTransfer(Q);B===i.FLOAT&&(Y=i.RGBA32F),B===i.HALF_FLOAT&&(Y=i.RGBA16F),B===i.UNSIGNED_BYTE&&(Y=Z===xt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&ve&&(Y=ve.RGBA16_EXT),B===i.SHORT&&ve&&(Y=ve.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function x(A,S){let B;return A?S===null||S===Cn||S===Cs?B=i.DEPTH24_STENCIL8:S===Pn?B=i.DEPTH32F_STENCIL8:S===wr&&(B=i.DEPTH24_STENCIL8,Ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Cn||S===Cs?B=i.DEPTH_COMPONENT24:S===Pn?B=i.DEPTH_COMPONENT32F:S===wr&&(B=i.DEPTH_COMPONENT16),B}function M(A,S){return y(A)===!0||A.isFramebufferTexture&&A.minFilter!==Dt&&A.minFilter!==Ot?Math.log2(Math.max(S.width,S.height))+1:A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?S.mipmaps.length:1}function I(A){let S=new WeakRef(A);n.get(A).__ref=S,g.add(S),_.register(A,S,S)}function R(A){let S=n.get(A).__ref;S!==void 0&&(g.delete(S),_.unregister(S))}function D(A){V(A.target)}function U(A){L(A.target)}function V(A){A.removeEventListener("dispose",D),R(A),X(A),A.isVideoTexture&&h.delete(A),A.isHTMLTexture&&u.delete(A)}function L(A){A.removeEventListener("dispose",U),R(A),ne(A)}function H(){for(let A of g){let S=A.deref();S!==void 0&&(S.isRenderTarget===!0?L(S):V(S))}g.clear(),u.clear()}function X(A){let S=n.get(A);if(S.__webglInit===void 0)return;let B=A.source,ae=f.get(B);if(ae){let Q=ae[S.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&G(A),Object.keys(ae).length===0&&f.delete(B)}n.remove(A)}function G(A){let S=n.get(A);i.deleteTexture(S.__webglTexture);let B=A.source,ae=f.get(B);delete ae[S.__cacheKey],a.memory.textures--}function ne(A){let S=n.get(A);S.__depthDisposeCallback&&S.__depthDisposeCallback();let B=A.depthTexture;if(B&&B.renderTarget===A&&V(B),A.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(S.__webglFramebuffer[Q]))for(let pe=0;pe<S.__webglFramebuffer[Q].length;pe++)i.deleteFramebuffer(S.__webglFramebuffer[Q][pe]);else i.deleteFramebuffer(S.__webglFramebuffer[Q]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[Q])}else{if(Array.isArray(S.__webglFramebuffer))for(let Q=0;Q<S.__webglFramebuffer.length;Q++)i.deleteFramebuffer(S.__webglFramebuffer[Q]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Q=0;Q<S.__webglColorRenderbuffer.length;Q++)S.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[Q]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let ae=A.textures;for(let Q=0,pe=ae.length;Q<pe;Q++){let ve=n.get(ae[Q]);ve.__webglTexture&&(i.deleteTexture(ve.__webglTexture),a.memory.textures--),n.remove(ae[Q])}n.remove(A)}let K=0;function ee(){K=0}function O(){return K}function Fe(A){K=A}function qe(){let A=K;return A>=s.maxTextures&&Ke("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+s.maxTextures),K+=1,A}function J(A){let S=[];return S.push(A.wrapS),S.push(A.wrapT),S.push(A.wrapR||0),S.push(A.magFilter),S.push(A.minFilter),S.push(A.anisotropy),S.push(A.internalFormat),S.push(A.format),S.push(A.type),S.push(A.generateMipmaps),S.push(A.mipmapsAutoUpdate),S.push(A.premultiplyAlpha),S.push(A.flipY),S.push(A.unpackAlignment),S.push(A.colorSpace),S.join()}function ye(A,S){let B=n.get(A);if(A.isVideoTexture&&tt(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&B.__version!==A.version){let ae=A.image;if(ae===null)Ke("WebGLRenderer: Texture marked for update but no image data found.");else if(ae.complete===!1)Ke("WebGLRenderer: Texture marked for update but image is incomplete");else{re(B,A,S);return}}else A.isExternalTexture&&(B.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+S)}function Ne(A,S){let B=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){re(B,A,S);return}else A.isExternalTexture&&(B.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+S)}function Oe(A,S){let B=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){re(B,A,S);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+S)}function Se(A,S){let B=n.get(A);if(A.version>0&&B.__version!==A.version){Ee(B,A,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+S)}let We={[Mi]:i.REPEAT,[vn]:i.CLAMP_TO_EDGE,[rr]:i.MIRRORED_REPEAT},Ae={[Dt]:i.NEAREST,[wc]:i.NEAREST_MIPMAP_NEAREST,[Rs]:i.NEAREST_MIPMAP_LINEAR,[Ot]:i.LINEAR,[Er]:i.LINEAR_MIPMAP_NEAREST,[On]:i.LINEAR_MIPMAP_LINEAR},te={[Ff]:i.NEVER,[Hh]:i.ALWAYS,[Uf]:i.LESS,[zh]:i.LEQUAL,[Of]:i.EQUAL,[Gh]:i.GEQUAL,[kf]:i.GREATER,[Bf]:i.NOTEQUAL};function Me(A,S){if(S.type===Pn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Ot||S.magFilter===Er||S.magFilter===Rs||S.magFilter===On||S.minFilter===Ot||S.minFilter===Er||S.minFilter===Rs||S.minFilter===On)&&Ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,We[S.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,We[S.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,We[S.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,Ae[S.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,Ae[S.minFilter]),S.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,te[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Dt||S.minFilter!==Rs&&S.minFilter!==On||S.type===Pn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Te(A,S){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,S.addEventListener("dispose",D),I(S));let ae=S.source,Q=f.get(ae);Q===void 0&&(Q={},f.set(ae,Q));let pe=J(S);if(pe!==A.__cacheKey){Q[pe]===void 0&&(Q[pe]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Q[pe].usedTimes++;let ve=Q[A.__cacheKey];ve!==void 0&&(Q[A.__cacheKey].usedTimes--,ve.usedTimes===0&&G(S)),A.__cacheKey=pe,A.__webglTexture=Q[pe].texture}return B}function W(A,S,B){return Math.floor(Math.floor(A/B)/S)}function ie(A,S,B,ae){let pe=A.updateRanges;if(pe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,S.width,S.height,B,ae,S.data);else{pe.sort((C,$)=>C.start-$.start);let ve=0;for(let C=1;C<pe.length;C++){let $=pe[ve],j=pe[C],be=$.start+$.count,fe=W(j.start,S.width,4),de=W($.start,S.width,4);j.start<=be+1&&fe===de&&W(j.start+j.count-1,S.width,4)===fe?$.count=Math.max($.count,j.start+j.count-$.start):(++ve,pe[ve]=j)}pe.length=ve+1;let Y=t.getParameter(i.UNPACK_ROW_LENGTH),Z=t.getParameter(i.UNPACK_SKIP_PIXELS),ue=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,S.width);for(let C=0,$=pe.length;C<$;C++){let j=pe[C],be=Math.floor(j.start/4),fe=Math.ceil(j.count/4),de=be%S.width,Ve=Math.floor(be/S.width),st=fe,le=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,de),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ve),t.texSubImage2D(i.TEXTURE_2D,0,de,Ve,st,le,B,ae,S.data)}A.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Y),t.pixelStorei(i.UNPACK_SKIP_PIXELS,Z),t.pixelStorei(i.UNPACK_SKIP_ROWS,ue)}}function re(A,S,B){let ae=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(ae=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(ae=i.TEXTURE_3D);let Q=Te(A,S),pe=S.source;t.bindTexture(ae,A.__webglTexture,i.TEXTURE0+B);let ve=n.get(pe);if(pe.version!==ve.__version||Q===!0){if(t.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){let le=ot.getPrimaries(ot.workingColorSpace),Je=S.colorSpace===Oi?null:ot.getPrimaries(S.colorSpace),rt=S.colorSpace===Oi||le===Je?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,rt)}t.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment);let Z=b(S.image,!1,s.maxTextureSize);Z=Ye(S,Z);let ue=r.convert(S.format,S.colorSpace),C=r.convert(S.type),$=w(S.internalFormat,ue,C,S.normalized,S.colorSpace,S.isVideoTexture);Me(ae,S);let j,be=S.mipmaps,fe=S.isVideoTexture!==!0,de=ve.__version===void 0||Q===!0,Ve=pe.dataReady,st=M(S,Z);if(S.isDepthTexture)$=x(S.format===Ui,S.type),de&&(fe?t.texStorage2D(i.TEXTURE_2D,1,$,Z.width,Z.height):t.texImage2D(i.TEXTURE_2D,0,$,Z.width,Z.height,0,ue,C,null));else if(S.isDataTexture)if(be.length>0){fe&&de&&t.texStorage2D(i.TEXTURE_2D,st,$,be[0].width,be[0].height);for(let le=0,Je=be.length;le<Je;le++)j=be[le],fe?Ve&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,j.width,j.height,ue,C,j.data):t.texImage2D(i.TEXTURE_2D,le,$,j.width,j.height,0,ue,C,j.data);S.generateMipmaps=!1}else fe?(de&&t.texStorage2D(i.TEXTURE_2D,st,$,Z.width,Z.height),Ve&&ie(S,Z,ue,C)):t.texImage2D(i.TEXTURE_2D,0,$,Z.width,Z.height,0,ue,C,Z.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){fe&&de&&t.texStorage3D(i.TEXTURE_2D_ARRAY,st,$,be[0].width,be[0].height,Z.depth);for(let le=0,Je=be.length;le<Je;le++)if(j=be[le],S.format!==Tn)if(ue!==null)if(fe){if(Ve)if(S.layerUpdates.size>0){let rt=Qh(j.width,j.height,S.format,S.type);for(let Re of S.layerUpdates){let mt=j.data.subarray(Re*rt/j.data.BYTES_PER_ELEMENT,(Re+1)*rt/j.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,Re,j.width,j.height,1,ue,mt)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,0,j.width,j.height,Z.depth,ue,j.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,le,$,j.width,j.height,Z.depth,0,j.data,0,0);else Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else fe?Ve&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,le,0,0,0,j.width,j.height,Z.depth,ue,C,j.data):t.texImage3D(i.TEXTURE_2D_ARRAY,le,$,j.width,j.height,Z.depth,0,ue,C,j.data);S.layerUpdates.size>0&&S.clearLayerUpdates()}else{fe&&de&&t.texStorage2D(i.TEXTURE_2D,st,$,be[0].width,be[0].height);for(let le=0,Je=be.length;le<Je;le++)j=be[le],S.format!==Tn?ue!==null?fe?Ve&&t.compressedTexSubImage2D(i.TEXTURE_2D,le,0,0,j.width,j.height,ue,j.data):t.compressedTexImage2D(i.TEXTURE_2D,le,$,j.width,j.height,0,j.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):fe?Ve&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,j.width,j.height,ue,C,j.data):t.texImage2D(i.TEXTURE_2D,le,$,j.width,j.height,0,ue,C,j.data)}else if(S.isDataArrayTexture)if(fe){if(de&&t.texStorage3D(i.TEXTURE_2D_ARRAY,st,$,Z.width,Z.height,Z.depth),Ve)if(S.layerUpdates.size>0){let le=Qh(Z.width,Z.height,S.format,S.type);for(let Je of S.layerUpdates){let rt=Z.data.subarray(Je*le/Z.data.BYTES_PER_ELEMENT,(Je+1)*le/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Je,Z.width,Z.height,1,ue,C,rt)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ue,C,Z.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,$,Z.width,Z.height,Z.depth,0,ue,C,Z.data);else if(S.isData3DTexture)fe?(de&&t.texStorage3D(i.TEXTURE_3D,st,$,Z.width,Z.height,Z.depth),Ve&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ue,C,Z.data)):t.texImage3D(i.TEXTURE_3D,0,$,Z.width,Z.height,Z.depth,0,ue,C,Z.data);else if(S.isFramebufferTexture){if(de)if(fe)t.texStorage2D(i.TEXTURE_2D,st,$,Z.width,Z.height);else{let le=Z.width,Je=Z.height;for(let rt=0;rt<st;rt++)t.texImage2D(i.TEXTURE_2D,rt,$,le,Je,0,ue,C,null),le>>=1,Je>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in i){let le=i.canvas;if(le.hasAttribute("layoutsubtree")||le.setAttribute("layoutsubtree","true"),Z.parentNode!==le){le.appendChild(Z),u.add(S),le.onpaint=Je=>{let rt=Je.changedElements;for(let Re of u)rt.includes(Re.image)&&(Re.needsUpdate=!0)},le.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Z);else{let rt=i.RGBA,Re=i.RGBA,mt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,rt,Re,mt,Z)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(be.length>0){if(fe&&de){let le=$e(be[0]);t.texStorage2D(i.TEXTURE_2D,st,$,le.width,le.height)}for(let le=0,Je=be.length;le<Je;le++)j=be[le],fe?Ve&&t.texSubImage2D(i.TEXTURE_2D,le,0,0,ue,C,j):t.texImage2D(i.TEXTURE_2D,le,$,ue,C,j);S.generateMipmaps=!1}else if(fe){if(de){let le=$e(Z);t.texStorage2D(i.TEXTURE_2D,st,$,le.width,le.height)}Ve&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ue,C,Z)}else t.texImage2D(i.TEXTURE_2D,0,$,ue,C,Z);y(S)&&S.mipmapsAutoUpdate===!0&&v(ae),ve.__version=pe.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function Ee(A,S,B){if(S.image.length!==6)return;let ae=Te(A,S),Q=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+B);let pe=n.get(Q);if(Q.version!==pe.__version||ae===!0){t.activeTexture(i.TEXTURE0+B);let ve=ot.getPrimaries(ot.workingColorSpace),Y=S.colorSpace===Oi?null:ot.getPrimaries(S.colorSpace),Z=S.colorSpace===Oi||ve===Y?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);let ue=S.isCompressedTexture||S.image[0].isCompressedTexture,C=S.image[0]&&S.image[0].isDataTexture,$=[];for(let Re=0;Re<6;Re++)!ue&&!C?$[Re]=b(S.image[Re],!0,s.maxCubemapSize):$[Re]=C?S.image[Re].image:S.image[Re],$[Re]=Ye(S,$[Re]);let j=$[0],be=r.convert(S.format,S.colorSpace),fe=r.convert(S.type),de=w(S.internalFormat,be,fe,S.normalized,S.colorSpace),Ve=S.isVideoTexture!==!0,st=pe.__version===void 0||ae===!0,le=Q.dataReady,Je=M(S,j);Me(i.TEXTURE_CUBE_MAP,S);let rt;if(S.isDepthTexture){if(de=x(S.format===Ui,S.type),st)if(Ve)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,de,j.width,j.height);else for(let Re=0;Re<6;Re++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,de,j.width,j.height,0,be,fe,null)}else if(ue){Ve&&st&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Je,de,j.width,j.height);for(let Re=0;Re<6;Re++){rt=$[Re].mipmaps;for(let mt=0;mt<rt.length;mt++){let Ft=rt[mt];S.format!==Tn?be!==null?Ve?le&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,mt,0,0,Ft.width,Ft.height,be,Ft.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,mt,de,Ft.width,Ft.height,0,Ft.data):Ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ve?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,mt,0,0,Ft.width,Ft.height,be,fe,Ft.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,mt,de,Ft.width,Ft.height,0,be,fe,Ft.data)}}}else{if(rt=S.mipmaps,Ve&&st){rt.length>0&&Je++;let Re=$e($[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Je,de,Re.width,Re.height)}for(let Re=0;Re<6;Re++)if(C){Ve?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,0,0,$[Re].width,$[Re].height,be,fe,$[Re].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,de,$[Re].width,$[Re].height,0,be,fe,$[Re].data);for(let mt=0;mt<rt.length;mt++){let Ln=rt[mt].image[Re].image;Ve?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,mt+1,0,0,Ln.width,Ln.height,be,fe,Ln.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,mt+1,de,Ln.width,Ln.height,0,be,fe,Ln.data)}}else{Ve?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,0,0,be,fe,$[Re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,0,de,be,fe,$[Re]);for(let mt=0;mt<rt.length;mt++){let Ft=rt[mt];Ve?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,mt+1,0,0,be,fe,Ft.image[Re]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Re,mt+1,de,be,fe,Ft.image[Re])}}}y(S)&&S.mipmapsAutoUpdate===!0&&v(i.TEXTURE_CUBE_MAP),pe.__version=Q.version,S.onUpdate&&S.onUpdate(S)}A.__version=S.version}function ce(A,S,B,ae,Q,pe){let ve=r.convert(B.format,B.colorSpace),Y=r.convert(B.type),Z=w(B.internalFormat,ve,Y,B.normalized,B.colorSpace),ue=n.get(S),C=n.get(B);if(C.__renderTarget=S,!ue.__hasExternalTextures){let $=Math.max(1,S.width>>pe),j=Math.max(1,S.height>>pe);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,pe,Z,$,j,S.depth,0,ve,Y,null):t.texImage2D(Q,pe,Z,$,j,0,ve,Y,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),me(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ae,Q,C.__webglTexture,0,pt(S)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ae,Q,C.__webglTexture,pe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ke(A,S,B){if(i.bindRenderbuffer(i.RENDERBUFFER,A),S.depthBuffer){let ae=S.depthTexture,Q=ae&&ae.isDepthTexture?ae.type:null,pe=x(S.stencilBuffer,Q),ve=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;me(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt(S),pe,S.width,S.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt(S),pe,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,pe,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ve,i.RENDERBUFFER,A)}else{let ae=S.textures;for(let Q=0;Q<ae.length;Q++){let pe=ae[Q],ve=r.convert(pe.format,pe.colorSpace),Y=r.convert(pe.type),Z=w(pe.internalFormat,ve,Y,pe.normalized,pe.colorSpace);me(S)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt(S),Z,S.width,S.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt(S),Z,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Z,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function _e(A,S,B){let ae=S.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let Q=n.get(S.depthTexture);Q.__renderTarget=S;let pe=ae?S.depthTexture.image[0]:S.depthTexture.image;(!Q.__webglTexture||pe.width!==S.width||pe.height!==S.height)&&(pe.width=S.width,pe.height=S.height,S.depthTexture.needsUpdate=!0),ae?Se(S.depthTexture,0):ye(S.depthTexture,0);let ve=Q.__webglTexture,Y=pt(S),Z=ae?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,ue=S.depthTexture.format===Ui?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(S.depthTexture.format===Ti)me(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ue,Z,ve,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,ue,Z,ve,0);else if(S.depthTexture.format===Ui)me(S)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ue,Z,ve,0,Y):i.framebufferTexture2D(i.FRAMEBUFFER,ue,Z,ve,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function je(A){let S=n.get(A),B=A.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==A.depthTexture){let ae=A.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),ae){let Q=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,ae.removeEventListener("dispose",Q)};ae.addEventListener("dispose",Q),S.__depthDisposeCallback=Q}S.__boundDepthTexture=ae}if(A.depthTexture&&!S.__autoAllocateDepthBuffer)if(B)for(let ae=0;ae<6;ae++)_e(S.__webglFramebuffer[ae],A,ae);else A.texture.mipmaps.length>0?_e(S.__webglFramebuffer[0],A,0):_e(S.__webglFramebuffer,A,0);else if(B){S.__webglDepthbuffer=[];for(let ae=0;ae<6;ae++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[ae]),S.__webglDepthbuffer[ae]===void 0)S.__webglDepthbuffer[ae]=i.createRenderbuffer(),ke(S.__webglDepthbuffer[ae],A,!1);else{let Q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=S.__webglDepthbuffer[ae];i.bindRenderbuffer(i.RENDERBUFFER,pe),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,pe)}}else if(A.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),ke(S.__webglDepthbuffer,A,!1);else{let Q=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,pe),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,pe)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ge(A,S,B){let ae=n.get(A);S!==void 0&&ce(ae.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&je(A)}function Qe(A){let S=A.texture,B=n.get(A),ae=n.get(S);A.addEventListener("dispose",U),I(A);let Q=A.textures,pe=A.isWebGLCubeRenderTarget===!0,ve=Q.length>1;if(ve||(ae.__webglTexture===void 0&&(ae.__webglTexture=i.createTexture()),ae.__version=S.version,a.memory.textures++),pe){B.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(S.mipmaps.length>0){B.__webglFramebuffer[Y]=[];for(let Z=0;Z<S.mipmaps.length;Z++)B.__webglFramebuffer[Y][Z]=i.createFramebuffer()}else B.__webglFramebuffer[Y]=i.createFramebuffer()}else{if(S.mipmaps.length>0){B.__webglFramebuffer=[];for(let Y=0;Y<S.mipmaps.length;Y++)B.__webglFramebuffer[Y]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(ve)for(let Y=0,Z=Q.length;Y<Z;Y++){let ue=n.get(Q[Y]);ue.__webglTexture===void 0&&(ue.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&me(A)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Y=0;Y<Q.length;Y++){let Z=Q[Y];B.__webglColorRenderbuffer[Y]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[Y]);let ue=r.convert(Z.format,Z.colorSpace),C=r.convert(Z.type),$=w(Z.internalFormat,ue,C,Z.normalized,Z.colorSpace,A.isXRRenderTarget===!0),j=pt(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,j,$,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,B.__webglColorRenderbuffer[Y])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),ke(B.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(pe){t.bindTexture(i.TEXTURE_CUBE_MAP,ae.__webglTexture),Me(i.TEXTURE_CUBE_MAP,S);for(let Y=0;Y<6;Y++)if(S.mipmaps.length>0)for(let Z=0;Z<S.mipmaps.length;Z++)ce(B.__webglFramebuffer[Y][Z],A,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Z);else ce(B.__webglFramebuffer[Y],A,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);y(S)?v(i.TEXTURE_CUBE_MAP):S.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,S.mipmaps.length-1),t.unbindTexture()}else if(ve){for(let Y=0,Z=Q.length;Y<Z;Y++){let ue=Q[Y],C=n.get(ue),$=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&($=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture($,C.__webglTexture),Me($,ue),ce(B.__webglFramebuffer,A,ue,i.COLOR_ATTACHMENT0+Y,$,0),y(ue)&&v($)}t.unbindTexture()}else{let Y=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Y=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Y,ae.__webglTexture),Me(Y,S),S.mipmaps.length>0)for(let Z=0;Z<S.mipmaps.length;Z++)ce(B.__webglFramebuffer[Z],A,S,i.COLOR_ATTACHMENT0,Y,Z);else ce(B.__webglFramebuffer,A,S,i.COLOR_ATTACHMENT0,Y,0);y(S)?v(Y):S.mipmaps.length>0&&i.texParameteri(Y,i.TEXTURE_MAX_LEVEL,S.mipmaps.length-1),t.unbindTexture()}A.depthBuffer&&je(A)}function F(A){let S=A.textures;for(let B=0,ae=S.length;B<ae;B++){let Q=S[B];if(y(Q)&&Q.mipmapsAutoUpdate===!0){let pe=E(A),ve=n.get(Q).__webglTexture;t.bindTexture(pe,ve),v(pe),t.unbindTexture()}}}let At=[];function Ie(A){if(A.samples>0){if(me(A)===!1){let S=A.textures,B=A.width,ae=A.height,Q=i.COLOR_BUFFER_BIT,pe=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ve=n.get(A),Y=S.length>1;if(Y)for(let ue=0;ue<S.length;ue++)t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer),A.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let ue=0;ue<S.length;ue++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),Y){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ve.__webglColorRenderbuffer[ue]);let C=n.get(S[ue]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,C,0)}i.blitFramebuffer(0,0,B,ae,0,0,B,ae,Q,i.NEAREST),c===!0&&(At.length=0,At.push(i.COLOR_ATTACHMENT0+ue),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&At.push(pe),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,At))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Y)for(let ue=0;ue<S.length;ue++){t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,ve.__webglColorRenderbuffer[ue]);let C=n.get(S[ue]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ve.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,C,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&c){let S=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function pt(A){return Math.min(s.maxSamples,A.samples)}function me(A){let S=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function tt(A){let S=a.render.frame;h.get(A)!==S&&(h.set(A,S),A.update())}function Ye(A,S){let B=A.colorSpace,ae=A.format,Q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||B!==pn&&B!==Oi&&(ot.getTransfer(B)===xt?(ae!==Tn||Q!==Mn)&&Ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):et("WebGLTextures: Unsupported texture color space:",B)),S}function $e(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=qe,this.resetTextureUnits=ee,this.getTextureUnits=O,this.setTextureUnits=Fe,this.setTexture2D=ye,this.setTexture2DArray=Ne,this.setTexture3D=Oe,this.setTextureCube=Se,this.rebindTextures=Ge,this.setupRenderTarget=Qe,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=Ie,this.setupDepthRenderbuffer=je,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=me,this.dispose=H}function Nv(i,e){function t(n,s=Oi){let r,a=ot.getTransfer(s);if(n===Mn)return i.UNSIGNED_BYTE;if(n===Rc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Cc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Fh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Uh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Dh)return i.BYTE;if(n===Nh)return i.SHORT;if(n===wr)return i.UNSIGNED_SHORT;if(n===Ac)return i.INT;if(n===Cn)return i.UNSIGNED_INT;if(n===Pn)return i.FLOAT;if(n===bn)return i.HALF_FLOAT;if(n===Oh)return i.ALPHA;if(n===kh)return i.RGB;if(n===Tn)return i.RGBA;if(n===Ti)return i.DEPTH_COMPONENT;if(n===Ui)return i.DEPTH_STENCIL;if(n===Pc)return i.RED;if(n===Ic)return i.RED_INTEGER;if(n===ts)return i.RG;if(n===Lc)return i.RG_INTEGER;if(n===Dc)return i.RGBA_INTEGER;if(n===qa||n===Xa||n===Ka||n===ja)if(a===xt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===qa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Xa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ka)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ja)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===qa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Xa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ka)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ja)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Nc||n===Fc||n===Uc||n===Oc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Nc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Fc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Uc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Oc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===kc||n===Bc||n===zc||n===Gc||n===Hc||n===Ja||n===Vc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===kc||n===Bc)return a===xt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===zc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Gc)return r.COMPRESSED_R11_EAC;if(n===Hc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ja)return r.COMPRESSED_RG11_EAC;if(n===Vc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Wc||n===qc||n===Xc||n===Kc||n===jc||n===Jc||n===Yc||n===Zc||n===$c||n===Qc||n===el||n===tl||n===nl||n===il)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Wc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===qc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Xc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Kc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===jc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Jc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Yc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Zc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===$c)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Qc)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===el)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===tl)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===nl)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===il)return a===xt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===sl||n===rl||n===al)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===sl)return a===xt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===rl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===al)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ol||n===cl||n===Ya||n===ll)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===ol)return r.COMPRESSED_RED_RGTC1_EXT;if(n===cl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ya)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ll)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Cs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Fv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Uv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,fu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new xa(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Wt({vertexShader:Fv,fragmentShader:Uv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Pt(new _s(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},pu=class extends Qn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null,_=typeof XRWebGLBinding<"u",p=new fu,m={},b=t.getContextAttributes(),y=null,v=null,E=[],w=[],x=new se,M=null,I=null,R=new Vt;R.viewport=new St;let D=new Vt;D.viewport=new St;let U=[R,D],V=new Sc,L=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ye=E[J];return ye===void 0&&(ye=new ur,E[J]=ye),ye.getTargetRaySpace()},this.getControllerGrip=function(J){let ye=E[J];return ye===void 0&&(ye=new ur,E[J]=ye),ye.getGripSpace()},this.getHand=function(J){let ye=E[J];return ye===void 0&&(ye=new ur,E[J]=ye),ye.getHandSpace()};function X(J){let ye=w.indexOf(J.inputSource);if(ye===-1)return;let Ne=E[ye];Ne!==void 0&&(Ne.update(J.inputSource,J.frame,l||a),Ne.dispatchEvent({type:J.type,data:J.inputSource}))}function G(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",ne);for(let J=0;J<E.length;J++){let ye=w[J];ye!==null&&(w[J]=null,E[J].disconnect(ye))}L=null,H=null,p.reset();for(let J in m)delete m[J];if(e.setRenderTarget(y),f=null,d=null,u=null,s=null,v=null,qe.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(x.width,x.height,!1),I!==null){let J=I.camera;J.fov=I.fov,J.zoom=I.zoom,J.updateProjectionMatrix(),I=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&Ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){o=J,n.isPresenting===!0&&Ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(J){l=J},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",G),s.addEventListener("inputsourceschange",ne),b.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(x),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ne=null,Oe=null,Se=null;b.depth&&(Se=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ne=b.stencil?Ui:Ti,Oe=b.stencil?Cs:Cn);let We={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(We),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new Qt(d.textureWidth,d.textureHeight,{format:Tn,type:Mn,depthTexture:new Kn(d.textureWidth,d.textureHeight,Oe,void 0,void 0,void 0,void 0,void 0,void 0,Ne),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let Ne={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,Ne),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Qt(f.framebufferWidth,f.framebufferHeight,{format:Tn,type:Mn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),qe.setContext(s),qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function ne(J){for(let ye=0;ye<J.removed.length;ye++){let Ne=J.removed[ye],Oe=w.indexOf(Ne);Oe>=0&&(w[Oe]=null,E[Oe].disconnect(Ne))}for(let ye=0;ye<J.added.length;ye++){let Ne=J.added[ye],Oe=w.indexOf(Ne);if(Oe===-1){for(let We=0;We<E.length;We++)if(We>=w.length){w.push(Ne),Oe=We;break}else if(w[We]===null){w[We]=Ne,Oe=We;break}if(Oe===-1)break}let Se=E[Oe];Se&&Se.connect(Ne)}}function K(J,ye){ye===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ye.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let ye=J.near,Ne=J.far;p.texture!==null&&(p.depthNear>0&&(ye=p.depthNear),p.depthFar>0&&(Ne=p.depthFar)),V.near=D.near=R.near=ye,V.far=D.far=R.far=Ne,(L!==V.near||H!==V.far)&&(s.updateRenderState({depthNear:V.near,depthFar:V.far}),L=V.near,H=V.far),V.layers.mask=J.layers.mask|6,R.layers.mask=V.layers.mask&-5,D.layers.mask=V.layers.mask&-3;let Oe=J.parent,Se=V.cameras;K(V,Oe);for(let We=0;We<Se.length;We++)K(Se[We],Oe);V.projectionMatrix.copy(R.projectionMatrix),V.projectionMatrixInverse.copy(R.projectionMatrixInverse),I===null&&J.isPerspectiveCamera&&(I={camera:J,fov:J.fov,zoom:J.zoom}),ee(J,V,Oe)};function ee(J,ye,Ne){Ne===null?J.matrix.copy(ye.matrixWorld):(J.matrix.copy(Ne.matrixWorld),J.matrix.invert(),J.matrix.multiply(ye.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ye.projectionMatrix),J.projectionMatrixInverse.copy(ye.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=fs*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(J){c=J,d!==null&&(d.fixedFoveation=J),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=J)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(V)},this.getCameraTexture=function(J){return m[J]};let O=null;function Fe(J,ye){if(h=ye.getViewerPose(l||a),g=ye,h!==null){let Ne=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let Oe=!1;Ne.length!==V.cameras.length&&(V.cameras.length=0,Oe=!0);for(let te=0;te<Ne.length;te++){let Me=Ne[te],Te=null;if(f!==null)Te=f.getViewport(Me);else{let ie=u.getViewSubImage(d,Me);Te=ie.viewport,te===0&&(e.setRenderTargetTextures(v,ie.colorTexture,ie.depthStencilTexture),e.setRenderTarget(v))}let W=U[te];W===void 0&&(W=new Vt,W.layers.enable(te),W.viewport=new St,U[te]=W),W.matrix.fromArray(Me.transform.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale),W.projectionMatrix.fromArray(Me.projectionMatrix),W.projectionMatrixInverse.copy(W.projectionMatrix).invert(),W.viewport.set(Te.x,Te.y,Te.width,Te.height),te===0&&(V.matrix.copy(W.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),Oe===!0&&V.cameras.push(W)}let Se=s.enabledFeatures;if(Se&&Se.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();let te=u.getDepthInformation(Ne[0]);te&&te.isValid&&te.texture&&p.init(te,s.renderState)}if(Se&&Se.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let te=0;te<Ne.length;te++){let Me=Ne[te].camera;if(Me){let Te=m[Me];Te||(Te=new xa,m[Me]=Te);let W=u.getCameraImage(Me);Te.sourceTexture=W}}}}for(let Ne=0;Ne<E.length;Ne++){let Oe=w[Ne],Se=E[Ne];Oe!==null&&Se!==void 0&&Se.update(Oe,ye,l||a)}O&&O(J,ye),ye.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ye}),g=null}let qe=new _p;qe.setAnimationLoop(Fe),this.setAnimationLoop=function(J){O=J},this.dispose=function(){}}},Ov=new nt,Cp=new it;Cp.set(-1,0,0,0,1,0,0,0,1);function kv(i,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Yh(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,b,y,v){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(p,m):m.isMeshLambertMaterial?(r(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,v)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),_(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?c(p,m,b,y):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===gn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===gn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let b=e.get(m),y=b.envMap,v=b.envMapRotation;y&&(p.envMap.value=y,p.envMapRotation.value.setFromMatrix4(Ov.makeRotationFromEuler(v)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Cp),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,b,y){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*b,p.scale.value=y*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,b){p.ior.value=m.ior,m.diffuseRoughness>0&&(p.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(p.diffuseRoughnessMap.value=m.diffuseRoughnessMap,t(m.diffuseRoughnessMap,p.diffuseRoughnessMapTransform))),m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===gn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.retroreflectivity>0&&(p.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,p.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){let b=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Bv(i,e,t,n){let s={},r={};function a(b,y){let v=y.program;n.uniformBlockBinding(b,v,s[b.id])}function o(b,y){let v=s[b.id];v===void 0&&(g(b),v=c(b),s[b.id]=v,b.addEventListener("dispose",p));let E=y.program;n.updateUBOMapping(b,E);let w=e.render.frame;r[b.id]!==w&&(l(b),r[b.id]=w)}function c(b){let y=i.createBuffer(),v=b.__size,E=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,v,E),i.bindBuffer(i.UNIFORM_BUFFER,null),y}function l(b){let y=s[b.id],v=b.uniforms,E=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let w=0,x=v.length;w<x;w++){let M=v[w];if(Array.isArray(M))for(let I=0,R=M.length;I<R;I++)h(M[I],w,I,E);else h(M,w,0,E)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(b,y,v,E){if(d(b,y,v,E)===!0){let w=b.__offset,x=b.value;if(Array.isArray(x)){let M=0;for(let I=0;I<x.length;I++){let R=x[I],D=_(R,!0);u(R,b.__data,M),M+=D.storage/Float32Array.BYTES_PER_ELEMENT}}else u(x,b.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,w,b.__data)}}function u(b,y,v){typeof b=="number"||typeof b=="boolean"?y[v]=b:b.isMatrix3?(y[v]=b.elements[0],y[v+1]=b.elements[1],y[v+2]=b.elements[2],y[v+3]=0,y[v+4]=b.elements[3],y[v+5]=b.elements[4],y[v+6]=b.elements[5],y[v+7]=0,y[v+8]=b.elements[6],y[v+9]=b.elements[7],y[v+10]=b.elements[8],y[v+11]=0):ArrayBuffer.isView(b)?y.set(b.subarray(0,y.length-v),v):b.toArray(y,v)}function d(b,y,v,E){let w=b.value,x=y+"_"+v;if(Array.isArray(w)){E[x]===void 0&&(E[x]=[]);let M=E[x],I=!1;for(let R=0;R<w.length;R++)f(w[R],M,R)===!0&&(I=!0);return I}return f(w,E,x)}function f(b,y,v){if(y[v]===void 0)return typeof b=="number"||typeof b=="boolean"?y[v]=b:ArrayBuffer.isView(b)?y[v]=b.slice():y[v]=b.clone(),!0;{let E=y[v];if(typeof b=="number"||typeof b=="boolean"){if(E!==b)return y[v]=b,!0}else{if(ArrayBuffer.isView(b))return!0;if(E.equals(b)===!1)return E.copy(b),!0}}return!1}function g(b){let y=b.uniforms,v=0,E=16;for(let x=0,M=y.length;x<M;x++){let I=Array.isArray(y[x])?y[x]:[y[x]];for(let R=0,D=I.length;R<D;R++){let U=I[R],V=Array.isArray(U.value)?U.value:[U.value],L=Array.isArray(y[x])||Array.isArray(U.value),H=v;for(let G=0,ne=V.length;G<ne;G++){let K=V[G],ee=_(K,L),O=v%E,Fe=O%ee.boundary,qe=O+Fe;v+=Fe,qe!==0&&E-qe<ee.storage&&(v+=E-qe),G===0&&(H=v),v+=ee.storage}let X=U.type==="int"?Int32Array:U.type==="uint"?Uint32Array:Float32Array;U.__data=new X((v-H)/Float32Array.BYTES_PER_ELEMENT),U.__offset=H}}let w=v%E;return w>0&&(v+=E-w),b.__size=v,b.__cache={},this}function _(b,y){let v={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(v.boundary=4,v.storage=4):b.isVector2?(v.boundary=8,v.storage=8):b.isVector3||b.isColor?(v.boundary=16,v.storage=12):b.isVector4?(v.boundary=16,v.storage=16):b.isMatrix3?(v.boundary=16,v.storage=48):b.isMatrix4?(v.boundary=16,v.storage=64):b.isTexture?Ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(b)?(v.boundary=16,v.storage=b.byteLength):Ke("WebGLRenderer: Unsupported uniform value type.",b),y===!0&&(v.boundary=16,v.storage=Math.ceil(v.storage/16)*16),v}function p(b){let y=b.target;y.removeEventListener("dispose",p),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function m(){for(let b in s)i.deleteBuffer(s[b]);s={},r={}}return{bind:a,update:o,dispose:m}}var zv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),oi=null;function Gv(){return oi===null&&(oi=new Zi(zv,16,16,ts,bn),oi.name="DFG_LUT",oi.minFilter=Ot,oi.magFilter=Ot,oi.wrapS=vn,oi.wrapT=vn,oi.generateMipmaps=!1,oi.needsUpdate=!0),oi}var pl=class{constructor(e={}){let{canvas:t=zf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Mn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;let _=f,p=new Set([Dc,Lc,Ic]),m=new Set([Mn,Cn,wr,Cs,Rc,Cc]),b=new Uint32Array(4),y=new Int32Array(4),v={textures:[],min:[],max:[],resolution:[]},E=null,w=null,x=[],M=[],I=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ai,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,D=!1,U=null,V=null,L=null,H=null;this._outputColorSpace=yt;let X=0,G=0,ne=null,K=-1,ee=null,O=new St,Fe=new St,qe=null,J=new De(0),ye=0,Ne=t.width,Oe=t.height,Se=1,We=null,Ae=null,te=new St(0,0,Ne,Oe),Me=new St(0,0,Ne,Oe),Te=!1,W=new $i,ie=new rc,re=!1,Ee=!1,ce=new nt,ke=new P,_e=new St,je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ge=!1;function Qe(){return ne===null?Se:1}let F=n;function At(T,N){return t.getContext(T,N)}let Ie,pt,me,tt,Ye,$e,A,S,B,ae,Q,pe,ve,Y,Z,ue,C,$,j,be,fe,de,Ve;try{let T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",Je,!1),t.addEventListener("webglcontextrestored",rt,!1),t.addEventListener("webglcontextcreationerror",Re,!1),F===null){let N="webgl2";if(F=At(N,T),F===null)throw At(N)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}st()}catch(T){throw t.removeEventListener("webglcontextlost",Je,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",Re,!1),et("WebGLRenderer: "+T.message),T}function st(){Ie=new $x(F),Ie.init(),fe=new Nv(F,Ie),pt=new Gx(F,Ie,e,fe),me=new Lv(F,Ie),pt.reversedDepthBuffer&&d&&me.buffers.depth.setReversed(!0),V=F.createFramebuffer(),L=F.createFramebuffer(),H=F.createFramebuffer(),tt=new t_(F),Ye=new xv,$e=new Dv(F,Ie,me,Ye,pt,fe,tt),A=new Zx(R),S=new i0(F),de=new Bx(F,S),B=new Qx(F,S,tt,de),ae=new i_(F,B,S,de,tt),$=new n_(F,pt,$e),Z=new Hx(Ye),Q=new bv(R,A,Ie,pt,de,Z),pe=new kv(R,Ye),ve=new vv,Y=new wv(Ie),C=new kx(R,A,me,ae,g,c),ue=new Iv(R,ae,pt),Ve=new Bv(F,tt,pt,me),j=new zx(F,Ie,tt),be=new e_(F,Ie,tt),tt.programs=Q.programs,R.capabilities=pt,R.extensions=Ie,R.properties=Ye,R.renderLists=ve,R.shadowMap=ue,R.state=me,R.info=tt}_!==Mn&&(I=new r_(_,t.width,t.height,o,s,r));let le=new pu(R,F);this.xr=le,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let T=Ie.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=Ie.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return Se},this.setPixelRatio=function(T){T!==void 0&&(Se=T,this.setSize(Ne,Oe,!1))},this.getSize=function(T){return T.set(Ne,Oe)},this.setSize=function(T,N,q=!0){if(le.isPresenting){Ke("WebGLRenderer: Can't change size while VR device is presenting.");return}Ne=T,Oe=N,t.width=Math.floor(T*Se),t.height=Math.floor(N*Se),q===!0&&(t.style.width=T+"px",t.style.height=N+"px"),I!==null&&I.setSize(t.width,t.height),this.setViewport(0,0,T,N)},this.getDrawingBufferSize=function(T){return T.set(Ne*Se,Oe*Se).floor()},this.setDrawingBufferSize=function(T,N,q){Ne=T,Oe=N,Se=q,t.width=Math.floor(T*q),t.height=Math.floor(N*q),this.setViewport(0,0,T,N)},this.setEffects=function(T){if(_===Mn){et("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let N=0;N<T.length;N++)if(T[N].isOutputPass===!0){Ke("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(O)},this.getViewport=function(T){return T.copy(te)},this.setViewport=function(T,N,q,k){T.isVector4?te.set(T.x,T.y,T.z,T.w):te.set(T,N,q,k),me.viewport(O.copy(te).multiplyScalar(Qe()).round())},this.getScissor=function(T){return T.copy(Me)},this.setScissor=function(T,N,q,k){T.isVector4?Me.set(T.x,T.y,T.z,T.w):Me.set(T,N,q,k),me.scissor(Fe.copy(Me).multiplyScalar(Qe()).round())},this.getScissorTest=function(){return Te},this.setScissorTest=function(T){me.setScissorTest(Te=T)},this.setOpaqueSort=function(T){We=T},this.setTransparentSort=function(T){Ae=T},this.getClearColor=function(T){return T.copy(C.getClearColor())},this.setClearColor=function(){C.setClearColor(...arguments)},this.getClearAlpha=function(){return C.getClearAlpha()},this.setClearAlpha=function(){C.setClearAlpha(...arguments)},this.clear=function(T=!0,N=!0,q=!0){let k=0;if(T){let z=!1;if(ne!==null){let ge=ne.texture.format;z=p.has(ge)}if(z){let ge=ne.texture.type,Ue=m.has(ge),xe=C.getClearColor(),oe=C.getClearAlpha(),Ce=xe.r,He=xe.g,at=xe.b;Ue?(b[0]=Ce,b[1]=He,b[2]=at,b[3]=oe,F.clearBufferuiv(F.COLOR,0,b)):(y[0]=Ce,y[1]=He,y[2]=at,y[3]=oe,F.clearBufferiv(F.COLOR,0,y))}else k|=F.COLOR_BUFFER_BIT}N&&(k|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(k|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&F.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),U=T},this.dispose=function(){t.removeEventListener("webglcontextlost",Je,!1),t.removeEventListener("webglcontextrestored",rt,!1),t.removeEventListener("webglcontextcreationerror",Re,!1),C.dispose(),ve.dispose(),Y.dispose(),$e.dispose(),Ye.dispose(),A.dispose(),ae.dispose(),B.dispose(),de.dispose(),Ve.dispose(),Q.dispose(),le.dispose(),le.removeEventListener("sessionstart",Ze),le.removeEventListener("sessionend",_t),gt.stop()};function Je(T){T.preventDefault(),ia("WebGLRenderer: Context Lost."),D=!0}function rt(){ia("WebGLRenderer: Context Restored."),D=!1;let T=tt.autoReset,N=ue.enabled,q=ue.autoUpdate,k=ue.needsUpdate,z=ue.type;st(),tt.autoReset=T,ue.enabled=N,ue.autoUpdate=q,ue.needsUpdate=k,ue.type=z}function Re(T){et("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function mt(T){let N=T.target;N.removeEventListener("dispose",mt),Ft(N)}function Ft(T){Ln(T),Ye.remove(T)}function Ln(T){let N=Ye.get(T).programs;N!==void 0&&(N.forEach(function(q){Q.releaseProgram(q)}),T.isShaderMaterial&&Q.releaseShaderCache(T))}this.renderBufferDirect=function(T,N,q,k,z,ge){N===null&&(N=je);let Ue=z.isMesh&&z.matrixWorld.determinantAffine()<0,xe=po(T,N,q,k,z);me.setMaterial(k,Ue);let oe=q.index,Ce=1;if(k.wireframe===!0){if(oe=B.getWireframeAttribute(q),oe===void 0)return;Ce=2}let He=q.drawRange,at=q.attributes.position,Be=He.start*Ce,ut=(He.start+He.count)*Ce;ge!==null&&(Be=Math.max(Be,ge.start*Ce),ut=Math.min(ut,(ge.start+ge.count)*Ce)),oe!==null?(Be=Math.max(Be,0),ut=Math.min(ut,oe.count)):at!=null&&(Be=Math.max(Be,0),ut=Math.min(ut,at.count));let Bt=ut-Be;if(Bt<0||Bt===1/0)return;de.setup(z,k,xe,q,oe);let wt,Mt=j;if(oe!==null&&(wt=S.get(oe),Mt=be,Mt.setIndex(wt)),z.isMesh)k.wireframe===!0?(me.setLineWidth(k.wireframeLinewidth*Qe()),Mt.setMode(F.LINES)):Mt.setMode(F.TRIANGLES);else if(z.isLine){let nn=k.linewidth;nn===void 0&&(nn=1),me.setLineWidth(nn*Qe()),z.isLineSegments?Mt.setMode(F.LINES):z.isLineLoop?Mt.setMode(F.LINE_LOOP):Mt.setMode(F.LINE_STRIP)}else z.isPoints?Mt.setMode(F.POINTS):z.isSprite&&Mt.setMode(F.TRIANGLES);if(z.isBatchedMesh)if(Ie.get("WEBGL_multi_draw"))Mt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{let nn=z._multiDrawStarts,ze=z._multiDrawCounts,dn=z._multiDrawCount,vt=oe?S.get(oe).bytesPerElement:1,is=Ye.get(k).currentProgram.getUniforms();for(let sn=0;sn<dn;sn++)is.setValue(F,"_gl_DrawID",sn),Mt.render(nn[sn]/vt,ze[sn])}else if(z.isInstancedMesh)Mt.renderInstances(Be,Bt,z.count);else if(q.isInstancedBufferGeometry){let nn=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,ze=Math.min(q.instanceCount,nn);Mt.renderInstances(Be,Bt,ze)}else Mt.render(Be,Bt)};function we(T,N,q,k){U!==null&&T.isNodeMaterial&&U.setObject(k,T),re===!0&&Z.setState(T,q,!1),T.transparent===!0&&T.side===Un&&T.forceSinglePass===!1?(T.side=gn,T.needsUpdate=!0,Gn(T,N,k),T.side=ri,T.needsUpdate=!0,Gn(T,N,k),T.side=Un):Gn(T,N,k)}this.compile=function(T,N,q=null){q===null&&(q=T),U!==null&&U.renderStart(T,N,q),w=Y.get(q),w.init(N),M.push(w),q.traverseVisible(function(z){z.isLight&&z.layers.test(N.layers)&&(w.pushLight(z),z.castShadow&&w.pushShadow(z))}),T!==q&&T.traverseVisible(function(z){z.isLight&&z.layers.test(N.layers)&&(w.pushLight(z),z.castShadow&&w.pushShadow(z))}),w.setupLights(),U!==null&&U.updateLights(w.state.lightsArray),Ee=this.localClippingEnabled,re=Z.init(this.clippingPlanes,Ee),re===!0&&Z.setGlobalState(this.clippingPlanes,N),U!==null&&ue.render(w.state.shadowsArray,q,N);let k=new Set;return T.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;let ge=z.material;if(ge)if(Array.isArray(ge))for(let Ue=0;Ue<ge.length;Ue++){let xe=ge[Ue];we(xe,q,N,z),k.add(xe)}else we(ge,q,N,z),k.add(ge)}),w=M.pop(),U!==null&&U.renderEnd(),k},this.compileAsync=function(T,N,q=null){let k=this.compile(T,N,q);return new Promise(z=>{function ge(){if(k.forEach(function(Ue){let oe=Ye.get(Ue).currentProgram;(oe===void 0||oe.isReady())&&k.delete(Ue)}),k.size===0){z(T);return}setTimeout(ge,10)}Ie.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let he=null;function Xe(T){he&&he(T)}function Ze(){gt.stop()}function _t(){gt.start()}let gt=new _p;gt.setAnimationLoop(Xe),typeof self<"u"&&gt.setContext(self),this.setAnimationLoop=function(T){he=T,le.setAnimationLoop(T),T===null?gt.stop():gt.start()},le.addEventListener("sessionstart",Ze),le.addEventListener("sessionend",_t),this.render=function(T,N){if(N!==void 0&&N.isCamera!==!0){et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;U!==null&&U.renderStart(T,N);let q=le.enabled===!0&&le.isPresenting===!0,k=I!==null&&(ne===null||q)&&I.begin(R,ne);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(le.cameraAutoUpdate===!0&&le.updateCamera(N),N=le.getCamera()),T.isScene===!0&&T.onBeforeRender(R,T,N,ne),w=Y.get(T,M.length),w.init(N),w.state.textureUnits=$e.getTextureUnits(),M.push(w),ce.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),N.isArrayCamera?ie.setFromArrayCamera(N):W.setFromProjectionMatrix(ce,Fn,N.reversedDepth),Ee=this.localClippingEnabled,re=Z.init(this.clippingPlanes,Ee),E=ve.get(T,x.length),E.init(),x.push(E),this.info.render.frame++,le.enabled===!0&&le.isPresenting===!0){let Ue=R.xr.getDepthSensingMesh();Ue!==null&&bt(Ue,N,-1/0,R.sortObjects)}bt(T,N,0,R.sortObjects),E.finish(),U!==null&&U.updateLights(w.state.lightsArray),R.sortObjects===!0&&E.sort(We,Ae),Ge=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,Ge&&C.addToRenderList(E,T),this.info.autoReset===!0&&this.info.reset(),re===!0&&Z.beginShadows();let z=w.state.shadowsArray;if(ue.render(z,T,N),re===!0&&Z.endShadows(),(k&&I.hasRenderPass())===!1){let Ue=E.opaque,xe=E.transmissive;if(w.setupLights(),N.isArrayCamera){let oe=N.cameras;if(xe.length>0)for(let Ce=0,He=oe.length;Ce<He;Ce++){let at=oe[Ce];En(Ue,xe,T,at)}Ge&&C.render(T);for(let Ce=0,He=oe.length;Ce<He;Ce++){let at=oe[Ce];Le(E,T,at,at.viewport)}}else xe.length>0&&En(Ue,xe,T,N),Ge&&C.render(T),Le(E,T,N)}ne!==null&&G===0&&($e.updateMultisampleRenderTarget(ne),$e.updateRenderTargetMipmap(ne)),k&&I.end(R),T.isScene===!0&&T.onAfterRender(R,T,N),de.resetDefaultState(),K=-1,ee=null,M.pop(),M.length>0?(w=M[M.length-1],$e.setTextureUnits(w.state.textureUnits),re===!0&&Z.setGlobalState(R.clippingPlanes,w.state.camera)):w=null,x.pop(),x.length>0?E=x[x.length-1]:E=null,U!==null&&U.renderEnd()};function bt(T,N,q,k){if(T.visible===!1)return;if(T.layers.test(N.layers)){if(T.isGroup)q=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(N);else if(T.isLight)w.pushLight(T),T.castShadow&&w.pushShadow(T);else if(T.isSprite){let Ue=N.isArrayCamera?ie:W;if(!T.frustumCulled||T.intersectsFrustum(Ue)){k&&_e.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ce);let xe=ae.update(T),oe=T.material;oe.visible&&E.push(T,xe,oe,q,_e.z,null,N)}}else if(T.isMesh||T.isLine||T.isPoints){let Ue=N.isArrayCamera?ie:W;if(!T.frustumCulled||T.intersectsFrustum(Ue)){let xe=ae.update(T),oe=T.material;if(k&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),_e.copy(T.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),_e.copy(xe.boundingSphere.center)),_e.applyMatrix4(T.matrixWorld).applyMatrix4(ce)),Array.isArray(oe)){let Ce=xe.groups;for(let He=0,at=Ce.length;He<at;He++){let Be=Ce[He],ut=oe[Be.materialIndex];ut&&ut.visible&&E.push(T,xe,ut,q,_e.z,Be,N)}}else oe.visible&&E.push(T,xe,oe,q,_e.z,null,N)}}}let ge=T.children;for(let Ue=0,xe=ge.length;Ue<xe;Ue++)bt(ge[Ue],N,q,k)}function Le(T,N,q,k){let{opaque:z,transmissive:ge,transparent:Ue}=T;w.setupLightsView(q),re===!0&&Z.setGlobalState(R.clippingPlanes,q),k&&me.viewport(O.copy(k)),z.length>0&&Ht(z,N,q),ge.length>0&&Ht(ge,N,q),Ue.length>0&&Ht(Ue,N,q),me.buffers.depth.setTest(!0),me.buffers.depth.setMask(!0),me.buffers.color.setMask(!0),me.setPolygonOffset(!1)}function En(T,N,q,k){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[k.id]===void 0){let Be=Ie.has("EXT_color_buffer_half_float")||Ie.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[k.id]=new Qt(1,1,{generateMipmaps:!0,type:Be?bn:Mn,minFilter:On,samples:Math.max(4,pt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ot.workingColorSpace})}let ge=w.state.transmissionRenderTarget[k.id],Ue=k.viewport||O;ge.setSize(Ue.z*R.transmissionResolutionScale,Ue.w*R.transmissionResolutionScale);let xe=R.getRenderTarget(),oe=R.getActiveCubeFace(),Ce=R.getActiveMipmapLevel();R.setRenderTarget(ge),R.getClearColor(J),ye=R.getClearAlpha(),ye<1&&R.setClearColor(16777215,.5),R.clear(),Ge&&C.render(q);let He=R.toneMapping;R.toneMapping=ai;let at=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),w.setupLightsView(k),re===!0&&Z.setGlobalState(R.clippingPlanes,k),Ht(T,q,k),$e.updateMultisampleRenderTarget(ge),$e.updateRenderTargetMipmap(ge),Ie.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let ut=0,Bt=N.length;ut<Bt;ut++){let wt=N[ut],{object:Mt,geometry:nn,material:ze,group:dn}=wt;if(ze.side===Un&&Mt.layers.test(k.layers)){let vt=ze.side;ze.side=gn,ze.needsUpdate=!0,Et(Mt,q,k,nn,ze,dn),ze.side=vt,ze.needsUpdate=!0,Be=!0}}Be===!0&&($e.updateMultisampleRenderTarget(ge),$e.updateRenderTargetMipmap(ge))}R.setRenderTarget(xe,oe,Ce),R.setClearColor(J,ye),at!==void 0&&(k.viewport=at),R.toneMapping=He}function Ht(T,N,q){let k=N.isScene===!0?N.overrideMaterial:null;for(let z=0,ge=T.length;z<ge;z++){let Ue=T[z],{object:xe,geometry:oe,group:Ce}=Ue,He=Ue.material;He.allowOverride===!0&&k!==null&&(He=k),xe.layers.test(q.layers)&&Et(xe,N,q,oe,He,Ce)}}function Et(T,N,q,k,z,ge){U!==null&&z.isNodeMaterial&&U.setObject(T,z),T.onBeforeRender(R,N,q,k,z,ge),T.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),z.onBeforeRender(R,N,q,k,T,ge),z.transparent===!0&&z.side===Un&&z.forceSinglePass===!1?(z.side=gn,z.needsUpdate=!0,R.renderBufferDirect(q,N,k,z,T,ge),z.side=ri,z.needsUpdate=!0,R.renderBufferDirect(q,N,k,z,T,ge),z.side=Un):R.renderBufferDirect(q,N,k,z,T,ge),T.onAfterRender(R,N,q,k,z,ge)}function zn(T){let N=0;for(let q of T)q.texture!==null&&N++;return N}function Gn(T,N,q){N.isScene!==!0&&(N=je);let k=Ye.get(T),z=w.state.lights,ge=w.state.shadowsArray,Ue=z.state.version,xe=Q.getParameters(T,z.state,ge,N,q,w.state.lightProbeGridArray),oe=Q.getProgramCacheKey(xe),Ce=k.programs;k.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?N.environment:null,k.fog=N.fog;let He=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;k.envMap=A.get(T.envMap||k.environment,He),k.envMapRotation=k.environment!==null&&T.envMap===null?N.environmentRotation:T.envMapRotation,Ce===void 0&&(T.addEventListener("dispose",mt),Ce=new Map,k.programs=Ce,k.programVariants=new Map);let at=Ce.get(oe);if(at!==void 0){if(k.currentProgram===at&&k.lightsStateVersion===Ue)return Or(T,xe),at}else xe.uniforms=Q.getUniforms(T),U!==null&&T.isNodeMaterial&&U.build(T,q,xe),T.onBeforeCompile(xe,R),at=Q.acquireProgram(xe,oe),Ce.set(oe,at),k.uniforms=xe.uniforms;let Be=k.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Be.clippingPlanes=Z.uniform),Or(T,xe),k.needsLights=kr(T),k.lightsStateVersion=Ue,k.needsLights&&(Be.ambientLightColor.value=z.state.ambient,Be.lightProbe.value=z.state.probe,Be.sunLights.value=z.state.sun,Be.sunLightShadows.value=z.state.sunShadow,Be.directionalLights.value=z.state.directional,Be.directionalLightShadows.value=z.state.directionalShadow,Be.spotLights.value=z.state.spot,Be.spotLightShadows.value=z.state.spotShadow,Be.rectAreaLights.value=z.state.rectArea,Be.ltc_1.value=z.state.rectAreaLTC1,Be.ltc_2.value=z.state.rectAreaLTC2,Be.pointLights.value=z.state.point,Be.pointLightShadows.value=z.state.pointShadow,Be.hemisphereLights.value=z.state.hemi,Be.sunShadowMatrix.value=z.state.sunShadowMatrix,Be.sunShadowCascade.value=z.state.sunShadowCascade,Be.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Be.spotLightMatrix.value=z.state.spotLightMatrix,Be.spotLightMap.value=z.state.spotLightMap,Be.pointShadowMatrix.value=z.state.pointShadowMatrix),k.numLightProbeGrids=zn(w.state.lightProbeGridArray),k.currentProgram=at,k.uniformsList=null,at}function Dn(T,N,q,k,z){let ge=Ye.get(T),Ue=ge.currentProgram.id+","+k+","+z,xe=ge.programVariants.get(Ue);return xe===void 0?(xe=Gn(T,N,q),ge.programVariants.set(Ue,xe)):(ge.currentProgram=xe,ge.uniformsList=null,ge.outputColorSpace=k,ge.toneMapping=z),xe}function fi(T){if(T.uniformsList===null){let N=T.currentProgram.getUniforms();T.uniformsList=Cr.seqWithValue(N.seq,T.uniforms)}return T.uniformsList}function Or(T,N){let q=Ye.get(T);q.outputColorSpace=N.outputColorSpace,q.batching=N.batching,q.batchingColor=N.batchingColor,q.instancing=N.instancing,q.instancingColor=N.instancingColor,q.instancingMorph=N.instancingMorph,q.skinning=N.skinning,q.morphTargets=N.morphTargets,q.morphNormals=N.morphNormals,q.morphColors=N.morphColors,q.morphTargetsCount=N.morphTargetsCount,q.numClippingPlanes=N.numClippingPlanes,q.numIntersection=N.numClipIntersection,q.vertexAlphas=N.vertexAlphas,q.vertexTangents=N.vertexTangents,q.toneMapping=N.toneMapping}function po(T,N,q,k,z){N.isScene!==!0&&(N=je),$e.resetTextureUnits();let ge=N.fog,Ue=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?N.environment:null,xe=ne===null?R.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:ot.workingColorSpace,oe=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Ce=A.get(k.envMap||Ue,oe),He=k.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,at=!!q.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Be=!!q.morphAttributes.position,ut=!!q.morphAttributes.normal,Bt=!!q.morphAttributes.color,wt=ai;k.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(wt=R.toneMapping);let Mt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,nn=Mt!==void 0?Mt.length:0,ze=Ye.get(k),dn=w.state.lights;if(re===!0&&(Ee===!0||T!==ee)){let It=T===ee&&k.id===K;Z.setState(k,T,It)}let vt=!1,is=!1;k.version===ze.__version?ze.needsLights&&ze.lightsStateVersion!==dn.state.version||z.isBatchedMesh&&ze.batching===!1||!z.isBatchedMesh&&ze.batching===!0||z.isBatchedMesh&&ze.batchingColor===!0&&z._colorsTexture===null||z.isBatchedMesh&&ze.batchingColor===!1&&z._colorsTexture!==null||z.isInstancedMesh&&ze.instancing===!1||!z.isInstancedMesh&&ze.instancing===!0||z.isSkinnedMesh&&ze.skinning===!1||!z.isSkinnedMesh&&ze.skinning===!0||z.isInstancedMesh&&ze.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&ze.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&ze.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&ze.instancingMorph===!1&&z.morphTexture!==null||ze.envMap!==Ce||k.fog===!0&&ze.fog!==ge||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==Z.numPlanes||ze.numIntersection!==Z.numIntersection)||ze.vertexAlphas!==He||ze.vertexTangents!==at||ze.morphTargets!==Be||ze.morphNormals!==ut||ze.morphColors!==Bt||ze.morphTargetsCount!==nn||ze.numLightProbeGrids!==zn(w.state.lightProbeGridArray)?vt=!0:(ze.outputColorSpace!==xe||ze.toneMapping!==wt)&&(is=!0):(vt=!0,ze.__version=k.version);let sn=ze.currentProgram;(vt===!0||is===!0)&&(sn=is===!0?Dn(k,N,z,xe,wt):Gn(k,N,z),U&&k.isNodeMaterial&&U.onUpdateProgram(k,sn,ze));let go=!1,Gi=!1,ss=!1,ft=sn.getUniforms(),Zt=ze.uniforms;if(me.useProgram(sn.program)&&(go=!0,Gi=!0,ss=!0),k.id!==K&&(K=k.id,Gi=!0),go||ee!==T){me.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),ft.setValue(F,"projectionMatrix",T.projectionMatrix),ft.setValue(F,"viewMatrix",T.matrixWorldInverse);let jt=ft.map.cameraPosition;jt!==void 0&&jt.setValue(F,ke.setFromMatrixPosition(T.matrixWorld)),pt.logarithmicDepthBuffer&&ft.setValue(F,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ft.setValue(F,"isOrthographic",T.isOrthographicCamera===!0),ee!==T&&(ee=T,Gi=!0,ss=!0)}if(ze.needsLights&&(dn.state.sunShadowMap.length>0&&ft.setValue(F,"sunShadowMap",dn.state.sunShadowMap,$e),dn.state.directionalShadowMap.length>0&&ft.setValue(F,"directionalShadowMap",dn.state.directionalShadowMap,$e),dn.state.spotShadowMap.length>0&&ft.setValue(F,"spotShadowMap",dn.state.spotShadowMap,$e),dn.state.pointShadowMap.length>0&&ft.setValue(F,"pointShadowMap",dn.state.pointShadowMap,$e)),z.isSkinnedMesh){ft.setOptional(F,z,"bindMatrix"),ft.setOptional(F,z,"bindMatrixInverse");let It=z.skeleton;It&&(It.boneTexture===null&&It.computeBoneTexture(),ft.setValue(F,"boneTexture",It.boneTexture,$e))}z.isBatchedMesh&&(ft.setOptional(F,z,"batchingTexture"),ft.setValue(F,"batchingTexture",z._matricesTexture,$e),ft.setOptional(F,z,"batchingIdTexture"),ft.setValue(F,"batchingIdTexture",z._indirectTexture,$e),ft.setOptional(F,z,"batchingColorTexture"),z._colorsTexture!==null&&ft.setValue(F,"batchingColorTexture",z._colorsTexture,$e));let Hn=q.morphAttributes;if((Hn.position!==void 0||Hn.normal!==void 0||Hn.color!==void 0)&&$.update(z,q,sn),(Gi||ze.receiveShadow!==z.receiveShadow)&&(ze.receiveShadow=z.receiveShadow,ft.setValue(F,"receiveShadow",z.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&N.environment!==null&&(Zt.envMapIntensity.value=N.environmentIntensity),Zt.dfgLUT!==void 0&&(Zt.dfgLUT.value=Gv()),Gi){if(ft.setValue(F,"toneMappingExposure",R.toneMappingExposure),ze.needsLights&&mo(Zt,ss),ge&&k.fog===!0&&pe.refreshFogUniforms(Zt,ge),pe.refreshMaterialUniforms(Zt,k,Se,Oe,w.state.transmissionRenderTarget[T.id]),ze.needsLights&&ze.numLightProbeGrids>0){let It=v,jt=0;for(let pi of w.state.lightProbeGridArray)pi.texture!==null&&(It.textures[jt]=pi.texture,It.min[jt]=pi.boundingBox.min,It.max[jt]=pi.boundingBox.max,It.resolution[jt]=pi.resolution,jt++);for(let pi in It)It[pi].length=jt;Zt.probesSH.value=It.textures,Zt.probesMin.value=It.min,Zt.probesMax.value=It.max,Zt.probesResolution.value=It.resolution}Cr.upload(F,fi(ze),Zt,$e)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Cr.upload(F,fi(ze),Zt,$e),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ft.setValue(F,"center",z.center),ft.setValue(F,"modelViewMatrix",z.modelViewMatrix),ft.setValue(F,"normalMatrix",z.normalMatrix),ft.setValue(F,"modelMatrix",z.matrixWorld),k.uniformsGroups!==void 0){let It=k.uniformsGroups;for(let jt=0,pi=It.length;jt<pi;jt++){let ld=It[jt];Ve.update(ld,sn),Ve.bind(ld,sn)}}return sn}function mo(T,N){T.ambientLightColor.needsUpdate=N,T.lightProbe.needsUpdate=N,T.sunLights.needsUpdate=N,T.sunLightShadows.needsUpdate=N,T.directionalLights.needsUpdate=N,T.directionalLightShadows.needsUpdate=N,T.pointLights.needsUpdate=N,T.pointLightShadows.needsUpdate=N,T.spotLights.needsUpdate=N,T.spotLightShadows.needsUpdate=N,T.rectAreaLights.needsUpdate=N,T.hemisphereLights.needsUpdate=N}function kr(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(T,N,q){let k=Ye.get(T);k.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),Ye.get(T.texture).__webglTexture=N,Ye.get(T.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:q,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,N){let q=Ye.get(T);q.__webglFramebuffer=N,q.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(T,N=0,q=0){ne=T,X=N,G=q;let k=null,z=!1,ge=!1;if(T){let xe=Ye.get(T);if(xe.__useDefaultFramebuffer!==void 0){me.bindFramebuffer(F.FRAMEBUFFER,xe.__webglFramebuffer),O.copy(T.viewport),Fe.copy(T.scissor),qe=T.scissorTest,me.viewport(O),me.scissor(Fe),me.setScissorTest(qe),K=-1;return}else if(xe.__webglFramebuffer===void 0)$e.setupRenderTarget(T);else if(xe.__hasExternalTextures)$e.rebindTextures(T,Ye.get(T.texture).__webglTexture,Ye.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let He=T.depthTexture;if(xe.__boundDepthTexture!==He){if(He!==null&&Ye.has(He)&&(T.width!==He.image.width||T.height!==He.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$e.setupDepthRenderbuffer(T)}}let oe=T.texture;(oe.isData3DTexture||oe.isDataArrayTexture||oe.isCompressedArrayTexture)&&(ge=!0);let Ce=Ye.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ce[N])?k=Ce[N][q]:k=Ce[N],z=!0):T.samples>0&&$e.useMultisampledRTT(T)===!1?k=Ye.get(T).__webglMultisampledFramebuffer:Array.isArray(Ce)?k=Ce[q]:k=Ce,O.copy(T.viewport),Fe.copy(T.scissor),qe=T.scissorTest}else O.copy(te).multiplyScalar(Se).floor(),Fe.copy(Me).multiplyScalar(Se).floor(),qe=Te;if(q!==0&&(k=V),me.bindFramebuffer(F.FRAMEBUFFER,k)&&me.drawBuffers(T,k),me.viewport(O),me.scissor(Fe),me.setScissorTest(qe),z){let xe=Ye.get(T.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+N,xe.__webglTexture,q)}else if(ge){let xe=N;for(let oe=0;oe<T.textures.length;oe++){let Ce=Ye.get(T.textures[oe]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+oe,Ce.__webglTexture,q,xe)}}else if(T!==null&&q!==0){let xe=Ye.get(T.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,xe.__webglTexture,q)}K=-1};function ks(T){let N=Ye.get(T);return(N.__readFormat!==T.format||N.__readType!==T.type)&&(N.__readFormat=T.format,N.__readType=T.type,N.__formatReadable=pt.textureFormatReadable(T.format),N.__typeReadable=pt.textureTypeReadable(T.type)),N}this.readRenderTargetPixels=function(T,N,q,k,z,ge,Ue,xe=0){if(!(T&&T.isWebGLRenderTarget)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let oe=Ye.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ue!==void 0&&(oe=oe[Ue],Array.isArray(oe)&&(oe=oe[0])),oe){me.bindFramebuffer(F.FRAMEBUFFER,oe);try{let Ce=T.textures[xe],He=Ce.format,at=Ce.type;T.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+xe);let Be=ks(Ce);if(Be.__formatReadable===!1){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Be.__typeReadable===!1){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=T.width-k&&q>=0&&q<=T.height-z&&F.readPixels(N,q,k,z,fe.convert(He),fe.convert(at),ge)}finally{let Ce=ne!==null?Ye.get(ne).__webglFramebuffer:null;me.bindFramebuffer(F.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(T,N,q,k,z,ge,Ue,xe=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let oe=Ye.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ue!==void 0&&(oe=oe[Ue],Array.isArray(oe)&&(oe=oe[0])),oe)if(N>=0&&N<=T.width-k&&q>=0&&q<=T.height-z){me.bindFramebuffer(F.FRAMEBUFFER,oe);let Ce=T.textures[xe],He=Ce.format,at=Ce.type;T.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+xe);let Be=ks(Ce);if(Be.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Be.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ut=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,ut),F.bufferData(F.PIXEL_PACK_BUFFER,ge.byteLength,F.STREAM_READ),F.readPixels(N,q,k,z,fe.convert(He),fe.convert(at),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let Bt=ne!==null?Ye.get(ne).__webglFramebuffer:null;me.bindFramebuffer(F.FRAMEBUFFER,Bt);let wt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Hf(F,wt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,ut),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,ge),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(ut),F.deleteSync(wt),ge}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,N=null,q=0){let k=Math.pow(2,-q),z=Math.floor(T.image.width*k),ge=Math.floor(T.image.height*k),Ue=N!==null?N.x:0,xe=N!==null?N.y:0;$e.setTexture2D(T,0),F.copyTexSubImage2D(F.TEXTURE_2D,q,0,0,Ue,xe,z,ge),me.unbindTexture()},this.copyTextureToTexture=function(T,N,q=null,k=null,z=0,ge=0){let Ue,xe,oe,Ce,He,at,Be,ut,Bt,wt=T.isCompressedTexture?T.mipmaps[ge]:T.image;if(q!==null)Ue=q.max.x-q.min.x,xe=q.max.y-q.min.y,oe=q.isBox3?q.max.z-q.min.z:1,Ce=q.min.x,He=q.min.y,at=q.isBox3?q.min.z:0;else{let ft=Math.pow(2,-z);Ue=Math.floor(wt.width*ft),xe=Math.floor(wt.height*ft),T.isDataArrayTexture?oe=wt.depth:T.isData3DTexture?oe=Math.floor(wt.depth*ft):oe=1,Ce=0,He=0,at=0}k!==null?(Be=k.x,ut=k.y,Bt=k.z):(Be=0,ut=0,Bt=0);let Mt=fe.convert(N.format),nn=fe.convert(N.type),ze;N.isData3DTexture?($e.setTexture3D(N,0),ze=F.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?($e.setTexture2DArray(N,0),ze=F.TEXTURE_2D_ARRAY):($e.setTexture2D(N,0),ze=F.TEXTURE_2D),me.activeTexture(F.TEXTURE0),me.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,N.flipY),me.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),me.pixelStorei(F.UNPACK_ALIGNMENT,N.unpackAlignment);let dn=me.getParameter(F.UNPACK_ROW_LENGTH),vt=me.getParameter(F.UNPACK_IMAGE_HEIGHT),is=me.getParameter(F.UNPACK_SKIP_PIXELS),sn=me.getParameter(F.UNPACK_SKIP_ROWS),go=me.getParameter(F.UNPACK_SKIP_IMAGES);me.pixelStorei(F.UNPACK_ROW_LENGTH,wt.width),me.pixelStorei(F.UNPACK_IMAGE_HEIGHT,wt.height),me.pixelStorei(F.UNPACK_SKIP_PIXELS,Ce),me.pixelStorei(F.UNPACK_SKIP_ROWS,He),me.pixelStorei(F.UNPACK_SKIP_IMAGES,at);let Gi=T.isDataArrayTexture||T.isData3DTexture,ss=N.isDataArrayTexture||N.isData3DTexture;if(T.isDepthTexture){let ft=Ye.get(T),Zt=Ye.get(N),Hn=Ye.get(ft.__renderTarget),It=Ye.get(Zt.__renderTarget);me.bindFramebuffer(F.READ_FRAMEBUFFER,Hn.__webglFramebuffer),me.bindFramebuffer(F.DRAW_FRAMEBUFFER,It.__webglFramebuffer);for(let jt=0;jt<oe;jt++)Gi&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ye.get(T).__webglTexture,z,at+jt),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ye.get(N).__webglTexture,ge,Bt+jt)),F.blitFramebuffer(Ce,He,Ce+Ue,He+xe,Be,ut,Be+Ue,ut+xe,F.DEPTH_BUFFER_BIT,F.NEAREST);me.bindFramebuffer(F.READ_FRAMEBUFFER,null),me.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(z!==0||T.isRenderTargetTexture||Ye.has(T)){let ft=Ye.get(T),Zt=Ye.get(N);me.bindFramebuffer(F.READ_FRAMEBUFFER,L),me.bindFramebuffer(F.DRAW_FRAMEBUFFER,H);for(let Hn=0;Hn<oe;Hn++)Gi?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ft.__webglTexture,z,at+Hn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ft.__webglTexture,z),ss?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Zt.__webglTexture,ge,Bt+Hn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Zt.__webglTexture,ge),z!==0?F.blitFramebuffer(Ce,He,Ce+Ue,He+xe,Be,ut,Be+Ue,ut+xe,F.COLOR_BUFFER_BIT,F.NEAREST):ss?F.copyTexSubImage3D(ze,ge,Be,ut,Bt+Hn,Ce,He,Ue,xe):F.copyTexSubImage2D(ze,ge,Be,ut,Ce,He,Ue,xe);me.bindFramebuffer(F.READ_FRAMEBUFFER,null),me.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ss?T.isDataTexture||T.isData3DTexture?F.texSubImage3D(ze,ge,Be,ut,Bt,Ue,xe,oe,Mt,nn,wt.data):N.isCompressedArrayTexture?F.compressedTexSubImage3D(ze,ge,Be,ut,Bt,Ue,xe,oe,Mt,wt.data):F.texSubImage3D(ze,ge,Be,ut,Bt,Ue,xe,oe,Mt,nn,wt):T.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,ge,Be,ut,Ue,xe,Mt,nn,wt.data):T.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,ge,Be,ut,wt.width,wt.height,Mt,wt.data):F.texSubImage2D(F.TEXTURE_2D,ge,Be,ut,Ue,xe,Mt,nn,wt);me.pixelStorei(F.UNPACK_ROW_LENGTH,dn),me.pixelStorei(F.UNPACK_IMAGE_HEIGHT,vt),me.pixelStorei(F.UNPACK_SKIP_PIXELS,is),me.pixelStorei(F.UNPACK_SKIP_ROWS,sn),me.pixelStorei(F.UNPACK_SKIP_IMAGES,go),ge===0&&N.generateMipmaps===!0&&N.mipmapsAutoUpdate===!0&&F.generateMipmap(ze),me.unbindTexture()},this.initRenderTarget=function(T){Ye.get(T).__webglFramebuffer===void 0&&$e.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?$e.setTextureCube(T,0):T.isData3DTexture?$e.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?$e.setTexture2DArray(T,0):$e.setTexture2D(T,0),me.unbindTexture()},this.resetState=function(){X=0,G=0,ne=null,me.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ot._getDrawingBufferColorSpace(e),t.unpackColorSpace=ot._getUnpackColorSpace()}};function Ip(i,e=1e-4){e=Math.max(e,Number.EPSILON);let t={},n=i.getIndex(),s=i.getAttribute("position"),r=n?n.count:s.count,a=0,o=Object.keys(i.attributes),c=[],l=new Map,h=[],u=["getX","getY","getZ","getW"],d=e*.5,f=Math.log10(1/e),g=Math.pow(10,f),_=d*g;for(let m=0;m<r;m++){let b=n?n.getX(m):m,y="";for(let v=0,E=o.length;v<E;v++){let w=o[v],x=i.getAttribute(w),M=x.itemSize;for(let I=0;I<M;I++)y+=`${Math.trunc(x[u[I]](b)*g+_)},`}y in t?h.push(t[y]):(c.push(b),t[y]=a,h.push(a),a++)}let p=i.clone();for(let m in i.attributes)p.setAttribute(m,Pp(i.attributes[m],c,l));for(let m in i.morphAttributes)p.morphAttributes[m]=i.morphAttributes[m].map(b=>Pp(b,c,l));return p.setIndex(h),p}function mu(i,e){if(e===Bh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Ar||e===Za){let t=i.getIndex();if(t===null){let r=[],a=i.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)r.push(o);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===Ar)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function Pp(i,e,t=new Map){let n=i.isInterleavedBufferAttribute,s=n?i.data:i,r=n?s.stride:i.itemSize,a=n?t.get(s):void 0;if(a===void 0){let c=new s.array.constructor(e.length*r);for(let l=0;l<e.length;l++)for(let h=0;h<r;h++)c[l*r+h]=s.array[e[l]*r+h];a=n?new s.constructor(c,r,s.meshPerAttribute):new i.constructor(c,i.itemSize,i.normalized,i.meshPerAttribute),a.setUsage(s.usage),n&&t.set(s,a)}let o=n?new i.constructor(a,i.itemSize,i.offset,i.normalized):a;return o.name=i.name,n||(o.gpuType=i.gpuType),o}function Lp(i){let e=new Map,t=new Map,n=i.clone();return Dp(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,a=e.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Dp(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Dp(i.children[n],e.children[n],t)}var bl=class extends si{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Su(t)}),this.register(function(t){return new Mu(t)}),this.register(function(t){return new Tu(t)}),this.register(function(t){return new Du(t)}),this.register(function(t){return new Nu(t)}),this.register(function(t){return new Fu(t)}),this.register(function(t){return new wu(t)}),this.register(function(t){return new Au(t)}),this.register(function(t){return new Ru(t)}),this.register(function(t){return new Cu(t)}),this.register(function(t){return new yu(t)}),this.register(function(t){return new Pu(t)}),this.register(function(t){return new Eu(t)}),this.register(function(t){return new Lu(t)}),this.register(function(t){return new Iu(t)}),this.register(function(t){return new _u(t)}),this.register(function(t){return new xl(t,ht.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new xl(t,ht.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Uu(t)})}load(e,t,n,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let l=Ni.extractUrlBase(e);a=Ni.resolveURL(l,this.path)}else a=Ni.extractUrlBase(e);this.manager.itemStart(e);let o=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new _r(this.manager);c.setPriority(this.priority),c.setCache(this.cache),c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===kp){try{a[ht.KHR_BINARY_GLTF]=new Ou(e)}catch(u){s&&s(u);return}r=JSON.parse(a[ht.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let l=new Wu(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,priority:this.priority,cache:this.cache,withCredentials:this.withCredentials,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case ht.KHR_MATERIALS_UNLIT:a[u]=new vu;break;case ht.KHR_DRACO_MESH_COMPRESSION:a[u]=new ku(r,this.dracoLoader);break;case ht.KHR_TEXTURE_TRANSFORM:a[u]=new Bu;break;case ht.KHR_MESH_QUANTIZATION:a[u]=new zu;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function Hv(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function Nt(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}var ht={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DIFFUSE_ROUGHNESS:"KHR_materials_diffuse_roughness",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},_u=class{constructor(e){this.parser=e,this.name=ht.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],l,h=new De(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],pn);let u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Ms(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Li(h),l.distance=u;break;case"spot":l=new Fa(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),li(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}},vu=class{constructor(){this.name=ht.KHR_MATERIALS_UNLIT}getMaterialType(){return Yt}extendParams(e,t,n){let s=[];e.color=new De(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],pn),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,yt))}return Promise.all(s)}},yu=class{constructor(e){this.parser=e,this.name=ht.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Su=class{constructor(e){this.parser=e,this.name=ht.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new se(r,r)}return Promise.all(s)}},Mu=class{constructor(e){this.parser=e,this.name=ht.KHR_MATERIALS_DIFFUSE_ROUGHNESS}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.diffuseRoughness=n.diffuseRoughnessFactor!==void 0?n.diffuseRoughnessFactor:0,n.diffuseRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"diffuseRoughnessMap",n.diffuseRoughnessTexture)),Promise.all(s)}},Tu=class{constructor(e){this.parser=e,this.name=ht.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},Eu=class{constructor(e){this.parser=e,this.name=ht.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessMinimum=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessMaximum=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},wu=class{constructor(e){this.parser=e,this.name=ht.KHR_MATERIALS_SHEEN}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new De(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],pn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,yt)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},Au=class{constructor(e){this.parser=e,this.name=ht.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},Ru=class{constructor(e){this.parser=e,this.name=ht.KHR_MATERIALS_VOLUME}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new De().setRGB(r[0],r[1],r[2],pn),Promise.all(s)}},Cu=class{constructor(e){this.parser=e,this.name=ht.KHR_MATERIALS_IOR}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},Pu=class{constructor(e){this.parser=e,this.name=ht.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new De().setRGB(r[0],r[1],r[2],pn),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,yt)),Promise.all(s)}},Iu=class{constructor(e){this.parser=e,this.name=ht.EXT_MATERIALS_BUMP}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},Lu=class{constructor(e){this.parser=e,this.name=ht.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},Du=class{constructor(e){this.parser=e,this.name=ht.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},Nu=class{constructor(e){this.parser=e,this.name=ht.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},Fu=class{constructor(e){this.parser=e,this.name=ht.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],c=n.textureLoader;if(o.uri){let l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}},xl=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){let f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,s.mode,s.filter),f})})}else return null}},Uu=class{constructor(e){this.name=ht.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let l of s.primitives)if(l.mode!==kn.TRIANGLES&&l.mode!==kn.TRIANGLE_STRIP&&l.mode!==kn.TRIANGLE_FAN&&l.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],c={};for(let l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{let h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(let g of u){let _=new nt,p=new P,m=new on,b=new P(1,1,1),y=new ua(g.geometry,g.material,d);for(let E=0;E<d;E++)c.TRANSLATION&&p.fromBufferAttribute(c.TRANSLATION,E),c.ROTATION&&m.fromBufferAttribute(c.ROTATION,E),c.SCALE&&b.fromBufferAttribute(c.SCALE,E),y.setMatrixAt(E,_.compose(p,m,b));let v=null;for(let E in c)if(E==="_COLOR_0"){let w=c[E];y.instanceColor=new wi(w.array,w.itemSize,w.normalized)}else if(E!=="TRANSLATION"&&E!=="ROTATION"&&E!=="SCALE"){if(v===null){let x=y.geometry;v=new Ct,v.name=x.name;for(let M in x.attributes)v.setAttribute(M,x.attributes[M]);for(let M in x.morphAttributes)v.morphAttributes[M]=x.morphAttributes[M];x.index!==null&&v.setIndex(x.index),v.morphTargetsRelative=x.morphTargetsRelative;for(let M of x.groups)v.addGroup(M.start,M.count,M.materialIndex);x.boundingBox!==null&&(v.boundingBox=x.boundingBox.clone()),x.boundingSphere!==null&&(v.boundingSphere=x.boundingSphere.clone()),v.drawRange.start=x.drawRange.start,v.drawRange.count=x.drawRange.count,v.userData=Object.assign({},x.userData),y.geometry=v}let w=c[E];v.setAttribute(E,new wi(w.array,w.itemSize,w.normalized))}Rt.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),f.push(y)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}},kp="glTF",so=12,Np={JSON:1313821514,BIN:5130562},Ou=class{constructor(e){this.name=ht.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,so),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==kp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-so,r=new DataView(e,so),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let c=r.getUint32(a,!0);if(a+=4,c===Np.JSON){let l=new Uint8Array(e,so+a,o);this.content=n.decode(l)}else if(c===Np.BIN){let l=so+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},ku=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ht.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(let h in a){let u=Hu[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=Hu[h]||h.toLowerCase();if(a[h]!==void 0){let d=n.accessors[e.attributes[h]],f=Ir[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(f){for(let g in f.attributes){let _=f.attributes[g],p=c[g];p!==void 0&&(_.normalized=p)}u(f)},o,l,pn,d)})})}},Bu=class{constructor(){this.name=ht.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},zu=class{constructor(){this.name=ht.KHR_MESH_QUANTIZATION}},_l=class extends ii{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=s-t,u=(n-t)/h,d=u*u,f=d*u,g=e*l,_=g-l,p=-2*f+3*d,m=f-d,b=1-p,y=m-d+u;for(let v=0;v!==o;v++){let E=a[_+v+o],w=a[_+v+c]*h,x=a[g+v+o],M=a[g+v]*h;r[v]=b*E+y*w+p*x+m*M}return r}},Vv=new on,Gu=class extends _l{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return Vv.fromArray(r).normalize().toArray(r),r}},kn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Ir={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Fp={9728:Dt,9729:Ot,9984:wc,9985:Er,9986:Rs,9987:On},Up={33071:vn,33648:rr,10497:Mi},gu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Hu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ns={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Wv={CUBICSPLINE:void 0,LINEAR:ds,STEP:us},bu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function qv(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new vs({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ri})),i.DefaultMaterial}function Is(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function li(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Xv(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){let u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){let u=e[l];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;a.push(d)}if(s){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;o.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){let h=l[0],u=l[1],d=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function Kv(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function jv(i){let e,t=i.extensions&&i.extensions[ht.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+xu(t.attributes):e=i.indices+":"+xu(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+xu(i.targets[n]);return e}function xu(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Vu(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Jv(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Yv=new nt,Wu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Hv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?(this.textureLoader=new ys(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)):(this.textureLoader=new Ua(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setWithCredentials(this.options.withCredentials),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new _r(this.options.manager),this.fileLoader.setPriority(this.options.priority),this.fileLoader.setCache(this.options.cache),this.fileLoader.setResponseType("arraybuffer"),(this.options.withCredentials||this.options.crossOrigin==="use-credentials")&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return Is(r,o,s),li(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(let c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(a,o)=>{let c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(let[l,h]of a.children.entries())r(h,o.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ht.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){n.load(Ni.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=gu[s.type],o=Ir[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new $t(l,a,c))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],c=gu[s.type],l=Ir[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,_,p;if(f&&f!==u){let m=Math.floor(d/f),b="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+m+":"+s.count,y=t.cache.get(b);y||(_=new l(o,m*f,s.count*f/h),y=new ps(_,f/h),t.cache.add(b,y)),p=new ji(y,c,d%f/h,g)}else o===null?_=new l(s.count*c):_=new l(o,d,s.count*c),p=new $t(_,c,g);if(s.sparse!==void 0){let m=gu.SCALAR,b=Ir[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,v=s.sparse.values.byteOffset||0,E=new b(a[1],y,s.sparse.count*m),w=new l(a[2],v,s.sparse.count*c);o!==null&&(p=new $t(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let x=0,M=E.length;x<M;x++){let I=E[x];if(p.setX(I,w[x*c]),c>=2&&p.setY(I,w[x*c+1]),c>=3&&p.setZ(I,w[x*c+2]),c>=4&&p.setW(I,w[x*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=g}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];let l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let d=(r.samplers||{})[a.sampler]||{};return h.magFilter=Fp[d.magFilter]||Ot,h.minFilter=Fp[d.minFilter]||On,h.wrapS=Up[d.wrapS]||Mi,h.wrapT=Up[d.wrapT]||Mi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Dt&&h.minFilter!==Ot,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());let a=s.images[e],o=self.URL||self.webkitURL,c=a.uri||"",l=!1,h;if(t.isKTX2Loader===!0&&a.bufferView!==void 0)h=n.getDependency("bufferView",a.bufferView).then(function(d){return new Promise(function(f,g){t.parse(d,f,g)})});else{if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(d){l=!0;let f=new Blob([d],{type:a.mimeType});return c=o.createObjectURL(f),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");h=Promise.resolve(c).then(function(d){return new Promise(function(f,g){let _=f;t.isImageBitmapLoader===!0&&(_=function(p){let m=new Gt(p);m.needsUpdate=!0,f(m)}),t.load(Ni.resolveURL(d,r.path),_,void 0,g)})})}let u=h.then(function(d){return l===!0&&o.revokeObjectURL(c),li(d,a),d.userData.mimeType=a.mimeType||Jv(a.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[ht.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[ht.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let c=r.associations.get(a);a=r.extensions[ht.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new pr,ln.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,c=this.cache.get(o);c||(c=new fr,ln.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return vs}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],a,o={},c=r.extensions||{},l=[];if(c[ht.KHR_MATERIALS_UNLIT]){let u=s[ht.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(o,r,t))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new De(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],pn),o.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",u.baseColorTexture,yt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Un);let h=r.alphaMode||bu.OPAQUE;if(h===bu.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===bu.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Yt&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new se(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==Yt&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Yt){let u=r.emissiveFactor;o.emissive=new De().setRGB(u[0],u[1],u[2],pn)}return r.emissiveTexture!==void 0&&a!==Yt&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,yt)),Promise.all(l).then(function(){let u=new a(o);return r.name&&(u.name=r.name),li(u,r),t.associations.set(u,{materials:e}),r.extensions&&Is(s,u,r),u})}createUniqueName(e){let t=Tt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[ht.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Op(c,o,t)})}let a=[];for(let o=0,c=e.length;o<c;o++){let l=e[o],h=jv(l),u=s[h];if(u)a.push(u.promise);else{let d;l.extensions&&l.extensions[ht.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=Op(new Ct,l,t),l.mode===kn.TRIANGLE_STRIP?d=d.then(f=>mu(f,Za)):l.mode===kn.TRIANGLE_FAN&&(d=d.then(f=>mu(f,Ar))),s[h]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){let h=a[c].material===void 0?qv(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(c){let l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,g=h.length;f<g;f++){let _=h[f],p=a[f],m,b=l[f];if(p.mode===kn.TRIANGLES||p.mode===kn.TRIANGLE_STRIP||p.mode===kn.TRIANGLE_FAN||p.mode===void 0){let y=r.isSkinnedMesh===!0,v=_.hasAttribute("skinIndex")&&_.hasAttribute("skinWeight");y&&v===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),m=y&&v?new la(_,b):new Pt(_,b),m.isSkinnedMesh===!0&&m.normalizeSkinWeights()}else if(p.mode===kn.LINES)m=new da(_,b);else if(p.mode===kn.LINE_STRIP)m=new ms(_,b);else if(p.mode===kn.LINE_LOOP)m=new fa(_,b);else if(p.mode===kn.POINTS)m=new pa(_,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(m.geometry.morphAttributes).length>0&&Kv(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),li(m,r),p.extensions&&Is(s,m,p),t.assignFinalMaterial(m),u.push(m)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Is(s,u[0],r),u[0];let d=new Ut;r.extensions&&Is(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Vt(qt.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Di(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),li(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),a=s,o=[],c=[];for(let l=0,h=a.length;l<h;l++){let u=a[l];if(u){o.push(u);let d=new nt;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new ha(o,c)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){let f=s.channels[u],g=s.samplers[f.sampler],_=f.target,p=_.node,m=s.parameters!==void 0?s.parameters[g.input]:g.input,b=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",p)),o.push(this.getDependency("accessor",m)),c.push(this.getDependency("accessor",b)),l.push(g),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){let d=u[0],f=u[1],g=u[2],_=u[3],p=u[4],m=[];for(let y=0,v=d.length;y<v;y++){let E=d[y],w=f[y],x=g[y],M=_[y],I=p[y];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();let R=n._createAnimationTracks(E,w,x,M,I);if(R)for(let D=0;D<R.length;D++)m.push(R[D])}let b=new La(r,void 0,m);return li(b,s),b})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));let c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){let h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,Yv)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);if(h.userData.pivot!==void 0&&u.length>0){let f=h.userData.pivot,g=u[0];h.pivot=new P().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],g.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new dr:l.length>1?h=new Ut:l.length===1?h=l[0]:h=new Rt,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=a),li(h,r),r.extensions&&Is(n,h,r),r.matrix!==void 0){let u=new nt;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new Ut;n.name&&(r.name=s.createUniqueName(n.name)),li(r,n),n.extensions&&Is(t,r,n);let a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,u=c.length;h<u;h++){let d=c[h];d.parent!==null?r.add(Lp(d)):r.add(d)}let l=h=>{let u=new Map;for(let[d,f]of s.associations)(d instanceof ln||d instanceof Gt)&&u.set(d,f);return h.traverse(d=>{let f=s.associations.get(d);f!=null&&u.set(d,f)}),u};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){let a=[],o=e.name?e.name:e.uuid,c=[];function l(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}ns[r.path]===ns.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let h;switch(ns[r.path]){case ns.weights:h=Ci;break;case ns.rotation:h=Pi;break;case ns.translation:case ns.scale:h=es;break;default:n.itemSize===1?h=Ci:h=es;break}let u=s.interpolation!==void 0?Wv[s.interpolation]:ds,d=this._getArrayFromAccessor(n);for(let f=0,g=c.length;f<g;f++){let _=new h(c[f]+"."+ns[r.path],t.array,d,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),a.push(_)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Vu(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof Pi?Gu:_l;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Zv(i,e,t){let n=e.attributes,s=new cn;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new P(c[0],c[1],c[2]),new P(l[0],l[1],l[2])),o.normalized){let h=Vu(Ir[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new P,c=new P;for(let l=0,h=r.length;l<h;l++){let u=r[l];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){let _=Vu(Ir[d.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;let a=new yn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function Op(i,e,t){let n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(let a in n){let o=Hu[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return ot.workingColorSpace!==pn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ot.workingColorSpace}" not supported.`),li(i,e),Zv(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?Xv(i,e.targets,t):i})}var Bp=(function(){var i="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuixkbeeeddddillviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WboY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbrl79IV9Rbwq:VZkdbk:XYi5ud9:du8Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaicefhxcj;abad9Uc;WFbGcjdadca0EhmaialfgPar9Rgoadfhsavaoadz:jjjjbgzceVhHcbhOdndninaeaO9nmeaPax9RaD6mdamaeaO9RaOamfgoae6EgAcsfglc9WGhCabaOad2fhXaAcethQaxaDfhiaOaeaoaeao6E9RhLalcl4cifcd4hKazcj;cbfaAfhYcbh8AazcjdfhEaHh3incbh5dnawTmbaxa8Acd4fRbbh5kcbh8Eazcj;cbfhqinaih8Fdndndndna5a8Ecet4ciGgoc9:fPdebdkaPa8F9RaA6mrazcj;cbfa8EaA2fa8FaAz:jjjjb8Aa8FaAfhixdkazcj;cbfa8EaA2fcbaAz:kjjjb8Aa8FhixekaPa8F9RaK6mva8FaKfhidnaCTmbaPai9RcK6mbaocdtc:q:G:cjbfcj:G:cjbawEhaczhrcbhlinargoc9Wfghaqfhrdndndndndndnaaa8Fahco4fRbbalcoG4ciGcdtfydbPDbedvivvvlvkar9cb83bwar9cb83bbxlkarcbaiRbdai8Xbb9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbaqaofgrcGfcbaicdfa8J9c8N1:NfghRbbag9cjjjjjw:dg8J9qE86bbarcVfcbaha8J9c8M1:NfghRbbag9cjjjjjl:dg8J9qE86bbarc7fcbaha8J9c8L1:NfghRbbag9cjjjjjd:dg8J9qE86bbarctfcbaha8J9c8K1:NfghRbbag9cjjjjje:dg8J9qE86bbarc91fcbaha8J9c8J1:NfghRbbag9cjjjj;ab:dg8J9qE86bbarc4fcbaha8J9cg1:NfghRbbag9cjjjja:dg8J9qE86bbarc93fcbaha8J9ch1:NfghRbbag9cjjjjz:dgg9qE86bbarc94fcbahag9ca1:NfghRbbai8Xbe9c:c:qj:bw9:9c:q;c1:I1e:d9c:b:c:e1z9:gg9cjjjjjz:dg8J9qE86bbarc95fcbaha8J9c8N1:NfgiRbbag9cjjjjjw:dg8J9qE86bbarc96fcbaia8J9c8M1:NfgiRbbag9cjjjjjl:dg8J9qE86bbarc97fcbaia8J9c8L1:NfgiRbbag9cjjjjjd:dg8J9qE86bbarc98fcbaia8J9c8K1:NfgiRbbag9cjjjjje:dg8J9qE86bbarc99fcbaia8J9c8J1:NfgiRbbag9cjjjj;ab:dg8J9qE86bbarc9:fcbaia8J9cg1:NfgiRbbag9cjjjja:dg8J9qE86bbarcufcbaia8J9ch1:NfgiRbbag9cjjjjz:dgg9qE86bbaiag9ca1:NfhixikaraiRblaiRbbghco4g8Ka8KciSg8KE86bbaqaofgrcGfaiclfa8Kfg8KRbbahcl4ciGg8La8LciSg8LE86bbarcVfa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc7fa8Ka8Lfg8KRbbahciGghahciSghE86bbarctfa8Kahfg8KRbbaiRbeghco4g8La8LciSg8LE86bbarc91fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc4fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc93fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc94fa8Kahfg8KRbbaiRbdghco4g8La8LciSg8LE86bbarc95fa8Ka8Lfg8KRbbahcl4ciGg8La8LciSg8LE86bbarc96fa8Ka8Lfg8KRbbahcd4ciGg8La8LciSg8LE86bbarc97fa8Ka8Lfg8KRbbahciGghahciSghE86bbarc98fa8KahfghRbbaiRbigico4g8Ka8KciSg8KE86bbarc99faha8KfghRbbaicl4ciGg8Ka8KciSg8KE86bbarc9:faha8KfghRbbaicd4ciGg8Ka8KciSg8KE86bbarcufaha8KfgrRbbaiciGgiaiciSgiE86bbaraifhixdkaraiRbwaiRbbghcl4g8Ka8KcsSg8KE86bbaqaofgrcGfaicwfa8Kfg8KRbbahcsGghahcsSghE86bbarcVfa8KahfghRbbaiRbeg8Kcl4g8La8LcsSg8LE86bbarc7faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarctfaha8KfghRbbaiRbdg8Kcl4g8La8LcsSg8LE86bbarc91faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc4faha8KfghRbbaiRbig8Kcl4g8La8LcsSg8LE86bbarc93faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc94faha8KfghRbbaiRblg8Kcl4g8La8LcsSg8LE86bbarc95faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc96faha8KfghRbbaiRbvg8Kcl4g8La8LcsSg8LE86bbarc97faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc98faha8KfghRbbaiRbog8Kcl4g8La8LcsSg8LE86bbarc99faha8LfghRbba8KcsGg8Ka8KcsSg8KE86bbarc9:faha8KfghRbbaiRbrgicl4g8Ka8KcsSg8KE86bbarcufaha8KfgrRbbaicsGgiaicsSgiE86bbaraifhixekarai8Pbw83bwarai8Pbb83bbaiczfhikdnaoaC9pmbalcdfhlaoczfhraPai9RcL0mekkaoaC6moaimexokaCmva8FTmvkaqaAfhqa8Ecefg8Ecl9hmbkdndndndnawTmbasa8Acd4fRbbgociGPlbedrbkaATmdaza8Afh8Fazcj;cbfhhcbh8EaEhaina8FRbbhraahocbhlinaoahalfRbbgqce4cbaqceG9R7arfgr86bbaoadfhoaAalcefgl9hmbkaacefhaa8Fcefh8FahaAfhha8Ecefg8Ecl9hmbxikkaATmeaza8Afhaazcj;cbfhhcbhoceh8EaYh8FinaEaofhlaa8Vbbhrcbhoinala8FaofRbbcwtahaofRbbgqVc;:FiGce4cbaqceG9R7arfgr87bbaladfhlaLaocefgofmbka8FaQfh8FcdhoaacdfhaahaQfhha8EceGhlcbh8EalmbxdkkaATmbaocl4h8Eaza8AfRbbhqcwhoa3hlinalRbbaotaqVhqalcefhlaocwfgoca9hmbkcbhhaEh8FaYhainazcj;cbfahfRbbhrcwhoaahlinalRbbaotarVhralaAfhlaocwfgoca9hmbkara8E94aq7hqcbhoa8Fhlinalaqao486bbalcefhlaocwfgoca9hmbka8Fadfh8FaacefhaahcefghaA9hmbkkaEclfhEa3clfh3a8Aclfg8Aad6mbkaXazcjdfaAad2z:jjjjb8AazazcjdfaAcufad2fadz:jjjjb8AaAaOfhOaihxaimbkc9:hoxdkcbc99aPax9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaok:ysezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:kjjjb8Aav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk:4ioiue99dud99dud99dnaeTmbcbhiabhlindndnal8Uebgv:YgoJ:ji:1Salcof8UebgrciVgw:Y:vgDNJbbbZJbbb:;avcu9kEMgq:lJbbb9p9DTmbaq:Ohkxekcjjjj94hkkalclf8Uebhvalcdf8UebhxalarcefciGcetfak87ebdndnax:YgqaDNJbbbZJbbb:;axcu9kEMgm:lJbbb9p9DTmbam:Ohxxekcjjjj94hxkabaiarciGgkfcd7cetfax87ebdndnav:YgmaDNJbbbZJbbb:;avcu9kEMgP:lJbbb9p9DTmbaP:Ohvxekcjjjj94hvkalarcufciGcetfav87ebdndnawaw2:ZgPaPMaoaoN:taqaqN:tamamN:tgoJbbbbaoJbbbb9GE:raDNJbbbZMgD:lJbbb9p9DTmbaD:Ohrxekcjjjj94hrkalakcetfar87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk:Tvirud99eudndnadcl9hmbaeTmeindndnabRbbgiabcefgl8Sbbgvabcdfgo8Sbbgrf9R:YJbbuJabcifgwRbbgdce4adVgDcd4aDVgDcl4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax86bbdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao86bbdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai86bbdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad86bbabclfhbaecufgembxdkkaeTmbindndnab8Vebgiabcdfgl8Uebgvabclfgo8Uebgrf9R:YJbFu9habcofgw8Vebgdce4adVgDcd4aDVgDcl4aDVgDcw4aDVgD:Z:vgqNJbbbZMgk:lJbbb9p9DTmbak:Ohxxekcjjjj94hxkaoax87ebdndnaraif:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohoxekcjjjj94hokalao87ebdndnavaifar9R:YaqNJbbbZMgk:lJbbb9p9DTmbak:Ohixekcjjjj94hikabai87ebdndnaDadcetGadceGV:ZaqNJbbbZMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkawad87ebabcwfhbaecufgembkkk9teiucbcbyd:K:G:cjbgeabcifc98GfgbBd:K:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkk83dbcj:Gdk8Kbbbbdbbblbbbwbbbbbbbebbbdbbblbbbwbbbbc:K:Gdkl8W:qbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuixkbbebeeddddilve9Weeeviebeoweuecj:Gdkr;Neqo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949WbwY9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVJ9V29VVbDl79IV9Rbqq:W9Dklbzik94evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaeai86b:q:W:cjbaecitab8Piw83i:q:G:cjbaecefgecjd9hmbkk:JBl8Aud97dur978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnalTmbcuhoaiRbbgrc;WeGc:Ge9hmbarcsGgwce0mbc9:hoalcufadcd4cbawEgDadfgrcKcaawEgqaraq0Egk6mbaialfgxar9RhodnadTgmmbavaoad;8qbbkaicefhPcj;abad9Uc;WFbGcjdadca0EhsdndndnadTmbaoadfhzcbhHinaeaH9nmdaxaP9RaD6miabaHad2fhOaPaDfhAasaeaH9RaHasfae6EgCcsfgocl4cifcd4hXavcj;cbfaoc9WGgQcetfhLavcj;cbfaQci2fhKavcj;cbfaQfhYcbh8Aaoc;ab6hEincbh3dnawTmbaPa8Acd4fRbbh3kcbh5avcj;cbfh8Eindndndndna3a5cet4ciGgoc9:fPdebdkaxaA9RaQ6mwdnaQTmbavcj;cbfa5aQ2faAaQ;8qbbkaAaCfhAxdkaQTmeavcj;cbfa5aQ2fcbaQ;8kbxekaxaA9RaX6moaoclVcbawEhraAaXfhocbhidnaEmbaxao9Rc;Gb6mbcbhlina8EalfhidndndndndndnaAalco4fRbbgqciGarfPDbedibledibkaipxbbbbbbbbbbbbbbbbpklbxlkaiaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiaopbbbpklbaoczfhoxekaiaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcd4ciGarfPDbedibledibkaiczfpxbbbbbbbbbbbbbbbbpklbxlkaiczfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaiczfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaiczfaopbbbpklbaoczfhoxekaiczfaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqcl4ciGarfPDbedibledibkaicafpxbbbbbbbbbbbbbbbbpklbxlkaicafaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaoclffagRb:q:W:cjbfhoxikaicafaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbahaocwffagRb:q:W:cjbfhoxdkaicafaopbbbpklbaoczfhoxekaicafaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbahaocdffagRb:q:W:cjbfhokdndndndndndnaqco4arfPDbedibledibkaic8Wfpxbbbbbbbbbbbbbbbbpklbxlkaic8Wfaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaoclffaqRb:q:W:cjbfhoxikaic8Wfaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Ngicitpbi:q:G:cjbaiRb:q:W:cjbgipsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Ngqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spklbaiaocwffaqRb:q:W:cjbfhoxdkaic8Wfaopbbbpklbaoczfhoxekaic8WfaopbbdaoRbbgicitpbi:q:G:cjbaiRb:q:W:cjbgipsaoRbegqcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpklbaiaocdffaqRb:q:W:cjbfhokalc;abfhialcjefaQ0meaihlaxao9Rc;Fb0mbkkdnaiaQ9pmbaici4hlinaxao9RcK6mwa8EaifhqdndndndndndnaAaico4fRbbalcoG4ciGarfPDbedibledibkaqpxbbbbbbbbbbbbbbbbpkbbxlkaqaopbblaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLg8Fcdp:mea8FpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogapxiiiiiiiiiiiiiiiip8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaoclffagRb:q:W:cjbfhoxikaqaopbbwaopbbbg8Fclp:mea8FpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogapxssssssssssssssssp8Jg8Fp5b9cjF;8;4;W;G;ab9:9cU1:Nghcitpbi:q:G:cjbahRb:q:W:cjbghpsa8Fp5e9cjF;8;4;W;G;ab9:9cU1:Nggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPaaa8Fp9spkbbahaocwffagRb:q:W:cjbfhoxdkaqaopbbbpkbbaoczfhoxekaqaopbbdaoRbbghcitpbi:q:G:cjbahRb:q:W:cjbghpsaoRbeggcitpbi:q:G:cjbp9UpmbedilvorzHOACXQLpPpkbbahaocdffagRb:q:W:cjbfhokalcdfhlaiczfgiaQ6mbkkaohAaoTmoka8EaQfh8Ea5cefg5cl9hmbkdndndndnawTmbaza8Acd4fRbbglciGPlbedwbkaQTmdavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep9Ta8Fpxeeeeeeeeeeeeeeeegap9op9Hp9rg8Fa8Jp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ug8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp9Ug8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep9Ta8Faap9op9Hp9rg8Fp9Ugap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp9Ugap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp9Ugap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp9Ug8Jp9AbbbaladfhlaoczfgoaQ6mbxikkaQTmeavcjdfa8Afhlava8Afpbdbh8Jcbhoinalavcj;cbfaofpblbg8KaYaofpblbg8LpmbzeHdOiAlCvXoQrLg8MaLaofpblbg8NaKaofpblbgypmbzeHdOiAlCvXoQrLg8PpmbezHdiOAlvCXorQLg8Fcep:nea8Fpxebebebebebebebebgap9op:bep9rg8Fa8Jp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ma8PpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwKDYq8AkEx3m5P8Es8Fg8Ka8NaypmwKDYq8AkEx3m5P8Es8Fg8LpmbezHdiOAlvCXorQLg8Fcep:nea8Faap9op:bep9rg8Fp:oeg8Jp9Abbbaladfgla8Ja8Fa8Fpmlvorlvorlvorlvorp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmwDqkwDqkwDqkwDqkp:oeg8Jp9Abbbaladfgla8Ja8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9Abbbaladfgla8Ja8Ka8LpmwDKYqk8AExm35Ps8E8Fg8Fcep:nea8Faap9op:bep9rg8Fp:oegap9Abbbaladfglaaa8Fa8Fpmlvorlvorlvorlvorp:oegap9Abbbaladfglaaa8Fa8FpmwDqkwDqkwDqkwDqkp:oegap9Abbbaladfglaaa8Fa8FpmxmPsxmPsxmPsxmPsp:oeg8Jp9AbbbaladfhlaoczfgoaQ6mbxdkkaQTmbcbhocbalcl4gl9Rc8FGhiavcjdfa8Afhrava8Afpbdbhainaravcj;cbfaofpblbg8JaYaofpblbg8KpmbzeHdOiAlCvXoQrLg8LaLaofpblbg8MaKaofpblbg8NpmbzeHdOiAlCvXoQrLgypmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Faap9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8LaypmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwKDYq8AkEx3m5P8Es8Fg8Ja8Ma8NpmwKDYq8AkEx3m5P8Es8Fg8KpmbezHdiOAlvCXorQLg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9Abbbaradfgraaa8Ja8KpmwDKYqk8AExm35Ps8E8Fg8Faip:Rea8Falp:Tep9qg8Fp9rgap9Abbbaradfgraaa8Fa8Fpmlvorlvorlvorlvorp9rgap9Abbbaradfgraaa8Fa8FpmwDqkwDqkwDqkwDqkp9rgap9Abbbaradfgraaa8Fa8FpmxmPsxmPsxmPsxmPsp9rgap9AbbbaradfhraoczfgoaQ6mbkka8Aclfg8Aad6mbkdnaCad2goTmbaOavcjdfao;8qbbkdnammbavavcjdfaCcufad2fad;8qbbkaCaHfhHc9:hoaAhPaAmbxlkkaeTmbaDalfhrcbhocuhlinaralaD9RglfaD6mdasaeao9Raoasfae6Eaofgoae6mbkaial9RhPkcbc99axaP9RakSEhoxekc9:hokavcj;kbf8Kjjjjbaokwbz:bjjjbkNsezu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnalaeci9UgrcHf6mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbav9cu83iUav9cu83i8Wav9cu83iyav9cu83iaav9cu83iKav9cu83izav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhldnaeTmbcmcsaDceSEhkcbhxcbhmcbhrcbhicbhoindnalaq9nmbc9:hoxikdndnawRbbgDc;Ve0mbavc;abfaoaDcu7gPcl4fcsGcitfgsydlhzasydbhHdndnaDcsGgsak9pmbavaiaPfcsGcdtfydbaxasEhDaxasTgOfhxxekdndnascsSmbcehOasc987asamffcefhDxekalcefhDal8SbbgscFeGhPdndnascu9mmbaDhlxekalcvfhlaPcFbGhPcrhsdninaD8SbbgOcFbGastaPVhPaOcu9kmeaDcefhDascrfgsc8J9hmbxdkkaDcefhlkcehOaPce4cbaPceG9R7amfhDkaDhmkavc;abfaocitfgsaDBdbasazBdlavaicdtfaDBdbavc;abfaocefcsGcitfgsaHBdbasaDBdlaocdfhoaOaifhidnadcd9hmbabarcetfgsaH87ebasclfaD87ebascdfaz87ebxdkabarcdtfgsaHBdbascwfaDBdbasclfazBdbxekdnaDcpe0mbavaiaqaDcsGfRbbgscl4gP9RcsGcdtfydbaxcefgOaPEhDavaias9RcsGcdtfydbaOaPTgzfgOascsGgPEhsaPThPdndnadcd9hmbabarcetfgHax87ebaHclfas87ebaHcdfaD87ebxekabarcdtfgHaxBdbaHcwfasBdbaHclfaDBdbkavaicdtfaxBdbavc;abfaocitfgHaDBdbaHaxBdlavaicefgicsGcdtfaDBdbavc;abfaocefcsGcitfgHasBdbaHaDBdlavaiazfgicsGcdtfasBdbavc;abfaocdfcsGcitfgDaxBdbaDasBdlaocifhoaiaPfhiaOaPfhxxekaxcbalRbbgsEgHaDc;:eSgDfhOascsGhAdndnascl4gCmbaOcefhzxekaOhzavaiaC9RcsGcdtfydbhOkdndnaAmbazcefhxxekazhxavaias9RcsGcdtfydbhzkdndnaDTmbalcefhDxekalcdfhDal8SbegPcFeGhsdnaPcu9kmbalcofhHascFbGhscrhldninaD8SbbgPcFbGaltasVhsaPcu9kmeaDcefhDalcrfglc8J9hmbkaHhDxekaDcefhDkasce4cbasceG9R7amfgmhHkdndnaCcsSmbaDhsxekaDcefhsaD8SbbglcFeGhPdnalcu9kmbaDcvfhOaPcFbGhPcrhldninas8SbbgDcFbGaltaPVhPaDcu9kmeascefhsalcrfglc8J9hmbkaOhsxekascefhskaPce4cbaPceG9R7amfgmhOkdndnaAcsSmbashlxekascefhlas8SbbgDcFeGhPdnaDcu9kmbascvfhzaPcFbGhPcrhDdninal8SbbgscFbGaDtaPVhPascu9kmealcefhlaDcrfgDc8J9hmbkazhlxekalcefhlkaPce4cbaPceG9R7amfgmhzkdndnadcd9hmbabarcetfgDaH87ebaDclfaz87ebaDcdfaO87ebxekabarcdtfgDaHBdbaDcwfazBdbaDclfaOBdbkavc;abfaocitfgDaOBdbaDaHBdlavaicdtfaHBdbavc;abfaocefcsGcitfgDazBdbaDaOBdlavaicefgicsGcdtfaOBdbavc;abfaocdfcsGcitfgDaHBdbaDazBdlavaiaCTaCcsSVfgicsGcdtfazBdbaiaATaAcsSVfhiaocifhokawcefhwaocsGhoaicsGhiarcifgrae6mbkkcbc99alaqSEhokavc;aef8Kjjjjbaok:clevu8Jjjjjbcz9Rhvdnalaecvf9pmbc9:skdnaiRbbc;:eGc;qeSmbcuskav9cb83iwaicefhoaialfc98fhrdnaeTmbdnadcdSmbcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcdtfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgiBdbalaiBdbawcefgwae9hmbxdkkcbhwindnaoar6mbc9:skaocefhlao8SbbgicFeGhddndnaicu9mmbalhoxekaocvfhoadcFbGhdcrhidninal8SbbgDcFbGaitadVhdaDcu9kmealcefhlaicrfgic8J9hmbxdkkalcefhokabawcetfadc8Etc8F91adcd47avcwfadceGcdtVglydbfgi87ebalaiBdbawcefgwae9hmbkkcbc99aoarSEk;Toio97eue97aec98Ghedndnadcl9hmbaeTmecbhdinababpbbbgicKp:RecKp:Sep;6eglaicwp:RecKp:Sep;6ealp;Geaiczp:RecKp:Sep;6egvp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgwp9op9rp;Keglpxbb;:9cbb;:9cbb;:9cbb;:9calalp;Meaoaop;Meavaravawp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFbbbFbbbFbbbFbbbp9oaipxbbbFbbbFbbbFbbbFp9op9qalavp;Mearp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaoavp;Mearp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgDaDpbbbgipxbbbbbbFFbbbbbbFFgwp9oabpbbbgoaipmbediwDqkzHOAKY8AEgvczp:Reczp:Sep;6eglaoaipmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eavczp:Sep;6egvp;Gealp;Gep;Kep;Legipxbbbbbbbbbbbbbbbbp:2egralpxbbbjbbbjbbbjbbbjgqp9op9rp;Keglpxb;:FSb;:FSb;:FSb;:FSalalp;Meaiaip;Meavaravaqp9op9rp;Keglalp;Mep;Kep;Kep;Jep;Negvp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbp9oaiavp;Mearp;Keczp:Rep9qgialavp;Mearp;KepxFFbbFFbbFFbbFFbbp9oglpmwDKYqk8AExm35Ps8E8Fp9qpkbbabaoawp9oaialpmbezHdiOAlvCXorQLp9qpkbbabcafhbadclfgdae6mbkkk;2ileue97euo97dnaec98GgiTmbcbheinabcKfpx:ji:1S:ji:1S:ji:1S:ji:1SabpbbbglabczfgvpbbbgopmlvorxmPsCXQL358E8Fgrczp:Segwpxibbbibbbibbbibbbp9qp;6egDp;NegqaDaDp;MegDaDp;KealaopmbediwDqkzHOAKY8AEgDczp:Reczp:Sep;6eglalp;MeaDczp:Sep;6egoaop;Mearczp:Reczp:Sep;6egrarp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jep;Mepxbbn0bbn0bbn0bbn0gDp;KepxFFbbFFbbFFbbFFbbgkp9oaqaop;MeaDp;Keczp:Rep9qgoaqalp;MeaDp;Keakp9oaqarp;MeaDp;Keczp:Rep9qgDpmwDKYqk8AExm35Ps8E8Fglp5eawclp:RegqpEi:T:j83ibavalp5baqpEd:T:j83ibabcwfaoaDpmbezHdiOAlvCXorQLgDp5eaqpEe:T:j83ibabaDp5baqpEb:T:j83ibabcafhbaeclfgeai6mbkkkuee97dnadcd4ae2c98GgeTmbcbhdinababpbbbgicwp:Recwp:Sep;6eaicep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbabczfhbadclfgdae6mbkkk:Sodw97euaec98Ghedndnadcl9hmbaeTmecbhdinabpxbbuJbbuJbbuJbbuJabpbbbgicKp:TeglaicYp:Tep9qgvcdp:Teavp9qgvclp:Teavp9qgop;6ep;Negvaicwp:RecKp:SegraipxFbbbFbbbFbbbFbbbgwp9ogDp:Uep;6ep;Mepxbbn0bbn0bbn0bbn0gqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9oavaDarp:Xeaiczp:RecKp:Segip:Uep;6ep;Meaqp;Keawp9op9qavaDaraip:Uep:Xep;6ep;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qavaoalcep:Rep9oalpxebbbebbbebbbebbbp9op9qp;6ep;Meaqp;KecKp:Rep9qpkbbabczfhbadclfgdae6mbxdkkaeTmbcbhdinabczfgkpxbFu9hbFu9hbFu9hbFu9habpbbbglakpbbbgrpmlvorxmPsCXQL358E8Fgvczp:TegqavcHp:Tep9qgicdp:Teaip9qgiclp:Teaip9qgicwp:Teaip9qgop;6ep;NegialarpmbediwDqkzHOAKY8AEgDpxFFbbFFbbFFbbFFbbglp9ograDczp:Segwp:Ueavczp:Reczp:SegDp:Xep;6ep;Mepxbbn0bbn0bbn0bbn0gvp;Kealp9oaiarawaDp:Uep:Xep;6ep;Meavp;Keczp:Rep9qgwaiaoaqcep:Rep9oaqpxebbbebbbebbbebbbp9op9qp;6ep;Meavp;Keczp:ReaiaDarp:Uep;6ep;Meavp;Kealp9op9qgipmwDKYqk8AExm35Ps8E8FpkbbabawaipmbezHdiOAlvCXorQLpkbbabcafhbadclfgdae6mbkkk9teiucbcbydj:G:cjbgeabcifc98GfgbBdj:G:cjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkxebcj:Gdklz:zbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var s=WebAssembly.validate(t)?o(e):o(i),r,a=WebAssembly.instantiate(s,{}).then(function(m){r=m.instance,r.exports.__wasm_call_ctors()});function o(m){for(var b=new Uint8Array(m.length),y=0;y<m.length;++y){var v=m.charCodeAt(y);b[y]=v>96?v-97:v>64?v-39:v+4}for(var E=0,y=0;y<m.length;++y)b[E++]=b[y]<60?n[b[y]]:(b[y]-60)*64+b[++y];return b.buffer.slice(0,E)}function c(m,b,y,v,E,w,x){var M=m.exports.sbrk,I=v+3&-4,R=M(I*E),D=M(w.length),U=new Uint8Array(m.exports.memory.buffer);U.set(w,D);var V=b(R,v,E,D,w.length);if(V==0&&x&&x(R,I,E),y.set(U.subarray(R,R+v*E)),M(R-M(0)),V!=0)throw new Error("Malformed buffer data: "+V)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp",COLOR:"meshopt_decodeFilterColor"},h={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},u=[],d=0;function f(m){var b={object:new Worker(m),pending:0,requests:{}};return b.object.onmessage=function(y){var v=y.data;b.pending-=v.count,b.requests[v.id][v.action](v.value),delete b.requests[v.id]},b}function g(m){for(var b="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(s)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+p.name+";"+c.toString()+p.toString(),y=new Blob([b],{type:"text/javascript"}),v=URL.createObjectURL(y),E=u.length;E<m;++E)u[E]=f(v);for(var E=m;E<u.length;++E)u[E].object.postMessage({});u.length=m,URL.revokeObjectURL(v)}function _(m,b,y,v,E){for(var w=u[0],x=1;x<u.length;++x)u[x].pending<w.pending&&(w=u[x]);return new Promise(function(M,I){var R=new Uint8Array(y),D=++d;w.pending+=m,w.requests[D]={resolve:M,reject:I},w.object.postMessage({id:D,count:m,size:b,source:R,mode:v,filter:E},[R.buffer])})}function p(m){var b=m.data;self.ready.then(function(y){if(!b.id)return self.close();try{var v=new Uint8Array(b.count*b.size);c(y,y.exports[b.mode],v,b.count,b.size,b.source,y.exports[b.filter]),self.postMessage({id:b.id,count:b.count,action:"resolve",value:v},[v.buffer])}catch(E){self.postMessage({id:b.id,count:b.count,action:"reject",value:E})}})}return{ready:a,supported:!0,useWorkers:function(m){g(m)},decodeVertexBuffer:function(m,b,y,v,E){c(r,r.exports.meshopt_decodeVertexBuffer,m,b,y,v,r.exports[l[E]])},decodeIndexBuffer:function(m,b,y,v){c(r,r.exports.meshopt_decodeIndexBuffer,m,b,y,v)},decodeIndexSequence:function(m,b,y,v){c(r,r.exports.meshopt_decodeIndexSequence,m,b,y,v)},decodeGltfBuffer:function(m,b,y,v,E,w){c(r,r.exports[h[E]],m,b,y,v,r.exports[l[w]])},decodeGltfBufferAsync:function(m,b,y,v,E){return u.length>0?_(m,b,y,h[v],l[E]):a.then(function(){var w=new Uint8Array(m*b);return c(r,r.exports[h[v]],w,m,b,y,r.exports[l[E]]),w})}}})();var zp={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Jn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},$v=new Di(-1,1,1,-1,0,1),qu=class extends Ct{constructor(){super(),this.setAttribute("position",new dt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new dt([0,2,0,0,2,0],2))}},Qv=new qu,Lr=class{constructor(e){this._mesh=new Pt(Qv,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,$v)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}};var Dr=class extends Jn{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof Wt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Rr.clone(e.uniforms),this.material=new Wt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Lr(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var ro=class extends Jn{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},vl=class extends Jn{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}};var yl=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new se);this._width=n.width,this._height=n.height,t=new Qt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:bn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Dr(zp),this.copyPass.material.blending=Fi,this.timer=new Ts}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){let o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}ro!==void 0&&(a instanceof ro?n=!0:a instanceof vl&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new se);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Sl=class extends Jn{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new De}render(e,t,n){let s=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}};var ao={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var Ml=class extends Jn{constructor(){super(),this.isOutputPass=!0,this.uniforms=Rr.clone(ao.uniforms),this.material=new xr({name:ao.name,uniforms:this.uniforms,vertexShader:ao.vertexShader,fragmentShader:ao.fragmentShader}),this._fsQuad=new Lr(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ot.getTransfer(this._outputColorSpace)===xt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===ka?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ba?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===za?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ga?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Va?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Wa?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Ha&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};function El(i=!1){let e=i?new Uint8Array([196,196,196,255,228,228,228,255,255,255,255,255]):new Uint8Array([105,105,105,255,182,182,182,255,255,255,255,255]),t=new Zi(e,3,1,Tn);return t.minFilter=t.magFilter=Dt,t.generateMipmaps=!1,t.needsUpdate=!0,t}function Gp(i,e,t=e){let n=new Map;return i.traverse(s=>{if(!s.isMesh)return;let r=s.material,a=/^(neko|luna)_(?!cushion)/.test(s.name);s.userData.ink=a?s.name.startsWith("neko")?2:3:1;let o=r.name+"|"+r.color.getHexString()+(a?"|cat":"");if(!n.has(o)){let c=new ni({color:r.color.clone(),gradientMap:a?t:e,name:r.name});n.set(o,c)}s.material=n.get(o),s.castShadow=!0,s.receiveShadow=!/^(neko|luna)_(?!cushion)/.test(s.name)}),n}var Tl=class{constructor(e,t,n,s={}){this.renderer=e,this.scene=t,this.camera=n,this.target=new Qt(1,1,{type:bn}),this.target.depthTexture=new Kn(1,1),this.target.depthTexture.type=Cn;let r=a=>new Wt({uniforms:{id:{value:a}},vertexShader:"varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"uniform float id; varying vec3 vN; void main(){ gl_FragColor = vec4(normalize(vN) * 0.5 + 0.5, id); }"});this.preMats={1:r(1),2:r(.6),3:r(.3),4:r(.9)},this.swap=[],this.uniforms={tDiffuse:{value:null},tNormal:{value:this.target.texture},tDepth:{value:this.target.depthTexture},resolution:{value:new se(1,1)},cameraNear:{value:n.near},cameraFar:{value:n.far},ink:{value:new De(s.ink??"#3a2d36")},nekoInk:{value:new De(s.nekoInk??"#e0764a")},lunaInk:{value:new De(s.lunaInk??"#8e78bd")},thickness:{value:s.thickness??1.2},strength:{value:s.strength??.85},paper:{value:s.paper??.035},time:{value:0}},this.material=new Wt({uniforms:this.uniforms,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
        #include <packing>
        uniform sampler2D tDiffuse, tNormal, tDepth;
        uniform vec2 resolution;
        uniform float cameraNear, cameraFar, thickness, strength, paper, time;
        uniform vec3 ink, nekoInk, lunaInk;
        varying vec2 vUv;
        float depthAt(vec2 uv){ return -perspectiveDepthToViewZ(texture2D(tDepth, uv).x, cameraNear, cameraFar); }
        vec4 nAt(vec2 uv){ vec4 t = texture2D(tNormal, uv); return vec4(t.xyz * 2.0 - 1.0, t.a); }
        float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
        // edge strength at a given radius; also reports the "ink id" of the nearest sample
        float edgeAt(vec2 px, out float idNear, float useNormals){
          float dc = depthAt(vUv);
          vec2 o[4]; o[0] = vec2(-px.x,0.); o[1] = vec2(px.x,0.); o[2] = vec2(0.,px.y); o[3] = vec2(0.,-px.y);
          vec4 nc = nAt(vUv);
          float dmin = dc; idNear = nc.a;
          float lap = 0.0; float ne = 0.0;
          float ds[4];
          for (int i = 0; i < 4; i++) {
            vec2 uv = vUv + o[i];
            ds[i] = depthAt(uv);
            vec4 n = nAt(uv);
            ne += distance(nc.xyz, n.xyz);
            if (ds[i] < dmin) { dmin = ds[i]; idNear = n.a; }
          }
          float de = (abs(ds[0] + ds[1] - 2.0*dc) + abs(ds[2] + ds[3] - 2.0*dc)) / max(dc, 0.001);
          return max(smoothstep(0.012, 0.035, de), smoothstep(0.55, 1.1, ne) * useNormals);
        }
        void main(){
          vec4 col = texture2D(tDiffuse, vUv);
          vec2 px = thickness / resolution;
          float id1; float e = edgeAt(px, id1, 1.0);
          float id = id1;
          // the cats get a fatter, coloured outline, like the mascot drawings
          float id2; float e2 = edgeAt(px * 1.8, id2, 0.0);
          // fat lines only when the cat is close enough to have room for them
          float near = 1.0 - smoothstep(9.0, 16.0, depthAt(vUv));
          if (id2 < 0.8) { id = min(id, id2); e = max(e, e2 * near); }
          // drawn characters (id 0.9) keep their own outline: no ink around them
          if (abs(id - 0.9) < 0.05) e = 0.0;
          float bg = step(0.9999, texture2D(tDepth, vUv).x);
          vec3 lineCol = mix(col.rgb * ink * 1.4, ink, 0.6);
          float k = strength;
          if (id < 0.8) {
            lineCol = id < 0.45 ? lunaInk : nekoInk;
            k = min(1.0, strength * 1.25);
          }
          float a = col.a;
          if (bg > 0.5 && id < 0.8) a = max(a, e * k);
          vec3 c = mix(col.rgb, lineCol, e * k);
          float g = hash(floor(vUv * resolution / 1.5) + floor(time * 12.0)) - 0.5;
          c += g * paper * (1.0 - bg);
          gl_FragColor = vec4(c, a);
        }`})}setSize(e,t,n){this.target.setSize(Math.floor(e*n),Math.floor(t*n)),this.uniforms.resolution.value.set(e*n,t*n)}prepare(e){let t=this.renderer,n=this.scene.overrideMaterial,s=this.scene.background,r=this.camera.layers.mask;e!=null&&(this.camera.layers.mask=e),this.scene.background=null;let a=this.swap;a.length=0,this.scene.traverse(l=>{!l.isMesh||!l.visible||(a.push(l,l.material),l.material=l.userData.preMat||this.preMats[l.userData.ink||1])});let o=t.getClearColor(new De),c=t.getClearAlpha();t.setRenderTarget(this.target),t.setClearColor(8421631,1),t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(null),t.setClearColor(o,c);for(let l=0;l<a.length;l+=2)a[l].material=a[l+1];this.scene.overrideMaterial=n,this.scene.background=s,this.camera.layers.mask=r,this.uniforms.cameraNear.value=this.camera.near,this.uniforms.cameraFar.value=this.camera.far}};var Xu=[{h:0,name:"night"},{h:5.5,name:"night"},{h:7.5,name:"morning"},{h:10,name:"day"},{h:16.5,name:"day"},{h:18.5,name:"golden"},{h:20.3,name:"night"},{h:24,name:"night"}],Ds={morning:{bg:"#b7e0d8",sky:["#a9dcd6","#f5d9b8"],sun:"#ffe7c4",sunI:2.2,amb:"#a8b8d8",ambI:1.8,sunDir:[-.35,.55,.75],lamp:0,bulbs:.15,stars:0,ink:"#3a3440",page:"light"},day:{bg:"#8fd3cf",sky:["#7fcdc8","#c9ece4"],sun:"#fff3dc",sunI:2.5,amb:"#9fb3d6",ambI:1.85,sunDir:[.25,.75,.6],lamp:0,bulbs:.1,stars:0,ink:"#33303e",page:"light"},golden:{bg:"#f2b58c",sky:["#f29b7e","#ffd7a1"],sun:"#ffc68a",sunI:2.4,amb:"#9d8fc4",ambI:1.6,sunDir:[.75,.3,.45],lamp:.6,bulbs:.7,stars:0,ink:"#3b2a37",page:"light"},night:{bg:"#24284a",sky:["#1d2142","#3b3a6e"],sun:"#9fb6ff",sunI:.55,amb:"#5d64a8",ambI:1.05,sunDir:[.4,.6,.35],lamp:1,bulbs:1,stars:1,ink:"#16152a",page:"dark"}};function ey(){let i=new URLSearchParams(location.search).get("h");if(i!=null&&i!==""&&!Number.isNaN(Number(i)))return Number(i);let e=new Date;return e.getHours()+e.getMinutes()/60}function Ku(i=ey()){for(let e=0;e<Xu.length-1;e++){let t=Xu[e],n=Xu[e+1];if(i>=t.h&&i<=n.h){let s=n.h===t.h?0:(i-t.h)/(n.h-t.h);return{a:Ds[t.name],b:Ds[n.name],t:qt.smoothstep(s,0,1),name:s<.5?t.name:n.name,h:i}}}return{a:Ds.night,b:Ds.night,t:0,name:"night",h:i}}var Hp=new De,Vp=new De;function Ls(i,e,t,n=new De){return Hp.set(i),Vp.set(e),n.copy(Hp).lerp(Vp,t)}var wl=(i,e,t)=>i+(e-i)*t;function Wp(i,e,t=3){let{a:n,b:s,t:r}=e,a=i.getContext("2d"),o=i.width,c=i.height,l=Ls(n.sky[0],s.sky[0],r).getStyle(),h=Ls(n.sky[1],s.sky[1],r).getStyle(),u=a.createLinearGradient(0,0,0,c);u.addColorStop(0,l),u.addColorStop(1,h),a.fillStyle=u,a.fillRect(0,0,o,c);let d=t,f=()=>(d=d*16807%2147483647)/2147483647,g=wl(n.stars,s.stars,r);if(g>.05){a.fillStyle=`rgba(255,248,220,${g})`;for(let b=0;b<70;b++){let y=f()*o,v=f()*c*.75,E=f()<.15?2.6:1.3;a.beginPath(),a.arc(y,v,E,0,Math.PI*2),a.fill()}a.fillStyle=`rgba(255,244,214,${g})`,a.beginPath(),a.arc(o*.72,c*.26,c*.11,0,Math.PI*2),a.fill(),a.fillStyle=l,a.beginPath(),a.arc(o*.72+c*.05,c*.23,c*.1,0,Math.PI*2),a.fill()}let _=1-g;if(_>.05){let b=(w,x,M,I,R)=>{a.fillStyle=R,y(w+6,x+8,M),a.fillStyle=I,y(w,x,M)},y=(w,x,M)=>{a.beginPath();let I=5;for(let R=0;R<I;R++){let D=M*(.12+.08*Math.sin(R*1.7+t));a.moveTo(w+R/(I-1)*M+D,x),a.arc(w+R/(I-1)*M,x-D*.35,D,0,Math.PI*2)}a.rect(w-M*.08,x-M*.05,M*1.16,M*.12),a.fill()},v=`rgba(255,255,255,${.92*_})`,E=Ls(n.sky[0],"#5c7fa8",.35).getStyle();a.globalAlpha=_,b(o*.08,c*.32,o*.34,v,E),b(o*.58,c*.18,o*.26,v,E),b(o*.5,c*.62,o*.42,v,E),a.globalAlpha=1}let p=Ls(Ls(n.bg,s.bg,r).getStyle(),"#2a2840",.55).getStyle();a.fillStyle=p;let m=0;for(;m<o;){let b=40+f()*80,y=c*(.08+f()*.16);if(a.fillRect(m,c-y,b-6,y),g>.3){a.fillStyle=`rgba(255,214,140,${g*.9})`;for(let v=0;v<3;v++)f()<.6&&a.fillRect(m+8+v*14,c-y+10+f()*(y-24),7,9);a.fillStyle=p}m+=b}}var Ns={fill:"#FFB37E",line:"#F28A5B",ink:"#2B1D16",whisker:"#B5654A",blush:"#FF8F7A"},Zp={fill:"#F6F1FC",line:"#9B7FC4",ink:"#2B1D16",whisker:"#8E78BD",blush:"#FF9DB0",bow:"#5FB3A8",bowLine:"#3E8B84"},qp=new Path2D("M58 118 C54 92 64 74 78 66 L82 34 L108 56 C116 54 128 54 136 56 L162 34 L166 66 C180 74 190 92 186 118 C182 146 156 162 122 162 C88 162 62 146 58 118 Z"),Xp=new Path2D("M80 236 C64 236 60 212 64 194 C70 166 86 148 122 148 C158 148 174 166 180 194 C184 212 180 236 164 236 Z"),ty=new Path2D("M106 196 L106 230 M138 196 L138 230"),Kp=new Path2D("M168 230 C196 232 204 246 184 251 C154 257 98 256 72 250"),Al=new Path2D("M118 122 L126 122 L122 126 Z"),$p=new Path2D("M113 128 Q117.5 134 122 128 Q126.5 134 131 128"),ny=new Path2D("M78 121 L56 117 M78 128 L56 131 M166 121 L188 117 M166 128 L188 131"),iy=new Path2D("M84 44 L101 58 Q90 60 86 64 Z M160 44 L143 58 Q154 60 158 64 Z"),ki=[[150,228],[157,228.9],[163.5,229.4],[169.6,229.3],[175.3,228.8],[180.4,227.8],[185.1,226.4],[189.3,224.6],[193,222.4],[196.2,219.8],[198.9,216.9],[201,213.7],[202.6,210.1],[203.6,206.3],[204.1,202.3],[204,198],[203.6,194.5],[203,191],[202.4,187.6],[201.8,184.3],[201.2,181],[200.6,177.8],[200,174.6],[199.5,171.4],[199.1,168.2],[198.8,165],[198.7,161.7],[198.7,158.4],[198.9,155],[199.3,151.5],[200,148],[200.7,145.3],[201.7,142.8],[202.9,140.6],[204.3,138.6],[205.9,136.8],[207.7,135.3],[209.6,134],[211.7,133],[213.8,132.3],[216.1,131.9],[218.4,131.7],[220.8,131.8],[223.2,132.2],[225.6,133],[228,134],[230.3,135.3],[232.4,136.9],[234.2,138.7],[235.8,140.7],[237.2,142.8],[238.3,145.1],[239.2,147.5],[239.8,150],[240.1,152.6],[240.1,155.2],[239.9,157.8],[239.4,160.4],[238.6,163],[237.4,165.6],[236,168],[235.2,169.1],[234.3,170.2],[233.4,171.1],[232.4,172],[231.4,172.7],[230.4,173.3],[229.4,173.9],[228.3,174.3],[227.3,174.7],[226.2,175],[225.2,175.1],[224.1,175.2],[223,175.2],[222,175.2],[221,175]],jp=0,Jp=ki.map((i,e)=>e?jp+=Math.hypot(i[0]-ki[e-1][0],i[1]-ki[e-1][1]):0).map(i=>i/jp),Yp=Math.PI/180,oo=(i,e)=>i+Math.random()*(e-i);function ju(i,e,t,n){let s=oo(i,e);return{lo:i,hi:e,dMin:t,dMax:n,from:s,to:oo(i,e),t:0,d:oo(t,n),v:s}}function Ju(i,e){i.t+=e,i.t>=i.d&&(i.from=i.to,i.to=oo(i.lo,i.hi),i.t=0,i.d=oo(i.dMin,i.dMax));let t=i.t/i.d;return i.v=i.from+(i.to-i.from)*t*t*(3-2*t),i.v}function Fs(){let i={sway:ju(-6,7,.9,2.6),wave:ju(.5,4.5,1.2,3.5),speed:ju(1,3.2,1.5,4),phase:Math.random()*6.28};return{step(e,t=1){i.sway.lo=-6*t,i.sway.hi=7*t,i.wave.hi=.5+4*t,Ju(i.sway,e),Ju(i.wave,e),i.phase+=Ju(i.speed,e)*e},points(){let[e,t]=ki[0];return ki.map((n,s)=>{let r=Jp[s],a=Math.pow(r,1.3)*(i.sway.v+i.wave.v*Math.sin(i.phase-1.8*r))*Yp,o=n[0]-e,c=n[1]-t;return[e+o*Math.cos(a)-c*Math.sin(a),t+o*Math.sin(a)+c*Math.cos(a)]})},path(){let[e,t]=ki[0],n=new Path2D,s=0,r=0;for(let a=0;a<ki.length;a++){let o=Jp[a],c=Math.pow(o,1.3)*(i.sway.v+i.wave.v*Math.sin(i.phase-1.8*o))*Yp,l=ki[a][0]-e,h=ki[a][1]-t;s=e+l*Math.cos(c)-h*Math.sin(c),r=t+l*Math.sin(c)+h*Math.cos(c),a?n.lineTo(s,r):n.moveTo(s,r)}return{p:n,tip:[s,r]}}}}function Yu(i,e){let t=e.pal||Ns;if(i.lineCap="round",i.lineJoin="round",i.fillStyle=t.line,i.globalAlpha=.16,i.beginPath(),i.ellipse(124,242,84,6,0,0,Math.PI*2),i.fill(),i.globalAlpha=1,e.tail){let{p:a,tip:o}=e.tail.path();i.strokeStyle=t.line,i.lineWidth=16,i.stroke(a),i.strokeStyle=t.fill,i.lineWidth=5,i.stroke(a),i.fillStyle=t.line,i.beginPath(),i.arc(o[0],o[1],9,0,Math.PI*2),i.fill()}i.fillStyle=t.fill,i.strokeStyle=t.line,i.lineWidth=6,i.fill(Xp),i.stroke(Xp),i.stroke(ty);for(let a of[104,140])i.beginPath(),i.ellipse(a,234,14,8,0,0,Math.PI*2),i.fill(),i.stroke();e.tail||(i.strokeStyle=t.line,i.lineWidth=16,i.stroke(Kp),i.strokeStyle=t.fill,i.lineWidth=5,i.stroke(Kp),i.fillStyle=t.line,i.beginPath(),i.arc(70,249,9,0,Math.PI*2),i.fill());let n=e.head||{rot:0,dy:0};i.save(),i.translate(122,150+(n.dy||0)),i.rotate(n.rot||0),i.translate(-122,-150),e.phones&&(i.strokeStyle="#3f3360",i.lineWidth=15,i.beginPath(),i.moveTo(60,112),i.bezierCurveTo(60,30,184,30,184,112),i.stroke(),i.strokeStyle="#7d6bb0",i.lineWidth=7,i.stroke()),i.fillStyle=t.fill,i.strokeStyle=t.line,i.lineWidth=6,i.fill(qp),i.stroke(qp),i.fillStyle=t.line,i.globalAlpha=.35,i.fill(iy),i.globalAlpha=1;let s=[100,144],r=(e.look||0)*3;if(i.fillStyle=t.ink,i.strokeStyle=t.ink,i.lineWidth=3.4,e.eyes==="open"){for(let a of s)i.beginPath(),i.arc(a+r,112,6,0,Math.PI*2),i.fill();i.fillStyle="#fff";for(let a of s)i.beginPath(),i.arc(a+r-1.8,110.2,1.9,0,Math.PI*2),i.fill()}else if(e.eyes==="blink")for(let a of s)i.beginPath(),i.moveTo(a-7,112),i.lineTo(a+7,112),i.stroke();else{let a=e.eyes==="happy";for(let o of s)i.beginPath(),a?(i.moveTo(o-8,115),i.quadraticCurveTo(o,105,o+8,115)):(i.moveTo(o-8,112),i.quadraticCurveTo(o,119,o+8,112)),i.stroke()}i.fillStyle=t.ink,i.lineWidth=2,i.fill(Al),i.stroke(Al),i.lineWidth=2.6,i.stroke($p),i.fillStyle=t.blush,i.globalAlpha=.45;for(let a of[86,158])i.beginPath(),i.arc(a,130,5.5,0,Math.PI*2),i.fill();if(i.globalAlpha=1,i.strokeStyle=t.whisker,i.lineWidth=2.4,i.stroke(ny),e.phones)for(let a of[52,192])i.fillStyle="#5a4a8a",i.strokeStyle="#3f3360",i.lineWidth=5,i.beginPath(),i.roundRect(a-13,92,26,44,11),i.fill(),i.stroke(),i.fillStyle=t.fill,i.beginPath(),i.roundRect(a+(a<122?6:-12),98,6,32,3),i.fill();if(e.bow){i.fillStyle=t.bow,i.strokeStyle=t.bowLine,i.lineWidth=4;for(let a of[-1,1])i.beginPath(),i.moveTo(150,62),i.lineTo(150+a*20,48),i.quadraticCurveTo(150+a*26,62,150+a*20,76),i.closePath(),i.fill(),i.stroke();i.beginPath(),i.arc(150,62,6,0,Math.PI*2),i.fill(),i.stroke()}i.restore()}function Zu(i=2){let e=document.createElement("canvas");e.width=260*i,e.height=262*i;let t=e.getContext("2d");return{canvas:e,draw(n){t.setTransform(1,0,0,1,0,0),t.clearRect(0,0,e.width,e.height),t.setTransform(i,0,0,i,0,0),Yu(t,n)}}}function Qp(i,e){let t=e.pal||Ns;i.fillStyle=t.fill,i.fillRect(0,0,260,262),i.lineCap="round",i.lineJoin="round";let n=[100,144],s=(e.look||0)*3;if(i.fillStyle=t.ink,i.strokeStyle=t.ink,i.lineWidth=3.4,e.eyes==="open"){for(let r of n)i.beginPath(),i.arc(r+s,112,6.5,0,Math.PI*2),i.fill();i.fillStyle="#fff";for(let r of n)i.beginPath(),i.arc(r+s-1.9,110,2,0,Math.PI*2),i.fill()}else if(e.eyes==="heavy")for(let r of n)i.beginPath(),i.arc(r,112.5,6.5,0,Math.PI),i.fill(),i.beginPath(),i.moveTo(r-8,112),i.lineTo(r+8,112),i.stroke();else if(e.eyes==="yawn")for(let r of n){let a=r<122?1:-1;i.beginPath(),i.moveTo(r-7*a,107),i.lineTo(r+5*a,112),i.lineTo(r-7*a,117),i.stroke()}else if(e.eyes==="blink")for(let r of n)i.beginPath(),i.moveTo(r-7,112),i.lineTo(r+7,112),i.stroke();else{let r=e.eyes==="happy";for(let a of n)i.beginPath(),r?(i.moveTo(a-8,115),i.quadraticCurveTo(a,105,a+8,115)):(i.moveTo(a-8,112),i.quadraticCurveTo(a,119,a+8,112)),i.stroke()}i.fillStyle=t.ink,i.lineWidth=2,i.fill(Al),i.stroke(Al),e.mouth==="mew"?(i.beginPath(),i.ellipse(122,134,5,5.5,0,0,Math.PI*2),i.fill(),i.fillStyle="#ff8fa0",i.beginPath(),i.ellipse(122,136.5,3,2,0,0,Math.PI*2),i.fill()):e.eyes==="yawn"?(i.beginPath(),i.ellipse(122,139,9,4+9*(e.yawn??1),0,0,Math.PI*2),i.fill(),i.fillStyle="#ff8fa0",i.beginPath(),i.ellipse(122,143+4*(e.yawn??1),5.5,2+2.5*(e.yawn??1),0,0,Math.PI*2),i.fill()):(i.lineWidth=2.6,i.stroke($p)),i.fillStyle=t.blush,i.globalAlpha=.5;for(let r of[86,158])i.beginPath(),i.arc(r,130,6,0,Math.PI*2),i.fill();i.globalAlpha=1}var em=[[168,230],[196,232],[204,246],[184,251],[154,257],[98,256],[72,250]];var Us={mist:"#F3EEFB",lilacLight:"#E7DCF7",lilac:"#9C7BD6",lilacSoft:"#C9B6EC",plum:"#2B2144",plumSoft:"#4A3C6B",peach:"#FFB37E",peachDeep:"#F28A5B",pink:"#FFB6C1",cream:"#FFF8F1",mint:"#BFE6D3"},nm='"Dela Gothic One", "Zen Maru Gothic", system-ui, sans-serif',$u='"Zen Maru Gothic", system-ui, sans-serif';function Rl(i,e,t,n,s,r,a,o){let c=a;for(i.font=`${r} ${c}px ${o}`;i.measureText(e).width>s&&c>8;)c-=1,i.font=`${r} ${c}px ${o}`;i.fillText(e,t,n)}function co(i,e){let t=document.createElement("canvas");return t.width=i,t.height=e,[t,t.getContext("2d")]}function lo(i){let e=new ei(i);return e.colorSpace=yt,e.anisotropy=4,e}function Nr(i,e,t,n,s,r){i.beginPath(),i.moveTo(e+r,t),i.arcTo(e+n,t,e+n,t+s,r),i.arcTo(e+n,t+s,e,t+s,r),i.arcTo(e,t+s,e,t,r),i.arcTo(e,t,e+n,t,r),i.closePath()}function sy(i,e,t,n,s){i.fillStyle=s,i.beginPath(),i.ellipse(e,t+n*.35,n*.55,n*.45,0,0,Math.PI*2),i.fill(),[[-.55,-.25],[-.2,-.6],[.2,-.6],[.55,-.25]].forEach(([r,a])=>{i.beginPath(),i.ellipse(e+r*n,t+a*n,n*.2,n*.25,0,0,Math.PI*2),i.fill()})}var tm=["sun","waves","stripes","dots","moon","arch","grid","blob"];function im(i,e,t,n){let[r,a]=co(512,512),[o,c,l]=n;Nr(a,0,0,512,512,44),a.save(),a.clip();let h=a.createLinearGradient(0,0,0,512);h.addColorStop(0,o),h.addColorStop(1,c),a.fillStyle=h,a.fillRect(0,0,512,512),a.fillStyle=l,a.strokeStyle=l;let u=tm[i%tm.length];if(u==="sun"){a.beginPath(),a.arc(512*.5,512*.46,512*.22,0,Math.PI*2),a.fill(),a.globalAlpha=.5;for(let d=0;d<4;d++)a.fillRect(0,512*(.6+d*.06),512,512*.025)}else if(u==="waves"){a.lineWidth=16;for(let d=0;d<5;d++){a.beginPath();for(let f=-20;f<=532;f+=10){let g=512*(.25+d*.12)+Math.sin(f/50+d)*18;f===-20?a.moveTo(f,g):a.lineTo(f,g)}a.stroke()}}else if(u==="stripes"){a.save(),a.translate(512/2,512/2),a.rotate(-.5);for(let d=-6;d<6;d++)a.fillRect(-512,d*60,512*2,26);a.restore()}else if(u==="dots")for(let d=0;d<6;d++)for(let f=0;f<6;f++)a.beginPath(),a.arc(60+f*78,60+d*62,10+(f+d)%3*6,0,Math.PI*2),a.fill();else if(u==="moon")a.beginPath(),a.arc(512*.55,512*.42,512*.2,0,Math.PI*2),a.fill(),a.fillStyle=o,a.beginPath(),a.arc(512*.63,512*.36,512*.17,0,Math.PI*2),a.fill();else if(u==="arch"){a.lineWidth=26;for(let d=0;d<4;d++)a.beginPath(),a.arc(512/2,512*.78,512*(.12+d*.1),Math.PI,0),a.stroke()}else if(u==="grid"){a.lineWidth=6;for(let d=1;d<8;d++)a.beginPath(),a.moveTo(d*64,0),a.lineTo(d*64,512),a.moveTo(0,d*64),a.lineTo(512,d*64),a.stroke();a.beginPath(),a.arc(512*.62,512*.38,70,0,Math.PI*2),a.fill()}else a.beginPath(),a.moveTo(512*.2,512*.5),a.bezierCurveTo(512*.1,512*.1,512*.7,512*.05,512*.8,512*.4),a.bezierCurveTo(512*.95,512*.75,512*.35,512*.85,512*.2,512*.5),a.fill();return a.globalAlpha=1,a.fillStyle="rgba(255,255,255,.9)",Nr(a,26,392,460,94,22),a.fill(),a.fillStyle=Us.plum,Rl(a,e,50,440,412,600,36,nm),a.fillStyle=Us.plumSoft,Rl(a,t,50,472,412,700,24,$u),a.restore(),lo(r)}function sm(i){let[e,t]=co(128,128);return t.fillStyle=i,t.strokeStyle=i,t.beginPath(),t.ellipse(46,96,22,17,-.4,0,Math.PI*2),t.fill(),t.lineWidth=9,t.lineCap="round",t.beginPath(),t.moveTo(66,92),t.lineTo(66,20),t.quadraticCurveTo(96,30,98,58),t.stroke(),lo(e)}function rm(){let[i,e]=co(128,128);return e.fillStyle=Us.pink,e.strokeStyle="#F28AA0",e.lineWidth=6,e.beginPath(),e.moveTo(64,108),e.bezierCurveTo(10,72,18,22,46,22),e.bezierCurveTo(58,22,64,34,64,34),e.bezierCurveTo(64,34,70,22,82,22),e.bezierCurveTo(110,22,118,72,64,108),e.fill(),e.stroke(),lo(i)}function am(){let[i,e]=co(128,128);return e.strokeStyle=Us.lilac,e.lineWidth=12,e.lineCap="round",e.lineJoin="round",e.beginPath(),e.moveTo(34,36),e.lineTo(94,36),e.lineTo(34,96),e.lineTo(94,96),e.stroke(),lo(i)}function om(){let[n,s]=co(1536,896),r=lo(n);r.anisotropy=4;let a=Fs();function o(c,l,h){s.setTransform(2,0,0,2,0,0);let u=s.createLinearGradient(0,0,0,448);u.addColorStop(0,"#3B2D63"),u.addColorStop(1,"#8E6CC9"),s.fillStyle=u,s.fillRect(0,0,768,448),s.fillStyle="rgba(255,255,255,.7)";for(let g=0;g<40;g++){let _=g*97%768,p=g*53%(448*.5);s.fillRect(_,p,3,3)}let d=c*40;[["#5B4790",.62,60],["#7A5FB4",.72,40],["#B79CE6",.84,26]].forEach(([g,_,p],m)=>{s.fillStyle=g,s.beginPath(),s.moveTo(0,448);for(let b=0;b<=768;b+=16){let y=448*_+Math.sin((b+d*(m+1))/(90+m*30))*p;s.lineTo(b,y)}s.lineTo(768,448),s.fill()});let f=Math.abs(Math.sin(c*3.2))*6;a.step(1/30,1),s.save(),s.translate(768*.6,448*.2-f),s.scale(.95,.95),Yu(s,{pal:Ns,eyes:h?"open":"sleep",tail:h?a:null,head:{rot:h?Math.sin(c*5)*.06:.05},phones:h}),s.restore(),s.fillStyle="#FF5C7A",Nr(s,24,22,108,44,14),s.fill(),s.fillStyle="#fff",s.font=`800 26px ${$u}`,s.fillText("LIVE",48,53),s.fillStyle="rgba(255,255,255,.94)",Nr(s,24,330,420,92,24),s.fill(),s.fillStyle=l.label,Nr(s,38,344,64,64,14),s.fill(),sy(s,70,372,11,"rgba(43,33,68,.8)"),s.fillStyle=Us.plum,Rl(s,l.title,118,374,262,600,26,nm),s.fillStyle=Us.plumSoft,Rl(s,l.artist,118,402,262,700,20,$u);for(let g=0;g<4;g++){let _=h?12+Math.abs(Math.sin(c*(5+g*1.7)+g))*30:8;s.fillStyle=Us.lilac,Nr(s,396+g*11,396-_,7,_,3),s.fill()}r.needsUpdate=!0}return{texture:r,draw:o}}var In=[{title:"Pisolino sul davanzale",artist:"Neko & Friends",bpm:74,label:"#FFB37E",chords:[[53,57,60,64],[52,55,59,62],[50,53,57,60],[48,52,55,59]],roots:[41,40,38,36],length:192},{title:"Fusa a 80 bpm",artist:"Kite Club",bpm:80,label:"#C9B6EC",chords:[[57,60,64,67],[50,53,57,60,64],[55,59,62,65],[48,52,55,59]],roots:[45,38,43,36],length:168},{title:"Gomitolo blu",artist:"Luna",bpm:84,label:"#BFE6D3",chords:[[51,55,58,62],[50,53,57,60],[48,51,55,58],[46,50,53,55]],roots:[39,38,36,34],length:205}],Qu=i=>440*Math.pow(2,(i-69)/12),Cl=class{constructor(){this.ctx=null,this.track=0,this.playing=!1,this.muted=!1,this.kicks=[],this.step=0,this.nextTime=0,this.timer=null,this.startedAt=0,this.elapsedBefore=0}ensure(){if(this.ctx)return;let e=new(window.AudioContext||window.webkitAudioContext);this.ctx=e;let t=e.createDynamicsCompressor();t.threshold.value=-18,t.ratio.value=3,this.warm=e.createBiquadFilter(),this.warm.type="lowpass",this.warm.frequency.value=3200,this.master=e.createGain(),this.master.gain.value=0,this.warm.connect(t).connect(this.master).connect(e.destination);let n=e.sampleRate*2;this.noise=e.createBuffer(1,n,e.sampleRate);let s=this.noise.getChannelData(0);for(let c=0;c<n;c++)s[c]=Math.random()*2-1;let r=e.createBuffer(1,n,e.sampleRate),a=r.getChannelData(0);for(let c=0;c<n;c++)a[c]=Math.random()<9e-4?(Math.random()*2-1)*.9:(Math.random()*2-1)*.012;this.crackle=e.createBufferSource(),this.crackle.buffer=r,this.crackle.loop=!0;let o=e.createBiquadFilter();o.type="highpass",o.frequency.value=900,this.crackleGain=e.createGain(),this.crackleGain.gain.value=0,this.crackle.connect(o).connect(this.crackleGain).connect(this.warm),this.crackle.start()}get level(){return this.muted?0:.26}play(){this.ensure();let e=this.ctx;e.state==="suspended"&&e.resume(),this.playing=!0,this.nextTime=e.currentTime+.08,this.startedAt=e.currentTime,this.master.gain.cancelScheduledValues(e.currentTime),this.master.gain.setTargetAtTime(this.level,e.currentTime,.15),this.crackleGain.gain.setTargetAtTime(.5,e.currentTime,.2),clearInterval(this.timer),this.timer=setInterval(()=>this.schedule(),25)}pause(){if(!this.ctx)return;let e=this.ctx;this.elapsedBefore=this.elapsed,this.playing=!1,clearInterval(this.timer),this.master.gain.setTargetAtTime(0,e.currentTime,.12),this.crackleGain.gain.setTargetAtTime(0,e.currentTime,.1)}setMuted(e){this.muted=e,this.ctx&&this.playing&&this.master.gain.setTargetAtTime(this.level,this.ctx.currentTime,.1)}setTrack(e){this.track=(e+In.length)%In.length,this.step=0,this.elapsedBefore=0,this.ctx&&(this.startedAt=this.ctx.currentTime,this.nextTime=this.ctx.currentTime+.06)}get elapsed(){return!this.ctx||!this.playing?this.elapsedBefore:this.elapsedBefore+(this.ctx.currentTime-this.startedAt)}groove(){if(!this.ctx||!this.playing)return 0;let e=60/In[this.track].bpm,t=(this.elapsed-.06)/e;return .5+.5*Math.cos(t*Math.PI*2)}mew(){if(this.muted)return;this.ensure();let e=this.ctx;e.state==="suspended"&&e.resume();let t=e.currentTime+.02,n=e.createOscillator();n.type="triangle",n.frequency.setValueAtTime(620,t),n.frequency.exponentialRampToValueAtTime(1180,t+.12),n.frequency.exponentialRampToValueAtTime(720,t+.38);let s=e.createBiquadFilter();s.type="bandpass",s.frequency.value=1400,s.Q.value=1.2;let r=e.createGain();r.gain.setValueAtTime(1e-4,t),r.gain.exponentialRampToValueAtTime(.22,t+.05),r.gain.exponentialRampToValueAtTime(1e-4,t+.42),n.connect(s).connect(r).connect(e.destination),n.start(t),n.stop(t+.45)}pulse(){if(!this.ctx||!this.playing)return 0;let e=this.ctx.currentTime;for(;this.kicks.length>1&&this.kicks[1]<=e;)this.kicks.shift();let t=this.kicks[0];return t===void 0||t>e?0:Math.exp(-(e-t)*7)}schedule(){let e=this.ctx,t=In[this.track],n=60/t.bpm/4;for(;this.nextTime<e.currentTime+.12;){let s=this.step%2===1?n*.18:0;this.hit(this.step,this.nextTime+s,t,n),this.nextTime+=n,this.step=(this.step+1)%64}}hit(e,t,n,s){let r=Math.floor(e/16),a=e%16,o=n.chords[r%n.chords.length],c=n.roots[r%n.roots.length];a===0&&this.keys(o,t,s*14,.11),a===10&&this.keys(o.slice(1),t,s*6,.06),(a===0||a===7||a===10)&&this.bass(c,t,s*(a===7?2:5)),(a===0||a===10||a===7&&r%2===1)&&this.kick(t),(a===4||a===12)&&this.snare(t),a%2===0&&this.hat(t,a%4===2?.07:.035);let l=(e*37+this.track*11)%23;if(a%2===0&&l<4){let h=o[l%o.length]+12;this.bell(h,t)}}purr(){if(this.muted)return;this.ensure();let e=this.ctx;e.state==="suspended"&&e.resume();let t=e.currentTime+.02,n=e.createBufferSource();n.buffer=this.noise;let s=e.createBiquadFilter();s.type="lowpass",s.frequency.value=180,s.Q.value=2;let r=e.createGain();r.gain.value=.5;let a=e.createOscillator();a.frequency.value=24;let o=e.createGain();o.gain.value=.5,a.connect(o).connect(r.gain);let c=e.createGain();c.gain.setValueAtTime(0,t),c.gain.linearRampToValueAtTime(.9,t+.25),c.gain.setValueAtTime(.9,t+1.1),c.gain.linearRampToValueAtTime(0,t+1.6),n.connect(s).connect(r).connect(c).connect(e.destination),n.start(t),a.start(t),n.stop(t+1.7),a.stop(t+1.7)}keys(e,t,n,s){let r=this.ctx;e.forEach((a,o)=>{[0,5].forEach((c,l)=>{let h=r.createOscillator();h.type=l?"triangle":"sine",h.frequency.value=Qu(a),h.detune.value=c;let u=r.createGain(),d=t+o*.012;u.gain.setValueAtTime(0,d),u.gain.linearRampToValueAtTime(s*(l?.35:1),d+.02),u.gain.exponentialRampToValueAtTime(s*.35,d+.4),u.gain.exponentialRampToValueAtTime(1e-4,d+n),h.connect(u).connect(this.warm),h.start(d),h.stop(d+n+.05)})})}bass(e,t,n){let s=this.ctx,r=s.createOscillator();r.type="sine",r.frequency.value=Qu(e);let a=s.createGain();a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime(.32,t+.02),a.gain.exponentialRampToValueAtTime(1e-4,t+n),r.connect(a).connect(this.warm),r.start(t),r.stop(t+n+.05)}kick(e){let t=this.ctx,n=t.createOscillator();n.frequency.setValueAtTime(130,e),n.frequency.exponentialRampToValueAtTime(42,e+.14);let s=t.createGain();s.gain.setValueAtTime(.75,e),s.gain.exponentialRampToValueAtTime(1e-4,e+.32),n.connect(s).connect(this.warm),n.start(e),n.stop(e+.35),this.kicks.push(e),this.kicks.length>16&&this.kicks.shift()}snare(e){let t=this.ctx,n=t.createBufferSource();n.buffer=this.noise;let s=t.createBiquadFilter();s.type="bandpass",s.frequency.value=1700,s.Q.value=.8;let r=t.createGain();r.gain.setValueAtTime(.28,e),r.gain.exponentialRampToValueAtTime(1e-4,e+.18),n.connect(s).connect(r).connect(this.warm),n.start(e,Math.random()),n.stop(e+.2)}hat(e,t){let n=this.ctx,s=n.createBufferSource();s.buffer=this.noise;let r=n.createBiquadFilter();r.type="highpass",r.frequency.value=6500;let a=n.createGain();a.gain.setValueAtTime(t,e),a.gain.exponentialRampToValueAtTime(1e-4,e+.045),s.connect(r).connect(a).connect(this.master),s.start(e,Math.random()),s.stop(e+.06)}bell(e,t){let n=this.ctx,s=n.createOscillator();s.type="triangle",s.frequency.value=Qu(e);let r=n.createGain();r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(.05,t+.005),r.gain.exponentialRampToValueAtTime(1e-4,t+.9),s.connect(r).connect(this.warm),s.start(t),s.stop(t+1)}};var ry="M58 118 C54 92 64 74 78 66 C96 56 148 56 166 66 C180 74 190 92 186 118 C182 146 156 162 122 162 C88 162 62 146 58 118 Z",ay="M80 236 C64 236 60 212 64 194 C70 166 86 148 122 148 C158 148 174 166 180 194 C184 212 180 236 164 236 Z",oy=[[[70,80],[82,34],[114,62]],[[130,62],[162,34],[174,80]]],cy=[[[84,66],[86,46],[102,60]],[[142,60],[158,46],[160,66]]],Fr=242,ho=122;function cm(i){let e=new bs,t=i.match(/[MLCQZ]|-?\d*\.?\d+/g),n=0,s=o=>o-ho,r=o=>Fr-o,a=()=>Number(t[n++]);for(;n<t.length;){let o=t[n++];o==="M"?e.moveTo(s(a()),r(a())):o==="L"?e.lineTo(s(a()),r(a())):o==="C"?e.bezierCurveTo(s(a()),r(a()),s(a()),r(a()),s(a()),r(a())):o==="Q"&&e.quadraticCurveTo(s(a()),r(a()),s(a()),r(a()))}return e}function lm(i){let e=new bs;return i.forEach(([t,n],s)=>s?e.lineTo(t-ho,Fr-n):e.moveTo(t-ho,Fr-n)),e.closePath(),e}var Pl=()=>new se(-999,-999);function ly(i){return{generateTopUV(e,t,n,s,r){let a=[n,s,r].map(o=>new se(t[o*3],t[o*3+1]));return t[n*3+2]>i?a:[Pl(),Pl(),Pl()]},generateSideWallUV(e,t,n,s,r,a){return[n,s,r,a].map(o=>t[o*3+2]>i?new se(t[o*3],t[o*3+1]):Pl())}}}function Il(i,e,t,n=10,s=!1){let r=new Ca(i,{depth:e,bevelEnabled:!0,bevelThickness:t*1.4,bevelSize:t,bevelOffset:-t,bevelSegments:n,curveSegments:36,UVGenerator:s?ly(e/2):void 0});r.translate(0,0,-e/2),r.deleteAttribute("normal");let a=Ip(r,.01);return a.computeVertexNormals(),a}var en=(i,e,t=0)=>new P(i-ho,Fr-e,t);function ed({pal:i,scale:e,ramp:t,bow:n=!1,inkId:s=2,earColor:r="#ffc7a6"}){let a=new Ut;a.scale.setScalar(e);let o=(Ae,te={})=>new ni({color:Ae,gradientMap:t,...te}),c=o(i.fill),l=o(i.line),h=[],u=(Ae,te,Me=a,Te=s)=>{let W=new Pt(Ae,te);return W.castShadow=!0,W.receiveShadow=!1,W.userData.ink=Te,Me.add(W),h.push(W),W};u(Il(cm(ay),34,26),c);let d=[];for(let Ae of[106,138]){let te=new Ut;te.position.copy(en(Ae,196,44)),a.add(te),u(new _a(9.5,28,6,14),c,te).position.copy(en(Ae,212,47).sub(te.position));let Te=u(new ti(1,20,14),c,te);Te.scale.set(15,9.5,17),Te.position.copy(en(Ae-2,233,50).sub(te.position)),d.push(te)}let f=d[1].position.z,g=d[1].position.x,_=new Ut;_.position.copy(en(122,152,8)),a.add(_);let p=Ae=>Ae.sub(_.position),m=document.createElement("canvas");m.width=520,m.height=524;let b=m.getContext("2d"),y=new ei(m);y.colorSpace=yt,y.wrapS=y.wrapT=vn,y.anisotropy=4,y.repeat.set(1/260,1/262),y.offset.set(ho/260,(262-Fr)/262);let v=o("#ffffff",{map:y}),E=Il(cm(ry),30,30,12,!0);u(E,v,_).position.copy(p(en(122,242,6)));for(let Ae=0;Ae<2;Ae++)u(Il(lm(oy[Ae]),8,7,6),c,_).position.copy(p(en(122,242,-6))),u(Il(lm(cy[Ae]),2,2.5,3),o(r),_).position.copy(p(en(122,242,4)));let x=new Yt({color:i.whisker});for(let[Ae,te]of[[[80,121],[52,116]],[[80,129],[52,133]],[[164,121],[192,116]],[[164,129],[192,133]]]){let Me=p(en(Ae[0],Ae[1],50)),Te=p(en(te[0],te[1],40)),W=u(new gs(1.4,1.1,Me.distanceTo(Te),6),x,_,4);W.position.copy(Me).add(Te).multiplyScalar(.5),W.quaternion.setFromUnitVectors(new P(0,1,0),Te.clone().sub(Me).normalize()),W.castShadow=!1}let M=new Ut;_.add(M);{let Ae=[];for(let te=0;te<=24;te++){let Me=Math.PI*(te/24);Ae.push(p(en(122-Math.cos(Me)*74,114-Math.sin(Me)*80,-2)))}u(new Qi(new Ai(Ae),48,6.5,10),o("#5a4a8a"),M);for(let te of[-1,1]){let Me=u(new gs(19,19,16,28),o("#4b3d78"),M);Me.rotation.z=Math.PI/2,Me.position.copy(p(en(122+te*74,116,6)));let Te=u(new gs(13,13,5,24),o(i.fill==="#FFB37E"?"#ffd2b3":"#ffd6e2"),M);Te.rotation.z=Math.PI/2,Te.position.copy(p(en(122+te*66,116,6)))}}if(M.visible=!1,n){let Ae=o(i.bow);for(let Me of[-1,1]){let Te=u(new ti(1,18,12),Ae,_);Te.scale.set(13,10,6),Te.rotation.z=Me*.35,Te.position.copy(p(en(150+Me*14,60,22)))}u(new ti(6,14,10),o(i.bowLine),_).position.copy(p(en(150,60,27)))}let I=48,R=Fs(),D=Ae=>{let te=[0];for(let ie=1;ie<Ae.length;ie++)te.push(te[ie-1]+Ae[ie].distanceTo(Ae[ie-1]));let Me=te[te.length-1],Te=[],W=0;for(let ie=0;ie<I;ie++){let re=ie/(I-1)*Me;for(;W<te.length-2&&te[W+1]<re;)W++;let Ee=(re-te[W])/Math.max(1e-6,te[W+1]-te[W]);Te.push(Ae[W].clone().lerp(Ae[W+1],Math.min(1,Math.max(0,Ee))))}return Te},U=()=>D(R.points().map(([Ae,te],Me,Te)=>en(Ae,te,-26+Me/Te.length*6))),V=(()=>{let[Ae,te,Me,Te,W,ie,re]=em,Ee=(ke,_e,je,Ge,Qe)=>ke*(1-Qe)**3+3*_e*Qe*(1-Qe)**2+3*je*Qe*Qe*(1-Qe)+Ge*Qe**3,ce=[];for(let ke=0;ke<=40;ke++){let _e=ke/40,[je,Ge,Qe,F]=_e<.5?[Ae,te,Me,Te]:[Te,W,ie,re],At=_e<.5?_e*2:(_e-.5)*2,Ie=Ee(je[0],Ge[0],Qe[0],F[0],At),pt=Math.min(Ee(je[1],Ge[1],Qe[1],F[1],At),236),me=-24+84*qt.smoothstep(_e,0,.55);ce.push(en(Ie,pt,me))}return ce.unshift(en(150,228,-26)),D(ce)})(),L=U(),H=u(new Ct,c),X=u(new ti(10,16,12),l),G=V.map(Ae=>Ae.clone());function ne(Ae){let te=Math.sin(Math.PI*Ae);for(let Me=0;Me<I;Me++){let Te=Me/(I-1);G[Me].lerpVectors(L[Me],V[Me],qt.smoothstep(Ae,Te*.35,Te*.35+.65)),G[Me].x+=te*46*Te,G[Me].z+=te*30*Te}H.geometry.dispose(),H.geometry=new Qi(new Ai(G),72,8.5,10),X.position.copy(G[I-1])}ne(0);let K="";function ee(Ae,te,Me=0,Te=""){let W=Ae+"|"+Math.round(te*4)+"|"+Math.round(Me*6)+"|"+Te;W!==K&&(K=W,b.setTransform(2,0,0,2,0,0),Qp(b,{pal:i,eyes:Ae,look:te,yawn:Me,mouth:Te}),y.needsUpdate=!0)}ee("open",0);let O={phase:"awake",t:0,sleep:0,tailM:0,bounce:0},Fe=new P(0,-1,0),qe=new on,J=new on,ye=new P,Ne=Ae=>Ae*Ae*(3-2*Ae),Oe=Ae=>Math.min(1,Math.max(0,Ae)),Se=0,We=-1;return{group:a,head:_,meshes:h,get asleep(){return O.phase==="asleep"},update(Ae,te){let Me=te.awake!==!1;te.still?(O.phase=Me?"awake":"asleep",O.sleep=O.tailM=Me?0:1):Me&&(O.phase==="asleep"||O.phase==="falling")?(O.phase="waking",O.t=0,O.from=O.sleep,O.tailFrom=O.tailM):!Me&&(O.phase==="awake"||O.phase==="waking")&&(O.phase="falling",O.t=0,O.from=O.sleep,O.tailFrom=O.tailM),O.t+=Ae;let Te=te.eyes,W=0,ie=0;if(O.phase==="falling"){let Ge=O.t;if(Ge<1.1)W=Math.sin(Math.PI*Oe(Ge/1.1)),Te=W>.25?"yawn":"heavy",ie=W;else if(Ge<2.6){let Qe=Ge-1.1;Te=Qe>.45&&Qe<.7||Qe>1.2?"sleep":"heavy"}else Te="sleep";O.sleep=O.from+(1-O.from)*Ne(Oe((Ge-.9)/1.8)),O.tailM=O.tailFrom+(1-O.tailFrom)*Ne(Oe((Ge-1.2)/1.3)),Ge>3&&(O.phase="asleep")}else if(O.phase==="waking"){let Ge=O.t;Te=Ge<.12?"sleep":Ge<.22?"blink":te.eyes,O.sleep=O.from*(1-Ne(Oe(Ge/.45))),O.tailM=O.tailFrom*(1-Ne(Oe((Ge-.1)/.6))),O.bounce=Ge>.3?Math.sin(Math.PI*Oe((Ge-.3)/.35)):0,Ge>.8&&(O.phase="awake")}else O.phase==="asleep"?(Te="sleep",O.sleep=1,O.tailM=1):(O.sleep=0,O.tailM=0,O.bounce=0);te.eyes==="happy"&&(Te="happy"),ee(Te,O.sleep>.5?0:te.look||0,W,O.sleep>.5?"":te.mouth||""),M.visible=!!te.phones&&O.sleep<.5;let re=O.sleep,Ee=te.breath||0,ce=te.still?1:1-Math.exp(-Ae*10);_.rotation.x+=((te.nod||0)*(1-re)+.22*re-ie*.18-_.rotation.x)*ce,_.rotation.y+=((te.turn||0)*(1-re)-_.rotation.y)*ce,_.rotation.z+=(-((te.rot||0)*(1-re)+.07*re)-_.rotation.z)*ce;let ke=te.wave||0,_e=Math.sin(O.t*13)*.22;ye.set(.75+_e,.95,.4).normalize(),J.setFromUnitVectors(Fe,ye),d[1].quaternion.slerpQuaternions(qe,J,ke),d[1].position.z=f+ke*16,d[1].position.x=g+ke*10,d[1].scale.set(1,1+.4*ke,1),_.position.y=Fr-152-((te.dy||0)*(1-re)+(4+Ee)*re)+O.bounce*5+ie*3,a.userData.settle=re,!te.still&&O.tailM<1&&Se++%2===0?(R.step(Ae*2,(te.energy??1)*(1-O.tailM)),L=U(),ne(O.tailM),We=O.tailM):O.tailM!==We&&(ne(O.tailM),We=O.tailM)}}}var hm=[["#5fb3a8","#ffe3c8","#2a2430"],["#b6a0dc","#f6a08f","#2a2430"],["#6c8fc4","#bfe6d3","#1d2333"]],Os=(i,e,t)=>qt.smoothstep(i,e,t),hi=qt.lerp;function um(i,e){let t=new Ut;return t.name=i.name+"_pivot",i.parent.add(t),t.position.copy(i.parent.worldToLocal(e.clone())),t.updateMatrixWorld(!0),t.attach(i),t}function dm(i){return new cn().setFromObject(i).getCenter(new P)}function hy(i){let e=new cn().setFromObject(i);return new P((e.min.x+e.max.x)/2,e.min.y,(e.min.z+e.max.z)/2)}function fm(i,e){let t=new URLSearchParams(location.search),n=matchMedia("(prefers-reduced-motion: reduce)"),s=new pl({canvas:i,antialias:!0,powerPreference:"high-performance"});s.outputColorSpace=yt,s.shadowMap.enabled=!0,s.shadowMap.type=Es;let r=new ra,a=new Vt(28,1,.3,140);a.layers.enable(1);let o=new Ms("#fff",3);o.castShadow=!0,o.shadow.mapSize.set(2048,2048),Object.assign(o.shadow.camera,{left:-9,right:9,top:9,bottom:-9,near:1,far:60}),o.shadow.bias=-8e-4,o.shadow.normalBias=.03,r.add(o,o.target);let c=new Da("#fff","#c79a7a",1.3);r.add(c);let l=new Li("#ffc77a",0,13,1.5);l.position.set(-4.2,3.1,-3.9),l.castShadow=!0,l.shadow.bias=-.002,l.shadow.mapSize.set(512,512),r.add(l);let h=new Li("#9fc4ff",0,7,1.6);h.position.set(-3.6,2.7,-.9),r.add(h);let u=new Li("#c7a4ff",0,5,1.6);u.position.set(2.4,2.6,-3.6),r.add(u);let d=new yl(s);d.addPass(new Sl(r,a));let f=new Tl(s,r,a,{thickness:1.1,paper:.012}),g=new Dr(f.material);d.addPass(g),d.addPass(new Ml);let _={flip:0,lamp:-1,tv:0,plant:0,statue:0},p={p:0,flip:0,lamp:0,tv:0,music:0,awake:0,spin:0,arm:0,intro:n.matches?1:0,plantT:0,statueT:0,happy:0,lunaHappy:0},m=Ku(),b={},y=!1,v=!1,E=0,w=0,x=0,M=0,I=document.createElement("canvas");I.width=512,I.height=440;let R=new ei(I);R.colorSpace=yt;let D="",U=["assets/app-listen.mp4","assets/app-friends.mp4"].map(we=>{let he=document.createElement("video");Object.assign(he,{muted:!0,loop:!0,playsInline:!0,preload:"auto"}),he.setAttribute("muted",""),he.setAttribute("playsinline",""),he.src=we;let Xe=new ma(he);Xe.colorSpace=yt;let Ze={v:he,tex:Xe,ready:!1,on:!1};return he.addEventListener("playing",()=>Ze.ready=!0),Ze}),V=new ys,L=["assets/app-listen-poster.jpg","assets/app-friends-poster.jpg"].map(we=>{let he=V.load(we);return he.colorSpace=yt,he}),H=V.load("media/home-idle.webp");H.colorSpace=yt;let X={mapS:{value:H},stillK:{value:0},mapA:{value:L[0]},mapB:{value:L[1]},mixK:{value:0},power:{value:0},off:{value:new De("#1d2333")},aspect:{value:1.714},srcAspect:{value:1.6}},G=new Wt({uniforms:X,vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
      uniform sampler2D mapA, mapB, mapS; uniform float mixK, power, aspect, srcAspect, stillK; uniform vec3 off; varying vec2 vUv;
      void main(){
        vec2 uv = vUv;
        // cover-fit the 16:10 video into the screen
        float k = aspect / srcAspect;
        uv.y = (uv.y - 0.5) / k + 0.5;
        vec3 c = mix(texture2D(mapA, uv).rgb, texture2D(mapB, uv).rgb, mixK);
        // at the end of the dive the TV shows the same picture the next section starts with
        c = mix(c, texture2D(mapS, uv).rgb, stillK);
        float sheen = smoothstep(0.6, 0.0, distance(vUv, vec2(0.12, 0.9))) * 0.05;
        gl_FragColor = vec4(mix(off, c, power) + sheen, 1.0);
        #include <colorspace_fragment>
      }`}),ne=om(),K=new Yt({map:ne.texture,color:"#666"}),ee=["#ffb37e","#5fb3a8","#b6a0dc"].map(we=>new Ji({map:sm(we),transparent:!0,depthWrite:!1})),O=new Ji({map:rm(),transparent:!0,depthWrite:!1}),Fe=new Ji({map:am(),transparent:!0,depthWrite:!1}),qe=[];function J(we,he,Xe={}){let Ze=new ca(we.clone());Ze.layers.set(1),Ze.position.copy(he);let _t=Xe.size??.3;Ze.scale.setScalar(_t),Ze.userData={vel:new P((Math.random()-.5)*(Xe.spread??.4),Xe.up??.6,(Math.random()-.5)*.25),life:0,max:Xe.life??2.4,size:_t,sway:Math.random()*6,kind:Xe.kind},r.add(Ze),qe.push(Ze)}function ye(we,he){let Xe=new ei(we);Xe.colorSpace=yt,Xe.anisotropy=4;let Ze=he,_t=Ze*260/262,gt=new _s(_t,Ze);gt.translate(-(122/260-.5)*_t,-(.5-242/262)*Ze,0);let bt=new Yt({map:Xe,transparent:!0,alphaTest:.04}),Le=new Pt(gt,bt);return Le.castShadow=!1,Le.receiveShadow=!1,Le.userData.preMat=new Wt({uniforms:{map:{value:Xe}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"uniform sampler2D map; varying vec2 vUv; void main(){ if (texture2D(map, vUv).a < 0.5) discard; gl_FragColor = vec4(0.5, 0.5, 1.0, 0.9); }"}),Le.userData.tex=Xe,Le}function Ne({pal:we,height:he,pos:Xe,bow:Ze}){let _t=Zu(2),gt=ye(_t.canvas,he),bt=new Ut;bt.position.set(...Xe),bt.add(gt);let Le=Fs();return{group:bt,mesh:gt,cv:_t,tail:Le,pal:we,bow:Ze,tex:gt.userData.tex,last:-1}}let Oe=new Ut;r.add(Oe);let Se=El(),We=new bl;We.setMeshoptDecoder(Bp);let Ae=new Promise((we,he)=>{We.load("media/room.glb",Xe=>{Oe.add(Xe.scene);let Ze=Gp(Xe.scene,Se,El(!0)),_t=Le=>Xe.scene.getObjectByName(Le);Xe.scene.traverse(Le=>{Le.isMesh&&(/^(bulbs|lamp_bulb)$/.test(Le.name)&&(Le.material=new Yt({color:"#fff2c4"}),Le.castShadow=!1,b[Le.name]=Le),Le.name==="window_sky"&&(Le.material=new Yt({map:R}),Le.castShadow=Le.receiveShadow=!1),Le.name==="tv_screen"&&(Le.material=G,Le.castShadow=!1),Le.name==="pc_screen"&&(Le.material=K,Le.castShadow=!1),Le.name==="poster_art"&&(Le.userData.poster=!0,b.poster=Le),/curtain|lamp_shade|wire_/.test(Le.name)&&(Le.castShadow=!1))}),b.shadeMat=[...Ze.values()].find(Le=>Le.name==="c_lampshade"),b.labelMat=[...Ze.values()].find(Le=>Le.name==="c_label"),b.ledMat=[...Ze.values()].find(Le=>Le.name==="c_led"),Xe.scene.updateMatrixWorld(!0);let gt=El(!0);b.neko=ed({pal:Ns,scale:.0125,ramp:gt,inkId:2}),b.neko.group.position.set(-.2,.5,.55),b.luna=ed({pal:Zp,scale:.0098,ramp:gt,inkId:3,bow:!0,earColor:"#f6c2d2"}),b.luna.group.position.set(2.35,.12,2.05),Oe.add(b.neko.group,b.luna.group);{let Le=new Ut,En=new ni({color:"#5a7fb8",gradientMap:Se}),Ht=new ni({color:"#7d9fd6",gradientMap:Se}),Et=new Pt(new ti(.24,24,16),En);Et.castShadow=!0,Le.add(Et);for(let Dn=0;Dn<5;Dn++){let fi=new Pt(new Pa(.235,.022,6,32),Ht);fi.rotation.set(Dn*.7,Dn*1.3,Dn*.4),Le.add(fi)}let zn=new Pt(new Qi(new Ai([new P(.18,-.16,.1),new P(.45,-.22,.2),new P(.7,-.23,.05)]),16,.018,6),Ht);Le.add(zn),Oe.add(Le),b.yarn=Le;let Gn=new P(.2+Math.cos(tt.a0)*2.15,.36,.9+Math.sin(tt.a0)*2.15);Le.position.copy(Gn),Le.traverse(Dn=>Dn.isMesh&&W.push({mesh:Dn,label:()=>"Lancia il gomitolo a Luna",act:Ye}))}b.record=_t("record"),b.recordPivot=um(b.record,dm(b.record)),["record_label","groove0","groove1","groove2"].forEach(Le=>b.recordPivot.attach(_t(Le))),b.arm=_t("tonearm"),b.cones=["speaker_l_cone","speaker_r_cone"].map(Le=>_t(Le)),b.plant=_t("plant_leaves"),b.statue=_t("statue"),b.statuePivot=um(b.statue,hy(b.statue));{let Le=Zu(2);Le.draw({pal:Ns,eyes:"happy",tail:Fs(),head:{rot:.08}});let En=_t("stand_plate"),Ht=dm(En),Et=ye(Le.canvas,.6);Et.position.set(Ht.x+.02,Ht.y-.3,Ht.z),Et.rotation.y=Math.PI/2,b.statuePivot.attach(Et)}let bt=(Le,En,Ht)=>Le.forEach(Et=>_t(Et)?.traverse(zn=>zn.isMesh&&W.push({mesh:zn,label:En,act:Ht})));b.neko.meshes.forEach(Le=>W.push({mesh:Le,label:()=>"Accarezza Neko",act:At})),b.luna.meshes.forEach(Le=>W.push({mesh:Le,label:()=>b.luna.asleep?"Sveglia Luna":"Gioca con Luna",act:me})),bt(["deck_base","deck_platter","record","record_label","tonearm","deck_knob"],()=>v?"Ferma il disco":"Fai partire il disco",()=>e.togglePlay()),bt(["speaker_l","speaker_r","speaker_l_cone","speaker_r_cone","speaker_l_tweet","speaker_r_tweet"],()=>v?"Ferma la musica":"Accendi la musica",()=>e.togglePlay()),bt(["crate","crate_in",...[0,1,2,3,4,5,6,7].map(Le=>"crate_rec"+Le)],()=>"Pesca un altro disco",()=>e.nextTrack()),bt(["lamp","lamp_shade","lamp_bulb"],()=>Te()?"Spegni la lampada":"Accendi la lampada",()=>_.lamp=Te()?0:1),bt(["window_sky","win_top","win_bot","win_l","win_r","win_mid","win_mid2","curtain_l","curtain_r"],()=>Me()?"Fai tornare giorno":"Fai venire sera",()=>_.flip=_.flip?0:1),bt(["tv_body","tv_screen"],()=>["Accendi la TV","Cambia canale","Spegni la TV"][_.tv],()=>_.tv=(_.tv+1)%3),bt(["plant"],()=>"Smuovi la pianta",()=>_.plant=1),bt(["statue"],()=>"Fai girare lo stand di Neko",()=>_.statue=1),bt(["pc_body","pc_screen","keyboard","mic"],()=>"Vai alla sezione per lo stream",()=>e.goTo("#diretta")),ie=W.map(Le=>Le.mesh),document.fonts?.ready.then(te),y=!0,te(),we()},void 0,he)});function te(){if(!b.poster)return;let we=In[M];b.poster.material=new Yt({map:im(M,we.title,we.artist,hm[M%hm.length])})}let Me=()=>_.flip?m.name!=="night":m.name==="night",Te=()=>_.lamp===-1?Me()||m.name==="golden":_.lamp===1,W=[],ie=[],re=new Oa,Ee=new se,ce={x:0,y:0},ke=document.querySelector(".room-tip"),_e=1,je=1,Ge=!1;addEventListener("pointermove",we=>Ee.set(we.clientX/_e*2-1,-(we.clientY/je)*2+1));function Qe(we){if(!y||we.target!==i||p.p>.25)return null;re.setFromCamera(new se(we.clientX/_e*2-1,-(we.clientY/je)*2+1),a);let he=re.intersectObjects(ie,!1)[0];return he?W.find(Xe=>Xe.mesh===he.object):null}i.addEventListener("pointermove",we=>{let he=Qe(we);Ie.hover=!!he&&he.act===me,i.style.cursor=he?"pointer":"",ke&&(he&&we.pointerType==="mouse"?(ke.textContent=he.label(),ke.style.transform=`translate(${we.clientX+16}px, ${we.clientY+18}px)`,ke.classList.add("on")):ke.classList.remove("on"))}),i.addEventListener("pointerleave",()=>{ke?.classList.remove("on"),Ie.hover=!1}),i.addEventListener("click",we=>{let he=Qe(we);he&&(he.act(),ke&&(ke.textContent=he.label()))});let F=we=>we.group.getWorldPosition(new P).add(new P(0,we===b.neko?2.7:2.1,.2));function At(){p.happy=1.8,!v&&p.awake<.5?(x=de.getElapsed()+3.5,e.say("Mrr? Neko si \xE8 svegliato un attimo.")):e.say("Neko fa le fusa."),e.purr();let we=F(b.neko);for(let he=0;he<6;he++)J(O,we,{size:.24+Math.random()*.1,spread:1.2,up:.8})}let Ie={idle:0,act:"",t:0,n:0,hover:!1},pt=[["hop","Luna saltella contenta."],["wave","Luna ti saluta con la zampa."],["spin","Luna fa una giravolta."],["mew","Miao! Luna ti ha risposto."]];function me(){if(Ie.idle=0,b.luna.asleep){e.say("Luna si stiracchia e si sveglia.");return}let[we,he]=pt[Ie.n++%pt.length];Ie.act=we,Ie.t=0,e.say(he),we==="mew"&&e.mew?.(),(we==="hop"||we==="mew")&&(p.lunaHappy=1.2);let Xe=F(b.luna);for(let Ze=0;Ze<(we==="hop"?5:3);Ze++)J(O,Xe,{size:.22,spread:1,up:.7})}let tt={t:-1,a0:1.05,a1:2.35,pos:new P};function Ye(){Ie.idle=0,!(tt.t>=0&&tt.t<1)&&(tt.t=0,[tt.a0,tt.a1]=[tt.a1,tt.a0],e.say(b.luna.asleep?"Il gomitolo rotola. Luna apre un occhio...":"Luna insegue il gomitolo con lo sguardo."))}let $e=[{pos:[16.6,12.6,18.8],tgt:[-.2,1.6,-.1]},{pos:[-1.2,2.75,-.9],tgt:[-6,2.75,-.9]}].map(we=>({pos:new P(...we.pos),tgt:new P(...we.tgt)})),A=t.has("cam")?[t.get("cam").split(",").map(Number),(t.get("tgt")||"0,1.5,0").split(",").map(Number)]:null,S=new P,B=new P,ae=new P,Q=new P(-4.685,2.75,-.9);function pe(){_e=innerWidth,je=innerHeight,Ge=_e<820||je>_e*.95;let we=Math.min(devicePixelRatio,Z>1?1.75:1.25);s.setPixelRatio(we),s.setSize(_e,je,!1),d.setPixelRatio(we),d.setSize(_e,je),f.setSize(_e,je,we),f.uniforms.thickness.value=Math.max(1,we*.85),a.aspect=_e/je,a.fov=Ge?34:26,a.updateProjectionMatrix();let he=qt.degToRad(a.fov/2),Xe=.91/Math.tan(he),Ze=1.56/(Math.tan(he)*a.aspect);$e[1].pos.set(Q.x+Math.min(Xe,Ze)*.995,Q.y,Q.z),$e[1].tgt.set(Q.x-2,Q.y,Q.z)}function ve(we){let he=Os(we,0,1),Xe=$e[0],Ze=$e[1],_t=Os(we,0,.55),gt=qt.smootherstep(we,.25,1);if(B.lerpVectors(Xe.tgt,Ze.tgt,_t),S.lerpVectors(Xe.pos,Ze.pos,gt),Ge){ae.subVectors(Xe.pos,Xe.tgt).multiplyScalar(1.25);let bt=ae.add(Xe.tgt);S.lerpVectors(bt,Ze.pos,gt),a.setViewOffset(_e,je,0,je*.17*(1-he),_e,je)}else a.setViewOffset(_e,je,-_e*(_e<1150?.32:.255)*(1-he),je*.02*(1-he),_e,je)}let Y=t.get("q"),Z=Y!=null?Number(Y):innerWidth<820||navigator.deviceMemory&&navigator.deviceMemory<4?1:2,ue={frames:0,time:0,checks:0},C={bg:new De,sun:new De,amb:new De,ink:new De,sunI:1,ambI:1,bulbs:0,stars:0,lampAuto:0},$=new P,j="";function be(we){de.getElapsed()-fe>60&&(m=Ku(),fe=de.getElapsed()),p.flip=hi(p.flip,_.flip,1-Math.exp(-we*2.2));let he=m,Xe=he.name==="night"?Ds.day:Ds.night,Ze=Et=>typeof he.a[Et]=="number"?wl(wl(he.a[Et],he.b[Et],he.t),Xe[Et],p.flip):null,_t=(Et,zn)=>zn.copy(Ls(he.a[Et],he.b[Et],he.t)).lerp(new De(Xe[Et]),p.flip);_t("bg",C.bg),_t("sun",C.sun),_t("amb",C.amb),_t("ink",C.ink),C.sunI=Ze("sunI"),C.ambI=Ze("ambI"),C.bulbs=Ze("bulbs"),C.stars=Ze("stars"),r.background=C.bg,o.color.copy(C.sun),o.intensity=C.sunI;let gt=new P(...he.a.sunDir).lerp(new P(...he.b.sunDir),he.t);$.copy(gt).lerp(new P(...Xe.sunDir),p.flip).normalize(),o.position.copy($).multiplyScalar(22),c.color.copy(C.amb),c.groundColor.copy(C.amb).lerp(new De("#c79a7a"),.45),c.intensity=C.ambI,f.uniforms.ink.value.copy(C.ink),p.lamp=hi(p.lamp,Te()?1:0,1-Math.exp(-we*5));let bt=C.stars;l.intensity=p.lamp*(14+bt*30),b.shadeMat&&b.shadeMat.emissive.set("#ffb45c").multiplyScalar(p.lamp*(.35+bt*.4)),b.lamp_bulb&&b.lamp_bulb.material.color.set("#fff2c4").multiplyScalar(.55+p.lamp*1.1),b.bulbs&&b.bulbs.material.color.set("#fff2c4").multiplyScalar(.45+C.bulbs*1.15);let Le=(he.name+(p.flip>.5?"f":"")+Math.round(p.flip*8)).toString();if(Le!==D){D=Le;let Et=p.flip<.5?he:{a:Xe,b:Xe,t:0};Wp(I,p.flip>.02&&p.flip<.98?p.flip<.5?he:Et:p.flip>=.98?Et:he),R.needsUpdate=!0}let En=bt>.5?"night":he.name==="golden"&&p.flip<.5?"golden":he.name==="morning"&&p.flip<.5?"morning":bt>.5?"night":"day",Ht=p.flip>.5?he.name==="night"?"day":"night":he.name;Ht!==j&&(j=Ht,e.mood(Ht,C.bg.getHexString()))}let fe=0,de=new Ts,Ve=!0,st=t.has("p")?Number(t.get("p")):null,le=0,Je=0,rt=0,Re=new P,mt=new P;function Ft(we,he){he!==we.on&&(we.on=he,he?we.v.play().catch(()=>{}):we.v.pause())}function Ln(we){if(!Ve)return;requestAnimationFrame(Ln),de.update(we);let he=Math.min(Math.max(de.getDelta(),0),.05),Xe=de.getElapsed(),Ze=n.matches;rt++;let _t=st??e.progress();p.p=Ze||st!=null?_t:hi(p.p,Number.isFinite(_t)?_t:0,1-Math.exp(-he*5));let gt=p.p;if(be(he),!y){ve(0),a.position.copy(S),a.lookAt(B),s.render(r,a);return}let bt=(oe,Ce,He)=>hi(oe,Ce,1-Math.exp(-he*He));p.music=bt(p.music,v?1:0,2.5);let Le=v||gt>.3||Xe<x?1:0;p.awake=bt(p.awake,Le,Le?3:1.4),p.tv=bt(p.tv,_.tv===0?0:1,4),p.happy=Math.max(0,p.happy-he),p.lunaHappy=Math.max(0,p.lunaHappy-he),p.intro<1&&(p.intro=Math.min(1,p.intro+he/1.6));let En=1-Math.pow(1-p.intro,3);Oe.position.y=hi(-1.5,0,En),Oe.rotation.y=hi(-.3,0,En),ce.x=hi(ce.x,Ee.x,.06),ce.y=hi(ce.y,Ee.y,.06);let Ht=p.awake,Et=oe=>Math.atan2(a.position.x-oe.group.position.x,a.position.z-oe.group.position.z);b.neko.group.rotation.y=Et(b.neko)-.32,b.luna.group.rotation.y=Et(b.luna)+.42;let zn=!Ze&&Ht>.5&&Xe%4.1<.13,Gn=p.happy>.3,Dn=Le===1;b.neko.update(he,{eyes:Gn?"happy":zn?"blink":"open",awake:Dn,phones:p.music>.5,rot:(Ze?0:Math.sin(Xe*1.3)*.05)+(Gn?Math.sin(Xe*9)*.09:0),nod:(w-.5)*.2*p.music-ce.y*.12,turn:ce.x*.35,dy:0,breath:Ze?0:Math.sin(Xe*1.4)*1.5,look:ce.x,energy:Gn?1.6:1,still:Ze});let fi=p.lunaHappy>.3;if(tt.t>=0){tt.t=Math.min(1.6,tt.t+he/2.2);let oe=qt.smootherstep(Math.min(1,tt.t),0,1),Ce=tt.a0+(tt.a1-tt.a0)*oe,He=b.yarn.position.clone();b.yarn.position.set(.2+Math.cos(Ce)*2.15,.36,.9+Math.sin(Ce)*2.15);let at=b.yarn.position.distanceTo(He);b.yarn.rotation.x+=at/.24*Math.sign(tt.a1-tt.a0),tt.t>=1&&Ie.act!=="hop"&&tt.t<1.05&&!b.luna.asleep&&(Ie.act="hop",Ie.t=0,p.lunaHappy=1.2),tt.t>=1.6&&(tt.t=-1)}let Or=b.luna.group.position,po=-.2,mo=-.6,kr=tt.t>=0&&tt.t<1.2;if(kr||Ie.hover){let oe=kr?b.yarn.position:a.position.clone().add(new P(Ee.x*4,Ee.y*2,0)),Ce=Math.atan2(oe.x-Or.x,oe.z-Or.z)-b.luna.group.rotation.y,He=Math.atan2(Math.sin(Ce),Math.cos(Ce));po=qt.clamp(He*.6,-.6,.6),mo=qt.clamp(He*1.2,-1,1)}Ie.idle+=he,(v||kr)&&(Ie.idle=0),Ie.t+=he;let ks=0,T=0,N=0,q="";if(Ie.act==="hop"){let oe=Ie.t/.9;ks=Math.abs(Math.sin(Math.min(1,oe)*Math.PI*2))*.45*(1-Math.min(1,oe)*.3),oe>=1&&(Ie.act="")}else Ie.act==="spin"?(T=qt.smootherstep(Math.min(1,Ie.t/.9),0,1)*Math.PI*2,ks=Math.sin(Math.min(1,Ie.t/.9)*Math.PI)*.25,Ie.t>.9&&(Ie.act="")):Ie.act==="wave"?(N=Math.sin(Math.min(1,Ie.t/1.6)*Math.PI),Ie.t>1.6&&(Ie.act="")):Ie.act==="mew"&&(q=Ie.t<.6?"mew":"",Ie.t>.9&&(Ie.act=""));b.luna.group.position.y=.12+ks,b.luna.group.rotation.y+=T,b.luna.group.rotation.z=(w-.5)*.09*p.music,b.luna.update(he,{eyes:fi?"happy":!Ze&&(Xe+1.7)%5.3<.13?"blink":"open",awake:Ie.idle<40,mouth:q,wave:N,rot:-.08+(Ze?0:Math.sin(Xe*.9+1)*.04)+(fi?Math.sin(Xe*9)*.09:0)+(Ie.act==="mew"?.15:0),nod:(w-.5)*.14*p.music,turn:po,look:mo,breath:Ze?0:Math.sin(Xe*1.2)*1.2,energy:fi?1.6:.8+p.music*.5,still:Ze});let k=b.neko.group.userData.settle||0,z=Ze?0:Math.sin(Xe*(k>.5?1.4:2.4))*.012;b.neko.group.scale.set(.0125*(1+z*.4+k*.03),.0125*(1+z-k*.05),.0125*(1+z*.4+k*.03)),p.spin=bt(p.spin,v?1:0,2.5),b.recordPivot.rotation.y-=he*p.spin*3.6,p.arm=bt(p.arm,v?1:0,3),b.arm.rotation.y=hi(0,.38,p.arm),b.cones.forEach(oe=>oe.scale.set(1+E*.15,1+E*.15,1)),b.ledMat&&b.ledMat.emissive.set(v?"#ff5a4a":"#000"),_.plant&&(p.plantT+=he,b.plant.rotation.z=Math.sin(p.plantT*14)*.1*Math.exp(-p.plantT*2.5),b.plant.rotation.x=Math.cos(p.plantT*11)*.06*Math.exp(-p.plantT*2.5),p.plantT>2.5&&(_.plant=0,p.plantT=0,b.plant.rotation.set(0,0,0))),_.statue&&(p.statueT=Math.min(1,p.statueT+he*1.1),b.statuePivot.rotation.y=qt.smootherstep(p.statueT,0,1)*Math.PI*2,p.statueT>=1&&(_.statue=0,p.statueT=0));let ge=Math.max(p.tv,Os(gt,.15,.5));X.power.value=ge,X.mixK.value=_.tv===2&&gt<.2?1:0;let Ue=gt>.1;Ft(U[0],!Ze&&ge>.05&&(X.mixK.value<.5||Ue)),Ft(U[1],!Ze&&ge>.05&&X.mixK.value>.5&&!Ue),Ue&&(X.mixK.value=0),X.stillK.value=Os(gt,.5,.85),X.mapA.value=U[0].ready?U[0].tex:L[0],X.mapB.value=U[1].ready?U[1].tex:L[1],h.intensity=ge*(1+C.stars*5);let xe=Math.max(C.stars,p.music*.7);rt%3===0&&ne.draw(Ze?0:Xe,In[M],v),K.color.setScalar(hi(.45,1,xe)),u.intensity=xe*(.5+C.stars*4),b.record.getWorldPosition(Re),mt.copy(F(b.neko)),v&&!Ze&&Xe-le>.6&&gt<.3&&(le=Xe,J(ee[Math.floor(Math.random()*3)],Re.clone().add(new P((Math.random()-.5)*.4,.25,.1)),{size:.3+E*.1,spread:.5})),b.neko.asleep&&!Ze&&Xe-Je>1.5&&(Je=Xe,J(Fe,mt.clone().add(new P(1,.45,.3)),{size:.26,spread:.15,up:.35,life:2.6,kind:"z"}));for(let oe=qe.length-1;oe>=0;oe--){let Ce=qe[oe],He=Ce.userData;He.life+=he*(He.kind==="z"&&p.awake>.5?4:1),Ce.position.addScaledVector(He.vel,he),Ce.position.x+=Math.sin(He.life*3+He.sway)*he*.15;let at=He.life/He.max;Ce.material.opacity=at<.15?at/.15:1-Os(at,.6,1),Ce.scale.setScalar(He.size*(.7+Math.min(1,at*4)*.3)),He.life>He.max&&(r.remove(Ce),Ce.material.dispose(),qe.splice(oe,1))}if(ve(gt),!Ze&&!Ge){let oe=1-Os(gt,0,.4);S.x+=ce.x*.5*oe,S.y+=ce.y*.3*oe}A&&(S.set(...A[0]),B.set(...A[1]),a.clearViewOffset()),a.position.copy(S),a.lookAt(B),f.uniforms.strength.value=.85*(1-Os(gt,.7,.95)),f.uniforms.time.value=Ze?0:Xe,p.intro>=1&&ue.checks<2&&Y==null&&(ue.frames++,ue.time+=he,ue.frames===90&&(90/Math.max(ue.time,.001)<40&&Z>0&&(Z--,pe()),ue.frames=ue.time=0,ue.checks++)),Z>0?(f.prepare(1),d.render(he)):s.render(r,a),e.frame?.()}return pe(),addEventListener("resize",pe),{loaded:Ae,start(){requestAnimationFrame(Ln)},setRunning(we){we!==Ve&&(Ve=we,we?(de.reset?.(),requestAnimationFrame(Ln)):U.forEach(he=>Ft(he,!1)))},setPlaying(we){v=we},setBeat(we){E=we},setGroove(we){w=we},setTrack(we){M=we,b.labelMat&&b.labelMat.color.set(In[we].label||"#ffb37e"),te()},forceProgress(we){st=we}}}var Ur=i=>Math.min(1,Math.max(0,i)),Bi=(i,e,t)=>{let n=Ur((i-e)/(t-e));return n*n*(3-2*n)},uy=(i,e,t)=>i+(e-i)*t,mm=matchMedia("(prefers-reduced-motion: reduce)"),un=(i,e=document)=>e.querySelector(i),Yn=(i,e=document)=>[...e.querySelectorAll(i)];function pm(i){let e=i.getBoundingClientRect(),t=i.offsetHeight-innerHeight;return t<=0?0:Ur(-e.top/t)}var dy=i=>{let e=i.getBoundingClientRect();return e.bottom>-100&&e.top<innerHeight+100},xn=un("#player"),fy=xn&&{laptop:un(".laptop",xn),idle:un(".sc-idle",xn),play:un(".sc-play",xn),exp:un(".sc-exp",xn),lyr:Yn(".sc-lyr",xn),heads:Yn(".ap-h",xn),facts:Yn(".ap-facts li",xn)},Bn=[.16,.36,.58,.79,1];function py(){if(!xn||(xn.classList.toggle("pre",xn.getBoundingClientRect().top>1),!dy(xn)))return;let i=mm.matches?Math.max(pm(xn),0):pm(xn),e=fy,t=Bi(i,0,Bn[0]),n=e.laptop.offsetWidth||1,r=e.laptop.firstElementChild.offsetHeight||n/1.6,a=Math.max(innerWidth/n,innerHeight/r,1),o=uy(a,1,t),c=e.laptop.offsetLeft+n/2,l=e.laptop.offsetTop+r/2,h=(innerWidth/2-c)*(1-t),u=(innerHeight/2-l)*(1-t);e.laptop.style.transformOrigin=`${n/2}px ${r/2}px`,e.laptop.style.transform=`translate(${h.toFixed(1)}px, ${u.toFixed(1)}px) scale(${o.toFixed(4)})`,xn.style.setProperty("--z",t.toFixed(3));let d=Bi(i,Bn[1],Bn[1]+.06),f=Bi(i,Bn[2],Bn[2]+.1),g=Bi(i,Bn[3],Bn[3]+.04);e.play.style.opacity=d,e.exp.style.transform=`translateY(${((1-f)*100).toFixed(2)}%)`,e.exp.style.opacity=f>0?1:0;let _=Bi(i,Bn[3],.98)*e.lyr.length,p=1+.75*Bi(i,.82,.93);e.lyr.forEach(m=>m.style.transform=`scale(${p.toFixed(4)})`),e.lyr.forEach((m,b)=>m.style.opacity=g*Ur(_-b+1>0?b===0?1:Ur((_-b)*2.5):0)),e.heads.forEach((m,b)=>{let y=Bn[b],v=Bn[b+1],E=b===0?Bi(i,.06,Bn[0]):Bi(i,y,y+.04),w=b===e.heads.length-1?1:1-Bi(i,v-.04,v),x=E*w;m.style.opacity=x.toFixed(3),m.style.transform=`translateY(${((1-E)*24-(1-w)*24).toFixed(1)}px)`,m.toggleAttribute("aria-hidden",x<.5)}),e.facts.forEach(m=>m.classList.toggle("on",i>=Bn[Number(m.dataset.step)]))}var nd=un("#amici"),id=un("#diretta"),uo=id&&un(".st-widget",id),gm=new IntersectionObserver(i=>i.forEach(e=>{e.isIntersecting&&(e.target.classList.add("in"),gm.unobserve(e.target))}),{threshold:.35});[nd,id].forEach(i=>i&&gm.observe(i));nd&&Yn(".bub",nd).forEach((i,e)=>i.style.setProperty("--i",e));addEventListener("neko-track",i=>{uo&&(un(".sw-title",uo).textContent=i.detail.title,un(".sw-artist",uo).textContent=i.detail.artist,un(".sw-cover",uo).style.background=i.detail.label,uo.classList.toggle("playing",!!i.detail.playing))});var ui=un("#temi");if(ui){let i=un(".th-shot",ui),e=un(".th-img",ui),t={};Yn(".th-btn",ui).forEach(s=>t[s.dataset.theme]=s.textContent.trim());let n=()=>Yn(".th-btn",ui).forEach(s=>new Image().src=`media/theme-${s.dataset.theme}.webp`);new IntersectionObserver(([s],r)=>s.isIntersecting&&(n(),r.disconnect()),{rootMargin:"400px"}).observe(ui),Yn(".th-btn",ui).forEach(s=>{s.addEventListener("click",r=>{if(s.getAttribute("aria-pressed")==="true")return;Yn(".th-btn",ui).forEach(_=>_.setAttribute("aria-pressed",String(_===s)));let a=s.dataset.theme;ui.style.setProperty("--th-bg",s.dataset.bg),ui.dataset.ink=s.dataset.ink;let o=`media/theme-${a}.webp`,c=`NekoTune con il tema ${t[a]}`;if(mm.matches||!i.animate){e.src=o,e.alt=c;return}let l=i.getBoundingClientRect(),h=s.getBoundingClientRect(),u=Ur((h.left+h.width/2-l.left)/l.width)*100,d=Ur((h.top+h.height/2-l.top)/l.height)*100,f=e.cloneNode();f.src=o,f.alt=c,f.classList.add("th-next"),i.appendChild(f);let g=()=>f.animate([{clipPath:`circle(0% at ${u}% ${d}%)`},{clipPath:`circle(150% at ${u}% ${d}%)`}],{duration:700,easing:"cubic-bezier(0.22, 1, 0.36, 1)"}).finished.then(()=>{e.src=o,e.alt=c,f.remove()});f.decode?f.decode().then(g,g):g()})})}var td=un("#scarica");if(td){let i=un(".dl-art",td),e=t=>i.classList.toggle("awake",t);Yn(".btn",td).forEach(t=>{t.addEventListener("pointerenter",()=>e(!0)),t.addEventListener("pointerleave",()=>e(!1)),t.addEventListener("focus",()=>e(!0)),t.addEventListener("blur",()=>e(!1))})}var bm=Yn(".tracks a"),my=bm.map(i=>document.getElementById(i.getAttribute("href").slice(1))).filter(Boolean);function gy(){let i=innerHeight*.5,e=-1;my.forEach((n,s)=>{let r=n.getBoundingClientRect();r.top<=i&&r.bottom>i&&(e=s)}),bm.forEach((n,s)=>s===e?n.setAttribute("aria-current","true"):n.removeAttribute("aria-current"));let t=Yn(".ap").some(n=>{let s=n.getBoundingClientRect();return s.top<=40&&s.bottom>40});document.body.classList.toggle("header-dark",t)}var sd=!1;function by(){sd=!1,py(),gy()}var Ll=()=>{sd||(sd=!0,requestAnimationFrame(by))};addEventListener("scroll",Ll,{passive:!0});addEventListener("resize",Ll);addEventListener("load",Ll);Ll();var tn=i=>document.querySelector(i),vm=i=>Math.min(1,Math.max(0,i)),xy=(i,e,t)=>{let n=vm((i-e)/(t-e));return n*n*(3-2*n)},kt=new Cl,_n={play:tn("#play"),prev:tn("#prev"),next:tn("#next"),sound:tn("#sound"),title:tn("#track-title"),artist:tn("#track-artist"),now:tn("#time-now"),total:tn("#time-total"),fill:tn("#progress-fill"),caption:tn("#caption")},ym=i=>`${Math.floor(i/60)}:${String(Math.floor(i%60)).padStart(2,"0")}`,di=!1,Dl=0,zi=null;function Sm(){let i=In[kt.track];_n.title.textContent=i.title,_n.artist.textContent=i.artist,_n.total.textContent=ym(i.length),zi?.setTrack(kt.track),dispatchEvent(new CustomEvent("neko-track",{detail:{...i,playing:di}}))}function Mm(i){_n.caption.textContent=i}function fo(i){di=i,document.body.classList.toggle("is-playing",i),_n.play.setAttribute("aria-pressed",String(i)),_n.play.setAttribute("aria-label",i?"Metti in pausa":"Riproduci");try{i?kt.play():kt.pause()}catch{}zi?.setPlaying(i),dispatchEvent(new CustomEvent("neko-track",{detail:{...In[kt.track],playing:i}})),Mm(i?kt.muted?"Neko \xE8 sveglio. La musica \xE8 senza audio.":"Neko \xE8 sveglio e ascolta con te.":"Neko dorme. Premi play.")}function ad(i=1){kt.setTrack(kt.track+i),Sm(),di||fo(!0)}_n.play.addEventListener("click",()=>fo(!di));_n.prev.addEventListener("click",()=>ad(-1));_n.next.addEventListener("click",()=>ad(1));_n.sound.addEventListener("click",()=>{let i=_n.sound.getAttribute("aria-pressed")!=="true";_n.sound.setAttribute("aria-pressed",String(i)),_n.sound.setAttribute("aria-label",i?"Togli l'audio":"Rimetti l'audio"),kt.setMuted(!i),di&&fo(!0)});document.addEventListener("visibilitychange",()=>{document.hidden&&di&&fo(!1)});function Tm(i){let e=In[kt.track];di&&!kt.ctx&&(Dl+=i);let t=(kt.ctx?kt.elapsed:Dl)%e.length;_n.now.textContent=ym(t),_n.fill.style.transform=`scaleX(${(t/e.length).toFixed(4)})`}var Nl=tn("#inizio"),xm=tn(".chapter-dive"),_y=tn(".hero-copy");function vy(){let i=scrollY,e=Nl.offsetTop+Nl.offsetHeight-innerHeight,t=xm.offsetTop+xm.offsetHeight-innerHeight;return vm((i-e)/Math.max(1,t-e))}function od(){let i=scrollY,e=Nl.offsetTop+Nl.offsetHeight-innerHeight,t=1-xy(i,e*.35,e+innerHeight*.15);_y?.style.setProperty("--show",t.toFixed(3)),document.body.classList.toggle("scrolled",i>40)}addEventListener("scroll",od,{passive:!0});addEventListener("resize",od);od();var yy={morning:"mattina",day:"pomeriggio",golden:"tramonto",night:"notte"},rd=tn(".clock"),Em="day";function cd(){if(!rd)return;let i=new Date,e=String(i.getHours()).padStart(2,"0"),t=String(i.getMinutes()).padStart(2,"0");rd.querySelector(".clock-time").textContent=`${e}:${t}`,rd.querySelector(".clock-word").textContent=yy[Em]||""}cd();setInterval(cd,2e4);function wm(i){Em=i,document.documentElement.dataset.time=i,cd()}{let i=Number(new URLSearchParams(location.search).get("h")??new Date().getHours()+new Date().getMinutes()/60);wm(i<6.5||i>=19.4?"night":i<8.8?"morning":i<17.5?"day":"golden")}Sm();var Sy=tn("#scene"),_m=performance.now();function My(){setInterval(()=>Tm(.25),250)}try{zi=fm(Sy,{progress:vy,togglePlay:()=>fo(!di),nextTrack:()=>ad(1),say:Mm,purr:()=>kt.purr?.(),mew:()=>kt.mew?.(),goTo:t=>tn(t)?.scrollIntoView({behavior:"smooth"}),mood:t=>wm(t),frame:()=>{let t=performance.now(),n=Math.min(.1,(t-_m)/1e3);_m=t;let s=kt.pulse();di&&!kt.ctx&&(s=Math.exp(-(Dl*1.3%1)*7)),zi.setBeat(s);let r=kt.groove();di&&!kt.ctx&&(r=.5+.5*Math.cos(Dl*(In[kt.track].bpm/60)*Math.PI*2)),zi.setGroove(r),Tm(n)}}),zi.start(),zi.setTrack(kt.track),zi.loaded.then(()=>document.body.classList.add("scene-ready")).catch(t=>{console.warn("Stanza non caricata:",t),document.body.classList.add("no-3d")});let i=tn(".after-room"),e=()=>{let t=i&&i.getBoundingClientRect().top<=0;zi.setRunning(!document.hidden&&!t)};addEventListener("scroll",e,{passive:!0}),document.addEventListener("visibilitychange",e)}catch(i){console.warn("3D non disponibile:",i),document.body.classList.add("no-3d"),My()}
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
