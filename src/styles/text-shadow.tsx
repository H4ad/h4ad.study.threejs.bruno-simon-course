import { css } from '@emotion/react';

export const textShadow = (color: string) => css`
  text-shadow: 2px 0 0 ${color},
  -2px 0 0 ${color},
  0 2px 0 ${color},
    0 -2px 0 ${color},
  1px 1px ${color},
    -1px -1px 0 ${color},
    1px -1px 0 ${color},
  -1px 1px 0 ${color};
`;
