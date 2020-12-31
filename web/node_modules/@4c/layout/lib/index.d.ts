// TypeScript Version: 3.2

import * as React from 'react';

type Omit<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

type PropsOf<
  Tag extends React.ElementType
> = Tag extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[Tag]
  : Tag extends React.FunctionComponent<infer Props>
  ? Props & React.Attributes
  : Tag extends React.ComponentClass<infer Props2>
  ? (Tag extends new (...args: any[]) => infer Instance
      ? Props2 & React.ClassAttributes<Instance>
      : never)
  : never;

type ReplaceProps<Inner extends React.ElementType, P> = Omit<
  PropsOf<Inner>,
  P
> &
  P;

declare class ComponentWithAs<
  As extends React.ElementType,
  P = {}
> extends React.Component<ReplaceProps<As, { as?: As } & P>> {}

type Align =
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline'
  | 'first-baseline'
  | 'last-baseline';

type Content =
  | 'left'
  | 'right'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'baseline'
  | 'first-baseline'
  | 'last-baseline'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export interface BlockProps {
  grow?: boolean;
  inline?: boolean;
  flex?: boolean | number;
  /** default to 'stretch' */
  alignSelf?: Align;
}

export interface FlexProps extends BlockProps {
  /** default to 'row' */
  direction?: 'row' | 'column';
  reverse?: boolean;
  pad?: boolean | number;
  wrap?: boolean;
  /** default to 'stretch' */
  align?: Align;
  alignContent?: Content;
  /** default to 'flex-start' */
  justify?: Content;
}

declare class Flex<
  As extends React.ElementType = 'div'
> extends ComponentWithAs<As, FlexProps> {}

declare class Block<
  As extends React.ElementType = 'div'
> extends ComponentWithAs<As, BlockProps> {}

export type LayoutProps =
  | ({ display?: 'flex' } & FlexProps)
  | ({ display: 'block' } & BlockProps);

declare class Layout<
  As extends React.ElementType = 'div'
> extends ComponentWithAs<As, LayoutProps> {
  static Flex: typeof Flex;
  static Block: typeof Block;

  static Spacer: React.ComponentType;
}

export default Layout;
