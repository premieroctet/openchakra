import React from 'react'
import SwitchControl from '../../controls/SwitchControl'
import TextControl from '../../controls/TextControl'
import FlexPanel from '../styles/FlexPanel'

const StackPanel = () => {
  return (
    <>
      <SwitchControl label="Inline" name="isInline" />
      <SwitchControl label="Reversed" name="isReversed" />
      <SwitchControl label="Wrap children" name="shouldWrapChildren" />
      <TextControl name="spacing" label="Spacing" />
      <FlexPanel />
    </>
  )
}

export default StackPanel
