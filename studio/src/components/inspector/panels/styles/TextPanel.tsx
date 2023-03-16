import React, { memo } from 'react'
import { IconButton, ButtonGroup, useTheme, Box, Input } from '@chakra-ui/react'
import ColorsControl from '~components/inspector/controls/ColorsControl'
import { GoBold, GoItalic } from 'react-icons/go'
import { MdFormatUnderlined as Underline } from 'react-icons/md'
import {
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatAlignCenter,
  MdFormatAlignJustify,
} from 'react-icons/md'
import FormControl from '~components/inspector/controls/FormControl'
import useBreakpoints from '~hooks/useBreakpoints'

const TextPanel = () => {
  const theme = useTheme()

  const typoInput = [
    'fontWeight',
    'fontStyle',
    'textAlign',
    'textDecoration',
    'fontFamily',
    'fontSize',
    'lineHeight',
    'letterSpacing',
  ]

  const {
    responsiveValues,
    settledBreakpoints,
    handleBreakpoints,
    AddABreakpoint,
  } = useBreakpoints(typoInput)

  return (
    <>
      {settledBreakpoints.map((breakpoint: string, i: number) => (
        <Box key={i}>
          {breakpoint}
          <FormControl label="Style">
            <IconButton
              mr={1}
              aria-label="bold"
              icon={<GoBold />}
              onClick={() => {
                handleBreakpoints(
                  'fontWeight',
                  breakpoint,
                  responsiveValues['fontWeight']?.[breakpoint] ? null : 'bold',
                )
              }}
              size="xs"
              colorScheme={
                responsiveValues['fontWeight']?.[breakpoint]
                  ? 'whatsapp'
                  : 'gray'
              }
              variant={
                responsiveValues['fontWeight']?.[breakpoint]
                  ? 'solid'
                  : 'outline'
              }
            >
              Bold
            </IconButton>
            <IconButton
              aria-label="italic"
              icon={<GoItalic />}
              onClick={() => {
                handleBreakpoints(
                  'fontStyle',
                  breakpoint,
                  responsiveValues['fontStyle']?.[breakpoint] === 'italic'
                    ? null
                    : 'italic',
                )
              }}
              size="xs"
              colorScheme={
                responsiveValues['fontStyle']?.[breakpoint] === 'italic'
                  ? 'whatsapp'
                  : 'gray'
              }
              variant={
                responsiveValues['fontStyle']?.[breakpoint] === 'italic'
                  ? 'solid'
                  : 'outline'
              }
            >
              Italic
            </IconButton>
            <IconButton
              aria-label="underline"
              icon={<Underline />}
              onClick={() => {
                handleBreakpoints(
                  'textDecoration',
                  breakpoint,
                  responsiveValues['textDecoration']?.[breakpoint] === 'underline'
                    ? null
                    : 'underline',
                )
              }}
              size="xs"
              colorScheme={
                responsiveValues['textDecoration']?.[breakpoint] === 'underline'
                  ? 'whatsapp'
                  : 'gray'
              }
              variant={
                responsiveValues['textDecoration']?.[breakpoint] === 'underline'
                  ? 'solid'
                  : 'outline'
              }
            >
              Italic
            </IconButton>
          </FormControl>

          <FormControl label="Text align">
            <ButtonGroup size="xs" isAttached>
              <IconButton
                aria-label="bold"
                icon={<MdFormatAlignLeft />}
                onClick={() => {
                  handleBreakpoints('textAlign', breakpoint, 'left')
                }}
                colorScheme={
                  responsiveValues['textAlign']?.[breakpoint] === 'left'
                    ? 'whatsapp'
                    : 'gray'
                }
                variant={
                  responsiveValues['textAlign']?.[breakpoint] === 'left'
                    ? 'solid'
                    : 'outline'
                }
              />

              <IconButton
                aria-label="italic"
                icon={<MdFormatAlignCenter />}
                onClick={() => {
                  handleBreakpoints('textAlign', breakpoint, 'center')
                }}
                colorScheme={
                  responsiveValues['textAlign']?.[breakpoint] === 'center'
                    ? 'whatsapp'
                    : 'gray'
                }
                variant={
                  responsiveValues['textAlign']?.[breakpoint] === 'center'
                    ? 'solid'
                    : 'outline'
                }
              />

              <IconButton
                aria-label="italic"
                icon={<MdFormatAlignRight />}
                onClick={() => {
                  handleBreakpoints('textAlign', breakpoint, 'right')
                }}
                colorScheme={
                  responsiveValues['textAlign']?.[breakpoint] === 'right'
                    ? 'whatsapp'
                    : 'gray'
                }
                variant={
                  responsiveValues['textAlign']?.[breakpoint] === 'right'
                    ? 'solid'
                    : 'outline'
                }
              />

              <IconButton
                aria-label="italic"
                icon={<MdFormatAlignJustify />}
                onClick={() => {
                  handleBreakpoints('textAlign', breakpoint, 'justify')
                }}
                colorScheme={
                  responsiveValues['textAlign']?.[breakpoint] === 'justify'
                    ? 'whatsapp'
                    : 'gray'
                }
                variant={
                  responsiveValues['textAlign']?.[breakpoint] === 'justify'
                    ? 'solid'
                    : 'outline'
                }
              />
            </ButtonGroup>
          </FormControl>

          <FormControl
            key={`fontFamily-${i}`}
            htmlFor={`${breakpoint}-fontFamily`}
            label={'fontFamily'}
          >
            <Input
              id={`${breakpoint}-fontFamily`}
              list={`${breakpoint}-fontFamily-flavors`}
              size="sm"
              type="text"
              name={`${breakpoint}-fontFamily`}
              value={responsiveValues['fontFamily']?.[breakpoint] || ''}
              onChange={e =>
                handleBreakpoints(
                  'fontFamily',
                  breakpoint,
                  e.currentTarget.value,
                )
              }
              autoComplete="off"
            />

            <datalist id={`${breakpoint}-fontFamily-flavors`}>
              {Object.keys(theme.fonts).map(option => (
                <option key={option} value={option} />
              ))}
            </datalist>
          </FormControl>

          <FormControl
            key={`fontSize-${i}`}
            htmlFor={`${breakpoint}-fontSize`}
            label={'fontSize'}
          >
            <Input
              id={`${breakpoint}-fontSize`}
              list={`${breakpoint}-fontSize-flavors`}
              size="sm"
              type="text"
              name={`${breakpoint}-fontSize`}
              value={responsiveValues['fontSize']?.[breakpoint] || ''}
              onChange={e =>
                handleBreakpoints('fontSize', breakpoint, e.currentTarget.value)
              }
              autoComplete="off"
            />

            <datalist id={`${breakpoint}-fontSize-flavors`}>
              {Object.keys(theme.fontSizes).map(option => (
                <option key={option} value={option} />
              ))}
            </datalist>
          </FormControl>

          <FormControl
            key={`lineHeight-${i}`}
            htmlFor={`${breakpoint}-lineHeight`}
            label={'lineHeight'}
          >
            <Input
              id={`${breakpoint}-lineHeight`}
              list={`${breakpoint}-lineHeight-flavors`}
              size="sm"
              type="text"
              name={`${breakpoint}-lineHeight`}
              value={responsiveValues['lineHeight']?.[breakpoint] || ''}
              onChange={e =>
                handleBreakpoints(
                  'lineHeight',
                  breakpoint,
                  e.currentTarget.value,
                )
              }
              autoComplete="off"
            />
            <datalist id={`${breakpoint}-lineHeight-flavors`}>
              {Object.keys(theme.lineHeights).map(option => (
                <option key={option} value={option} />
              ))}
            </datalist>
          </FormControl>

          <FormControl
            key={`letterSpacing-${i}`}
            htmlFor={`${breakpoint}-letterSpacing`}
            label={'letterSpacing'}
          >
            <Input
              id={`${breakpoint}-letterSpacing`}
              list={`${breakpoint}-letterSpacing-flavors`}
              size="sm"
              type="text"
              name={`${breakpoint}-letterSpacing`}
              value={responsiveValues['letterSpacing']?.[breakpoint] || ''}
              onChange={e =>
                handleBreakpoints(
                  'letterSpacing',
                  breakpoint,
                  e.currentTarget.value,
                )
              }
              autoComplete="off"
            />
            <datalist id={`${breakpoint}-letterSpacing-flavors`}>
              {Object.keys(theme.letterSpacings).map(option => (
                <option key={option} value={option} />
              ))}
            </datalist>
          </FormControl>
        </Box>
      ))}

      <AddABreakpoint currentProps={responsiveValues} />

      <ColorsControl withFullColor enableHues name="color" label="Color" />
    </>
  )
}

export default memo(TextPanel)
