import { memo } from 'react'
import ColorPickerControl from '~components/inspector/controls/ColorPickerControl'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import TextControl from '~components/inspector/controls/TextControl'
import usePropsSelector from '~hooks/usePropsSelector'

interface SkeletonPanelProps {
  isSkeletonText?: boolean
  isSkeletonCircle?: boolean
}

const SkeletonPanel = ({
  isSkeletonText,
  isSkeletonCircle,
}: SkeletonPanelProps) => {
  return (
    <>
      <ColorsControl
        name="startColor"
        label="Start Color"
        enableHues
        withFullColor
      />

      <ColorsControl
        name="endColor"
        label="End Color"
        enableHues
        withFullColor
      />

      <SwitchControl label="Is Loaded" name="isLoaded" />

      <TextControl name="fadeDuration" label="Fade duration" />
      <TextControl name="speed" label="Speed" />

      {isSkeletonText && (
        <>
          <TextControl name="noOfLines" label="No of lines" />
          <TextControl name="spacing" label="Spacing" />
        </>
      )}

      {isSkeletonCircle && <TextControl name="size" label="Size" />}
    </>
  )
}

export default memo(SkeletonPanel)
