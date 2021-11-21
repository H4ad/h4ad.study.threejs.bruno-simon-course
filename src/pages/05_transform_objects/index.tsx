import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ReactElement } from 'react';
import { Vector3 } from 'three';
import { useObjectControls } from '../../hooks/useObjectControls';

import * as S from './styles';

function Scene() {
  const refObject3d = useObjectControls();

  return (<>
    <Stats/>

    <axesHelper args={ [3] }/>

    <group ref={ refObject3d }>
      <mesh>
        <boxGeometry args={ [1, 1, 1] }/>
        <meshBasicMaterial color="#ff0000"/>
      </mesh>

      <mesh position={new Vector3(-2, 0, 0)}>
        <boxGeometry args={ [2, 1, 1] }/>
        <meshBasicMaterial color="#FFFFFF"/>
      </mesh>
    </group>
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
