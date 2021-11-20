import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ReactElement, useLayoutEffect, useRef, useState } from 'react';
import { Object3D } from 'three/src/core/Object3D';

import * as S from './styles';

function Scene() {
  const [onMeshRender, setOnMeshRender] = useState(false);
  const meshRef = useRef<Object3D>();

  useLayoutEffect(() => {
    if (!meshRef.current || !onMeshRender)
      return;

    gsap.to(meshRef.current.position, { duration: 1, delay: 0, x: 4 });
    gsap.to(meshRef.current.position, { duration: 1, delay: 2, x: 0 });
  }, [onMeshRender]);

  return (<>
    <Stats/>

    <axesHelper args={ [3] }/>

    <mesh ref={ meshRef } onAfterRender={() => setOnMeshRender(true)}>
      <boxGeometry args={ [2, 2, 2] }/>
      <meshBasicMaterial color="#ff0000"/>
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
