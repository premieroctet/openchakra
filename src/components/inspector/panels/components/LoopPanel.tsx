import React, { memo } from 'react'
import SwitchControl from '~components/inspector/controls/SwitchControl'

const LoopPanel = () => <SwitchControl label="Looped View" name="loopView" />

export default memo(LoopPanel)