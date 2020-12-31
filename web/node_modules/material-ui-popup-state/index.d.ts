/* eslint-env browser */

import * as React from 'react'

import {
  initCoreState,
  createPopupState,
  anchorRef,
  bindTrigger,
  bindToggle,
  bindHover,
  bindMenu,
  bindPopover,
  bindPopper,
  Variant,
  CoreState,
  PopupState as InjectedProps,
} from './core'

export {
  anchorRef,
  bindTrigger,
  bindToggle,
  bindHover,
  bindMenu,
  bindPopover,
  bindPopper,
  Variant,
  InjectedProps,
}

export type Props = {
  popupId?: string
  children: (props: InjectedProps) => React.ReactNode | null | undefined
  variant: Variant
  parentPopupState?: InjectedProps | null | undefined
}

declare const PopupState: React.ComponentType<Props>
export default PopupState
