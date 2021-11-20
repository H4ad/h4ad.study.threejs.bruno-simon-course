import { useControls } from 'leva';
import { SpecialInputs } from 'leva/plugin';
import { RefObject, useEffect, useRef } from 'react';
import { Camera } from 'three';
import { Object3D } from 'three/src/core/Object3D';

export function useObjectControls(cameraRef: Camera): RefObject<Object3D> {
  const ref = useRef<Object3D>(null);

  const { position, scale, rotation, reorder } = useControls({
    position: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.2,
    },
    scale: {
      value: { x: 1, y: 1, z: 1 },
      step: 0.2,
    },
    rotation: {
      value: { x: 0, y: 0, z: 0 },
      step: 0.1,
    },
    reorder: {
      options: ['XYZ', 'YXZ'],
    },
    lookAtCamera: {
      label: 'Look At Camera',
      type: SpecialInputs.BUTTON,
      onClick: () => ref.current && cameraRef.lookAt(ref.current.position),
    },
  });

  useEffect(() => {
    if (!ref.current)
      return;

    ref.current.position.x = position.x;
    ref.current.position.y = position.y;
    ref.current.position.z = position.z;
  }, [position]);

  useEffect(() => {
    if (!ref.current)
      return;

    ref.current.scale.x = scale.x;
    ref.current.scale.y = scale.y;
    ref.current.scale.z = scale.z;
  }, [scale]);

  useEffect(() => {
    if (!ref.current)
      return;

    ref.current.rotation.reorder(reorder);
  }, [reorder]);

  useEffect(() => {
    if (!ref.current)
      return;

    ref.current.rotation.x = rotation.x;
    ref.current.rotation.y = rotation.y;
    ref.current.rotation.z = rotation.z;
  }, [rotation]);

  return ref;
}
