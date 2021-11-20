import { css, SerializedStyles } from '@emotion/react';

export function toRem(value: number, precision: number = 1): string {
  return `${(value / 16).toFixed(precision)}rem`;
}

export function toEm(value: number, precision: number = 1): string {
  return `${(value / 16).toFixed(precision)}em`;
}

export function noWrap(maxWidth: string): SerializedStyles {
  return css`
    max-width: ${maxWidth};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `;
}
