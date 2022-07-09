import { OrbitControls, Stats, useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { ReactElement, useEffect, useRef } from 'react';
import { BackSide, BufferAttribute, FrontSide, LinearFilter, LinearMipmapLinearFilter, LinearMipmapNearestFilter, MeshBasicMaterial, MeshDepthMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshStandardMaterial, MeshToonMaterial, NearestFilter, NearestMipmapLinearFilter, NearestMipmapNearestFilter, Vector3 } from 'three';
import { DoubleSide } from 'three/src/constants';
import { Mesh } from 'three/src/objects/Mesh';
import doorAlpha from './assets/door/alpha.jpg';
import doorAmbientOcclusion from './assets/door/ambientOcclusion.jpg';
import doorColor from './assets/door/color.jpg';
import doorHeight from './assets/door/height.jpg';
import doorMetalness from './assets/door/metalness.jpg';
import doorNormal from './assets/door/normal.jpg';
import doorRoughness from './assets/door/roughness.jpg';
import gradient3 from './assets/gradients/3.jpg';
import gradient5 from './assets/gradients/5.jpg';
import matcaps1 from './assets/matcaps/1.png';
import matcaps2 from './assets/matcaps/2.png';
import matcaps3 from './assets/matcaps/3.png';
import matcaps4 from './assets/matcaps/4.png';
import matcaps5 from './assets/matcaps/5.png';
import matcaps6 from './assets/matcaps/6.png';
import matcaps7 from './assets/matcaps/7.png';
import matcaps8 from './assets/matcaps/8.png';

import * as S from './styles';

const textureParams = {
  alphaMap: doorAlpha,
  aoMap: doorAmbientOcclusion,
  doorMap: doorColor,
  heightMap: doorHeight,
  metalnessMap: doorMetalness,
  normalMap: doorNormal,
  roughnessMap: doorRoughness,
  matcaps1: matcaps1,
  matcaps2: matcaps2,
  matcaps3: matcaps3,
  matcaps4: matcaps4,
  matcaps5: matcaps5,
  matcaps6: matcaps6,
  matcaps7: matcaps7,
  matcaps8: matcaps8,
  gradient3: gradient3,
  gradient5: gradient5,
};

function Scene() {
  const refSphere = useRef<Mesh>(null);
  const refTorus = useRef<Mesh>(null);
  const refPlane = useRef<Mesh>(null);

  const textures = useTexture(textureParams);

  const { wireframe, enableAlphaMap, flatShading, shininess, metalness, roughness, material, gradient, matcap, side, minFilter, magFilter, map, aoMap, aoMapIntensity } = useControls({
    wireframe: false,
    enableAlphaMap: false,
    flatShading: false,
    shininess: {
      value: 0,
      min: 0,
      step: 1,
      max: 1000,
    },
    metalness: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.001,
    },
    roughness: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.001,
    },
    material: {
      options: {
        basic: new MeshBasicMaterial(),
        normal: new MeshNormalMaterial(),
        matcap: new MeshMatcapMaterial(),
        depth: new MeshDepthMaterial(),
        lambert: new MeshLambertMaterial(),
        phong: new MeshPhongMaterial(),
        toon: new MeshToonMaterial(),
        standard: new MeshStandardMaterial(),
      },
    },
    gradient: {
      options: {
        none: null,
        gradient3: textures.gradient3,
        gradient5: textures.gradient5,
      },
    },
    matcap: {
      options: {
        matcap1: textures.matcaps1,
        matcap2: textures.matcaps2,
        matcap3: textures.matcaps3,
        matcap4: textures.matcaps4,
        matcap5: textures.matcaps5,
        matcap6: textures.matcaps6,
        matcap7: textures.matcaps7,
        matcap8: textures.matcaps8,
      },
    },
    side: {
      options: {
        front: FrontSide,
        back: BackSide,
        double: DoubleSide,
      },
    },
    minFilter: {
      options: {
        linearMipmapLinear: LinearMipmapLinearFilter,
        linearMipmapNearest: LinearMipmapNearestFilter,
        nearestMipmapLinear: NearestMipmapLinearFilter,
        nearestMipmapNearest: NearestMipmapNearestFilter,
        linear: LinearFilter,
        nearest: NearestFilter,
      },
    },
    magFilter: {
      options: {
        linearMipmapLinear: LinearMipmapLinearFilter,
        linearMipmapNearest: LinearMipmapNearestFilter,
        nearestMipmapLinear: NearestMipmapLinearFilter,
        nearestMipmapNearest: NearestMipmapNearestFilter,
        linear: LinearFilter,
        nearest: NearestFilter,
      },
    },
    map: {
      options: {
        none: null,
        door: textures.doorMap,
      },
    },
    aoMap: {
      options: {
        none: null,
        door: textures.aoMap,
      },
    },
    aoMapIntensity: {
      value: 1,
      min: 0,
      max: 10,
      step: 0.01,
    }
  });

  useEffect(() => {
    if (!gradient)
      return;

    gradient.minFilter = minFilter;
    gradient.generateMipmaps = minFilter !== NearestFilter;

    gradient.needsUpdate = true;
  }, [minFilter, gradient]);

  useEffect(() => {
    if (!gradient)
      return;

    gradient.magFilter = magFilter;
    gradient.needsUpdate = true;
  }, [magFilter, gradient]);

  useEffect(() => {
    if (!('gradientMap' in material))
      return;

    material.gradientMap = gradient;
    material.needsUpdate = true;
  }, [material, gradient]);

  useEffect(() => {
    if (!('aoMap' in material))
      return;

    material.aoMap = aoMap;

    refPlane.current?.geometry.setAttribute('uv2', new BufferAttribute(refPlane?.current.geometry.attributes.uv.array, 2));
    refSphere.current?.geometry.setAttribute('uv2', new BufferAttribute(refSphere?.current.geometry.attributes.uv.array, 2));
    refPlane.current?.geometry.setAttribute('uv2', new BufferAttribute(refPlane?.current.geometry.attributes.uv.array, 2));

    material.needsUpdate = true;
  }, [material, aoMap]);

  useEffect(() => {
    if (!('metalness' in material))
      return;

    material.metalness = metalness;
  }, [material, metalness]);

  useEffect(() => {
    if (!('roughness' in material))
      return;

    material.roughness = roughness;
  }, [material, roughness]);

  useEffect(() => {
    if (!('aoMapIntensity' in material))
      return;

    material.aoMapIntensity = aoMapIntensity;
  }, [material, aoMapIntensity]);

  useEffect(() => {
    if (!('alphaMap' in material))
      return;

    material.alphaMap = enableAlphaMap ? textures.alphaMap : null;
    material.transparent = enableAlphaMap;
    material.needsUpdate = true;
  }, [material, enableAlphaMap, textures.alphaMap]);

  useEffect(() => {
    if (!('matcap' in material))
      return;

    material.matcap = matcap;
  }, [material, matcap]);

  useEffect(() => {
    if ('map' in material)
      material.map = map;

    if ('normalMap' in material)
      material.normalMap = map;

    material.needsUpdate = true;
  }, [material, map]);

  useEffect(() => {
    material.side = side;
  }, [material, side]);

  useEffect(() => {
    if (!('wireframe' in material))
      return;

    material.wireframe = wireframe;
  }, [material, wireframe]);

  useEffect(() => {
    if (!('flatShading' in material))
      return;

    material.flatShading = flatShading;
    material.needsUpdate = true;
  }, [material, flatShading]);

  useEffect(() => {
    if (!('shininess' in material))
      return;

    material.shininess = shininess;
  }, [material, shininess]);

  useFrame((_, delta) => {
    if (!refSphere.current || !refTorus.current || !refPlane.current)
      return;

    refSphere.current.rotation.y += delta * Math.PI * .05;
    refTorus.current.rotation.y += delta * Math.PI * .05;
    refPlane.current.rotation.y += delta * Math.PI * .05;

    refSphere.current.rotation.x += delta * Math.PI * .01;
    refTorus.current.rotation.x += delta * Math.PI * .01;
    refPlane.current.rotation.x += delta * Math.PI * .01;
  });

  return (<>
    <Stats/>

    <ambientLight intensity={ 0.2 }/>
    <directionalLight/>

    <OrbitControls enableDamping={ true }/>

    <axesHelper args={ [3] }/>

    <mesh ref={ refSphere } material={ material }>
      <sphereGeometry args={ [1] }/>
    </mesh>

    <mesh ref={ refTorus } material={ material } position={ new Vector3(-2, 0, 0) }>
      <torusGeometry args={ [0.8, 0.2, 16, 32] }/>
    </mesh>

    <mesh ref={ refPlane } material={ material } position={ new Vector3(2, 0, 0) }>
      <planeGeometry args={ [2, 2, 1, 1] }/>
    </mesh>
  </>);
}

function BasicScene(): ReactElement {
  return (
    <S.Container>
      <Canvas>
        <Scene/>
      </Canvas>
    </S.Container>
  );
}

export default BasicScene;
