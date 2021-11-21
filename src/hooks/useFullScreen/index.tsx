import { RefObject, useCallback, useMemo, useRef } from 'react';

export type UseFullscreenReturnType<T extends HTMLElement> = { containerRef: RefObject<T>, toggleFullScreen: () => void };

export type WebkitDocument = Document & {
  webkitFullscreenElement: Element | null;
};

export type WebkitElement<T> = T & HTMLElement & {
  webkitRequestFullscreen: HTMLElement['requestFullscreen'];
};

export function useFullScreen<T extends HTMLElement>(): UseFullscreenReturnType<T> {
  const containerRef = useRef<T>(null);

  const toggleFullScreen = useCallback(() => {
    if (!containerRef.current)
      return;

    const doc = document as WebkitDocument;

    const fullScreenElement = doc.fullscreenElement || doc.webkitFullscreenElement;

    if (fullScreenElement)
      return void document.exitFullscreen();

    const containerElement = containerRef.current as WebkitElement<T>;
    const requestFullscreen = containerElement.requestFullscreen || containerElement.webkitRequestFullscreen;

    if (!requestFullscreen)
      return;

    requestFullscreen.apply(containerElement, [{ navigationUI: 'hide' }]);
  }, []);

  return useMemo(() => ({
    containerRef,
    toggleFullScreen,
  }), [toggleFullScreen]);
}
