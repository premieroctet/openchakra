import React, { memo } from 'react'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import usePropsSelector from '~hooks/usePropsSelector'
import TextControl from '~components/inspector/controls/TextControl'

const UploadFilePanel = () => {
  
  const noticemsg = usePropsSelector('notifmsg')

  return (
    <>
      <SwitchControl label="Confirmation Message" name="notifmsg" />
      <SwitchControl label="Downloadable" name="downloadable" />
      {noticemsg && <TextControl name="okmsg" label="OK message" />}
    </>
  )
}

export default memo(UploadFilePanel)
