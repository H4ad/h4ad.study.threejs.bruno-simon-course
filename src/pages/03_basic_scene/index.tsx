import { Canvas } from '@react-three/fiber';
import { useControls } from 'leva';
import { ReactElement, useMemo } from 'react';
import { Vector3 } from 'three';

import * as S from './styles';

function BasicScene(): ReactElement {
  const { position } = useControls({
    position: {
      x: 0,
      y: 0,
      z: 2,
    },
  });

  const positionVector = useMemo(() => new Vector3(position.x, position.y, position.z), [position]);

  return (
    <S.Container>
      <Canvas>
        <perspectiveCamera fov={ 75 }/>

        <mesh position={ positionVector }>
          <boxGeometry args={ [1, 1, 1] }/>
          <meshBasicMaterial color="#ff0000"/>
        </mesh>
      </Canvas>
    </S.Container>
  );
}

export default BasicScene;
