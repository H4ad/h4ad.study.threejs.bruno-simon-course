import { css } from '@emotion/react';

export const hideDrag = css`
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

export const hideDragJs = {
  onDragStart: function(event: any) {
    event.preventDefault();
  },
};
