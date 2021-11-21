import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ReactElement } from 'react';
import { useFullScreen } from '../../hooks/useFullScreen';
import { useObjectControls } from '../../hooks/useObjectControls';

import * as S from './styles';

function Scene() {
  const refObject3d = useObjectControls();

  return (<>
    <Stats/>

    <OrbitControls enableDamping={ true }/>

    <axesHelper args={ [3] }/>

    <mesh ref={ refObject3d }>
      <boxGeometry args={ [1, 1, 1] }/>
      <meshBasicMaterial color="#ff0000"/>
    </mesh>
  </>);
}

/**
 * No fim, só foi possível estudar a parte de fullscreen,
 * toda a parte de resizing é feito automaticamente pelo
 * react-fiber.
 */
function BasicScene(): ReactElement {
  const { toggleFullScreen, containerRef } = useFullScreen<HTMLCanvasElement>();

  return (
    <S.Container onDoubleClick={ toggleFullScreen }>
      <Canvas ref={ containerRef }>
        <Scene/>
      </Canvas>
    </S.Container>
  );
}

export default BasicScene;
