import { OrbitControls, Stats } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { folder, useControls } from 'leva';
import { ReactElement, useEffect, useLayoutEffect, useRef } from 'react';
import { OrthographicCamera, PerspectiveCamera } from 'three';
import { useCorrectViewport } from '../../hooks/useCorrectViewport';
import { useObjectControls } from '../../hooks/useObjectControls';

import * as S from './styles';

function Scene() {
  const { camera, viewport } = useCorrectViewport();

  const mouse = useThree(state => state.mouse);

  const setThreeState = useThree(state => state.set);
  const refObject3d = useObjectControls();

  const { fov, typeOfCamera, amplitude, orbitControls } = useControls({
    camera: folder({
      fov: {
        value: 75,
        step: 1,
      },
      typeOfCamera: {
        options: ['PerspectiveCamera', 'OrthographicCamera'],
      },
      amplitude: {
        step: 1,
        value: 5,
      },
      orbitControls: false,
    }),
  });

  const refAmplitude = useRef<number>(5);

  useEffect(() => {
    refAmplitude.current = amplitude;
  }, [amplitude]);

  useFrame(() => {
    if (orbitControls)
      return;

    camera.position.x = Math.sin(mouse.x * Math.PI * 2) * refAmplitude.current;
    camera.position.z = Math.cos(mouse.x * Math.PI * 2) * refAmplitude.current;
    camera.position.y = mouse.y * refAmplitude.current;

    // camera.position.x = mouse.x * refAmplitude.current;
    // camera.position.y = mouse.y * refAmplitude.current;

    if (!refObject3d.current)
      return;

    camera.lookAt(refObject3d.current.position);
  });

  useLayoutEffect(() => {
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 5;
  }, [camera]);

  useLayoutEffect(() => {
    if (camera.type !== 'PerspectiveCamera')
      return;

    camera.fov = fov;
    camera.updateProjectionMatrix();
  }, [camera, fov]);

  useLayoutEffect(() => {
    if (camera.type === typeOfCamera)
      return;

    switch (typeOfCamera) {
      case 'PerspectiveCamera':
        setThreeState({
          camera: new PerspectiveCamera(75, viewport.aspect, 0.1, 1000),
        });

        break;

      case 'OrthographicCamera':
        setThreeState({
          camera: new OrthographicCamera(viewport.width / -2, viewport.width / 2, viewport.height / 2, viewport.height / -2, 0.1, 1000),
        });

        break;
    }

    camera.updateProjectionMatrix();
  }, [camera, typeOfCamera, setThreeState, viewport]);

  return (<>
    <Stats/>

    { orbitControls && (
      <OrbitControls enableDamping={true} />
    )}

    <axesHelper args={ [3] }/>

    <mesh ref={ refObject3d }>
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
