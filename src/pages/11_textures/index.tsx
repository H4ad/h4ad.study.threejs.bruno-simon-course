import { OrbitControls, Stats, useTexture } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { folder, useControls } from 'leva';
import { ReactElement, useEffect } from 'react';
import { ClampToEdgeWrapping, LinearFilter, LinearMipmapLinearFilter, LinearMipmapNearestFilter, MirroredRepeatWrapping, NearestFilter, NearestMipmapLinearFilter, NearestMipmapNearestFilter, RepeatWrapping } from 'three';
import { useObjectControls } from '../../hooks/useObjectControls';
import checkerboardColor from './assets/checkerboard-1024x1024.png';
import checkerboardTinyColor from './assets/checkerboard-8x8.png';
import minecraftColor from './assets/minecraft.png';
import doorColor from './assets/door/color.jpg';
import doorNormal from './assets/door/normal.jpg';
import doorRoughness from './assets/door/roughness.jpg';
import doorAmbientOcclusion from './assets/door/ambientOcclusion.jpg';

import * as S from './styles';

const doorTexture = {
  checkerboardMap: checkerboardColor,
  checkerboardTinyMap: checkerboardTinyColor,
  minecraftMap: minecraftColor,
  doorMap: doorColor,
  normalMap: doorNormal,
  roughnessMap: doorRoughness,
  aoMap: doorAmbientOcclusion,
};

/**
 * {@link https://docs.pmnd.rs/react-three-fiber/tutorials/loading-textures Referência para carregar texturas}
 */
function Scene() {
  const refObject3d = useObjectControls();

  const { doorMap, checkerboardMap, checkerboardTinyMap, minecraftMap, ...doorTextureProps } = useTexture(doorTexture);

  const { map, rotationCenter: [centerX, centerY], rotation, offset: [offsetX, offsetY], repeatY, repeatX, wrapS, wrapT, minFilter, magFilter } = useControls({
    texture: folder({
      map: {
        options: {
          door: doorMap,
          checkerboard: checkerboardMap,
          checkerboardTiny: checkerboardTinyMap,
          minecraft: minecraftMap,
        },
      },
      rotationCenter: {
        value: [0, 0],
        step: 0.05,
      },
      rotation: {
        value: 0,
        step: 0.05,
        min: 0,
        max: Math.PI * 2,
      },
      offset: {
        value: [0, 0],
        step: 0.05,
      },
      repeatX: {
        value: 1,
        min: 1,
        max: 10,
        step: 1,
      },
      repeatY: {
        value: 1,
        min: 1,
        max: 10,
        step: 1,
      },
      wrapS: {
        options: {
          mirror: MirroredRepeatWrapping,
          clamp: ClampToEdgeWrapping,
          repeat: RepeatWrapping,
        },
      },
      wrapT: {
        options: {
          mirror: MirroredRepeatWrapping,
          clamp: ClampToEdgeWrapping,
          repeat: RepeatWrapping,
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
          linear: LinearFilter,
          nearest: NearestFilter,
        },
      },
    }),
  });

  useEffect(() => {
    map.minFilter = minFilter;
    map.generateMipmaps = minFilter !== NearestFilter;

    map.needsUpdate = true;
  }, [minFilter, map]);

  useEffect(() => {
    map.magFilter = magFilter;

    map.needsUpdate = true;
  }, [magFilter, map]);

  useEffect(() => {
    map.center.x = centerX;
  }, [centerX, map]);

  useEffect(() => {
    map.center.y = centerY;
  }, [centerY, map]);

  useEffect(() => {
    map.rotation = rotation;
  }, [rotation, map]);

  useEffect(() => {
    map.offset.x = offsetX;
  }, [offsetX, map]);

  useEffect(() => {
    map.offset.y = offsetY;
  }, [offsetY, map]);

  useEffect(() => {
    map.repeat.x = repeatX;
  }, [repeatX, map]);

  useEffect(() => {
    map.repeat.y = repeatY;
  }, [repeatY, map]);

  useEffect(() => {
    map.wrapS = wrapS;

    map.needsUpdate = true;
  }, [wrapS, map]);

  useEffect(() => {
    map.wrapT = wrapT;

    map.needsUpdate = true;
  }, [wrapT, map]);

  return (<>
    <Stats/>

    <ambientLight intensity={ 0.2 }/>
    <directionalLight/>

    <OrbitControls enableDamping={ true }/>

    <axesHelper args={ [3] }/>

    <mesh ref={ refObject3d }>
      <boxGeometry args={ [1, 1, 1] }/>
      <meshStandardMaterial map={ map } { ...doorTextureProps }/>
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
