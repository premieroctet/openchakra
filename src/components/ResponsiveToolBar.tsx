import React from 'react'
import { Flex, IconButton, useTheme } from '@chakra-ui/react'
import { HiOutlineDesktopComputer } from 'react-icons/hi'
import { MdOutlineTabletMac } from 'react-icons/md'
import { ImMobile } from 'react-icons/im'
import useDispatch from '~hooks/useDispatch'
import { getEditorWidth } from '~core/selectors/app'
import { useSelector } from 'react-redux'

const ResponsiveToolBar = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const editorWidth = useSelector(getEditorWidth)

  return (
    <Flex
      w="100%"
      p={4}
      backgroundSize="20px 20px"
      bgColor="#edf2f6"
      align="center"
      justify="center"
      position="absolute"
      zIndex={10}
      boxShadow="lg"
    >
      <IconButton
        icon={<HiOutlineDesktopComputer />}
        size="lg"
        fontSize="30px"
        color={editorWidth === '100%' ? 'teal.500' : 'black.500'}
        aria-label="Desktop version"
        onClick={() => dispatch.app.updateEditorWidth({ width: '100%' })}
      />

      <IconButton
        icon={<MdOutlineTabletMac />}
        size="lg"
        color={editorWidth === theme.breakpoints.md ? 'teal.500' : 'black.500'}
        fontSize="30px"
        aria-label="Tablet version"
        mx={12}
        onClick={() =>
          dispatch.app.updateEditorWidth({ width: theme.breakpoints.md })
        }
      />

      <IconButton
        icon={<ImMobile />}
        size="lg"
        color={editorWidth === theme.breakpoints.sm ? 'teal.500' : 'black.500'}
        fontSize="30px"
        aria-label="Mobile version"
        onClick={() =>
          dispatch.app.updateEditorWidth({ width: theme.breakpoints.sm })
        }
      />
    </Flex>
  )
}

export default ResponsiveToolBar
