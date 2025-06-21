import React, { ReactElement } from 'react';

export type SlotProps<T extends React.ElementType = 'div'> = {
  as?: T;
  children: ReactElement<
    React.ComponentPropsWithoutRef<T> & {
      className?: string;
      style?: React.CSSProperties;
    }
  >;
  className?: string;
  style?: React.CSSProperties;
} & Omit<React.ComponentPropsWithoutRef<T>, 'className' | 'style' | 'children'>;