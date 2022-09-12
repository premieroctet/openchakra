import { memo } from 'react'
import ColorPickerControl from '~components/inspector/controls/ColorPickerControl'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import TextControl from '~components/inspector/controls/TextControl'

const SkeletonPanel = () => (
  <>
    <ColorsControl
      name="startColor"
      label="Start Color"
      enableHues
      withFullColor
    />

    <ColorsControl name="endColor" label="End Color" enableHues withFullColor />

    <SwitchControl label="Is Loaded" name="isLoaded" />

    <TextControl name="fadeDuration" label="Fade duration" />
    <TextControl name="speed" label="Speed" />
  </>
)

export default memo(SkeletonPanel)
