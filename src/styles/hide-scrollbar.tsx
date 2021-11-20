import { css } from '@emotion/react';

export const hideScrollbar = css`
  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
