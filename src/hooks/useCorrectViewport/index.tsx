import { Camera, useThree, Viewport } from '@react-three/fiber';
import { useLayoutEffect, useMemo } from 'react';

export type UseCorrectViewportReturnType = { camera: Camera, viewport: Viewport };

export function useCorrectViewport(): UseCorrectViewportReturnType {
  const camera = useThree(state => state.camera);
  const viewport = useThree(state => state.viewport);

  useLayoutEffect(() => {
    if (camera.type === 'OrthographicCamera') {
      camera.left = viewport.width / -2;
      camera.right = viewport.width / 2;
      camera.top = viewport.height / 2;
      camera.bottom = viewport.height / -2;
    } else {
      camera.aspect = viewport.aspect;
    }

    camera.updateProjectionMatrix();

    // https://github.com/react-spring/react-three-fiber/issues/178
    // Update matrix world since the renderer is a frame late
    camera.updateMatrixWorld();
  }, [camera, viewport]);

  return useMemo(() => ({
    camera,
    viewport,
  }), [camera, viewport]);
}
